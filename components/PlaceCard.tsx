"use client";

import { useCallback, useState } from "react";
import type { SnapPlace } from "@/types/place";
import { MapOpenButtons } from "./MapOpenButtons";
import { SnapEditForm } from "./SnapEditForm";
import { deleteSnap, saveSnap } from "@/lib/storage";
import {
  applySnapEdit,
  snapDisplayTitle,
  snapEditDraftFromSnap,
} from "@/lib/snapEdit";
import { normalizeSnap } from "@/lib/snapModel";
import { applySnapFavorite } from "@/lib/snapFavorite";
import { saveSnapImage } from "@/lib/saveSnapImage";
import { shareSnap } from "@/lib/shareSnap";
import { FavoriteToggle } from "./FavoriteToggle";

type PlaceCardProps = {
  place: SnapPlace;
  onDelete: (id: string) => void;
  onUpdate: (snap: SnapPlace) => void;
  animate?: boolean;
};

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function formatCoords(lat: number, lng: number): string {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export function PlaceCard({ place, onDelete, onUpdate, animate }: PlaceCardProps) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savingImage, setSavingImage] = useState(false);
  const [saveImageMessage, setSaveImageMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState<{
    type: "error";
    text: string;
  } | null>(null);
  const [savingFavorite, setSavingFavorite] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const handleDelete = () => {
    void deleteSnap(place.id).then((result) => {
      if (result.ok) {
        onDelete(place.id);
      }
    });
  };

  const openEdit = useCallback(() => {
    const draft = snapEditDraftFromSnap(place);
    setDraftTitle(draft.name);
    setDraftNote(draft.note);
    setSaveError(null);
    setEditing(true);
  }, [place]);

  const closeEdit = useCallback(() => {
    setEditing(false);
    setSaveError(null);
    setDraftTitle("");
    setDraftNote("");
  }, []);

  const handleShare = useCallback(() => {
    setSharing(true);
    setShareMessage(null);

    void shareSnap(place).then((result) => {
      setSharing(false);
      if (result.ok || result.reason === "cancelled") return;

      setShareMessage({
        type: "error",
        text:
          result.reason === "unavailable"
            ? "Delning stöds inte i den här webbläsaren"
            : "Kunde inte dela snap",
      });
    });
  }, [place]);

  const handleSaveImage = useCallback(() => {
    if (!place.photoDataUrl) return;

    setSavingImage(true);
    setSaveImageMessage(null);

    void saveSnapImage({
      photoDataUrl: place.photoDataUrl,
      createdAt: place.createdAt,
    }).then((result) => {
      setSavingImage(false);
      setSaveImageMessage(
        result.ok
          ? { type: "success", text: "Bilden sparades" }
          : { type: "error", text: "Kunde inte spara bilden" }
      );
    });
  }, [place.photoDataUrl, place.createdAt]);

  const handleToggleFavorite = useCallback(() => {
    const previous = place;
    const nextFavorite = !place.favorite;
    const updated = normalizeSnap(applySnapFavorite(place, nextFavorite));
    if (!updated) return;

    setFavoriteError(null);
    setSavingFavorite(true);
    onUpdate(updated);

    void saveSnap(updated).then((result) => {
      setSavingFavorite(false);
      if (result.ok) return;

      onUpdate(previous);
      setFavoriteError(result.error ?? "Kunde inte spara favorit.");
    });
  }, [place, onUpdate]);

  const handleSave = useCallback(() => {
    setSaving(true);
    setSaveError(null);

    const updated = normalizeSnap(
      applySnapEdit(place, { name: draftTitle, note: draftNote })
    );
    if (!updated) {
      setSaveError("Kunde inte uppdatera snap.");
      setSaving(false);
      return;
    }

    void saveSnap(updated).then((result) => {
      setSaving(false);
      if (!result.ok) {
        setSaveError(result.error ?? "Kunde inte spara ändringarna.");
        return;
      }
      onUpdate(updated);
      closeEdit();
    });
  }, [place, draftTitle, draftNote, onUpdate, closeEdit]);

  const displayName = snapDisplayTitle(place);
  const category = place.category ?? "Annat";
  const noteText = place.note?.trim();

  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl border border-black/[0.05] bg-elevated card-shadow transition-shadow duration-300",
        animate ? "animate-card-in" : "",
      ].join(" ")}
      style={{ viewTransitionName: `snap-${place.id}` }}
    >
      <FavoriteToggle
        favorite={Boolean(place.favorite)}
        onToggle={handleToggleFavorite}
        saving={savingFavorite}
      />
      {place.photoDataUrl && (
        <div className="aspect-[2.4/1] w-full overflow-hidden bg-surface">
          <img
            src={place.photoDataUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-5">
        {favoriteError && (
          <p className="mb-3 text-sm text-secondary" role="alert">
            {favoriteError}
          </p>
        )}
        <div className="min-w-0 pr-10">
          <h3 className="truncate text-lg font-semibold leading-snug text-primary">
            {displayName}
          </h3>
          {noteText && !editing && (
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-secondary line-clamp-3">
              {noteText}
            </p>
          )}
          <p className="mt-1.5 text-sm font-medium text-snap">
            📍 {category}
          </p>
          <p className="mt-1 text-sm text-secondary">{formatTime(place.createdAt)}</p>
        </div>

        <p className="mt-3 font-mono text-xs leading-relaxed text-secondary/70">
          {formatCoords(place.latitude, place.longitude)}
          {place.accuracy != null && (
            <span className="ml-2 text-secondary/50">
              ±{Math.round(place.accuracy)} m
            </span>
          )}
        </p>

        {editing ? (
          <SnapEditForm
            titleValue={draftTitle}
            noteValue={draftNote}
            saving={saving}
            error={saveError}
            onTitleChange={setDraftTitle}
            onNoteChange={setDraftNote}
            onSave={handleSave}
            onCancel={closeEdit}
          />
        ) : (
          <div className="mt-5 flex flex-col gap-3">
            <MapOpenButtons latitude={place.latitude} longitude={place.longitude} />
            {place.photoDataUrl && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={savingImage}
                  className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/30 active:scale-[0.97] disabled:opacity-60"
                  aria-label={`Spara bild för ${displayName}`}
                >
                  {savingImage ? "Sparar bild…" : "Spara bild"}
                </button>
                {saveImageMessage && (
                  <p
                    className={[
                      "text-sm",
                      saveImageMessage.type === "success"
                        ? "text-primary"
                        : "text-secondary",
                    ].join(" ")}
                    role={saveImageMessage.type === "error" ? "alert" : "status"}
                  >
                    {saveImageMessage.text}
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleShare}
                disabled={sharing}
                className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/30 active:scale-[0.97] disabled:opacity-60"
                aria-label={`Dela ${displayName}`}
              >
                {sharing ? "Delar…" : "Dela"}
              </button>
              {shareMessage && (
                <p className="text-sm text-secondary" role="alert">
                  {shareMessage.text}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openEdit}
                className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/30 active:scale-[0.97]"
                aria-label={`Redigera ${displayName}`}
              >
                Redigera
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-secondary transition-all duration-200 ease-out hover:bg-black/[0.03] active:scale-[0.97]"
                aria-label="Ta bort snap"
              >
                Ta bort
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  MAX_SNAP_NOTE_LENGTH,
  MAX_SNAP_TITLE_LENGTH,
} from "@/lib/snapEdit";
import {
  RECOMMENDED_TAG_COUNT,
  addTag,
  removeTag,
} from "@/lib/snapTags";

type SnapEditFormProps = {
  titleValue: string;
  noteValue: string;
  tagsValue: string[];
  saving: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
};

const fieldClass =
  "w-full min-w-0 rounded-2xl border border-black/[0.08] bg-surface px-4 py-3 text-base text-primary placeholder:text-secondary/50 focus:border-snap/40 focus:outline-none focus:ring-2 focus:ring-snap/20";

const actionClass =
  "min-h-[48px] rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60";

const tagPillClass =
  "inline-flex max-w-full items-center gap-1 rounded-full border border-black/[0.06] bg-black/[0.03] px-2.5 py-1 text-xs text-secondary";

export function SnapEditForm({
  titleValue,
  noteValue,
  tagsValue,
  saving,
  error,
  onTitleChange,
  onNoteChange,
  onTagsChange,
  onSave,
  onCancel,
}: SnapEditFormProps) {
  const formId = useId();
  const titleId = `${formId}-title`;
  const noteId = `${formId}-note`;
  const tagsId = `${formId}-tags`;
  const titleRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
      }
    },
    [onCancel]
  );

  const scrollFieldIntoView = useCallback((element: HTMLElement) => {
    requestAnimationFrame(() => {
      element.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }, []);

  const commitTagInput = useCallback(() => {
    const next = addTag(tagsValue, tagInput);
    if (next.length !== tagsValue.length) {
      onTagsChange(next);
    }
    setTagInput("");
  }, [tagsValue, tagInput, onTagsChange]);

  const handleTagInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commitTagInput();
      }
    },
    [commitTagInput]
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      onTagsChange(removeTag(tagsValue, tag));
    },
    [tagsValue, onTagsChange]
  );

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Redigera snap"
      className="mt-4 rounded-2xl border border-black/[0.06] bg-surface/80 p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor={titleId} className="mb-1.5 block text-sm font-medium text-primary">
            Titel
          </label>
          <input
            ref={titleRef}
            id={titleId}
            type="text"
            value={titleValue}
            onChange={(e) => onTitleChange(e.target.value)}
            onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
            maxLength={MAX_SNAP_TITLE_LENGTH}
            autoComplete="off"
            enterKeyHint="next"
            placeholder="Valfritt"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={noteId} className="mb-1.5 block text-sm font-medium text-primary">
            Anteckning
          </label>
          <textarea
            id={noteId}
            value={noteValue}
            onChange={(e) => onNoteChange(e.target.value)}
            onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
            maxLength={MAX_SNAP_NOTE_LENGTH}
            rows={4}
            enterKeyHint="done"
            placeholder="Valfritt"
            className={`${fieldClass} resize-y min-h-[6rem] leading-relaxed`}
          />
        </div>

        <div>
          <label htmlFor={tagsId} className="mb-1.5 block text-sm font-medium text-primary">
            Taggar
          </label>
          <p className="mb-2 text-xs leading-relaxed text-secondary/70">
            Valfritt · rekommenderas cirka {RECOMMENDED_TAG_COUNT}
          </p>
          {tagsValue.length > 0 && (
            <ul className="mb-2 flex flex-wrap gap-1.5" aria-label="Tillagda">
              {tagsValue.map((tag) => (
                <li key={tag} className={tagPillClass}>
                  <span className="truncate">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={saving}
                    className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-secondary/70 transition-colors hover:bg-black/[0.06] hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-snap/40"
                    aria-label={`Ta bort taggen ${tag}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <input
              id={tagsId}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
              autoComplete="off"
              enterKeyHint="done"
              placeholder="Lägg till tagg"
              className={`${fieldClass} flex-1`}
            />
            <button
              type="button"
              onClick={commitTagInput}
              disabled={saving || !tagInput.trim()}
              className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-elevated px-4 text-sm font-medium text-secondary transition-all duration-200 ease-out hover:bg-black/[0.03] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Lägg till
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-secondary" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className={`${actionClass} border border-black/[0.07] bg-elevated text-secondary hover:bg-black/[0.03]`}
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={`${actionClass} bg-snap text-white hover:brightness-105`}
          >
            {saving ? "Sparar…" : "Spara"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import {
  MAX_SNAP_NOTE_LENGTH,
  MAX_SNAP_TITLE_LENGTH,
} from "@/lib/snapEdit";

type SnapEditFormProps = {
  titleValue: string;
  noteValue: string;
  saving: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const fieldClass =
  "w-full min-w-0 rounded-2xl border border-black/[0.08] bg-surface px-4 py-3 text-base text-primary placeholder:text-secondary/50 focus:border-snap/40 focus:outline-none focus:ring-2 focus:ring-snap/20";

const actionClass =
  "min-h-[48px] rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60";

export function SnapEditForm({
  titleValue,
  noteValue,
  saving,
  error,
  onTitleChange,
  onNoteChange,
  onSave,
  onCancel,
}: SnapEditFormProps) {
  const formId = useId();
  const titleId = `${formId}-title`;
  const noteId = `${formId}-note`;
  const titleRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

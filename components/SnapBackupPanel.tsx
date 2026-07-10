"use client";

import { useCallback, useState } from "react";
import { exportSnapsJson, importSnapsFromJson } from "@/lib/storage";

type SnapBackupPanelProps = {
  onImportSuccess: () => void;
};

type Message = {
  type: "success" | "error";
  text: string;
};

function downloadJsonFile(json: string): boolean {
  try {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mapsnap-snaps-backup.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

export function SnapBackupPanel({ onImportSuccess }: SnapBackupPanelProps) {
  const [exportJson, setExportJson] = useState("");
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const populateExportJson = useCallback(async () => {
    const json = await exportSnapsJson();
    setExportJson(json);
    return json;
  }, []);

  const handleExportFile = useCallback(() => {
    void (async () => {
      const json = await populateExportJson();
      setMessage(null);

      const downloaded = downloadJsonFile(json);
      if (downloaded) {
        setMessage({ type: "success", text: "Backup exporterad som fil." });
      } else {
        setMessage({
          type: "error",
          text: "Kunde inte ladda ner filen. Använd textfältet nedan.",
        });
      }
    })();
  }, [populateExportJson]);

  const handleCopy = useCallback(async () => {
    const json = exportJson || (await populateExportJson());
    setMessage(null);

    try {
      await navigator.clipboard.writeText(json);
      setMessage({
        type: "success",
        text: "Backup kopierad. Klistra in den på ett säkert ställe.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Kunde inte kopiera automatiskt. Markera och kopiera texten manuellt.",
      });
    }
  }, [exportJson, populateExportJson]);

  const handleImport = useCallback(() => {
    void (async () => {
      const trimmed = importText.trim();
      if (!trimmed) {
        setMessage({ type: "error", text: "Klistra in backup-JSON i fältet ovan." });
        return;
      }

      setMessage(null);
      const result = await importSnapsFromJson(trimmed);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Import misslyckades." });
        return;
      }

      if (result.addedCount === 0) {
        setMessage({
          type: "success",
          text: "Inga nya snappar att importera — alla fanns redan.",
        });
      } else {
        const count = result.addedCount ?? 0;
        setMessage({
          type: "success",
          text:
            count === 1
              ? "1 snap importerad."
              : `${count} snappar importerade.`,
        });
      }

      onImportSuccess();
    })();
  }, [importText, onImportSuccess]);

  return (
    <section
      className="mt-10 rounded-2xl border border-dashed border-black/10 bg-surface p-4"
      aria-label="Backup"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary/80">
        Backup
      </p>
      <p className="mt-2 text-sm text-secondary">
        På mobilen är kopiering säkrast. Klistra in backupen i anteckningar,
        Gmail eller en chat till dig själv.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="min-h-[44px] rounded-full bg-snap-dark px-4 py-2 text-sm font-semibold text-white transition active:scale-[0.98]"
        >
          Kopiera backup
        </button>

        <textarea
          readOnly
          value={exportJson}
          rows={6}
          placeholder="Tryck Kopiera backup för att visa JSON här."
          className="w-full resize-y rounded-xl border border-black/[0.08] bg-white p-3 font-mono text-[11px] leading-relaxed text-primary placeholder:text-secondary/50"
          aria-label="Exporterad backup-JSON"
        />

        <button
          type="button"
          onClick={handleExportFile}
          className="min-h-[44px] rounded-full border border-black/[0.08] bg-elevated px-4 py-2 text-sm font-medium text-secondary transition active:scale-[0.98]"
        >
          Exportera fil
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <label
          htmlFor="snap-backup-import"
          className="text-sm font-medium text-primary"
        >
          Klistra in backup här
        </label>
        <textarea
          id="snap-backup-import"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={6}
          placeholder='[{"id":"…","latitude":59.3,"longitude":18.0,"createdAt":"…"}]'
          className="w-full resize-y rounded-xl border border-black/[0.08] bg-white p-3 font-mono text-[11px] leading-relaxed text-primary placeholder:text-secondary/50"
        />

        <button
          type="button"
          onClick={handleImport}
          className="min-h-[44px] rounded-full border border-black/[0.08] bg-elevated px-4 py-2 text-sm font-semibold text-primary transition active:scale-[0.98]"
        >
          Importera backup
        </button>
      </div>

      {message && (
        <p
          className={[
            "mt-4 text-sm",
            message.type === "success" ? "text-primary" : "text-secondary",
          ].join(" ")}
          role={message.type === "error" ? "alert" : "status"}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}

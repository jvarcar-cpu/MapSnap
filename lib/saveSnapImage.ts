/**
 * Save a Snap's stored photo to the device. Copy only — never mutates the Snap.
 * Platform strategy: download on desktop/Android; Web Share with file on iOS.
 * See FEAS-001 and ADR-014.
 */

export function snapImageFilename(createdAt?: string): string {
  if (!createdAt) return "MapSnap.jpg";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "MapSnap.jpg";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `MapSnap_${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}.jpg`;
}

export function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const match = /^data:([^;,]+)?(?:;base64)?,(.+)$/.exec(dataUrl);
    if (!match) return null;

    const mime = match[1] || "image/jpeg";
    if (dataUrl.includes(";base64,")) {
      const binary = atob(match[2]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new Blob([bytes], { type: mime });
    }

    return new Blob([decodeURIComponent(match[2])], { type: mime });
  } catch {
    return null;
  }
}

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function triggerBlobDownload(blob: Blob, filename: string): boolean {
  if (typeof document === "undefined") return false;
  try {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

async function tryShareFile(file: File): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) return false;
  try {
    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
      return false;
    }
    await navigator.share({ files: [file] });
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return false;
    return false;
  }
}

export async function saveSnapImage(options: {
  photoDataUrl: string;
  createdAt?: string;
}): Promise<{ ok: boolean }> {
  const blob = dataUrlToBlob(options.photoDataUrl);
  if (!blob) return { ok: false };

  const filename = snapImageFilename(options.createdAt);
  const mime = blob.type || "image/jpeg";
  const file = new File([blob], filename, { type: mime });

  if (isIosDevice()) {
    const shared = await tryShareFile(file);
    return { ok: shared };
  }

  if (triggerBlobDownload(blob, filename)) {
    return { ok: true };
  }

  const shared = await tryShareFile(file);
  return { ok: shared };
}

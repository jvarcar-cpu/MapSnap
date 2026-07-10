"use client";

type LocationPermissionCardProps = {
  onRetry: () => void;
  showHttpsWarning: boolean;
  locationHost?: string;
};

const STEPS = [
  "Tryck på ikonen till vänster om adressfältet.",
  "Välj Webbplatsinställningar eller Behörigheter.",
  "Sätt Plats till Tillåt.",
  "Ladda om sidan och tryck SNAP igen.",
] as const;

function isChromeOnAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Android/i.test(ua) &&
    /Chrome/i.test(ua) &&
    !/Edg|OPR|SamsungBrowser/i.test(ua)
  );
}

export function LocationPermissionCard({
  onRetry,
  showHttpsWarning,
  locationHost,
}: LocationPermissionCardProps) {
  const showChromeHint = isChromeOnAndroid() && locationHost;

  return (
    <div
      className="animate-fade-in mt-6 w-full max-w-sm rounded-3xl border border-black/[0.06] bg-elevated p-5 card-shadow"
      role="alert"
    >
      <p className="text-[15px] font-semibold leading-snug text-primary">
        Platsåtkomst behövs
      </p>

      <p className="mt-2 text-sm leading-relaxed text-secondary">
        MapSnap behöver platsåtkomst för att kunna spara var du snappar.
      </p>

      <p className="mt-4 text-sm font-medium text-primary">Så tillåter du plats:</p>

      <ol className="mt-2 space-y-2.5">
        {STEPS.map((step, index) => (
          <li
            key={step}
            className="flex gap-3 text-sm leading-relaxed text-secondary"
          >
            <span className="shrink-0 font-semibold text-snap">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {showChromeHint && (
        <p className="mt-4 text-sm leading-relaxed text-secondary">
          Chrome: tryck på varnings-/låsikonen bredvid {locationHost}.
        </p>
      )}

      {showHttpsWarning && (
        <p className="mt-4 text-sm leading-relaxed text-secondary">
          Plats kan kräva HTTPS i mobilens webbläsare. Om det inte fungerar via
          denna adress behöver vi köra MapSnap via HTTPS.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="min-h-[48px] w-full rounded-full bg-snap px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-snap-dark active:scale-[0.98]"
        >
          Försök igen
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="min-h-[48px] w-full rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/40 active:scale-[0.97]"
        >
          Ladda om
        </button>
      </div>
    </div>
  );
}

type FavoriteToggleProps = {
  favorite: boolean;
  onToggle: () => void;
  saving?: boolean;
};

export function FavoriteToggle({
  favorite,
  onToggle,
  saving = false,
}: FavoriteToggleProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      disabled={saving}
      className={[
        "absolute right-2 top-2 z-10",
        "flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full",
        "border border-black/[0.06] bg-elevated/90 backdrop-blur-sm",
        "text-lg leading-none transition-all duration-200 ease-out",
        "hover:border-black/[0.1] hover:bg-elevated active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snap/40",
        "disabled:opacity-60",
        favorite ? "border-amber-200/80 text-amber-500" : "text-secondary/80",
      ].join(" ")}
      aria-label={favorite ? "Ta bort favorit" : "Markera som favorit"}
      aria-pressed={favorite}
    >
      <span aria-hidden>{favorite ? "★" : "☆"}</span>
    </button>
  );
}

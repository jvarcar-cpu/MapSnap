type IconProps = {
  className?: string;
};

export const actionIconClass = "size-[18px] shrink-0";

function mergeIconClass(className?: string) {
  return className ? `${actionIconClass} ${className}` : actionIconClass;
}

export function GoogleMapsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#34A853"
        d="M12 2C8.13 2 5 5.13 5 9c0 1.74.49 3.37 1.33 4.76L12 24l5.67-10.24A6.978 6.978 0 0 0 19 9c0-3.87-3.13-7-7-7z"
      />
      <path fill="#4285F4" d="M5 9c0-3.87 3.13-7 7-7v7H5z" />
      <path
        fill="#FBBC04"
        d="M12 2v7h7a6.978 6.978 0 0 0-1.33-4.76A6.99 6.99 0 0 0 12 2z"
      />
      <path
        fill="#EA4335"
        d="M12 9h7c0 1.74-.49 3.37-1.33 4.76L12 24V9z"
      />
      <circle cx="12" cy="9" r="2.25" fill="#fff" />
    </svg>
  );
}

export function WazeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="5.5" fill="#33CCFF" />
      <ellipse cx="12" cy="13.25" rx="6.75" ry="5.75" fill="#fff" />
      <circle cx="9.35" cy="12.25" r="1.2" fill="#1a1a1a" />
      <circle cx="14.65" cy="12.25" r="1.2" fill="#1a1a1a" />
      <path
        d="M9.25 15.25c.85.85 1.75 1.25 2.75 1.25s1.9-.4 2.75-1.25"
        stroke="#1a1a1a"
        strokeWidth="1.15"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EditIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.862 4.487 18.55 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
      <path d="M19.5 7.125 16.875 4.5" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12M12 3v13.5" />
    </svg>
  );
}

export function SaveImageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5m0 0 4.5-4.5M12 3v13.5" />
    </svg>
  );
}

export function DeleteIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeIconClass(className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.74 9h-5.48M19.5 7.125H4.5M18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79h14.456" />
    </svg>
  );
}

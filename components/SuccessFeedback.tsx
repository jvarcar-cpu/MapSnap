"use client";

type SuccessFeedbackProps = {
  id: number;
};

export function SuccessFeedback({ id }: SuccessFeedbackProps) {
  return (
    <div
      key={id}
      className="animate-toast-in-out flex items-center gap-2 rounded-full bg-elevated px-5 py-2.5 toast-shadow"
      role="status"
      aria-live="polite"
    >
      <span className="text-[15px] font-semibold text-snap" aria-hidden>
        ✓
      </span>
      <span className="text-[15px] font-semibold text-primary">Sparad</span>
    </div>
  );
}

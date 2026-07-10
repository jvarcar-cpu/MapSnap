"use client";

import { forwardRef } from "react";

type CameraInputProps = {
  onFileSelected: (file: File) => void;
};

/**
 * Opens the device camera on mobile browsers when triggered via long-press.
 * On desktop or remote-desktop sessions (e.g. Parsec), the OS file picker is shown instead — expected behavior.
 */
export const CameraInput = forwardRef<HTMLInputElement, CameraInputProps>(
  function CameraInput({ onFileSelected }, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (file) {
        onFileSelected(file);
      }
    };

    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleChange}
        aria-hidden
        tabIndex={-1}
      />
    );
  }
);

"use client";

import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeout.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({ top: rect.top - 8, left: rect.left });
      }
      setVisible(true);
    }, 200);
  }, []);

  const hide = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    setVisible(false);
  }, []);

  return (
    <span
      ref={triggerRef}
      className="inline-flex cursor-help items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
      {visible &&
        createPortal(
          <span
            role="tooltip"
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-lg dark:bg-dark-elevated dark:shadow-black/30"
            style={{ top: coords.top, left: coords.left, transform: "translateY(-100%)" }}
          >
            {text}
          </span>,
          document.body,
        )}
    </span>
  );
}

/** @jsxImportSource preact */
import { useEffect } from "preact/hooks";

type ToastProps = {
  message: string;
  type: "success" | "error" | "loading";
  visible: boolean;
};

export function Toast({ message, type, visible }: ToastProps) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"; // optional: prevent scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  if (!visible) return null;

  let backgroundColor = "#333";
  if (type === "success") backgroundColor = "#4caf50"; // green
  if (type === "error") backgroundColor = "#f44336";   // red
  if (type === "loading") backgroundColor = "#2196f3"; // blue

  return (
    <div
      style={{
        position: "fixed",
        top: visible ? "20px" : "-100px", // slide from top
        right: "20px",
        background: backgroundColor,
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "top 0.4s ease-in-out",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}

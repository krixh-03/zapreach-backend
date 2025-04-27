/** @jsxImportSource preact */
import { useEffect } from "preact/hooks";

type FeedbackPromptProps = {
  visible: boolean;
  message?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export function FeedbackPrompt({
  visible,
  message = "Would you like to submit feedback?",
  onSubmit,
  onCancel,
}: FeedbackPromptProps) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"; // optional: prevent scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: visible ? "20px" : "-200px", // slide from top
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fef3c7", // light yellow alert background
        color: "#92400e", // dark amber text
        padding: "20px 30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "top 0.2s ease-in-out",
        zIndex: 1100,
        minWidth: "320px",
        maxWidth: "90vw",
        textAlign: "center",
        fontWeight: "600",
        userSelect: "none",
      }}
      role="alert"
      aria-live="assertive"
    >
      <p style={{ marginBottom: "16px" }}>{message}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={onSubmit}
          style={{
            backgroundColor: "#f59e0b", // amber-500
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#b45309")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f59e0b")
          }
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          style={{
            backgroundColor: "#e5e7eb", // gray-200
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            color: "#374151", // gray-700
            fontWeight: "700",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#d1d5db")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#e5e7eb")
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

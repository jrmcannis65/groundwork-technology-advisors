interface LoadingIndicatorProps {
  message: string;
  visible: boolean;
}

export default function LoadingIndicator({ message, visible }: LoadingIndicatorProps) {
  if (!visible) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "20px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#1a3a5c",
            display: "inline-block",
            animation: "gta-bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)" }}>
        {message}
      </span>
      <style>{`@keyframes gta-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo placeholder */}
        <div
          className="w-12 h-12 relative"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            background: "rgba(124,110,250,0.1)",
            border: "1px solid rgba(124,110,250,0.3)",
          }}
        >
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,110,250,0.2), rgba(34,211,238,0.1))",
            }}
          />
        </div>
        <div className="flex gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

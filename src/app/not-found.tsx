import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[80px] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-accent)_6%,transparent)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10">
        <p className="font-display font-black grad-text mb-4 text-[clamp(5rem,15vw,10rem)] leading-none">
          404
        </p>
        <h1 className="font-display font-bold text-foreground text-2xl md:text-3xl mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground text-[15px] max-w-sm mx-auto mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="btn-primary inline-flex items-center gap-2 group"
        >
          Back to Home
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  );
}

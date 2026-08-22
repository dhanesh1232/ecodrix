import { BrandLoader } from "@/components/brand/BrandLoader";

export default function Loading() {
  return (
    <div className="min-h-full! flex items-center justify-center">
      <BrandLoader size="xl" label="Loading ECODrIx" />
    </div>
  );
}

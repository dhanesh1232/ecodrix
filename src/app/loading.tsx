import { BrandLoader } from "@/components/brand/BrandLoader";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <BrandLoader size="xl" label="Loading ECODrIx" />
    </div>
  );
}

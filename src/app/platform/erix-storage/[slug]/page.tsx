import { SubPageLayout, subPageMetadata, subPageParams } from "@/components/platform/SubPageLayout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return subPageParams("erix-storage");
}

export async function generateMetadata({ params }: Props) {
  return subPageMetadata("erix-storage", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <SubPageLayout module="erix-storage" slug={(await params).slug} />;
}

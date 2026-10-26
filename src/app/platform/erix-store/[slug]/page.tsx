import { SubPageLayout, subPageMetadata, subPageParams } from "@/components/platform/SubPageLayout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return subPageParams("erix-store");
}

export async function generateMetadata({ params }: Props) {
  return subPageMetadata("erix-store", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <SubPageLayout module="erix-store" slug={(await params).slug} />;
}

import { SubPageLayout, subPageMetadata, subPageParams } from "@/components/platform/SubPageLayout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return subPageParams("erix-laie");
}

export async function generateMetadata({ params }: Props) {
  return subPageMetadata("erix-laie", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <SubPageLayout module="erix-laie" slug={(await params).slug} />;
}

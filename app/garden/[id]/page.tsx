import GardenItem from "@/app/@modal/_components/GardenItem";

export const dynamicParams = false;

// export function generateStaticParams() {
//   // const slugs = ["1", "2", "3", "4", "5", "6"];
//   // return slugs.map((slug) => ({ id: slug }));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <GardenItem params={{ id }} />;
}

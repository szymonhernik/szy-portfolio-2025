import { GardenItems } from "@/app/_components/GardenItems";

import { redirect } from "next/navigation";

export default async function GardenPage(props: {
  params: Promise<{ item: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const { item } = searchParams as { [key: string]: string };

  if (item) {
    redirect(`/garden/${item}`);
  }

  // read search params
  return <GardenItems mode="static" />;
}

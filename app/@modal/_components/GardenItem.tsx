import { items } from "@/app/_test-data/items";

export default function GardenItem({ params }: { params: { slug: string } }) {
  const item = items.find((item) => item.slug === params.slug);
  return <div>{item?.text}</div>;
}

import { items } from "@/app/_test-data/items";

export default function GardenItem({ params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === Number(params.id));
  return <div>{item?.text}</div>;
}

import { items } from "@/app/_test-data/items";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      My Post: {id} and its content {items.find((item) => item.id === Number.parseInt(id))?.text}
    </div>
  );
}

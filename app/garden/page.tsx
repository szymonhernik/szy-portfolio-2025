import { items } from "@/app/_test-data/items";
import ItemDialog from "@/components/item-dialog";

export default function Page() {
  return <Garden />;
}

function Garden() {
  return (
    <div className="col-span-12 ">
      <h1 className="mb-8">An overgrown garden of inspirations</h1>
      <div>
        {items.map((item, index) => (
          <ItemDialog key={item.id} item={item} showComma={index !== items.length - 1} />
        ))}
      </div>
    </div>
  );
}

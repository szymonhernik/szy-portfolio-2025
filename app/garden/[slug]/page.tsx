import GardenItem from "@/app/@modal/_components/GardenItem";
import { items } from "@/app/_test-data/items";

export const dynamicParams = false;

// export function generateStaticParams() {
//   // const slugs = ["1", "2", "3", "4", "5", "6"];
//   // return slugs.map((slug) => ({ id: slug }));
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const item = items.find((item) => item.slug === slug);
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <div>
        <a href="/garden">Garden</a> <span>&gt;</span> <span>{item.text}</span>
      </div>
      <GardenItem params={{ slug }} />
    </div>
  );
}

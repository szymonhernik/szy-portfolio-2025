"use client";

import type { GardenItemsQueryResult, SingleGardenItemQueryResult } from "@/sanity.types";

import { GardenItems } from "@/app/(web)/_components/GardenItems";
import GardenBlocks from "@/components/gardenblocks";

import { useRouter } from "next/navigation";

// interface ItemModalProps {
//   item: GardenItemsQueryResult[0];
//   onClose: () => void;
// }

// function ItemModal({ item: initialItem, onClose }: ItemModalProps) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   if (!initialItem.slug) {
//     return null;
//   }
//   // fetch data for the item client side (using tanstack query)
//   const { data: item } = useGardenItem(initialItem.slug);
//   if (!item) {
//     return null;
//   }
//   console.log("item", item);

//   const handleGardenClick = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.delete("item");
//     params.delete("direct");
//     router.replace(`?${params.toString()}`);
//   };

//   return (
//     <FocusLock returnFocus>
//       <div
//         aria-modal="true"
//         aria-labelledby="modal-title"
//         className="fixed inset-0 z-50 overflow-y-auto bg-white"
//       >
//         <div className="p-4 ">
//           {/* breadcrumbs to navigate between garden and items */}
//           <GardenBreadcrumb title={item.title} onClick={handleGardenClick} />
//           <article>
//             {/* plant emoji */}

//             <GardenModalContent item={item} />
//           </article>
//           {/* Add more item details here */}
//           <button
//             onClick={onClose}
//             className="fixed top-0 right-0 z-[20] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
//             aria-label="Close dialog"
//             type="button"
//             onKeyDown={(e) => {
//               if (e.key === "Escape") {
//                 onClose();
//               }
//             }}
//           >
//             X
//           </button>
//         </div>
//       </div>
//     </FocusLock>
//   );
// }

function GardenModalContent({
  item,
}: {
  item: NonNullable<SingleGardenItemQueryResult>;
}) {
  return <GardenBlocks blocks={item.gardenBlocks} />;
}

export default function GardenModal({
  items,
}: {
  items: GardenItemsQueryResult;
}) {
  const router = useRouter();

  const handleItemSelect = (item: GardenItemsQueryResult[0]) => {
    if (item.slug) {
      router.replace(`/garden/${item.slug}`);
    }
  };

  return (
    <>
      <GardenItems mode="modal" onItemSelect={handleItemSelect} items={items} />
    </>
  );
}

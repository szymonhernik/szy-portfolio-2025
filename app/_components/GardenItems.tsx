import { items } from "@/app/_test-data/items";
import * as FadeIn from "@/components/motion/staggers/fade";

import Link from "next/link";

interface GardenItemsProps {
  mode: "modal" | "static";
  onItemSelect?: (item: (typeof items)[0]) => void;
}

export function GardenItems({ mode, onItemSelect }: GardenItemsProps) {
  return (
    <FadeIn.Container>
      <section className="flex flex-col gap-4">
        <FadeIn.Item>
          <p>An overgrown garden of inspirations</p>
        </FadeIn.Item>
        <FadeIn.Item>
          <div>
            {items.map((item, index) => (
              <div key={item.slug} className="inline text-large hover:font-outline-1-black">
                {mode === "modal" ? (
                  // biome-ignore lint/a11y/useSemanticElements: using span for interactive element
                  <span
                    role="button"
                    tabIndex={0}
                    aria-roledescription="select item"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onItemSelect?.(item);
                      }
                    }}
                    onClick={() => onItemSelect?.(item)}
                  >
                    {item.text}
                  </span>
                ) : (
                  <Link href={`/garden/${item.slug}`}>{item.text}</Link>
                )}
                {index < items.length - 1 && ", "}
              </div>
            ))}
          </div>
        </FadeIn.Item>
      </section>
    </FadeIn.Container>
  );
}

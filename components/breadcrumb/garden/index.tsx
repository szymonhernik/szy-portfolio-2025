import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { ArrowRight } from "@/components/arrows";

interface GardenBreadcrumbProps {
  // title is required so its safe to use NonNullable
  title: NonNullable<SingleGardenItemQueryResult>["title"];
  onClick?: () => void;
}

export function GardenBreadcrumb({ title, onClick }: GardenBreadcrumbProps) {
  const GardenLink = onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="text-secondary hover:font-outline-1-secondary"
    >
      garden
    </button>
  ) : (
    <a href="/garden" className="text-secondary hover:font-outline-1-secondary">
      garden
    </a>
  );

  return (
    <div className="flex items-start gap-2 text-small max-w-[80%]">
      <div className="flex items-center gap-2">
        {GardenLink}
        <span>
          <ArrowRight width={14} height={14} />
        </span>
      </div>
      <span>{title}</span>
    </div>
  );
}

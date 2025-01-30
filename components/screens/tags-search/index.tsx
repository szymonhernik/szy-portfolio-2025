"use client";

import type { ProjectsAndSubprojectsQueryResult } from "@/sanity.types";

import HomeGrid from "@/components/home-grid";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

// GOALS:
// Add "Click to randomise selection" button that will randomise the selection of filters
// // Make sure that there is at least one result for each random selection of filters

const getUniqueCategories = (data: NonNullable<ProjectsAndSubprojectsQueryResult>) => {
  return Array.from(new Set(data.flatMap((item) => item.categories || []).map((cat) => cat.slug)))
    .map((slug) => {
      const category = data.flatMap((item) => item.categories || []).find((cat) => cat.slug === slug);
      if (!category) {
        return { slug: "", title: "" }; // or handle this case differently
      }
      return category;
    })
    .sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
};

export default function TagsSearchPage({
  data,
}: {
  data: NonNullable<ProjectsAndSubprojectsQueryResult>;
}) {
  const projects = data;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const q = searchParams.get("q");
  const filters = q?.split(",") ?? [];
  const allCategories = getUniqueCategories(projects);

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => (filters.length === 0 ? true : filters.every((filter) => item.categories?.some((category) => category.slug === filter))));
  }, [projects, filters]);

  const createQueryString = useCallback(
    (name: string, value: string, isRandomized?: boolean) => {
      if (isRandomized) {
        return `${name}=${value}`;
      }
      if (!q) {
        return `${name}=${value}`;
      }
      if (q.includes(value)) {
        // remove this item from the q
        const newFilters = q.split(",").filter((item) => item !== value);
        return newFilters.length ? `${name}=${newFilters.join(",")}` : "";
      }
      return `${name}=${q},${value}`;
    },
    [q],
  );

  const randomiseFilters = () => {
    const MIN_FILTERS = 1;
    const MAX_FILTERS = 3;

    // Keep trying until we find a valid combination
    let validCombinationFound = false;
    let randomFilters: typeof allCategories = [];

    // Get current filters as a sorted string for comparison
    const currentFilterSlugs = filters.sort().join(",");

    while (!validCombinationFound) {
      // Random number between MIN_FILTERS and MAX_FILTERS (inclusive)
      const numberOfFilters = Math.floor(Math.random() * (MAX_FILTERS - MIN_FILTERS + 1)) + MIN_FILTERS;

      // Get random filters
      randomFilters = allCategories.sort(() => Math.random() - 0.5).slice(0, numberOfFilters);

      // Check if this combination returns any projects
      const hasResults = projects.some((item) => randomFilters.every((filter) => item.categories?.some((category) => category.slug === filter.slug)));

      // Compare new combination with current filters
      const newFilterSlugs = randomFilters
        .map((f) => f.slug)
        .sort()
        .join(",");

      if (hasResults && newFilterSlugs !== currentFilterSlugs) {
        validCombinationFound = true;
      }
    }

    const randomisedQueryString = createQueryString("q", randomFilters.map((filter) => filter.slug).join(","), true);
    router.replace(`${pathname}?${randomisedQueryString}`);
  };

  return (
    <section>
      <div className="mb-56 grid grid-cols-12 gap-8">
        <div className="col-span-12 flex flex-col items-start justify-start gap-4 md:col-span-11">
          <button className="" type="button" onClick={() => randomiseFilters()}>
            Click to randomise selection
          </button>
          <div className="">
            {allCategories.map((category, index) => {
              if (!category.slug || !category.title) return null;
              return (
                <div key={category.slug} className="inline text-fluid-xl">
                  <button
                    type="button"
                    onClick={() => {
                      if (category.slug) {
                        router.replace(`${pathname}?${createQueryString("q", category.slug)}`);
                      }
                    }}
                    className={clsx("", filters.includes(category.slug) ? "text-primary" : "text-secondary")}
                  >
                    {category.title}
                  </button>
                  {index < allCategories.length - 1 && <span>, </span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <HomeGrid projects={filteredProjects} from="tags-search" />
    </section>
  );
}

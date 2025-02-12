import type { ProjectQueryResult } from "@/sanity.types";

import HomeGrid from "@/components/home-grid";
import { OpenGardenItem } from "@/components/open-garden-item";

import Link from "next/link";

function IntroText() {
  return (
    <p className="text-fluid-xl max-md:pr-1">
      Szymon Eda Hernik is a graphic designer and front-end web developer.
      <br className="block md:hidden" />
      <br className="block md:hidden" />
      <span className="block md:inline ">
        They also form half of <OpenGardenItem slug="isz-szi-studio">isz szi studio</OpenGardenItem>,
        {/* <Link
          href="/iszszistudio"
          className="text-link hover:font-outline-1-secondary"
        >
          isz szi studio
        </Link> */}{" "}
        an artistic design studio based in Brussels.
      </span>
    </p>
  );
}
function ListSeed() {
  return (
    <p className="mt-0 ">
      A random inspiration from a rather{" "}
      <Link href="/garden" className="text-secondary hover:font-outline-1-secondary">
        unsorted list
      </Link>{" "}
      is: <OpenGardenItem slug="27-30-covers">27 30 @ Covers</OpenGardenItem>
    </p>
  );
}

export default function Home({
  showcaseProjects,
}: {
  showcaseProjects: NonNullable<ProjectQueryResult>["showcaseProjects"];
}) {
  return (
    <section className="grid w-full max-w-full grid-cols-12 items-start">
      <div className="col-span-12 md:col-span-10 ">
        <div className="flex flex-col gap-4 md:flex-col-reverse">
          <IntroText />
          <ListSeed />
        </div>
      </div>

      <div className="col-span-12 mt-X max-w-full ">
        <HomeGrid showcaseProjects={showcaseProjects} />
      </div>
    </section>
  );
}

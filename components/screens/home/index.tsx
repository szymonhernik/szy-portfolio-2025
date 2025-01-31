import type { ProjectQueryResult } from "@/sanity.types";

import HomeGrid from "@/components/home-grid";
import { OpenGardenItem } from "@/components/open-garden-item";

import Link from "next/link";

function IntroText() {
  return (
    <p className="text-fluid-xl">
      Szymon Eda Hernik is a graphic designer and front-end web developer.
      <br className="block md:hidden" />
      <br className="block md:hidden" />
      <span className="block md:inline ">
        They also form half of{" "}
        <Link href="/iszszistudio" className="text-link hover:font-outline-1-secondary">
          isz szi studio
        </Link>
        , an artistic design studio based in Brussels.
      </span>
    </p>
  );
}
function ListSeed() {
  return (
    <p className="mt-0 ">
      One random inspiration from a rather{" "}
      <Link href="/garden" className="text-secondary hover:font-outline-1-secondary">
        unsorted list
      </Link>{" "}
      is: <OpenGardenItem slug="27-30-covers">27 30 @ Covers</OpenGardenItem>
    </p>
  );
}

export default function Home({ projects }: { projects: ProjectQueryResult }) {
  return (
    // <FadeIn.Container>
    <section className="grid grid-cols-12 items-start">
      <div className="col-span-12 md:col-span-10 ">
        {/* <FadeIn.Item> */}
        <div className="flex flex-col gap-8 md:flex-col-reverse">
          <IntroText />
          <ListSeed />
        </div>
        {/* </FadeIn.Item> */}
      </div>

      <div className="col-span-12 mt-8">
        {/* <FadeIn.Item> */}
        <HomeGrid projects={projects} />
        {/* </FadeIn.Item> */}
      </div>
    </section>
    // </FadeIn.Container>
  );
  // <FadeIn.Container>
  // {/* <FadeIn.Item>
  //   <div className="flex justify-between">
  //     <div>
  //       <h1>Sylph</h1>
  //       <h2>Next.js Portfolio Starter</h2>
  //     </div>
  //   </div>
  // </FadeIn.Item>
  // <Spacer /> */}
  // {/* <FadeIn.Item>
  //   <Link href="/information">Information</Link>
  // </FadeIn.Item> */}
  // {/* <FadeIn.Item>
  //   <Posts category="guides" />
  // </FadeIn.Item>
  // <FadeIn.Item>
  //   <Posts category="examples" />
  // </FadeIn.Item>
  // <Spacer />
  // <FadeIn.Item>
  //   <Footer />
  // </FadeIn.Item>
  //  */}
  // </FadeIn.Container>
}

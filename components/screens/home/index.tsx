import { OpenGardenItem } from "@/components/open-garden-item";
import OpenedCarousel from "@/components/opencarouseltest";

import Link from "next/link";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <>
      <div className="col-span-12 flex flex-col gap-8 md:col-span-10 md:flex-col-reverse">
        <p className="text-large">
          Szymon Eda Hernik is a graphic designer and front-end web developer.
          <br className="block md:hidden" />
          <br className="block md:hidden" />
          <span className="block md:inline ">
            They also form half of <span className="text-secondary">isz szi studio</span>, an artistic design studio based in Brussels.
          </span>
        </p>
        <OpenedCarousel />
        <div>
          <Link href="/garden">Open a Garden modal from home!</Link>
          {/* <Link href="/garden/8">Open an item in a garden.</Link> */}
          <br />
          {/* <Link href="/garden/3?from=home&to=garden">
            Open an item in a garden.
          </Link> */}
          <OpenGardenItem itemId="5">Item 5</OpenGardenItem>
        </div>
        {/* <p className="mt-0 ">
          Today’s three random inspirations from a rather{" "}
          <Seed content="unsorted list" className="text-secondary" /> are:{" "}
          <Seed content="number 3" itemId="3" className="text-secondary" /> and{" "}
          <Seed content="number 4" itemId="4" className="text-secondary" />
        </p> */}
      </div>
      <div className="col-span-12 mt-8">
        {/* test project items */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <div className="flex flex-col ">
            <div className="h-[400px] bg-stone-200" />
          </div>
          <div className="flex flex-col">
            <div className="h-[400px] bg-stone-200" />
          </div>
          <div className="flex flex-col">
            <div className="h-[400px] bg-stone-200" />
          </div>
          <div className="flex flex-col">
            <div className="h-[400px] bg-stone-200" />
          </div>
          <div className="flex flex-col">
            <div className="h-[400px] bg-stone-200" />
          </div>
          <div className="flex flex-col">
            <div className="h-[400px] bg-stone-200" />
          </div>
        </div>
      </div>
    </>
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
  // <DeployButton /> */}
  // </FadeIn.Container>
}

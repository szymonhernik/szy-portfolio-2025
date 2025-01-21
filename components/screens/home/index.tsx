import HomeGrid from "@/components/home-grid";
import * as FadeIn from "@/components/motion/staggers/fade";
import { OpenGardenItem } from "@/components/open-garden-item";

import Link from "next/link";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

function IntroText() {
  return (
    <p className="text-large">
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
      Today’s three random inspirations from a rather{" "}
      <Link href="/garden" className="text-secondary hover:font-outline-1-secondary">
        unsorted list
      </Link>{" "}
      are: Paul B. Preciado’s <OpenGardenItem itemId="1">Can the monster speak?</OpenGardenItem>, Ian Cheng's <OpenGardenItem itemId="2">games</OpenGardenItem>,
      and Kae Tempest <OpenGardenItem itemId="3">lyrics</OpenGardenItem>.
    </p>
  );
}

export default function Home() {
  return (
    <FadeIn.Container>
      <section className="grid grid-cols-12 items-start">
        <div className="col-span-12 md:col-span-10 ">
          <FadeIn.Item>
            <div className="flex flex-col gap-8 md:flex-col-reverse">
              <IntroText />
              <ListSeed />
            </div>
          </FadeIn.Item>
        </div>

        <div className="col-span-12 mt-8">
          <FadeIn.Item>
            <HomeGrid />
          </FadeIn.Item>
        </div>
      </section>
    </FadeIn.Container>
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

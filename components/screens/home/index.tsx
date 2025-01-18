import { DeployButton } from "@/components/deploy";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { Link } from "next-view-transitions";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <div className="col-span-10 lg:col-span-7">
      <p>
        Today’s three random inspirations from a rather unsorted list are: Paul
        B. Preciado’s Can the monster speak?, Ian Cheng games, Kae Tempest
        lyrics.{" "}
      </p>
      <p className="text-[3rem] leading-[1.2]">
        Szymon Eda Hernik is a graphic designer and front-end web developer.
        They also form half of isz szi studio, an artistic design studio based
        in Brussels.
      </p>
    </div>
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

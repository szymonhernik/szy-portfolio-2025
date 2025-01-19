import DailyInspirations from "@/app/_components/daily-inspirations";
import { DeployButton } from "@/components/deploy";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { Link } from "next-view-transitions";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <>
      <div className="col-span-12 md:col-span-10 flex flex-col md:flex-col-reverse gap-8">
        <p className="text-[3rem] leading-[1.2] mt">
          Szymon Eda Hernik is a graphic designer and front-end web developer.
          They also form half of{" "}
          <span className="text-secondary">isz szi studio</span>, an artistic
          design studio based in Brussels.
        </p>
        <DailyInspirations />
      </div>
      <div className="col-span-12 mt-8">
        {/* test project items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          <div className="flex flex-col ">
            <div className="bg-stone-200 h-[400px]"></div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-200 h-[400px]"></div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-200 h-[400px]"></div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-200 h-[400px]"></div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-200 h-[400px]"></div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-200 h-[400px]"></div>
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

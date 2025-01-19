import DailyInspirations from "@/app/_components/daily-inspirations";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <>
      <div className="col-span-12 flex flex-col gap-8 md:col-span-10 md:flex-col-reverse">
        {/* on small screens it should be around 32 px */}
        <p className="text-[2rem] leading-[1.5] md:text-[3rem] md:leading-[1.2] ">
          Szymon Eda Hernik is a graphic designer and front-end web developer. They also form half of <span className="text-secondary">isz szi studio</span>, an
          artistic design studio based in Brussels.
        </p>
        <DailyInspirations />
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

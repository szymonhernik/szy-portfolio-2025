import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import Information from "@/components/screens/information";

import RandomAnimation from "../_components/RandomAnimation";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Information",
    description:
      "Szymon Eda Hernik is a graphic designer and front-end web developer.They also form half of isz szi studio, an artistic design studio based in Brussels.",
  };
}

export default function Page() {
  return (
    <>
      <FadeIn.Container>
        <RandomAnimation expectedPath="/information" />
        <FadeIn.Item>
          <div className="flex min-h-[calc(100dvh-2rem)] flex-col justify-between">
            <Information />
            <Footer />
          </div>
        </FadeIn.Item>
      </FadeIn.Container>
    </>
  );
}

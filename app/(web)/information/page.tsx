import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import Information from "@/components/screens/information";

import RandomAnimation from "../_components/RandomAnimation";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Information",
    description:
      "Szymon Eda Hernik is a graphic designer and front-end web developer.They also form half of isz szi studio, an artistic design studio based in Brussels.",
    openGraph: {
      title: "Szymon Eda Hernik | Information",
      description:
        "Szymon Eda Hernik is a graphic designer and front-end web developer.They also form half of isz szi studio, an artistic design studio based in Brussels.",
      images: [
        {
          url: "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0u9niebQjxyeDUGSL6shz8biAqZE7mlRkpw0",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Szymon Eda Hernik | Information",
      description:
        "Szymon Eda Hernik is a graphic designer and front-end web developer.They also form half of isz szi studio, an artistic design studio based in Brussels.",
      images: [
        {
          url: "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0u9niebQjxyeDUGSL6shz8biAqZE7mlRkpw0",
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <>
      <FadeIn.Container>
        <RandomAnimation expectedPath="/information" />
        <FadeIn.Item>
          <div className="flex min-h-[calc(100dvh)] flex-col justify-between">
            <Information />
            <Footer />
          </div>
        </FadeIn.Item>
      </FadeIn.Container>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

import { BreadcrumbsIszSzi } from "./BreadcrumbsIszSzi";

export function IszSziStudioContent() {
  return (
    <section className="flex min-h-[calc(100dvh-2rem)] w-full flex-col justify-between overflow-y-auto">
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 mb-[24px]">
          <BreadcrumbsIszSzi />
        </div>

        <div className="col-span-12 md:col-span-10 lg:col-span-7">
          <p>
            <Link href="https://iszszistudio.com" target="_blank">
              isz szi
            </Link>{" "}
            is an ambivalently focused studio that continues to find different ways of expression and labour.
          </p>
          <p>
            In our work we always try to reflect on what's structurally at stake. We think a lot about what it means and how to collaborate, and how to sustain
            an ethics of love in times of austerity. We remain impressed by oeuvres such as Frost&Lynch's Twin Peaks series or the newest publishing venture in
            Poland called Współbycie.
          </p>
          <p>
            Our most recent projects include a website for Polish musician{" "}
            <Link target="_blank" href="https://zaumne.com" className="text-link hover:font-outline-1-secondary">
              Zaumne
            </Link>
            , a revival of our substack newsletter called{" "}
            <Link target="_blank" href="https://iszszistudio.substack.com" className="text-link hover:font-outline-1-secondary">
              branches
            </Link>{" "}
            and motion design for the{" "}
            <Link target="_blank" href="https://www.instagram.com/p/CvepmI3otWU/" className="text-link hover:font-outline-1-secondary">
              Sanatorium of Sound
            </Link>
            . What has been inspiring us lately are songs, dogs and throwing balls.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="mt-8 w-3/4 md:w-1/2 lg:w-1/3 lg:max-w-96">
          <Image
            src="https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hv4bbsv71btOAn4SHYmePwRWLc3f26UqdzoXC"
            alt="Isz szi studio"
            className="w-full"
            width={600}
            height={600}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
        <p className="mt-4 text-small">
          isz szi studio is the combined force of{" "}
          <Link target="_blank" href="https://www.instagram.com/ireee_nka/" className="text-link hover:font-outline-1-secondary">
            ire
          </Link>{" "}
          (the bird looking gal) and Szymon Eda Hernik.
        </p>
      </div>
    </section>
  );
}

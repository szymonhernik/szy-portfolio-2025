import Image from "next/image";

export function IszSziStudioContent() {
  return (
    <section className="flex min-h-[calc(100dvh-2rem)] w-full flex-col justify-between">
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10 lg:col-span-7">
          <p>Isz szi is an ambivalently focused studio that continues to find different ways of expression and labour.</p>
          <p>
            In our work we always try to reflect on what's structurally at stake. We think a lot about what it means and how to collaborate, and how to sustain
            an ethics of love in times of austerity. We remain impressed by oeuvres such as Frost&Lynch's Twin Peaks series or the newest publishing venture in
            Poland called Współbycie.
          </p>
          <p>
            Our most recent projects include a website for Polish musician Zaumne, a revival of our substack newsletter called branches and motion design for
            the Sanatorium of Sound. What has been inspiring us lately are songs, dogs and throwing balls.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="mt-8 w-3/4 md:w-1/2 lg:w-1/3 lg:max-w-96">
          <Image
            src="https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hv4bbsv71btOAn4SHYmePwRWLc3f26UqdzoXC"
            alt="Isz szi studio"
            className="w-full"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="mt-4 text-small">isz szi studio is the combined force of Ire (the bird looking gal) and Szymon Eda Hernik.</p>
      </div>
    </section>
  );
}

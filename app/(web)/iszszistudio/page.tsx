import { IszSziStudioContent } from "@/components/screens/iszszistudio";

export async function generateMetadata() {
  return {
    title: "isz szi studio | Szymon Eda Hernik",
    description: "isz szi is an ambivalently focused studio that continues to find different ways of expression and labour.",
    openGraph: {
      images: [
        {
          url: "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hv4bbsv71btOAn4SHYmePwRWLc3f26UqdzoXC",
        },
      ],
    },
  };
}

export default function Page() {
  return <IszSziStudioContent />;
}

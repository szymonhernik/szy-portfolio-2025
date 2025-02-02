import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import Information from "@/components/screens/information";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Information",
    description: "Information",
  };
}

export default function Page() {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <Information />
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}

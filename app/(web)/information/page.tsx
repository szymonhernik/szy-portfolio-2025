import { Footer } from "@/components/footer";
import Information from "@/components/screens/information";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Information",
    description: "Information",
  };
}

export default function Page() {
  return (
    <div className="">
      <Information />
      <Footer />
    </div>
  );
}

import { Footer } from "@/components/footer";
import Information from "@/components/screens/information";

export async function generateMetadata() {
  return {
    title: "Information | Szymon Eda Hernik",
    description: "Information",
  };
}

export default function Page() {
  return (
    <div className="flex flex-col ">
      <Information />
      <Footer />
    </div>
  );
}

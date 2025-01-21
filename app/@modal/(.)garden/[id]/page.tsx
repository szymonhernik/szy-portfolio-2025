import GardenItemModal from "@/app/@modal/_components/GardenItemModal";

export default function Page({ params }: { params: { id: string } }) {
  return <GardenItemModal params={params} />;
}

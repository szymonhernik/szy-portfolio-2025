import GardenItem from "./_components/GardenItem";
import GardenModal from "./_components/GardenModal";

export default async function Page(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id as string;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col gap-4 overflow-y-auto overscroll-none bg-background p-4">{id ? <GardenItem /> : <GardenModal />}</div>
  );
}

import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const itemId = (await params).id;
  return (
    <Modal>
      <div className="w-96 h-96 bg-red-500  p-4 flex flex-col gap-4">
        {itemId}
      </div>
    </Modal>
  );
}

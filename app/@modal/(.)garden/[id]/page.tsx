import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const itemId = (await params).id;
  return (
    <Modal>
      <div className="flex h-96 w-96 flex-col gap-4 bg-red-500 p-4">{itemId}</div>
    </Modal>
  );
}

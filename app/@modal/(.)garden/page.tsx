import Link from "next/link";

import { Modal } from "./[id]/modal";

export default async function Photos() {
  const photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <Modal>
      <section className="flex h-screen w-screen flex-col gap-4 p-4">
        {photos.map((id) => (
          <div key={id}>
            <Link className="" href={`/garden/${id}`} passHref>
              {id}
            </Link>
          </div>
        ))}
      </section>
    </Modal>
  );
}

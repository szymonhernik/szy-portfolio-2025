import Link from "next/link";

import { Modal } from "./[id]/modal";

export default async function Photos() {
  let photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <Modal>
      <section className="w-screen h-screen p-4 flex flex-col gap-4">
        {photos.map((id) => (
          <div>
            <Link className="" key={id} href={`/garden/${id}`} passHref>
              {id}
            </Link>
          </div>
        ))}
      </section>
    </Modal>
  );
}

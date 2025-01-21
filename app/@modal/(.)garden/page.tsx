import { items } from "@/app/_test-data/items";

import Link from "next/link";

import { Modal } from "./[id]/modal";

export default async function Photos() {
  return (
    <Modal>
      <section className="">
        {items.map((item, index) => (
          <div key={item.id} className="inline text-large">
            <Link className="" href={`/garden/${item.id}`} passHref>
              {item.text}
            </Link>
            {index < items.length - 1 && `, `}
          </div>
        ))}
      </section>
    </Modal>
  );
}

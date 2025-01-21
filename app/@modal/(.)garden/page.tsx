import { items } from "@/app/_test-data/items";
import { FixModalCloseBug } from "@/components/fix-modal-close-bug";

import Link from "next/link";

import { Modal } from "./[id]/modal";

export default async function Photos() {
  return (
    <FixModalCloseBug expectedPath="/garden">
      <Modal>
        <section className="">
          {items.map((item, index) => (
            <div key={item.id} className="inline text-large">
              <Link className="" href={`/garden/${item.id}`} passHref>
                {item.text}
              </Link>
              {index < items.length - 1 && ", "}
            </div>
          ))}
        </section>
      </Modal>
    </FixModalCloseBug>
  );
}

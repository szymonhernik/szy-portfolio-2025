"use client";

import { IszSziStudioContent } from "@/components/screens/iszszistudio";

import { Modal } from "../_components/modal";

export default function Page() {
  return (
    <Modal>
      <article>
        <IszSziStudioContent />
      </article>
    </Modal>
  );
}

import { Suspense } from "react";

import GardenModal from "../_components/GardenModal";
import { Modal } from "../_components/modal";

export default async function Page() {
  return (
    <Suspense>
      <Modal>
        <GardenModal />
      </Modal>
    </Suspense>
  );
}

import { Suspense } from "react";

import GardenList from "../_components/GardenList";
import { Modal } from "../_components/modal";

export default async function Page() {
  return (
    <Suspense>
      <Modal>
        <GardenList />
      </Modal>
    </Suspense>
  );
}

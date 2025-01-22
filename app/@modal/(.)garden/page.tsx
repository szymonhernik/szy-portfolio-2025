import { Suspense } from "react";

import GardenListModal from "../_components/GardenListModal";

export default async function Page() {
  return (
    <Suspense>
      <GardenListModal />
    </Suspense>
  );
}

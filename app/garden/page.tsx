import { Suspense } from "react";

import GardenList from "../@modal/_components/GardenList";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GardenList />
    </Suspense>
  );
}

import { GardenProvider } from "@/app/_components/garden-context";

import { ViewTransitions } from "next-view-transitions";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GardenProvider>
      <ViewTransitions>{children}</ViewTransitions>
    </GardenProvider>
  );
};

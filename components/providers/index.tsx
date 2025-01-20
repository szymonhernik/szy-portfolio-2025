import { ViewTransitions } from "next-view-transitions";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ViewTransitions>{children}</ViewTransitions>;
};

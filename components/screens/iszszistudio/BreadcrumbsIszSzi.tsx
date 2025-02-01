"use client";

import { GardenBreadcrumb } from "@/components/breadcrumb/garden";

import { useRouter } from "next/navigation";

export function BreadcrumbsIszSzi() {
  const router = useRouter();
  return <GardenBreadcrumb title={"isz szi studio"} onClick={() => router.replace("/garden")} />;
}

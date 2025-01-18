import * as FadeIn from "@/components/motion/staggers/fade";

import Link from "next/link";

export default function NotFound() {
  return (
    <FadeIn.Container>
      <div className="">
        <h2>Page Not Found</h2>

        <Link href="/" className="mt-4  transition hover:opacity-50">
          Go to homepage
        </Link>
      </div>
    </FadeIn.Container>
  );
}

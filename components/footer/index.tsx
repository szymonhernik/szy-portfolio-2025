import Link from "@/components/link";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-between border-border border-t pt-2">
      <div className="px-[2px] text-muted text-small">
        Built with <Link href="https://nextjs.org/" text="Next.js" underline />
      </div>
    </div>
  );
};

export { Footer };

import Link from "next/link";

interface TagLinkProps {
  slug: string;
  children: React.ReactNode;
  className?: string;
}

export default function TagLink({ slug, className = "text-link hover:font-outline-1-secondary", children }: TagLinkProps) {
  return (
    <Link href={`/tags-search?q=${slug}`} className={className}>
      {children}
    </Link>
  );
}

import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-X ">
      <div className="text-secondary text-small">
        2025 ©{" "}
        <Link href="/" className="hover:underline">
          Szymon Hernik
        </Link>
      </div>
    </div>
  );
};

export { Footer };

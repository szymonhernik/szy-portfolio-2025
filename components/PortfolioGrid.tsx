import Image from "next/image";
import Link from "next/link";

interface GridItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  aspectRatio: string; // Add aspect ratio property
}

const items: GridItem[] = [
  {
    id: 1,
    title: "Teatr Komuna Warszawa",
    subtitle: "CMS based website for a non-profit arts institution in Warsaw.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0tajKEQjxyeDUGSL6shz8biAqZE7mlRkpw0C",
    aspectRatio: "3/4", // Taller aspect ratio
  },
  {
    id: 2,
    title: "Lux Cache",
    subtitle: "Collaborations between 2020–2024.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hqTDLlyNczUngGyAl50MJtR2YVxkvwEDNKisP",
    aspectRatio: "4/3", // Shorter, wider aspect ratio
  },
  {
    id: 3,
    title: "Narges Mohammadi",
    subtitle: "Web application for an educational music platform.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hW8EASnzx4ovsSlAE0LG7u523RPgFefYOI8U9",
    aspectRatio: "1/1",
  },
  {
    id: 4,
    title: "Teatr Komuna Warszawa",
    subtitle: "",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hqTDLlyNczUngGyAl50MJtR2YVxkvwEDNKisP",
    aspectRatio: "4/3", // Shorter, wider aspect ratio
  },
  {
    id: 5,
    title: "Lux Cache",
    subtitle: "Collaborations between 2020–2024.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hW8EASnzx4ovsSlAE0LG7u523RPgFefYOI8U9",
    aspectRatio: "1/1",
  },
  {
    id: 6,
    title: "Narges Mohammadi",
    subtitle: "Web application for an educational music platform.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0tajKEQjxyeDUGSL6shz8biAqZE7mlRkpw0C",
    aspectRatio: "3/4", // Taller aspect ratio
  },
  {
    id: 7,
    title: "Teatr Komuna Warszawa",
    subtitle: "Website for a non-profit arts institution in Warsaw.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hqTDLlyNczUngGyAl50MJtR2YVxkvwEDNKisP",
    aspectRatio: "4/3", // Shorter, wider aspect ratio
  },
  {
    id: 8,
    title: "Lux Cache",
    subtitle: "Collaborations between 2020–2024.",
    imageUrl:
      "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3hW8EASnzx4ovsSlAE0LG7u523RPgFefYOI8U9",
    aspectRatio: "1/1",
  },
];

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={`portfolio-item-${item.id}`}
          href="#"
          className="group block"
        >
          <div className="flex h-full flex-col justify-end">
            <div
              className="relative mb-4 w-full"
              style={{ aspectRatio: item.aspectRatio }}
            >
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className=""
              />
            </div>
            <div className="h-24">
              <h3 className="">{item.title}</h3>
              <p className="mt-0 text-secondary">{item.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

import Image from "next/image";

const companies = [
  { name: "Google", logo: "/logos/google.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "Amazon", logo: "/logos/amazon.png" },
  { name: "Apple", logo: "/logos/apple.png" },
  { name: "Eni", logo: "/logos/eni.png" },
  { name: "Mastercard", logo: "/logos/mastercard.png" },
  { name: "Eli Lilly", logo: "/logos/eli.png" },
  { name: "Meta", logo: "/logos/meta.png" },
  { name: "Nvidia", logo: "/logos/nvidia.png" },
  { name: "Tesla", logo: "/logos/tesla.png" },
];

export default function CompanyLogo() {
  return (
    <section className="border-border bg-background w-full border-y py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
          {companies.map((company, i) => (
            <div
              key={i}
              className="relative h-8 w-[110px] opacity-50 grayscale transition hover:opacity-80 md:h-9"
            >
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

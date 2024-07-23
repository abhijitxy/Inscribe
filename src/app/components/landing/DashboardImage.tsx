import Image from "next/image";

export default function DashboardImage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-lg border-[10px] border-neutral-950">
        <Image
          src="/dashboard.webp"
          alt="Dashboard"
          width={1200}
          height={800}
          layout="responsive"
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
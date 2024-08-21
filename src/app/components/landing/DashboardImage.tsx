import Image from "next/image";

export default function DashboardImage() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl">
        <div className="overflow-hidden rounded-lg border-[6px] border-neutral-950 sm:border-[8px] md:border-[10px]">
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
    </div>
  );
}

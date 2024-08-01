import Image from "next/image";

export default function DashboardImage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="rounded-lg border-[6px] sm:border-[8px] md:border-[10px] border-neutral-950 overflow-hidden">
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
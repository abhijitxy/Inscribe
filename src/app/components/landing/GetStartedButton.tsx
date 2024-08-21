export default function GetStartedButton() {
  return (
    <div className="mb-8 flex w-full justify-center">
      <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
        <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
          Get started ⚡️
          <span className="inline-flex items-center pl-2 text-black dark:text-white">
            Read more{" "}
          </span>
        </div>
      </span>
    </div>
  );
}

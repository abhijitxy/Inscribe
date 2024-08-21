export default function MainContent() {
  return (
    <div className="mb-8 px-4 text-center sm:mb-12 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-[18px] font-medium leading-tight text-gray-50 sm:text-3xl md:text-4xl lg:text-5xl">
        <span className="whitespace-nowrap">
          Supercharge your notes into an AI-powered
        </span>
        <br className="block sm:hidden" />
        <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          knowledge base on steroids
        </span>
      </h2>
      <p className="mx-auto max-w-xs text-sm text-gray-200 sm:max-w-lg sm:text-base md:max-w-2xl md:text-lg">
        Extract notes, organize smartly and gain instant insights with AI
      </p>
    </div>
  );
}

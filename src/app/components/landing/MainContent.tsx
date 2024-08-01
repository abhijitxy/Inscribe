export default function MainContent() {
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
      <h2 className="text-[18px] sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-50 mb-4 leading-tight">
        <span className="whitespace-nowrap">Transform your GitHub repos into an</span>
        <br className="block sm:hidden" />
        <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          AI-powered knowledge base
        </span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
        Extract code, store it smartly, and get instant project insights with ChatGPT.
      </p>
    </div>
  );
}
export default function MainContent() {
    return (
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-6xl font-medium text-gray-50 mb-4">
          Transform your GitHub repos into an <br />
          <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            AI-powered knowledge base
          </span>
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Extract code, store it smartly, and get instant project insights with ChatGPT.
        </p>
      </div>
    );
  }
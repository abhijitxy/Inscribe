import Header from "./components/landing/Header";
import GetStartedButton from "./components/landing/GetStartedButton";
import MainContent from "./components/landing/MainContent";
import DashboardImage from "./components/landing/DashboardImage";
import BackgroundElements from "./components/landing/BackgroundElements";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-y-auto text-white">
      <BackgroundElements />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-8">
        <Header />
        <GetStartedButton />
        <MainContent />
        <DashboardImage />
      </div>
    </main>
  );
}

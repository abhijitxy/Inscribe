import Header from './components/landing/Header';
import GetStartedButton from './components/landing/GetStartedButton';
import MainContent from './components/landing/MainContent';
import DashboardImage from './components/landing/DashboardImage';
import BackgroundElements from './components/landing/BackgroundElements';

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center min-h-screen overflow-y-auto text-white">
      <BackgroundElements />
      
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-8">
        <Header />
        <GetStartedButton />
        <MainContent />
        <DashboardImage />
      </div>
    </main>
  );
}



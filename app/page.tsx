import Hero from './components/sections/Hero'
import ServicesGrid from './components/sections/ServicesGrid';
import HowItWorks from './components/sections/HowItWorks';
import RecentWorks from './components/sections/RecentWorks';
import About from './components/sections/About';
import Faq from './components/sections/Faq';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-slate-50">
        <Hero />
        <ServicesGrid/>
        <HowItWorks />
        <RecentWorks />
        <About />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

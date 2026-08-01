import Hero from './components/sections/Hero'
import ServicesGrid from './components/sections/ServicesGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <ServicesGrid/>
    </main>
  );
}
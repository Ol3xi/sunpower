import Hero from './components/sections/Hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Qui stiamo "richiamando" il componente che hai appena creato */}
      <Hero />
      
      {/* Nelle prossime fasi aggiungeremo qui sotto gli altri componenti: */}
      {/* <TrustLogos /> */}
      {/* <ServiziGrid /> */}
      {/* <ProcessoStep /> */}
    </main>
  );
}
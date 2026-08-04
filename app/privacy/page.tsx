import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Informativa privacy | Photonclean Systems",
  description:
    "Pagina informativa privacy in fase di completamento per Photonclean Systems.",
};

type PrivacySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

function PrivacySection({ id, title, children }: PrivacySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-b border-slate-200/80 py-8 last:border-b-0 sm:py-10"
    >
      <h2
        id={`${id}-title`}
        className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-950">
      {children}
    </span>
  );
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 pt-12 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_84%_8%,rgba(16,185,129,0.16),transparent_25%),radial-gradient(circle_at_8%_14%,rgba(245,158,11,0.13),transparent_23%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#top"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-slate-600 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
              d="m15 18-6-6 6-6"
            />
          </svg>
          Torna al sito
        </Link>

        <header className="mt-10 max-w-3xl sm:mt-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-100/80 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-950">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Bozza da completare
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Informativa privacy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Questa pagina è in fase di completamento. Al momento il sito non
            mette a disposizione moduli per inviare dati o richiedere preventivi online.
          </p>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Ultimo aggiornamento: <Placeholder>[gg mese aaaa]</Placeholder>
          </p>
        </header>

        <div
          role="note"
          className="mt-10 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950 shadow-sm sm:p-6"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 flex-none text-amber-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.3 3.86l-8.1 14A2 2 0 0 0 3.92 21h16.16a2 2 0 0 0 1.72-3.14l-8.1-14a2 2 0 0 0-3.4 0Z"
            />
          </svg>
          <p>
            Il modulo di richiesta è <strong>temporaneamente disattivato</strong>:
            il sito non raccoglie nome, email, telefono, indirizzo o messaggi
            tramite form. Questa resta una <strong>bozza informativa</strong> da
            completare e verificare prima di riattivare la raccolta dati. Il testo
            non sostituisce una valutazione legale o privacy personalizzata.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              In questa pagina
            </p>
            <nav aria-label="Indice dell'informativa privacy" className="mt-4">
              <ol className="space-y-2 text-sm font-semibold text-slate-600">
                <li>
                  <a
                    href="#titolare"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    1. Titolare del trattamento
                  </a>
                </li>
                <li>
                  <a
                    href="#dati"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    2. Dati raccolti
                  </a>
                </li>
                <li>
                  <a
                    href="#finalita"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    3. Finalità e basi giuridiche
                  </a>
                </li>
                <li>
                  <a
                    href="#destinatari"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    4. Destinatari e conservazione
                  </a>
                </li>
                <li>
                  <a
                    href="#diritti"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    5. I tuoi diritti
                  </a>
                </li>
                <li>
                  <a
                    href="#contatti"
                    className="rounded-md transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    6. Contatti
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          <article className="rounded-3xl border border-slate-200/90 bg-white px-5 py-1 shadow-xl shadow-slate-950/[0.04] sm:px-8 lg:px-10">
            <PrivacySection id="titolare" title="1. Titolare del trattamento">
              <p>
                Il titolare del trattamento è <Placeholder>[ragione sociale
                completa]</Placeholder>, con sede in <Placeholder>[indirizzo
                completo]</Placeholder>, P. IVA <Placeholder>[numero P. IVA]</Placeholder>.
              </p>
              <p>
                Per questa bozza, il marchio mostrato sul sito è
                &nbsp;Photonclean Systems. La denominazione legale, la sede e
                i recapiti effettivi devono essere inseriti qui prima della
                pubblicazione.
              </p>
            </PrivacySection>

            <PrivacySection id="dati" title="2. Quali dati possiamo raccogliere">
              <p>
                Quando compili la richiesta di preventivo, possiamo trattare i
                dati necessari per ricontattarti e comprendere in via
                preliminare il progetto.
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-emerald-600">
                <li>dati di contatto, come nome, email e numero di telefono;</li>
                <li>
                  informazioni sul progetto, come fascia di spesa energetica e
                  note condivise nella richiesta;
                </li>
                <li>
                  indirizzo dell&apos;immobile e posizione indicata sulla mappa,
                  se usi la funzione di analisi del tetto;
                </li>
                <li>
                  eventuale anteprima satellitare dell&apos;area selezionata, se la
                  funzione di immagine del tetto viene attivata;
                </li>
                <li>
                  dati tecnici strettamente necessari al funzionamento del
                  sito e alla prevenzione di richieste abusive.
                </li>
              </ul>
              <p>
                Non chiediamo intenzionalmente categorie particolari di dati
                personali. Ti invitiamo a non inserirle nei campi liberi del
                modulo.
              </p>
            </PrivacySection>

            <PrivacySection id="finalita" title="3. Perché trattiamo questi dati">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid gap-px bg-slate-200 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                  <div className="bg-slate-50 p-4 font-bold text-slate-800">
                    Finalità
                  </div>
                  <div className="bg-slate-50 p-4 font-bold text-slate-800">
                    Riferimento da validare
                  </div>
                  <div className="bg-white p-4">
                    Gestire la richiesta, preparare un primo contatto e inviare
                    una proposta o un preventivo.
                  </div>
                  <div className="bg-white p-4">
                    Misure precontrattuali richieste dall&apos;interessato.
                  </div>
                  <div className="bg-white p-4">
                    Proteggere il modulo da spam, abusi e richieste non
                    autorizzate.
                  </div>
                  <div className="bg-white p-4">
                    Legittimo interesse, da descrivere e valutare nel testo
                    finale.
                  </div>
                  <div className="bg-white p-4">
                    Inviare comunicazioni commerciali, solo se scegli di
                    riceverle.
                  </div>
                  <div className="bg-white p-4">
                    Consenso facoltativo, separato e revocabile in qualsiasi
                    momento.
                  </div>
                </div>
              </div>
              <p>
                Le basi giuridiche qui indicate sono una traccia da verificare
                con chi segue la privacy dell&apos;attività prima di mettere online
                il modulo.
              </p>
            </PrivacySection>

            <PrivacySection id="destinatari" title="4. A chi possono essere comunicati e per quanto tempo">
              <p>
                I dati possono essere trattati da personale autorizzato e da
                fornitori che supportano il sito, la gestione delle richieste,
                la posta elettronica, l&apos;automazione delle richieste, la mappa
                e l&apos;infrastruttura tecnica. Nel testo definitivo occorre
                indicare i fornitori effettivamente utilizzati e il loro ruolo
                privacy, inclusi gli eventuali servizi di immagini satellitari.
              </p>
              <p>
                La bozza prevede di conservare i dati della richiesta per
                <Placeholder>[periodo di conservazione da definire]</Placeholder>
                , salvo obblighi di legge o necessità di tutela. Se viene
                attivato il consenso marketing, va indicato un periodo distinto
                e proporzionato.
              </p>
              <p>
                Se alcuni servizi trasferiscono dati fuori dallo Spazio
                Economico Europeo, la versione pubblicata dovrà spiegare quali
                garanzie vengono applicate.
              </p>
            </PrivacySection>

            <PrivacySection id="diritti" title="5. I tuoi diritti">
              <p>
                Nei casi previsti dalla normativa applicabile, puoi chiedere
                accesso, rettifica, cancellazione, limitazione del trattamento,
                opposizione e portabilità dei dati. Puoi inoltre revocare un
                eventuale consenso marketing senza pregiudicare quanto già
                trattato prima della revoca.
              </p>
              <p>
                Puoi presentare un reclamo all&apos;autorità di controllo
                competente. I tempi e le modalità di risposta alle richieste
                devono essere confermati dal titolare prima della pubblicazione.
              </p>
            </PrivacySection>

            <PrivacySection id="contatti" title="6. Come contattarci">
              <p>
                Per informazioni sul trattamento o per esercitare i tuoi
                diritti, potrai contattare il titolare ai recapiti definitivi
                qui sotto:
              </p>
              <div className="rounded-2xl bg-slate-950 p-5 text-slate-200 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-200">
                  Contatti da sostituire
                </p>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-white">Email privacy</dt>
                    <dd className="mt-1 text-slate-300">
                      <Placeholder>[privacy@esempio.it]</Placeholder>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-white">Indirizzo postale</dt>
                    <dd className="mt-1 text-slate-300">
                      <Placeholder>[indirizzo completo del titolare]</Placeholder>
                    </dd>
                  </div>
                </dl>
              </div>
            </PrivacySection>
          </article>
        </div>
      </div>
    </main>
  );
}

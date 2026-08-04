This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Form preventivo (attualmente disattivato)

Il sito non raccoglie dati dal form finché `QUOTE_FORM_ENABLED` non viene impostato a `true`. Tutti i pulsanti mostrano invece il contatto telefonico.

Quando sarà pronto per la pubblicazione del form:

1. Completa e verifica l'informativa privacy con i dati reali dell'attività.
2. Regenera il webhook in Make, perché il precedente non deve più essere riutilizzato.
3. Copia [`.env.example`](.env.example) in `.env.local`, inserisci `MAKE_QUOTE_WEBHOOK_URL` e imposta `QUOTE_FORM_ENABLED=true`.
4. Sostituisci i dati di esempio in [`app/config/site.ts`](app/config/site.ts) e i valori demo in [`app/config/estimate.ts`](app/config/estimate.ts).
5. Quando vorrai allegare nell'email un'anteprima satellitare del tetto, aggiungi un token ArcGIS in `ARCGIS_STATIC_MAPS_TOKEN`. Finché resta vuoto, la richiesta contiene comunque il link Google Maps della posizione scelta, senza tentare di creare un'immagine fittizia.

`MAKE_QUOTE_WEBHOOK_URL` è letto solo dal server: non aggiungere il prefisso `NEXT_PUBLIC_` e non inserirlo nel codice client.

Per un test interno del form, imposta temporaneamente anche `QUOTE_DEMO_MODE=true`: il form arriva alla schermata finale ma non invia né salva dati. Al momento dell'attivazione reale, configura il webhook e rimuovi o imposta a `false` la modalità demo.

La struttura del payload e il mapping consigliato per Make, Gmail e Google Sheets sono descritti in [`docs/integrazione-preventivi.md`](docs/integrazione-preventivi.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

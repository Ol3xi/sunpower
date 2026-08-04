# Integrazione richieste preventivo

Questa guida descrive la configurazione da fare **quando si passerà dai dati demo a quelli reali**. Il sito è già predisposto, ma non invia un'immagine satellitare finché non viene aggiunto un token valido.

Con `QUOTE_DEMO_MODE=true` e webhook vuoto, il form mostra il risultato dimostrativo senza inviare dati, righe al foglio o email. La pagina finale rende esplicito che è una simulazione.

## Cosa invia già il sito a Make

La richiesta usa un ID stabile (`leadId`), generato nel browser al primo invio, e la route `POST /api/quote` lo invia nel JSON al webhook configurato in `MAKE_QUOTE_WEBHOOK_URL`.

I campi compatibili con il foglio esistente rimangono disponibili a livello principale:

| Colonna attuale | Campo Make da mappare |
| --- | --- |
| Nome | `nome` |
| Email | `email` |
| Telefono | `telefono` |
| Indirizzo | `indirizzo` |
| Bolletta | `bolletta_mensile` |
| Esito Stimato | `esito_stimato` |

Per tenere lo storico ordinato, le prime sei colonne non vanno rinominate né spostate. In Make usa **Google Sheets → Add a Row** e collega i campi della tabella qui sopra.

Quando vorrai arricchire il foglio, aggiungi le nuove intestazioni a destra e mappa questi campi:

| Nuova colonna suggerita | Campo Make da mappare |
| --- | --- |
| Data richiesta | `submittedAt` |
| ID lead | `leadId` |
| Messaggio cliente | `messaggio` |
| Latitudine | `coordinates.latitude` |
| Longitudine | `coordinates.longitude` |
| Link Google Maps | `roof.googleMapsUrl` |
| Stato immagine tetto | `roof.image.status` |
| Configurazione consigliata | `estimate.configuration` |
| Produzione annua stimata | `estimate.production` |
| Risparmio annuo stimato | `estimate.savings` |
| Consenso marketing | `privacy.marketingConsent` |
| Versione privacy | `privacy.noticeVersion` |
| Stato lead | valore iniziale manuale, ad esempio `Nuovo` |

## Scenario Make consigliato

Mantieni una catena semplice:

```text
Webhooks → Google Sheets: Add a Row → Gmail: Send an Email
```

Nel modulo email interno usa un oggetto del tipo:

```text
Oggetto: Nuova richiesta [leadId]
Nome: [nome]
Telefono: [telefono]
Email: [email]
Indirizzo: [indirizzo]
Messaggio: [message]
Configurazione: [estimate.configuration]
Produzione: [estimate.production]
Risparmio: [estimate.savings]
Tetto: [roof.googleMapsUrl]
```

Il destinatario dell'email è da impostare direttamente in Make quando avrai l'indirizzo aziendale corretto. Per ora non è salvato nel progetto.

Usa `messaggio` (non il campo strutturato `message`) per Google Sheets: è già reso sicuro contro formule accidentali inserite in un campo libero. Per l'email puoi usare `message`, ma mantieni il testo semplice oppure assicurati che Make esegua l'escaping HTML prima di inserirlo in un'email HTML.

Nel foglio collegato al progetto sono state lette soltanto le intestazioni: non è stata modificata nessuna riga. Prima della pubblicazione, limita la condivisione del foglio ai soli account dell'azienda e di Make; un link modificabile non deve essere pubblico.

Prima della pubblicazione aggiungi anche un controllo anti-duplicato nel tuo scenario Make: usa `leadId` per cercare la richiesta nel foglio o in un Data Store prima di creare una nuova riga/inviare l'email. Lo stesso `leadId` viene mantenuto se l'utente ritenta l'invio nella medesima sessione.

Proteggi inoltre `/api/quote` con il rate limiting o il WAF del provider di hosting prima di abilitare il token della mappa: una protezione anti-spam è necessaria per evitare invii e chiamate al provider cartografico non desiderati.

Le istruzioni ufficiali dei moduli sono disponibili nella documentazione di [Make Webhooks](https://help.make.com/webhooks), [Google Sheets](https://apps.make.com/google-sheets-modules) e [Gmail](https://apps.make.com/gmail-modules).

## Immagine del tetto nell'email

Finché `ARCGIS_STATIC_MAPS_TOKEN` è vuoto, il payload conterrà:

```text
roof.image.status = "not-configured"
roof.googleMapsUrl = link alla posizione scelta dal cliente
```

È intenzionale: non viene generato un falso screenshot del tetto.

Quando sarai pronto:

1. Crea un token ArcGIS con il permesso per Static Maps.
2. Inseriscilo esclusivamente in `.env.local` come `ARCGIS_STATIC_MAPS_TOKEN=...`.
3. Riavvia l'applicazione.
4. In Make, se `roof.image.status` è `available`, decodifica `roof.image.dataBase64` e usalo come allegato con nome `roof.image.fileName` e tipo `roof.image.mimeType` nel modulo Gmail.

L'immagine viene richiesta dal server, centrata sulle coordinate confermate dal cliente, con marker e attribuzione inclusa. Se il servizio non risponde, Make riceverà comunque `roof.googleMapsUrl` e `roof.image.status = "unavailable"`: l'email può quindi essere inviata senza allegato.

La documentazione ufficiale del servizio è [ArcGIS Static Maps](https://developers.arcgis.com/rest/static-maps/).

## Dove cambiare i dati veri in futuro

| Cosa | Dove intervenire |
| --- | --- |
| Telefono, tempi di risposta e versione privacy | [`app/config/site.ts`](../app/config/site.ts) |
| Fasce di configurazione, produzione e risparmio; badge e disclaimer demo | [`app/config/estimate.ts`](../app/config/estimate.ts) |
| Webhook Make e token mappa | `.env.local`, partendo da [`.env.example`](../.env.example) |
| Attivare/disattivare l'invio simulato | `QUOTE_DEMO_MODE` in `.env.local` |
| Indirizzo destinatario email e mapping del foglio | Scenario Make |
| Titolare, fornitori e tempi di conservazione | [`app/privacy/page.tsx`](../app/privacy/page.tsx), dopo verifica legale/privacy |

Per il passaggio ai dati reali, porta `isDemo` in `false` in `app/config/estimate.ts` **solo dopo** aver validato le regole tecniche e commerciali che definiscono le stime.

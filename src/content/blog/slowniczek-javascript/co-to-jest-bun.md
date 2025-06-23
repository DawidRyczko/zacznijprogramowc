---
title: "Co to jest Bun? Poznaj nowoczesną alternatywę dla Node.js"
description: "Bun to alternatywne środowisko uruchomieniowe dla Deno i Node.js. Wyróżnia się własnym zestawem narzędzi
i szybkością"
date: 2025-06-23
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Bun to, obok Node.js i Deno, nowoczesne środowisko uruchomieniowe. Stworzone do uruchamiania aplikacji napisanych w
JavaScript i TypeScript. Od Node.js wyróżnia się wbudowanymi narzędziami do tworzenia oprogramowania, testowania,
uruchamiania i budowania gotowej paczki uruchomieniowej (bundler).

Bun jest kompatybilny z Node.js. Posiada także własny manager pakietów, który jest kompatybilny z NPM. Zaletą Bun jest
przede wszystkim szybkość działania i uruchamiania aplikacji.

## Bun w dalszych szczegółach

Bun to bardzo nowoczesne i szybkie środowisko uruchomieniowe dla JavaScript i TypeScript. Bun został napisany w języku
Zig (alternatywa dla języka C). Dzięki temu może się chwalić szybkością i wysoką wydajnością, nawet 4-krotnie szybszy
niż Node.js.

Dużą zaletą Bun jest kompatybilność z kodem Node.js, ale także z modułami CommonJS i ES Modules. Bun automatycznie
rozpoznaje użyty system modułów. Wszystko to po to, aby z łatwością zastąpić Node.js nowym środowiskiem uruchomieniowym,
jakim jest [Bun](https://bun.sh/).

Dodatkowo Bun ma wbudowany bardzo szybki manager pakietów, który jest w pełni kompatybilny z pakietami umieszczonymi
w repozytorium NPM, do tej pory dostępnym tylko dla Node.js. Dzięki temu Bun zapewnia nam dostęp do bardzo dużego
ekosystemu bibliotek i narzędzi.

Duża zaletą Bun jest obsługa plików TSX. Pliki TSX o skrócie `.tsx` to pliki, które możecie znać choćby z Reacta. Jest
to HTML bezpośrednio osadzony w kodzie TypeScript lub JavaScript. Do tej pory, aby uruchamiać takie, pliki musieliśmy
przygotować sporo narzędzi jak kompilator TypeScript, transpiler jak Babel, narzędzia do budowania jak Vite, które
wszystko zbudują w jedną całość. Dzięki Bun uruchamianie plików `tsx` jest banalnie proste.

```tsx
// server.tsx
import React from "react";
import { renderToReadableStream } from "react-dom/server";

const App = () => (
  <html>
  <head>
    <title>Serwer w Bun!</title>
  </head>
  <body>
  <h1>Witaj, świecie! Renderowane przez React i Bun.</h1>
  </body>
  </html>
);

Bun.serve({
  async fetch(req) {
    const stream = await renderToReadableStream(<App />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
  port: 3000,
});

console.log("Serwer uruchomiony na http://localhost:3000");
```

Aby uruchomić ten serwer:

1. Zainstaluj React: `bun add react react-dom`
2. Uruchom plik: `bun run server.tsx`

I to wszystko! Bun automatycznie przetworzy kod TypeScript i JSX i uruchomi serwer.

Bun bazuje na silniku JavaScriptCore (stworzonym przez Apple), a nie na V8 jak Node.js. Kluczową cechą BUNA jest
natywne wsparcie dla Web API – standardowych interfejsów znanych z przeglądarek, takich jak `fetch`, `WebSocket`,
`Request` i `Response`.

Oznacza to, że możesz pisać uniwersalny kod, który zadziała tak samo po stronie serwera, jak i w przeglądarce. Chociaż
nowoczesne wersje Node.js (od v18) również dodały wsparcie dla `fetch`, przez lata wymagał on użycia zewnętrznych
bibliotek lub skomplikowanego modułu `http`. W Bun te nowoczesne API są fundamentem, a nie dodatkiem, co sprawia, że
całe środowisko jest bardziej spójne i zgodne ze standardami webowymi.

To fundamentalna zmiana filozofii, która sprawia, że kod JavaScript staje się bardziej uniwersalny, nowoczesny,
przenośny i prostszy w utrzymaniu.

## Zalety Bun

- pozwala na uruchamianie plików `ts`, `js` i `tsx`
- szybkość uruchamiania i wysoka wydajność
- zgodny z Node.js i NPM
- wszystko w jednym - tworzenie, testowanie, uruchamianie
- wsparcie dla [Web APIs](https://bun.sh/docs/runtime/web-apis)

## Wady Bun

- jest to na dzisiaj środowisko stosunkowo nowe
- mała społeczność i ekosystem
- kompatybilność z Node.js może nie działać w 100%

## Kiedy warto użyć Bun

Ponieważ wciąż jest to młode środowisko uruchomieniowe w fazie rozwoju, należy podchodzić ostrożnie do przepisywania
swoich aplikacji i porzucenia stabilnego Node.js. Na pewno Bun idealnie nada się do prostych i małych projektów, gdzie
możemy przetestować nowe rozwiązania. Będzie także idealny do aplikacji typu full-stack jak Next.js.

Jeżeli zależy wam na szybkości, prostocie i minimalnej konfiguracji to Bun również jest dla Was. Posiada wszystkie
niezbędne narzędzia do tworzenia aplikacji i uruchomienia na produkcji.

## Podsumowanie

- Bun to nowe środowisko uruchomieniowe, jako alternatywa dla Node.js
- Bun jest niesamowicie szybki i wydajny
- Bun jest kompatybilny z Node.js
- Bun wspiera Web APIs czego nie robi Node.js
---
title: "Co to jest Deno czyli alternatywa dla Node.js?"
description: "Deno to nowoczesne środowisko uruchomieniowe dla JavaScript i TypeScript, stworzone przez twórcę Node.js. Odkryj jego zalety, takie jak bezpieczeństwo, natywne wsparcie dla TypeScript i wbudowane narzędzia."
date: 2025-06-16
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Deno jest
kolejnym [środowiskiem uruchomieniowym (runtime)](https://zacznijprogramowac.net/slowniczek-javascript/co-to-jest-runtime-w-java-script/)
dla JavaScript i TypeScript. Jest jednocześnie alternatywą dla bardzo popularnego Node.js. W porównaniu do Node.js
wyróżnia się natywnym wsparciem dla TypeScript, większym bezpieczeństwem i przydatnymi wbudowanymi narzędziami.

Ciekawostką jest to, że Deno zostało stworzone przez Ryana Dahla, który jest twórcą Node.js. Deno jako środowisko
uruchomieniowe dla JavaScript używa silnika V8 do interpretowania kodu. Ten sam silnik używany jest w Google Chrome.

## Deno w dalszych szczegółach

Deno powstało jako kompleksowe środowisko uruchomieniowe, posiada wbudowane narzędzia do formatowania,
testowania kodu i wdrażania aplikacji. Celem twórców było stworzenie alternatywy dla Node.js i pozbycia się licznych
problemów i ograniczeń, jakie trapią to popularne środowisko uruchomieniowe.

Deno kładzie duży nacisk na bezpieczeństwo. Z założenia Deno ogranicza dostęp do plików systemu, sieci czy środowiska
uruchomieniowego. Dostęp ten może być jednak włączony na wyraźne życzenie programisty.

Przede wszystkim Deno natywnie wspiera TypeScript, co oznacza, że jego obsługa jest wbudowana i nie wymaga dodatkowej
konfiguracji. Oczywiście nic nie stoi na przeszkodzie, aby używać także czystego JavaScriptu. Deno jest w tym świetne,
ponieważ wspiera najnowsze funkcje JavaScript.

W odróżnieniu od Node.js Deno nie korzysta z centralnego menedżera pakietów, jakim jest NPM. Zamiast tego moduły są
importowane bezpośrednio z adresów URL, a głównym, zaufanym źródłem bibliotek jest deno.land/x

Przykład pobrania i używania pakietu HTTP w Deno:

```typescript
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

console.log("Serwer nasłuchuje na http://localhost:8000/");

serve((_req) => new Response("Hello, World!"), { port: 8000 });

```

Dodatkowo biblioteki open source tworzone przez społeczność hostowane i pobierane są bezpośrednio z Githuba.

Deno w odróżnieniu od NPM nie pobiera pakietów do folderu `node_module`, a przetrzymuje je i zarządza nimi w globalnych
cache. Unikalne podejście do używania bibliotek JavaScript oznacza, że nie wszystkie biblioteki JavaScript są
kompatybilne z Deno.

Z tego też powodu Deno rozwija i ulepsza wsparcie dla pakietów z NPM oraz dla samych modułów Node.js. Dzięki temu
zwiększa to możliwości tej platformy uruchomieniowej i pozwala na korzystanie z wielu innych bibliotek spoza ekosystemu
Deno.

Środowisko uruchomieniowe Deno zbudowane jest na silniku V8. Jest to popularny silnik interpretacji kodu JavaScript,
przede wszystkim używany w Google Chrome. Natomiast Deno jest napisane w Rust, co zapewnia bezpieczeństwo
i szybkość działania. Co ciekawe, Deno pozwala także na uruchamianie kodu WebAssembly.

## Zalety Deno

- bezpieczne środowisko uruchomieniowe
- wbudowana obsługa TypeScript
- wsparcie dla nowoczesnego JavaScript
- wbudowane gotowe narzędzia
- obszerna dokumentacja
- brak `nodel_modules`!

## Wady Deno

- mały ekosystem i mała społeczność, wszystko to dopiero powstaje
- jest to nowe środowisko, podatne na błędy, problemy, które mogą być trudne do rozwiązania
- nie wszystkie platformy chmurowe wspierają Deno
- nie wszystkie biblioteki JavaScript są kompatybilne z Deno

## Kiedy warto użyć Deno

Deno jest młodym środowiskiem uruchomieniowym, dlatego wiele firm podchodzi ostrożnie do tego projektu. Jeśli jednak
tworzysz właśnie nowy projekt, zależy ci na bezpieczeństwie i gotowym środowisku z wieloma narzędziami, może być to
dobry czas na użycie Deno. Warto sprawdzić jak pracuje się z Deno w przypadku małego mikro-serwisu. Deno cały czas
zdobywa popularność i staje się popularną alternatywą dla Node.js

## Podsumowanie

- Deno to kolejne środowisko uruchomieniowe dla JavaScript, obok Node.js
- Deno posiada przydatne wbudowane narzędzia
- Deno kładzie duży nacisk na bezpieczeństwo
- Deno może używać pakietów NPM oraz modułów Node.js

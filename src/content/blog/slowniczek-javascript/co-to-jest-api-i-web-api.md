---
title: "Co to jest API / Web API w JavaScript"
description: "Dowiedz się czym jest API / WEB Api. Zrozum, z jakich interfejsów korzystasz na co dzień, programując w JavaScript."
date: 2025-06-30
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

**API (Interfejs Programowania Aplikacji)** - jest to sposób komunikacji twojej aplikacji z innymi aplikacjami, z innym
kodem (patrz biblioteki w NPM) lub z innymi serwerami.

Załóżmy, że chcemy generować losowe liczby w JavaScript. Moglibyśmy napisać skomplikowaną funkcję, która to zrobi.
Zamiast tego możemy skorzystać z API `Math`, które jest dostępne w JavaScript. Wystarczy, że użyjemy `Math.random()` i
otrzymamy losową liczbę bez większego wysiłku. Funkcja `Math.random()` jako API ukrywa za sobą cały skomplikowany kod
związany z generowaniem losowych liczb, a my w bardzo prosty sposób możemy z tego skorzystać.

Jest to bardzo prosty przykład API biblioteki programistycznej. Zazwyczaj mówiąc o API, mówimy o komunikowaniu się
z zewnętrznymi aplikacjami przez sieć, często nazywając takie API jako WEB API. Dobrym przykładem może być tutaj Google
Maps API, które pozwala nam zaimplementować mapę na naszej stronie i w miarę prosty sposób używać funkcjonalności
mapy za pomocą kodu. Na przykład możemy manipulować punktami na mapie, wyznaczać trasy czy rysować obiekty, a wszystko
to za pomocą JavaScript.

## API / WEB API w dalszych szczegółach

Myślmy o API jako o sposobie korzystania z innych bibliotek, programów czy aplikacji dostępnych na innym serwerze. Mogą
to być proste rzeczy jak funkcje z biblioteki `Math` ale także bardzo rozbudowane zapytania HTTP jak choćby API ze
Spotify, które po autoryzacji pozwala nam zarządzać listą piosenek, a nawet budować swoje aplikacje na podstawie
dostępnego API.

O API mówi się często jako WEB API. Zazwyczaj mamy tutaj na myśli API, które wykorzystujemy przez zapytanie HTTP. Są to
API na zewnętrznych serwerach jak Google Maps API, Facebook API czy Spotify API.

Bardzo często mówiąc o WEB API mamy, na myśli API dostępne w przeglądarce, czyli środowisku uruchomieniowym
dla JavaScript. JavaScript jest tylko językiem programowania bez szczególnie rozbudowanych możliwości. Dopiero
dostępność API w środowisku uruchomieniowym jak przeglądarka czy Node.js, Deno czy Bun powoduje, że język ten dostaje
nowe możliwości.

Dzięki przeglądarce mamy dostęp do takich API jak:

- **DOM (Document Object Model)** - pozwala na manipulację elementami HTML i CSS
- **Device API** - pozwala na dostęp urządzenia jak GPS w telefonie
- **WEB storage API** - pozwala na zapisywanie danych w przeglądarce, czyli popularny `localStorage`
- **Fetch API** - proste API do wykonywania zapytań HTTP

Dzięki Node.js / Deno / Bun mamy dostęp do takich API jak:

- **File System API** - api pozwalające operować na plikach i folderach
- **OS API** - api pozwalające uzyskiwać informacje o systemie operacyjnym
- **HTTP/HTTPS API** - api pozwalające na tworzenie serwerów webowych

Mówiąc o WEB API, pamiętajmy, że ma dwa popularne znaczenia:
- **API Zewnętrzne/Zdalne:** Dostępne przez sieć (HTTP), np. API Spotify, pogody, map.
- **API Przeglądarki (Browser APIs):** Wbudowane w przeglądarkę, by JavaScript mógł z nią interagować (DOM, Geolocation,
  Web Storage). Nie wymagają sieci, ale są częścią "środowiska webowego". Podkreślenie tego rozróżnienia znacząco
  podniesie jakość artykułu.

To tylko krótka lista przykładów API jakie wykorzystują programy napisane w JavaScript. Jednak JavaScript nie tylko
służy do wykorzystywania innych API. Nic nie stoi na przeszkodzie, aby również nasza aplikacja posiadała API.

## Podsumowanie

- API - to sposób na dostęp do innego programu, aplikacji czy serwera
- API są wszechobecne i dostępne w przeróżnych formach od prostych API jak funkcje do rozbudowanych WEB API
- JavaScript wykorzystuje API dostępne na środowiskach uruchomieniowych

---
title: "Co to jest Tree Shaking w JavaScript?"
description: "Tree Shaking to technika optymalizacji, której zadaniem jest usuwanie martwego kodu z aplikacji."
date: 2025-07-09
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Głównym zadaniem Tree Shaking jest zmniejszenie rozmiaru aplikacji poprzez usunięcie nieużywanego kodu. Odpowiadają za
to bundlery do budowania aplikacji jak Webpack, Rollup czy Parcel. Tree Shaking oparty jest o moduły ES6, które
posiadają statyczne importy, dzięki temu analiza kodu jest o wiele prostsza niż w przypadku modułów CommonJS.

W czasie tworzenia aplikacji importujemy dodatkowe pliki (moduły ES6). Czasem importujemy cały moduł, aby użyć jednej
wyeksportowanej funkcji. Dawniej, gdy bundler budował naszą aplikację, dołączał do bazy kodu cały moduł. Dzisiaj, dzięki
Tree Shaking bundlery dołączają do aplikacji tylko ten kod, który faktycznie używamy.

Obrazowo możemy powiedzieć, że nasz kod to ogromne drzewo z licznymi gałęziami i powiązaniami. Tree Shaking to
potrząsanie tego drzewa w celu strząśnięcia tego kodu, który nie jest na stałe powiązany z naszą aplikacją.

## Tree Shaking w dalszych szczegółach

Jak działa Tree Shaking najlepiej będzie przedstawić to na przykładzie. Załóżmy, że mamy aplikację, która chce
skorzystać z funkcji `add` w innym pliku (module).

Plik ten eksportuje dwie funkcje:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

Nasza aplikacja wykorzystuje tylko funkcję `add`:

```javascript
// main.js
import { add } from './math';

console.log(add(2, 3));
```

Gdy będziemy budować aplikację z opcją Tree Shaking do kodu naszej aplikacji zostanie dołączona tylko funkcja `add` z
pliku `math.js`. Natomiast funkcja `subtract` zostanie usunięta.

Jest to tylko mały przykład z jedną funkcją, ale wyobraźcie sobie duże aplikacje importujące dziesiątki innych modułów i
setki różnych funkcji, które nie są używane.

Dzisiaj Tree Shaking wykorzystywany jest przez wszystkie popularne bundlery, a co za tym idzie przez wszystkie popularne
frameworki. Tworząc aplikację w React, Angular czy Vue nie musimy specjalnie przejmować się tym sposobem optymalizacji.

## Korzyści Tree Shaking

- mniejszy rozmiar aplikacji
- szybsze pobieranie z serwera do przeglądarki
- poprawa wydajności, kod szybciej jest przetwarzany przez przeglądarkę
- mniej kodu to mniej problemów

## Wady Tree Shaking

- głównie działa dla statycznych importów ES6
- dynamiczne importy `import()` utrudniają prawidłowy Tree Shaking
- czasami bundlery mogą wymagać dodatkowej konfiguracji, patrz Webpack

## Kiedy warto użyć Tree Shaking

Zawsze warto używać Tree Shaking. Zazwyczaj Tree Shaking jest domyślną opcją w naszym bundlerze i frameworku.

## Podsumowanie

- Tree Shaking to usuwanie niepotrzebnego kodu z naszej aplikacji w procesie budowania
- Tree Shaking wspierane jest przez wszystkie znaczące bundlery i frameworki
- Tree Shaking zazwyczaj dostępny jest bez naszej ingerencji
- Tree Shaking to znacząca optymalizacja dla uruchamianego kodu w przeglądarce

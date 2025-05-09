---
title: "Metoda map i flatMap w JavaScript: Szybki Kurs #40"
description: "Omówienie metod map, flatMap i flat do przetwarzania tablic w JavaScript."
date: 2025-02-11
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Metoda map](#metoda-map)
* [Metoda flatMap](#metoda-flatmap)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="metoda-map">Metoda map</span>

Jedną z najpopularniejszych metod używanych na tablicach jest metoda `map`. Sprawdzimy też dodatkowo metodę `flatMap`i `flat`, są one stosunkowo nowe w JavaScript.

Metoda `map` jest używana do modyfikowania zawartości tablicy:

```js
const arr1 = [100, 200, 300];

const copy1 = arr1.map((value) => value / 10);
console.log(arr1); // [100, 200, 300]
console.log(copy1); // [ 10, 20, 30 ]
```

Do metody `map` przekazujemy funkcję `callback`. Funkcja ta otrzymuje za każdym razem element tablicy, który możemy w jakiś sposób przetworzyć. Gdy przetwarzanie zakończy się, metoda `map` zwraca nową listę z przetworzonymi elementami. Tablica, na której wywołaliśmy metodę `map` pozostaje bez zmian.

Dzięki `map` możemy na przykład przekształcić elementy w liście w zupełnie coś innego:

```js
const copy2 = arr1.map(value => ({ a: value }));
console.log(arr1); // [ 100, 200, 300 ]
console.log(copy2); // [ { a: 100 }, { a: 200 }, { a: 300 } ]
```

W tym przypadku metoda map przekształca każdą wartość w obiekt. Widzimy, że oryginalna tablica zawierała wartości prymitywne. Natomiast nowa tablica, zawiera już obiekty z przypisanymi wartościami.

```js
const copy3 = arr1.map((value, index) => {
  return value + index
})
console.log(copy3); //  [ 100, 201, 302 ]
```

Należy też pamiętać, że metoda `map` musi zwracać wartości. Jeżeli więc rozbudujemy funkcję `callback` o dodatkowe klamry, pamiętajmy o tym, że musimy użyć instrukcji `return` inaczej nasz kod nie będzie prawidłowy.

Metoda `map` zapewnia też dostęp do `indexu`  każdej przetwarzanej wartości. Indeks elementu jest dostępny niemalże w każdych metodach obiektu `Array`.

Jeżeli chcemy przekształcać elementy tablicy używajmy metody `map`. Używając metody `map` nie modyfikujemy oryginalnej listy, ale otrzymujemy nową listę, czego nie da się tak łatwo zrobić przy metodzie `forEach`.

Jeżeli chcemy zmieniać elementy tablicy, użyjemy metody `map`, jeżeli nie zmieniamy elementów tablicy używamy metody `forEach`. Metoda `map` ona niezwykle popularna i często będziecie ją spotykać w kodzie JavaScript.

## <span id="metoda-flatmap">Metoda flatMap</span>

Metoda `flatMap` jest świeżą metodą w JavaScript. W tym momencie nie jest jeszcze wspierana przez wszystkie środowiska JavaScript. Natomiast niektóre przeglądarki mają ją zaimplementowaną natywnie. Jeżeli będziesz chciał jej używać, sprawdź dokładnie, czy twoje środowisko JavaScript wspiera
metodę `flatMap`.

W odróżnieniu od `map` metoda `flatMap` może zwrócić wiele argumentów, zamiast jednego przetworzonego:

```js
const arr4 = [1, 3, 5];

const copy4 = arr4.flatMap(value => [value, value + 1]);
console.log(copy4); // [1, 2, 3, 4, 5, 6]
```

W tym przykładzie przetwarzamy tablicę. Funkcja przekazana do `flatMap` otrzymuje wartość, ale zwraca już dwie wartości. Zwrócone są w postaci tablicy, pierwszy element to oryginalna wartość, drugi to wartość podniesiona o `1`. Tym sposobem rozszerzyliśmy tablicę i mamy teraz w niej więcej
elementów. Takich wartości oczywiście możemy zwrócić o wiele więcej.

Nie da się takiej operacji zrobić w przypadku zwykłego `map`:

```js
const copy5 = arr4.map(value => [value, value + 1]);
console.log(copy5); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
```

Gdy spróbujemy użyć takiej samej funkcji `callback` otrzymamy tablicę z tablicami. W przypadku metody `flatMap` wszystko jest spłaszczane do pojedynczej tablicy.

Tak naprawdę `flatMap` jest połączeniem metody `map` oraz `flat`.

```js
const copy6 = arr4.map(value => [value, value + 1]).flat();
console.log(copy6); // [1, 2, 3, 4, 5, 6]
```

W tym przykładzie wywołujemy metodę `map`, która zwraca tablicę z tablicami, a na końcu wywołujemy metodę `flat`, która spłaszcza wszystko do pojedynczej tablicy. Otrzymujemy ten same efekt jak w przypadku `flatMap`.

Dodatkowo do metody `flat` możemy przekazać wartość:

```js
const arr5 = [0, 1, 2, [[[3, 4]]]];
console.log(arr5.flat(4)); // [0, 1, 2, 3, 4]
```

Przekazana wartość informuje jak głębokie jest zagnieżdżenie struktur. Dzięki temu możemy spłaszczyć bardzo zagnieżdżone struktury danych.

Gdy będziemy pracować z takimi strukturami jak tablice wielowymiarowe, to metoda `flat` oraz `flatMap` może nam się przydać. Do tej pory takich natywnych rozwiązań w JavaScript nie było i trzeba było korzystać z dodatkowych bibliotek.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metody `map` oraz `flatMap` zawsze zwracają nową tablicę z przetworzonymi elementami
- jeżeli chcemy przetwarzać elementy tablicy użyjemy metody `map`
- jeżeli chcemy zwracać większą ilość elementów do tablicy, możemy użyć `flatMap`
- jeżeli chcemy spłaszczać wielowymiarowe tablice możemy użyć metody `flat`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
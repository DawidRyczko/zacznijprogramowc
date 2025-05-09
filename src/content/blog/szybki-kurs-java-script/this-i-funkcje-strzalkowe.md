---
title: "This i funkcje strzałkowe w JavaScript: Szybki Kurs #68"
description: "Wyjaśnienie jak działają funkcje strzałkowe (arrow functions) i 'this' w JavaScript."
date: 2025-01-13
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Arrow function oraz this](#arrow-function-oraz-this)
* [Arrow function oraz this w obiektach](#arrow-function-oraz-this-w-obiektach)
* [Arrow function deklarowane w klasie](#arrow-function-deklarowane-w-klasie)
* [Co warto zapamiętać](#co-warto-zapamietac)

Arrow function działają nieco inaczej niż zwykłe funkcje, jeśli chodzi o kontekst `this`. Funkcje te nie mają własnego `this`. To, że nie mają własnego `this` nie oznacza, że nie możemy go używać w takiej funkcji. Jeżeli w funkcji strzałowej odwołamy się do `this` to zostanie ono pożyczone od
funkcji nadrzędnej, jeżeli istnieje albo zostanie użyte domyślne `this` z obiektu globalnego.

Przypominam też, że pracuję bez trybu ścisłego i uruchamiam kod w przeglądarce, więc obiektem globalnym jest `window`
nie używam też modułów ES6 gdzie zachowanie będzie inne.

## <span id="arrow-function-oraz-this">Arrow function oraz this</span>

Zobaczmy, jak to wszystko działa na przykładach:

```js
const globalArrow = () => console.log(this);
globalArrow(); // Window
```

Pierwszy przykład to zwykła funkcja strzałkowa zdefiniowana w pliku, jako funkcja globalna. Tutaj działanie funkcji wygląda na takie samo jak w przypadku tradycyjnych funkcji JavaScript. Funkcja wywołana w kontekście globalnym zwraca jako `this` obiekt `window`.

Zdefiniujmy teraz funkcję, która będzie miała włączony tryb ścisły:

```js
const globalArrowStrict = () => {
  'use strict';
  console.log(this);
};
globalArrowStrict(); // Window
```

Pamiętamy, że przy zwykłych funkcjach w trybie ścisłym, funkcja nie posiadała dostępu do obiektu globalnego przez `this`
. Wtedy `this` wskazuje na `undefined`. Tryb ścisły nie ma wpływu na arrow function, ponieważ ona sama nie ma w sobie `this`, jest on zapożyczany z zakresu, który ją otacza, a jest nim zakres globalny.

Zobaczmy przykłady, kiedy funkcja strzałowa, znajduje się wewnątrz innej funkcji:

```js
function normalStrict() {
  'use strict';
  const arrow = () => console.log(this);
  arrow();
}

normalStrict(); // undefined
```

Deklaruję teraz normalną funkcję, która będzie pracowała w trybie ścisłym. W tej funkcji tworze także deklarację funkcji strzałkowej o nazwie `arrow()` oraz wywołuję tę funkcję. Wypisuję również do konsoli kontekst `this` prosto z funkcji strzałkowej.

Wcześniej mówiłem, że `use strict` nie działa na funkcję strzałkową. Mówiłem też, że funkcje strzałkowe dziedziczą `this` z kontekstu globalnego, albo z otaczającej jej funkcji. To jest właśnie ten drugi przypadek. Funkcja strzałkowa `arrow` otrzymuje `this` po funkcji `normalStrict`, a ponieważ
jest tutaj włączony tryb ścisły, to `this`
jest `undefined`. Jeżeli usuniemy deklarację `use strict` to otrzymamy wartość `window`.

Mówi się też, że funkcje strzałkowe dziedziczą `this` z zakresu leksykalnego, a więc z tego miejsca gdzie zostały zadeklarowane. Natomiast tradycyjne funkcje, brały `this` z kontekstu wywołania, a nie z miejsca deklaracji. Trzeba tylko zwrócić uwagę na istotną rzecz, jeżeli funkcja strzałowa jest
zadeklarowana w innej funkcji, dziedziczone jest `this` z tej funkcji. Jeżeli nie, `this` będzie ustawione na obiekt globalny lub `undefined ` gdy użyjemy modułów ES6.

## <span id="arrow-function-oraz-this-w-obiektach">Arrow function oraz this w obiektach</span>

Arrow function nie powinny być używane jako metody dla obiektów:

```js
const obj1 = {
  a: 'boo',
  b: () => {
    console.log(this); // object window
    console.log(this.a); // undefined
  },
};

obj1.b();
```

Rozważmy taki przypadek, gdzie mamy obiekt z polem `a` z wartością tekstową, oraz pole `b` do którego dopisujemy arrow function. Mamy więc pod polem `b` metodę dla tego obiektu, która wypisuje `this` oraz wartość z pola `a` za pomocą `this.a`.

Wartości, jakie zostaną wypisane to `window` oraz `undefined`, ponieważ pole `a` nie istnieje na obiekcie `window`. Gdyby to była zwykła funkcja, wypisany byłby obiekt, oraz wartość `boo` z pola `a`.

Tak jak wspominałem, arrow function dziedziczy `this` z innej otaczającej funkcji lub z zakresu globalnego, ponieważ w odróżnieniu od normalnych funkcji, arrow function nie mają swojego kontekstu `this`. Kontekst ten nie wytworzy się, nawet jeżeli użyjemy jakiegoś obiektu jak w tym przypadku.
Funkcja strzałkowa nie ma po prostu własnego `this` bierze go z miejsca, w którym została stworzona.

Kolejny przykład:

```js
const a = {
  b: {
    c: {
      boo: () => {
        console.log(this); // Window
      },
    },
  },
};
a.b.c.boo();
```

Stworzyłem obiekt, `a`, który ma kolejno zagnieżdżone obiekty `b` oraz `c`. Dopiero na obiekcie `c` wywołuję metodę strzałkową `boo()`, która zwraca obiekt globalny `window`. Nie ma znaczenia liczba zagnieżdżeń obiektów, obiekty same w sobie nie tworzą zakresu.

Tutaj znowu jest kontekst domyślny, a w tym przypadku jest to obiekt `window`. Jeżeli użyjemy trybu ścisłego będzie to dalej obiekt `window`, natomiast w modułach ES6 będzie to `undefined`.

## <span id="arrow-function-deklarowane-w-klasie">Arrow function deklarowane w klasie</span>

W obiektach tworzonych literalnie lepiej nie używać metod jako *arrow function*. Zobaczmy, jak to działa w klasach:

```js
class Arrow {
  constructor() {
    this.foo = () => console.log(this); // Arrow
  }

  boo = () => console.log(this); // Arrow
}
```

Przygotowałem klasę `Arrow`, która w konstruktorze tworzy pole `foo` do którego dopisuję arrow function. Również wykorzystuję na dzisiejszy dzień zupełną nowość i możliwość stworzenia nie pola z przypisaną funkcją strzałową, ale metodę strzałkową o nazwie `boo()`. W roku 2020 jest to wciąż nowa
propozycja dla JavaScript, która oficjalnie nie jest jeszcze zaimplementowana, ale niektóre przeglądarki mogą ją już wspierać.

Gdy stworzymy obiekt z takiej klasy:

```js
const arrow = new Arrow();
arrow.foo();
arrow.boo();
```

i wywołamy obie funkcje strzałkowe, zobaczymy, że mają prawidłowe odniesienie do `this`. Wskazują na obiekt, który powstał.

```text
Arrow {boo: ƒ, foo: ƒ}
	boo: () => console.log(this)
	foo: () => console.log(this)
```

Tworzenie obiektów za pomocą `new` powoduje wywołanie konstruktora i stworzenie obiektu, który automatycznie pełni kontekst dla `this`. Dlatego *arrow functions* jako metody w klasach są bezpieczne. Pamiętajmy, że klasy to też funkcje, więc funkcje strzałkowe jako metody mają ten `this`, którego
oczekujemy.

Widzimy, że dla kontekstu `this` powstaje coraz więcej zasad, a to jeszcze nie koniec.

## <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- funkcje strzałkowe nie mają własnego `this` muszą go dziedziczyć
- funkcje strzałkowe dziedziczą `this` z otaczającego je zakresu
- gdy funkcja strzałowa istnieje w innej funkcji, otrzymuje `this` od tej funkcji
- w pozostałych przypadkach `this` jest obiektem globalnym lub `undefined`
- funkcje strzałkowe nie sprawdzają się jako metody w obiektach, ponieważ nie mają własnego `this` i nie mogą być wywołane z kontekstem obiektu, w którym istnieją
- funkcje strzałkowe są bezpieczne w obiektach stworzonych z klas
- przykłady pokazane są bez trybu ścisłego oraz bez modułów ES6

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
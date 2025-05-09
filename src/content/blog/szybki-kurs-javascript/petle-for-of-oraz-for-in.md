---
title: "Pętle `for...of` oraz `for...in` w JavaScript: Szybki Kurs #23"
description: "Porównanie pętli `for...of` i `for...in` w JavaScript."
date: 2025-02-28
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pętle `for...of` oraz `for...in`](#petle-forof-oraz-forin)
* [Pętla `for...of` oraz `for...in` z tablicami](#petla-forof-oraz-forin-z-tablicami)
* [Pętla `for...of` oraz `for...in` z `string`](#petla-forof-oraz-forin-z-string)
* [Pętla `for...of` oraz `for...in` z `object`](#petla-forof-oraz-forin-z-object)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="petle-forof-oraz-forin">Pętle `for...of` oraz `for...in`</span>
Przed nami dwie pętle które omówimy i porównamy w działaniu. Pierwsza z nich to pętla `for...of` , a druga pętla `for...in`. Pętla `for...of`  używana jest do iterowania po obiektach iterowalnych jak `string`, tablice, struktury danych jak `Map` czy `Set`. Pętla `for...in` jest używana głównie do iterowania po właściwościach obiektów i najlepiej użyć jej właśnie tylko do tego.

## <span id="petla-forof-oraz-forin-z-tablicami">Pętla `for...of` oraz `for...in` z tablicami</span>

Pętla `for...of`  jest idealna do pobrania danych z obiektów iterowalnych:

```js
const arr = ['a', 'b', 'b'];
for (const value of arr) {
  console.log(value); // 'a' 'b' 'c'
}
```

W tym przypadku iterujemy po tablicy. Widzimy, że zapis jest bardzo prosty. W okrągłych nawiasach deklarujemy zmienną `value` i wskazujemy obiekt do iteracji. Kolejne wartości znajdują się w zmiennej `value`.

Warto zwrócić uwagę, że zmienna przechowująca wartość może być zadeklarowana za pomocą `const`. Ponieważ przy każdym obrocie pętli, powstaje zupełnie nowa zmienna. Oczywiście, jeżeli będziemy chcieli tę wartość modyfikować warto wtedy użyć deklaracji za pomocą `let`.

Zobaczmy jak wygląda pętla `for...in` użyta na tablicy:

```js
for (const value in arr) {
  console.log(value); // '0' '1' '2'
}
```

Jak już wspomniałem, pętla `for...in` używana jest do pobierania właściwości obiektu. W tym przypadku dostajemy indeksy poszczególnych elementów tablicy. Jak wiemy tablice to też obiekty, więc tak naprawdę indeksy to po prostu właściwości obiektów.

Warto zwrócić uwagę, że są to indeksy w postaci stringa. Zazwyczaj natomiast indeksy pobierane są w postaci liczby, tutaj jest inaczej. W dodatku nie ma żadnej gwarancji, że pętla `for...in` zwróci indeksy w kolejności. Dlatego wydaje się, że z tej pętli jest mały użytek, jeśli chodzi o tablice.

## <span id="petla-forof-oraz-forin-z-string">Pętla `for...of` oraz `for...in` z `string`</span>

Pętla `for...of`  jest także bardzo fajna, gdy iterujemy po wartościach string:

```js
const message = 'Hey';

for (const value of message) {
  console.log(value); // 'H' 'e' 'y'
}
```

Jak wiemy `string` jest iterowalny i podobny do tablicy. Używając `for...of` możemy sobie pobrać kolejne znaki ze stringa.

Natomiast pętla `for...in` nie jest zalecana do wartości `string`:

```js
for (const value in message) {
  console.log(value); // 0 1 2
}
```

Jeżeli jednak spróbujemy użyć pętli `for...in` to również otrzymamy indeksy. Stringi są podobne do tablic i także możemy po nich iterować pętlą `for...in`, która głównie służy do obiektów.

## <span id="petla-forof-oraz-forin-z-object">Pętla `for...of` oraz `for...in` z `object`</span>

Jeżeli stworzymy sobie obiekt, nie możemy po nim iterować tak po prostu używając pętli `for...of` i pobrać jego wartości. Do tego powstała właśnie pętla `for...in`:

```js
const object = { a: 1, b: 2, c: 3 };

for (const value in object) {
  console.log(value); // 'a' 'b' 'c'
}
```

Przy takie iteracji pobieramy tylko i wyłącznie właściwości poszczególnych obiektów, inaczej mówiąc klucze tych obiektów.

Zmieniając trochę zapis pętli:

```js
const object = { a: 1, b: 2, c: 3 };

for (const value in object) {
  console.log(object[value]); // 1 2 3
}
```

Możemy już pobrać wartości z obiektu. Gdy w każdej iteracji mamy dostęp do kolejnego klucza obiektu, to możemy przez klucz odwołać się do poszczególnych wartości obiektu. W każdym razie, jeśli chodzi o iterowanie po obiektach, przedstawię więcej informacji w dziale o obiektach.

Na koniec jeszcze wspomnę, że tak samo, jak w pętli `for` w pętlach `for...of` oraz `for...in` możemy używać instrukcji `break` i `continue`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- pętla `for...of` idealnie nadaje się do iterowania po stringach, tablicach, strukturach jak `Set` i `Map`, nie nadaje się za to do iterowania po obiektach
- pętla `for...in` idealnie nadaje się do iterowania po obiektach, dzięki niej pobieramy kolejne właściwości obiektu
- w tych pętlach też można użyć `break` oraz `continue`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
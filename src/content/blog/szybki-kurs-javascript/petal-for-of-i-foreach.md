---
title: "Pętal for-of i forEach w JavaScript: Szybki Kurs #39"
description: "Różnice między pętlą for-of a metodą forEach w JavaScript."
date: 2025-02-12
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pętla for-of](#petla-for-of)
* [Metoda forEach](#metoda-foreach)
* [Co warto zapamiętać](#co-warto-zapamietac)

O dostępnych pętlach w JavaScript jest oddzielny dział w tym kursie. Jednak same obiekty `Array` mają w swoim prototypie kilka metod, które również służą do iterowania po tablicach. Mamy zawsze wybór użycia normalnej pętli lub też wbudowanej metody w obiekty `Array`.

W tym przypadku sprawdzimy, jaka jest różnica między nowszą pętlą `for-of` , a metodą`forEach`.

## <span id="petla-for-of">Pętla for-of</span>

Konstrukcję `for-of` już powinniśmy znać:

```js
const arr1 = ['a', 'b', 'c'];

for (const value of arr1) {
  console.log(value); // 'a', 'b', 'c'
}
```

Ma bardzo czytelny zapis i świetnie może nam zastąpić starą i wysłużoną pętlę `for` o ile nie potrzebujemy na przykład indeksu tablicy. Ta pętla pobiera tylko i wyłącznie wartości. Dlatego, jeżeli oprócz wartości potrzebujemy indeksu, albo użyjemy innej pętli, albo metody `indexOf`.

Pętla `for-of` pozwala także na wykonanie instrukcji `break`:

```js
for (const value of arr1) {
  if (value === 'b') {
    break;
  }
  console.log(value); // 'a'
}
```

Instrukcja `break` może być bardzo przydatna. Gdy stwierdzimy, że chcemy zakończyć pętlę, to mamy tą instrukcję do dyspozycji w pętli `for-of` i innych pętlach w JavaScript.

Jest także instrukcja `continue`:

```js
for (const value of arr1) {
  if (value === 'b') {
    continue;
  }
  console.log(value); // 'a', 'c'
}
```

Również przydatna instrukcja, gdy chcemy pominąć jakaś wartość i jej nie procesować. Ta instrukcja także dostępna jest w pętlach JavaScript.

## <span id="metoda-foreach">Metoda forEach</span>

Tablice w JavaScript mają dodatkowo do dyspozycji swoją metodę `forEach`, która jest w pewnym sensie odpowiednikiem pętli:

```js
const arr2 = ['a', 'b', 'c'];

arr2.forEach(value => console.log(value)); // 'a', 'b', 'c'
```

Pamiętajmy jednak, że jest to metoda, która wywoływana jest na tablicach. Metoda ta przyjmuje funkcję `callback`, która przekazana do `forEach` otrzymuje każdy element z tablicy.

W metodzie `forEach` nie możemy wykonać instrukcji `break`, `continue`, ani `return`. Te instrukcje są pomijane i nie są wykonywane, nawet jeżeli użyjemy ich w pętli `forEach`. I to jest główna różnica w porównaniu do zwykłych pętli, metody `forEach` nie możemy przerwać.

```js
arr2.forEach((value, index, array) => {
  console.log(index, value); // 0 'a', 1 'b', 2 'c'
});
```

Metoda `forEach` w przekazanej funkcji `callBack` może przyjąć dodatkowe parametry, z metody `forEach` możemy otrzymać `index` tablicy, a także całą tablicę, po której aktualnie iterujemy. Indeks jak najbardziej może się przydać, tablica jako parametr jest rzadko używana.

Mamy więc pewne różnice w działaniu, jeśli chodzi o tradycyjne pętle i metodę `forEach`. Wspomnę jeszcze, że metoda `foreEach` jest dużo wolniejsza od `for-of` jeżeli komuś zależy na optymalizacjach.

Często też porównuje się metodę `forEach` do metody `map`. Metoda `forEach` powinna być używana do przetwarzania elementów, które otrzymujemy w trakcie iteracji. Element taki możemy na przykład wysłać do bazy danych, zalogować w systemie. Wykorzystujmy metodę `forEach` gdy chcemy zrobić coś
konkretnego ze wszystkimi elementami listy. Pamiętajmy, że metoda ta zawsze iteruje po wszystkich elementach i nie da się jej przerwać. Pobieramy więc każdy element i procesujemy go w jakiś sposób.

Nie należy używać metody do zmiany danych w liście czy też zmiany samej listy. Do tego są lepsze metody jak `map`. Stawiając takie rozgraniczenie, nasz kod będzie czytelniejszy.

Niewątpliwie pętla `forEach` jest bardzo czytelną pętlą i często używaną w kodzie JavaScript. Świetnie sprawdza się przy wykonywaniu podstawowych operacji z elementami tablicy.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- do iterowania po tablicach mamy metody z obiektu `Array` i pętle jak `for-of`
- metoda `forEach` jest podobna do pętli, ale posiada swoje braki, nie ma instrukcji `break` oraz `continue`
- metodę `forEach` najlepiej używać do procesowania elementów z tablicy
- pętli `forEach` nie używamy do zmiany elementów czy zmiany tablicy
- pętla `forEach` jest wolniejsza niż pętla `for-of`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
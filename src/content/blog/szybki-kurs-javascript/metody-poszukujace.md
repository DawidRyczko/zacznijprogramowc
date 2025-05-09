---
title: "Metody poszukujące w JavaScript: Szybki Kurs #42"
description: "Poznaj metody wyszukiwania elementów w tablicach JavaScript: find, findIndex, filter, some, every."
date: 2025-02-09
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Metoda find](#metoda-find)
* [Metoda findIndex](#metoda-findindex)
* [Metoda filter](#metoda-filter)
* [Metoda some](#metoda-some)
* [Metoda every](#metoda-every)
* [Co warto zapamiętać](#co-warto-zapamietac)

Prototyp `Array` udostępnia także wiele metod do wyszukiwania elementów lub też sprawdzania, czy elementy o określonych parametrach istnieją. Dobrze znać te metody i wiedzieć, że istnieją, zamiast na przykład tworzyć implementacje w oparciu o pętle `for`.

## <span id="metoda-find">Metoda find</span>

Pierwsza metoda to metoda `find`:

```js
const arr1 = [100, 200, 300, 200, 200];

const result1 = arr1.find((e) => e > 100);
console.log(result1); // 200
```

Jest to metoda, która znajduje element pasujący do warunku przekazanego w funkcji `callback`. Metoda zwraca pierwszy znaleziony element, który spełni warunek. Nawet jeżeli mamy więcej elementów to zostanie zwrócony tylko ten pierwszy element, który spełni warunek i metoda kończy działanie.

Jeżeli żaden element nie zostanie znaleziony, metoda zwraca wartość `undefined`.

```js
const obj1 = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

const result2 = obj1.find((e) => e.a === 1);
console.log(result2); // { a: 1 }
```

Kolejny przykład z metodą `find` to użycie jej na liście obiektów. Tutaj sprawdzamy wartość w jednym polu obiektu. Gdy któryś z obiektów spełni warunek, metoda `find` kończy działanie i zwraca znaleziony obiekt. Gdy będziemy przeszukiwać obiekty o określonym `id` metoda ta świetnie się sprawdzi.

## <span id="metoda-findindex">Metoda findIndex</span>

Kolejna metoda to `findIndex`:

```js
const arr2 = ['aaa', 'foo', 'ccc', 'boo', 'bar'];

const result3 = arr2.findIndex((e) => e.includes('o'));
console.log(result3); // 1
```

Działanie tej metody jest niemalże takie samo jak metody `find` jej różnicą jest tylko to, że zwraca indeks elementu, a nie sam element. W tym przykładzie nasz warunek w funkcji `callback` jest bardziej skomplikowany. Sprawdzamy za pomocą metody `includes` czy dany element zawiera literkę `o`.
Jeżeli taki element jest znaleziony, zwracany jest jego indeks.

Mając już indeks do konkretnego elementu możemy, manipulować tym elementem i całą tablicą.

W zależności od logiki naszej aplikacji czasami będziemy potrzebowali znaleźć element za pomocą metody `find`, a czasami tylko index za pomocą `findIndex`.

## <span id="metoda-filter">Metoda filter</span>

Gdy zależy nam na znalezieniu większej ilości elementów czy też przefiltrowaniu tablicy, możemy użyć metody `filter`:

```js
const arr3 = [2, 1, 6, 9, 4, 5, 3, 2];

const result4 = arr3.filter(e => e % 2 === 0);
console.log(result4); // [ 2, 6, 4, 2 ]
```

Jest to bardzo często używana metoda w JavaScript. Pozwala nam przefiltrować tablicę i zwrócić tylko te elementy, które pasują do przedstawionego warunku. Metoda `filter` zwraca zawsze nową tablicę i nie modyfikuje starej tablicy. Jeżeli żadne elementy nie spełniają warunku, metoda zwraca pustą
tablicę.

W powyższym przykładzie filtrowałem tablice w celu znalezienia parzystych elementów.

Metoda ta idealnie nadaje się do usunięcia określonego elementu lub elementów:

```js
const arr4 = ['foo', 'boo', 'bar', 'foo'];

const result5 = arr4.filter(e => e !== 'foo');
console.log(result5); // [ 'boo', 'bar' ]
console.log(arr4) // [ 'foo', 'boo', 'bar', 'foo' ]
```

W tym przypadku warunek w przekazanej funkcji `callback` wskazuje, aby metoda `filter` zwracała tylko te elementy, które są różne od wartości `foo`. Zwrócona zostanie więc zupełnie nowa tablica, bez elementów `foo`. Musimy jednak pamiętać, że stara tablica wciąż ma wszystkie elementy.

## <span id="metoda-some">Metoda some</span>

Gdy chcemy tylko i wyłącznie sprawdzić, czy dana wartość znajduje się w tablicy użyjemy metody `some`:

```js
const arr5 = [2, 1, 6, 9, 4, 5, 3, 2];

const result6 = arr5.some(e => e > 5);
console.log(result6); // true
```

Metoda `some` sprawdza tylko, czy jakiś element zaspokaja warunek. Jeżeli metoda, iterując po tablicy znajdzie taki element, kończy działanie i zwraca wartość `boolean`. Jeżeli istniał taki element jest to wartość `true` w innym przypadku wartość `false`.

Oczywiście dla tej metody nie jest istotne, ile jest elementów spełniających warunek. Wystarczy, że znajdzie jeden element i już zwraca wartość `true`.

## <span id="metoda-every">Metoda every</span>

Kolejna metoda, która zwraca tylko wartość `boolean` to metoda `every`:

```js
const arr6 = ['foo', 'bar', 'boo'];

const result7 = arr6.every(e => e.includes('o'));
console.log(result7); // false
```

Zadaniem tej metody jest sprawdzenie, czy każdy element tablicy spełnia określony warunek. W tym przypadku metoda musi przejść przez całą tablicę. Mój warunek sprawdza, czy każdy element zawiera literkę `o`. Otrzymujemy jako rezultat wartość `false`, ponieważ nie został spełniony warunek dla jednego
elementu.

Omówiliśmy kilka metod, które są niezwykle wygodne w użyciu, gdy pracujemy na tablicach. Wszystkie te metody można zaimplementować za pomocą tradycyjnych pętli. Być może takie rozwiązanie byłoby szybsze. Ja jestem zdanie, że ułamki milisekund nie są istotniejsze niż czytelność kodu. Gdy będziecie
pracować z tablicami w JavaScript, pamiętajcie, że nie musicie używać zwykłych pętli, ponieważ wszystko zrobicie z metodami dostępnymi w obiekcie `Array`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>:

- metoda `find` zwraca pierwszy znaleziony element lub `undefined`
- metoda `findIndex` zwraca indeks pierwszego znalezionego elementu lub `undefined`
- za pomocą metody `filter` przefiltrujemy tablicę i otrzymamy zupełnie nową z elementami, które spełniają warunek lub pustą tablicę
- jeżeli metoda `some` znajdzie element w tablicy, zwraca wartość `true` w innym przypadku `false`
- metoda `every` zwróci wartość `true` gdy wszystkie elementy w tablicy spełnią warunek

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
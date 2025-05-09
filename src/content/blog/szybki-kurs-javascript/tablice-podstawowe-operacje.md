---
title: "Tablice - podstawowe operacje w JavaScript: Szybki Kurs #37"
description: "Poznaj metody tablic w JavaScript: dodawanie, usuwanie, wycinanie, łączenie, pobieranie indeksów i odwracanie."
date: 2025-02-14
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Dodawanie](#dodawanie)
* [Pobieranie, usuwanie elementów](#pobieranie-usuwanie-elementow)
* [Wycinanie tablicy](#wycinanie-tablicy)
* [Łączenie tablic i elementów](#laczenie-tablic-i-elementow)
* [Pobieranie indeksów - indexOf i lastIndexOf](#pobieranie-indeksow---indexof-i-lastindexof)
* [Odwrócenie tablicy - reverse](#odwrocenie-tablicy---reverse)
* [Co warto zapamiętać](#co-warto-zapamietac)

Wcześniej poznaliśmy kilka zasad pracy z tablicami, zupełne podstawy. Tablice w JavaScript tworzone są z obiektu Array i dziedziczą po nim mnóstwo metod. Metody te musimy znać, aby sprawnie posługiwać się tablicami, dlatego rozszerzymy wiedzę podstawową o znajomość metod.

### <span id="dodawanie">Dodawanie</span>

#### Dodawanie na koniec - push

Jeżeli nie potrzebujemy dodać elementu w konkretnym indeksie tablicy to możemy użyć metody `push`.

```js
const arr1 = [1, 2, 3];
arr1.push(4);
console.log(arr1); // [ 1, 2, 3, 4 ]
```

Metoda ta dodaje element na koniec tablicy. Jednocześnie zwraca nową długość tablicy. Najczęściej za pomocą tej metody dodaje się nowe elementy do tablicy.

#### Dodawanie na początek - unshift

Kolejna metoda to `unshift`:

```js
const arr2 = [1, 2, 3];
arr2.unshift(0);
console.log(arr2); // [ 0, 1, 2, 3 ]
```

Przy użyciu tej metody, dodajemy element na początek tablicy. W niektórych przypadkach bardzo przydatna metoda. Ona również zwraca długość tablicy po dodaniu nowego elementu.

### <span id="pobieranie-usuwanie-elementow">Pobieranie, usuwanie elementów</span>

Mamy też przydatne metody do pobierania i usuwania elementów.

#### Pobieranie i usuwanie ostatniego elementu - pop

```js
const arr3 = [1, 2, 3];
const item = arr3.pop();
console.log(arr3, item); //[ 1, 2 ] 3
```

Metoda `pop` wywołana na tablicy usuwa ostatni element i zwraca go. Nie jest to wiec, tylko i wyłącznie pobranie ostatniego elementu. Jak pamiętamy z ostatniej lekcji, jeżeli chcemy pobrać ostatni element, musimy użyć kombinacji z właściwością `length`.

#### Pobieranie i usuwanie pierwszego elementu - shift

Jest także możliwość pobrania pierwszego elementu:

```js
const arr4 = [1, 2, 3];
const first = arr4.shift();
console.log(arr4, first); //[ 2, 3 ] 1
```

Tak samo, jak metoda `pop`, metod `shift` pobiera pierwszy element i zwraca go. Również należy pamiętać, że ten element jest usuwany z tablicy. Jeżeli nie chcemy usuwać elementu z tablicy, a tylko pobrać pierwszy element należy odwołać się przez indeks 0.

### <span id="wycinanie-tablicy">Wycinanie tablicy</span>

#### Wycinanie sekcji tablicy - splice

Wspominałem już o metodzie `splice` dzięki której można usunąć konkretny element:

```js
const arr5 = [1, 2, 3, 4, 5];
arr5.splice(2, arr5.length - 1);
console.log(arr5); // [ 1, 2 ]
```

Do metody `splice` zazwyczaj przekazujemy dwa parametry, pierwszy to indeks, od którego zaczynamy usuwanie, drugi indeks to ile kolejnych elementów będzie usuniętych. W tym przypadku wycinam tablicę od drugiego indeksu, aż do samego końca. Jeżeli nie podam drugiego parametru, to metoda również
obetnie pozostałe elementy w tablicy. Jeżeli chcemy robić wycinanie do końca, to parametr ten jest zbędny.

#### Pobieranie sekcji tablicy - slice

Podobnie jak na wartości `string`, który jest iterowalny, tak i na tablicach można użyć metody `slice`:

```js
const arr6 = [1, 2, 3, 4, 5];
const arr7 = arr6.slice(0, 3);
console.log(arr6, arr7); // [ 1, 2, 3, 4, 5 ] [ 1, 2, 3 ]
```

Metoda `slice` wycina wskazaną część tablicy, ale nie modyfikuje oryginalnej tablicy. Dostajemy wskazaną część przez przekazanie dwóch parametrów. Pierwszy mówi, od którego indeksu zaczynamy wycinanie, a drugi, przed którym kończymy. Metoda `slice` była omawiana w dziale string, ma ona bardzo wiele
kombinacji i zastosowań. Warto przetestować tą metodą z różnymi parametrami.

### <span id="laczenie-tablic-i-elementow">Łączenie tablic i elementów</span>

#### Łączenie tablic - concat

Czasami będziemy potrzebować, połączyć ze sobą tablice albo elementy w tablicy. Tutaj też JavaScript przygotował nam konkretne metody:

```js
const arr8 = [1, 2, 3];
const arr9 = [4, 5];

const concat = arr8.concat(arr9);
console.log(concat); // [ 1, 2, 3, 4, 5 ]
```

Mamy dwie tablice. Wywołując metodę `concat` na jednej z nich i przekazując jako argument drugą tablicę, łączymy obydwie tablice w jedną nową. Ważne jest to, że nie ma tu żadnych modyfikacji tablic, a dostajemy zupełnie nową tablicę.

```js
const concat2 = arr8.concat(arr9, 6, 7);
console.log(concat2);  // [ 1, 2, 3, 4, 5, 6, 7 ]
```

Do metody `concat` możemy przekazywać nie tylko tablice, ale też pojedyncze wartości, które zostaną dołączone do wspólnej tablicy. W tym przypadku przekazuję do połączenia tablicę, ale też dwie wartości typu number.

#### Łączenie elementów - join

Kolejna metoda służy do łączenia elementów:

```js
const arr10 = [1, 2, 3, 4, 5];
const joined = arr10.join(' / ');
console.log(joined); //   1 / 2 / 3 / 4 / 5
```

Na tablicy wywołujemy metodę `join` i przekazujemy parametr w postaci `string`. W tym przypadku jest to separator, który będzie użyty do połączenia elementów i rozdzielenia ich. Jeżeli nie przekażemy żadnego separatora, zostanie użyty domyślny przecinek. Jest to bardzo przydatna metoda, która
pozwala nam wypisać wartości według określonego sposobu formatowania.

### <span id="pobieranie-indeksow---indexof-i-lastindexof">Pobieranie indeksów - indexOf i lastIndexOf</span>

Mamy też metody do pobrania indeksów. Czasami potrzebujemy znaleźć indeks konkretnego elementu:

```js
const arr11 = [1, 2, 3, 3, 4, 3, 3];
const index = arr11.indexOf(3);
console.log(index);
```

W tym przykładzie za pomocą metody `indexOf` szukamy wartości `3` przekazanej jako parametr. Widzimy, że tablica zawiera więcej takich wartości. Ta metoda jednak zwróci indeks pierwszego znalezionego elementu o tej wartości.

Inaczej trochę działa metoda `lastIndexOf`:

```js
const arr12 = [1, 2, 3, 3, 4, 3, 3];
const lastIndex = arr12.lastIndexOf(3);
console.log(lastIndex); // 6
```

W tym przypadku zwrócony zostanie indeks ostatniego elementu o wskazanej wartości.

Jeżeli nie uda się znaleźć elementu o przekazanej wartości otrzymamy indeks `-1` co oznacza, że taki element nie istnieje w tablicy.

Metody te są bardzo przydatne. Posiadając indeks konkretnego elementu, możemy usunąć ten element za pomocą metody `splice` lub wyciąć tablicę od konkretnego elementu za pomocą `slice`.

### <span id="odwrocenie-tablicy---reverse">Odwrócenie tablicy - reverse</span>

Na koniec bardzo prosta, ale niezwykle przydatna metoda.

```js
const arr13 = [1, 2, 3, 4, 5];
const reverse = arr13.reverse();
console.log(reverse); // [ 5, 4, 3, 2, 1 ]
```

Jest to metoda `reverse` do odwrócenia tablicy. Nie musimy więc kombinować z pętlą `for` aby odwrócić tablicę. Jeżeli więc poproszą Was na rozmowie o pracę o wypisanie wartości tablicy od tyłu, macie gotowe rozwiązanie :).

### <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- dodajemy elementy za pomocą  `push` i `unshift`

- usuwamy elementy za pomocą `pop` i `shift`
- wycinamy tablice za pomocą `splice` i `slice`
- łączymy tablice za pomocą `concat` i `join`
- pobieramy indeksy za pomocą `indexOf` i `lastIndexOf`
- odwracamy tablicę za pomocą `reverse`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
---
title: "Konstruktora Array i metoda Array.from w JavaScript: Szybki Kurs #44"
description: "Omówienie obiektu Array w JavaScript: tworzenie tablic, Array.from, Array.isArray i inne."
date: 2025-02-07
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Array - obiekt macierzysty](#array---obiekt-macierzysty)
* [Puste tablice](#puste-tablice)
* [Array.from](#arrayfrom)
* [Sztuczki z Array.from](#sztuczki-z-arrayfrom)
* [Array.from i array-like objects](#arrayfrom-i-array-like-objects)
* [Sprawdzanie listy z Array.isArray](#sprawdzanie-listy-z-arrayisarray)
* [Co warto zapamiętać](#co-warto-zapamietac)

Tworzone tablica w JavaScript, dziedziczą po obiekcie `Array`. To właśnie w tym obiekcie mamy dostęp do wielu niezbędnych metod. Przyjrzyjmy się jak można wykorzystać obiekt `Array` i czego nie należy z nim robić.

## <span id="array---obiekt-macierzysty">Array - obiekt macierzysty</span>

Obiektu `Array` możemy użyć do wielu zadań, między innymi do stworzenia tablicy:

```js
const arr1 = new Array('foo', 'boo', 'bar');
console.log(arr1); // [ 'foo', 'boo', 'bar' ]
```

W tym przykładzie używamy słowa `new` do uruchomienia konstruktora obiektu `Array` i w ten sposób tworzymy tablicę z przekazanymi wartościami.

To samo możemy zrobić nie wykorzystując słówka `new`:

```js
const arr2 = Array('foo', 'boo', 'bar');
console.log(arr2); // [ 'foo', 'boo', 'bar' ]
```

W tym przypadku omijamy `new` przed `Array` i otrzymujemy ten sam rezultat. Okazuje się więc, że działanie jest identyczne i nie ma znaczenia czy będziemy używać  `new` czy będziemy wywoływać `Array` jako funkcję.

Tworzenie tablic w taki sposób w JavaScript jest jednak rzadko spotykane i podobnie jak przy obiektach prymitywnych nie należy tego robić. Najczęściej używa się postaci z dwoma nawiasami kwadratowymi, którą używaliśmy do tej pory.

## <span id="puste-tablice">Puste tablice</span>

Inną dziwną właściwością obiektu `Array` jest możliwość stworzenie pustej tablicy o określonej długości:

```js
const arr3 = Array(3);
console.log(arr3); // [ <3 empty items> ]
console.log(arr3.length); // 3
```

Otrzymujemy tablicę, która ma długość 3, ale jest zupełnie pusta. Pusta oznacza, że nie ma żadnych wartości, nawet indeksów, ale ma określona długość. Jest to dziwny twór, którego należy unikać.

Jeżeli już chcemy stworzyć tablicę przy pomocy konstruktora `Array`, chociaż są na to lepsze sposoby to możemy użyć dodatkowo metody `fill`:

```js
const arr4 = Array(3).fill(1);
console.log(arr4); // [ 1, 1, 1 ]
```

W tym sposobie tworzymy tablicę o długości 3 i od razu wypełniamy ją liczbą `1`. W tej sytuacji wszystkie elementy tablicy mają tę samą wartość.

Największe niebezpieczeństwo tkwi, gdy spróbujemy taką tablicę uzupełnić obiektami:

```js
const arr5 = Array(3).fill({ a: 1 });
console.log(arr5); //  [ { a: 1 }, { a: 1 }, { a: 1 } ]
arr5[0].a = 42;
console.log(arr5); // [ { a: 42 }, { a: 42 }, { a: 42 } ]
```

Tworzę tablicę przy pomocy konstruktora `Array` i do metody `fill` przekazuję obiekt. Cała tablica wypełniona jest jednym i tym samym obiektem. Oznacza to, że zmiana obiektu na jednej pozycji powoduje zmianę obiektu na wszystkich pozycjach tablicy.

Jak widzimy, przydatność konstruktora `Array` jest mała. Czasami taka wypełniona tablica może się przydać. Największe zastosowanie widzę przy pisaniu testów, gdy potrzebujemy tablicy z danymi i nie zależy nam na konkretnych danych. Są jednak jeszcze lepsze formy wypełniania tablic. Jeżeli chodzi o
sam konstruktor `Array` to najlepiej go unikać.

## <span id="arrayfrom">Array.from</span>

Jeżeli chcemy stworzyć pustą tablicę o określonej długości najlepszą opcją może być użycie `Array.from`:

```js
const arr6 = Array.from({ length: 3 });
console.log(arr6); // [ undefined, undefined, undefined ]
```

Używamy metody `from` z obiektu `Array`. Do metody `from` przekazujemy obiekt z właściwością `length` ustawioną na 3. W ten sposób powstaje nowa tablica o długości 3. Wszystkie pozycje tablicy wypełnione są jednak wartością `undefined`. Taka forma tablicy jest już poprawna, ponieważ ma indeksy i
przypisaną do nich wartość.

Do `Array.from`, możemy też przekazać funkcję, jako drugi parametr:

```js
const arr7 = Array.from({ length: 3 }, (e, i) => i + 100);
console.log(arr7); // [ 100, 101, 102 ]
```

Funkcja `callback`, którą przekazujemy, przyjmuje dwa parametry. Pierwszy to wartości ze stworzonej właśnie tablicy. Wcześniej widzieliśmy, że będą to wartości `undefined`. Drugi parametr to indeks tablicy, czyli liczby zaczynające się od 0. Możemy indeks wykorzystać do stworzenia tablicy z
określonymi wartościami.

Tym sposobem możemy też wypełnić tablice obiektami:

```js
const arr8 = Array.from({ length: 3 }, (e, i) => ({ a: i }));
console.log(arr8); // [ { a: 0 }, { a: 1 }, { a: 2 } ]
arr8[0].a = 42;
console.log(arr8); // [ { a: 42 }, { a: 1 }, { a: 2 } ]
```

Wykorzystując funkcję jako drugi parametr mogę stworzyć obiekt o właściwości `a`, którego kolejną wartością będzie indeks tablicy. Zwracam uwagę na dodatkowe nawiasy okrągłe, które pozwalają nam zwrócić obiekt bez tworzenia dodatkowej konstrukcji return.

Jeżeli teraz zmienię obiekt na jakieś pozycji, to zmienię go tylko i wyłącznie na jednej pozycji. Dostaję więc listę różnych obiektów, ponieważ funkcja ta, za każdym razem zwraca zupełnie nowy obiekt.

## <span id="sztuczki-z-arrayfrom">Sztuczki z Array.from</span>

### Zamrożona tablica

W niektórych językach programowania jest możliwość stworzenia tablicy o określonej długości, w JavaScript same tablice nie mają takiej właściwości. Możemy jednak wykorzystać metodę `Object.freeze`

```js
const arr9 = Array.from({ length: 3 }, (_, i) => i);
Object.freeze(arr9);
```

Tworzymy tablicę o określonej długości za pomocą `Array.from`, wypełniamy ją przez przekazanie dodatkowej funkcji `callback` i na końcu zamrażamy stworzoną tablicę za pomocą `Object.freeze`.

Od tego momentu nie mamy możliwości zmieniania tablicy, dodawania nowych indeksów, zmienienia wartości już istniejących. Jest to obiekt niezmieniany. Tablice takie rzadko spotykane są w JavaScript, jeżeli jednak potrzebujecie takiego rozwiązania, to jest jeden ze sposobów.

### Range w JavaScript

W niektórych językach programowania są dostępne funkcje typu `range`, które tworzą nam tablice wypełnione na przykład liczbami. W JavaScript nie ma takiej natywnej funkcji, ale możemy sami stworzyć gotowe rozwiązanie:

```js
function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

console.log(range(9, 14)); // [ 9, 10, 11, 12, 13 ]
```

Mamy funkcję, która przyjmuje dwa parametry. Pierwszy z nich to początek zakresu, a drugi parametr to koniec zakresu. Na podstawie tych dwóch parametrów możemy określić długość tablicy i potem wypełnić ją określonymi wartościami. Taka funkcja do generowania liczb w pewnym zakresie, bardzo może się
przydać nie tylko w aplikacji, ale także w czasie testowania.

## <span id="arrayfrom-i-array-like-objects">Array.from i array-like objects</span>

`Array.from` idealnie nadaje się do tworzenia tablic z obiektów `array-like objects`. Są to wszystkie obiekty które mają właściwość `length` oraz indeksowane elementy. Znamy już takie elementy w języku JavaScript, są to na przykład wartości `string`:

```js
const arr10 = Array.from('foo');
console.log(arr10); // [ 'f', 'o', 'o' ]
```

W tym przypadku do `Array.from` przekazujemy wartość typu `string` i otrzymujemy tablicę z pojedynczymi elementami.

Ten sami zapis możemy otrzymać wywołując metodę `split`:

```js
console.log('foo'.split(''));
```

Dlatego też, rzadko spotyka się zapis z `Array.from`, raczej częściej używa się metody `split()`.

`Array.from` bardziej przydaje się do struktur danych jak Set:

```js
const set = new Set(['foo', 'bar', 'baz', 'foo']);
const arr11 = Array.from(set);
console.log(arr11); //  [ 'foo', 'bar', 'baz' ]
```

O strukturze `Set` jeszcze nie rozmawialiśmy, ale jest to struktura, której zadaniem jest trzymanie tylko unikalnych wartości. Dzięki `Array.from` możemy te wartości łatwo przetworzyć na tablicę. W tym przypadku stworzony set wstawiamy do `Array.from` i otrzymujemy tablicę unikalnych wartości.

`Array.from` również przydaje się przy strukturze `Map`:

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
const arr12 = Array.from(map.values());
console.log(arr12); //  [ 'one', 'two', 'three' ]
```

W strukturze `map` zawsze mamy elementy, które mają klucz i wartość. Za pomocą `Array.from` możemy stworzyć listę albo z kluczy, albo z wartości, albo też i z tego i tego. W tym przypadku tworzę listę z wartości, które przetrzymuje struktura `map`.

To kilka przykładów gdzie możemy użyć `Array.from`. Głównie w bardzo prosty sposób możemy stworzyć tablice z obiektów tablico-podobnych. Takich obiektów jest też sporo w drzewie DOM. Jeżeli będziecie pracować z elementami drzewa DOM `Array.from` może Wam się bardzo przydać.

## <span id="sprawdzanie-listy-z-arrayisarray">Sprawdzanie listy z Array.isArray</span>

Na koniec jeszcze bardzo przydatna metoda `Array.isArray`.

```js
const arr13 = [1, 2, 3, 4];
const str = 'foo';
const sett = new Set(['boo']);

console.log(Array.isArray(arr13)); // true
console.log(Array.isArray(str)); // false
console.log(Array.isArray(sett)); // false
```

Służy ona do sprawdzania, czy coś jest tablicą. Wystarczy przekazać do niej wartość, którą chcemy sprawdzić, aby otrzymać `true` lub `false`. Warto zwrócić uwagę, że otrzymamy `true` tylko w przypadku prawdziwej tablicy. Nawet obiekty tablico-podobne będą zwracały wartość `false`.

Gdy pracujemy z niepewnymi strukturami danych, metoda ta może nam bardzo pomóc rozpoznać prawidłowy typ obiektu.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- możemy tworzyć tablice przy pomocy konstruktora, jest to jednak technika rzadko spotykana
- możemy tworzyć puste tablice i wypełniać je danymi za pomocą metody `fill`
- metoda `Array.from` może być przydatna do stworzenia tablicy z wygenerowanymi danymi
- metodę `Array.from` możemy użyć do konwersji obiektów tablico-podobnych na tablice
- za pomocą `Array.isArray` łatwo sprawdzimy, czy wartość, na której pracujemy jest tablicą

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
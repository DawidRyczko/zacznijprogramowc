---
title: "Metoda reduce i reduceRight w JavaScript: Szybki Kurs #41"
description: "Przewodnik po metodzie reduce w JavaScript, w tym przykłady użycia i ważne aspekty do zapamiętania."
date: 2025-02-10
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Używanie reduce](#uzywanie-reduce)
* [Reduce bez inicjalizacyjnej wartości](#reduce-bez-inicjalizacyjnej-wartosci)
* [Tworzenie innych wartości](#tworzenie-innych-wartosci)
* [Metoda reduceRight](#metoda-reduceright)
* [Co warto zapamiętać](#co-warto-zapamietac)

Jedną z metod, która spędza sen z powiek programistów JavaScript jest metoda `reduce`. Nie jest ona zbyt intuicyjna i sam często poszukuję idealnego rozwiązania w Internecie lub dokumentacji. Często też o tą metodę pada pytanie na rozmowie o pracę.

Metody `forEach` jest do iterowania po tablicy, metody `map` do tworzenia nowych tablic ze zmienionymi wartościami. Metoda `reduce` pozwala nam zredukować wartości tablicy do jednej wartości. Na przykład wykonać sumowanie wszystkich elementów. Możemy też przekształcić listę obiektów do listy z
pojedynczymi obiektami lub podobnie jak metoda `flat`
spłaszczyć zagnieżdżone listy.

## <span id="uzywanie-reduce">Używanie reduce</span>

Aby użyć metody `reduce` musimy przygotować `reducer`:

```js
const reducer = (accumulator, currentValue) => accumulator + currentValue;
```

Jest to oczywiście zwykła funkcja callback. Ta funkcja będzie otrzymywała dwa parametry. Pierwszy parametr to zawsze jakiś `accumulator` . Drugim parametrem będzie zawsze `currentValue` czyli aktualna wartość w danej iteracji. To co robi ta funkcja to dodaje `accumulator` do `currentValue` i zwraca
tą wartość. W ten sposób tworzymy sumę wszystkich elementów. I tak w kółko, aż przejdzie przez każdą wartość w tablicy. Zwracana wartość z funkcji jest używana w kolejnej iteracji jako `accumulator`.

```js
const arr = [100, 200, 300];
const result = arr.reduce(reducer, 0);
console.log(result); // 600
```

Użyjmy teraz naszego `reducera`. Mamy przygotowaną tablicę, na której wywołujemy metodę `reduce`. Jako pierwszy parametr, przekazujemy przygotowaną funkcję `callback` czyli nasz `reducer` jako drugi parametr przekazujemy wartość inicjalizacyjną. Ta wartość inicjalizacyjna jest właśnie pierwszą
wartością dla `accumulatora`, a `currentValue` to kolejne wartości z tablicy.

```text
0 100
100 200
300 300
600
```

Przy pierwszym obrocie w funkcji `reducer` pojawia się wartość 0 i 100. Po dodaniu wartości funkcja zwraca wartość 100. W następnym obrocie pojawia się wartość 100 i 200. Czyli ostatnia wartość zwrócona i kolejna z tablicy. Funkcja zwraca

300. Funkcja znowu zostaje wywołana ostatni raz i pojawia się w niej wartość 300, czyli ta ostatnio zwrócona i ostatnia wartość z tablicy też 300. Ostatecznie funkcja zwraca wartość 600.

I tak w najprostszym przykładzie działa metoda `reduce`. Do `accumulatora` ciągle dodaje kolejne wartości tablicy. Przy pierwszym wywołaniu `accumulatorem` jest wartość inicjalizacyjna przekazana jako parametr. A potem `accumulatorem` jest to co zwraca funkcja `callback` po każdym wywołaniu.

## <span id="reduce-bez-inicjalizacyjnej-wartosci">Reduce bez inicjalizacyjnej wartości</span>

Możliwe jest też wywołanie metody `reduce` bez inicjalizacyjnej wartości:

```js
const reducer1 = (accumulator, currentValue) => accumulator + currentValue;

const arr1 = [100, 200, 300];
const result1 = arr1.reduce(reducer1);
console.log(result1); // 600
```

W tym przypadku, gdy do metody `reduce`, nie podajemy wartości inicjalizacyjnej, a tylko funkcję `callback`, pierwszą wartością inicjalizacyjną stanie się pierwsza wartość z tablicy. Dlatego metoda `reduce` zacznie iterować od drugiego elementu tablicy.

```text
100 200
300 300
600
```

Z tego powodu w funkcji `callback` od razu pojawią się dwie pierwsze wartości z tablicy. Ich suma zostanie zwrócona i ponownie przekazana do funkcji `callback` z ostatnią trzecią wartością. Ostatecznie zwrócona zostanie wartość `600`.

Czasami jednak musimy przekazać wartość inicjalizacyjną:

```js
const reducer2 = (acc, current) => acc + current.a;

const arr2 = [{ a: 1 }, { a: 2 }, { a: 3 }];

const result2 = arr2.reduce(reducer2, 0);
console.log(result2); // 6
```

W tym przypadku mamy tablicę z obiektami. Jeżeli chcemy teraz wykonać sumę z pól obiektów, musimy przekazać wartość inicjalizacyjną. Inaczej funkcja `reduce` spróbuję użyć pierwszego elementu z tablicy, a nim będzie obiekt. Bez wartości inicjalizacyjnej, próbowałaby dodać obiekt do wartości z
pola `a`. Dlatego w tym przypadku wartość inicjalizacyjna jest niezbędna.

## <span id="tworzenie-innych-wartosci">Tworzenie innych wartości</span>

Metoda `reduce` zwraca zawsze jedną wartość, ale nie musi być to jedna wartość prymitywna, może być to lista wartości czy też obiekt.

Kolejny przykład to spłaszczenie listy:

```js
const flatted = [
  [0, 1],
  [2, 3],
].reduce((acc, current) => acc.concat(current), []);
console.log(flatted) // [ 0, 1, 2, 3 ]
```

Mamy tutaj strukturę tablicy z innymi tablicami. Za pomocą metody `reduce` możemy spłaszczyć tą strukturę. W funkcji `callback` na `accumulatorze` wywołujemy metodę `concat` do łączenia tablic i za każdym wywołaniem łączymy pojawiające się zagnieżdżone tablice. Tym sposobem otrzymujemy płaską
tablicę.

Kolejny przykład to przetworzenie listy obiektów:

```js
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 },
];

const names = people.reduce((acc, current) => {
  acc.push(current.name);
  return acc;
}, []);
console.log(names); // [ 'Alice', 'Max', 'Jane' ]
```

W tym przykładzie mamy listę z obiektami. Chcemy stworzyć sobie listę tylko z imionami, które pochodzą z tych obiektów. Zauważcie, że funkcja `callback` przekazana do metody `reduce` została rozpisana z instrukcją `return`. Ponieważ nie mogę zwrócić bezpośrednio wywołania metody `push`:

```js
(acc, current) => acc.push(current.name);
```

Gdybym zastosował taki zapis, `arrow function` zwróciłaby to, co zwraca metoda `push`, a metoda `push` zwraca nową długość tablicy. My natomiast musimy zawsze zwrócić kolejną wartość dla `accumulatora`. Czyli w naszym przypadku tablicę, do której w każdej iteracji dodajemy wartości z pola `name`.

Metoda `reduce` rozłożona na czynniki pierwsze nie wydaje się aż tak skomplikowana. Ma jednak sporo niuansów i bez praktyki, ciężko będzie nam opanować jej działanie.

Metoda `reduce` może się przydać do redukowania listy do jednej wartości takiej jak suma wartości, średnia wartości, największa albo najmniejsza. Możemy też manipulować strukturami i upraszczać struktury lub nawet tworzyć bardziej skomplikowane.

## <span id="metoda-reduceright">Metoda reduceRight</span>

Na koniec szybkie spojrzenie na metodę `reduceRight`:

```js
const sum = [0, 1, 2, 3, 4, 5, 6].reduceRight((acc, current) => acc - current);
console.log(sum); // -9
```

Metoda `reduceRight` robi dokładnie to samo co metoda `reduce` jednak zaczyna przetwarzać tablicę od prawej strony, czyli od jej końca. Czasami przy specyficznych sytuacjach, może nam się przydać. Nie jest ona jednak zbyt często używana, a sam nigdy nie miałem okazji. To samo możemy osiągnąć
używając metody `reverse` i zwykłego `reduce`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metoda `reduce` opiera się na funkcji `callback`, której parametrem jest jakiś akumulator oraz obecnie przetwarzana wartość z tablicy
- za pomocą `reduce` możemy przetworzyć tablicę do jednej wartości
- `reduce` można też użyć do przetwarzania struktur danych na inne struktury
- inicjalizacyjna wartość metody `reduce` w niektórych przypadkach może być pomijana
- metodę `reduce` warto po praktykować, jeżeli mamy z nią styczność pierwszy raz

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
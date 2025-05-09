---
title: "Tablice - array w JavaScript: Szybki Kurs #36"
description: "Wszystko, co musisz wiedzieć o tablicach w JavaScript: tworzenie, pobieranie, modyfikacja, usuwanie i czyszczenie."
date: 2025-02-15
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści

* [Tworzenie tablic](#tworzenie-tablic)
* [Pobieranie wartości](#pobieranie-wartosci)
* [Przypisywanie wartości](#przypisywanie-wartosci)
* [Sprawdzenie długości tablicy](#sprawdzenie-dlugosci-tablicy)
* [Czyszczenie tablicy](#czyszczenie-tablicy)
* [Usuwanie pojedynczych wartości](#usuwanie-pojedynczych-wartosci)
* [Co warto zapamiętać](#co-warto-zapamietac)

Tablice w JavaScript to bardzo popularne struktury, którymi będziesz się posługiwać nieustannie. Jest to struktura obiektowa, a nie typ prosty, ogólnie tablice są po prostu obiektami specjalnego typu. Mają w sobie także wiele przydatnych metod, których znajomość jest niezbędna do posługiwania się
tablicami.

### <span id="tworzenie-tablic">Tworzenie tablic</span>

Tablice tworzy się bardzo prosto:

```js
const arr = [];    
```

To jest przykład pustej tablicy, która nie ma żadnych elementów. Zainicjalizowana jest za pomocą dwóch kwadratowych nawiasów.

Tablice mogą przetrzymywać różne typy danych:

```js
const numbers = [1, 2, 3];
```

Ta tablica przetrzymuje elementy typu `number`.

```js
const strings = ['foo', 'boo', 'bar'];
```

W tej tablicy przetrzymujemy elementy typu `string`.

```js
const arrays = [
  [1, 2, 3],
  ['foo', 'boo', 'bar'],
];
```

To jest tablica wielowymiarowa, która przetrzymuje inne tablice. Takich wymiarów można stworzyć więcej. Nie są to jednak intuicyjne i wygodne do pracy struktury.

```js
const objects = [{ a: 'one' }, { a: 'two' }];
```

W tej tablicy znajdują się obiekty. Tablice z obiektami to struktury, z którymi będziecie się spotykać bardzo często.

Jak widzimy, do tablic możemy włożyć wszystko, możemy nawet umieszczać dane różnego typu. Przy takich tablicach zalecam jednak ostrożność.

### <span id="pobieranie-wartosci">Pobieranie wartości</span>

Jeżeli chcemy pobrać wartość z tablicy, odwołujemy się do tablicy przez nawiasy kwadratowe. Każda tablica jest indeksowana od 0, a każda wartość przypisana jest do indeksu:

```js
console.log(numbers[0]); // 1
console.log(strings[1]); // 'boo'
console.log(arrays[0][1]); // 2
console.log(objects[0].a); // 'one'
```

Z indeksem 0 odwołujemy się do pierwszego elementu tablicy. Z indeksem `1` odwołujemy się do drugiego elementu tablicy i tak dalej.

Widzimy też pobranie wartości z tablic wielowymiarowych, za pomocą dwóch nawiasów kwadratowych. Pierwszy indeks wskazuje tablicę, a drugi indeks wskazuje element w tej tablicy.

Również możemy pobrać pojedynczą wartość z obiektów. Po indeksie, przez kropkę, możemy odwołać się do pola w obiekcie.

Jeżeli spróbujemy pobrać element z indeksu, który nie istnieje:

```js
console.log(numbers[100]); // undefined
```

zostanie zwrócona wartość `undefined`. JavaScript w tym przypadku nie zgłasza błędu. Dlatego trzeba być ostrożnym z pobieraniem elementów spoza zakresu. Warto sprawdzać, czy konkretna wartość istnieje, ponieważ nasz program nadal będzie działał, ale będzie operował na wartości `undefinde` co może
spowodować nieoczekiwane błędy.

### <span id="przypisywanie-wartosci">Przypisanie wartości</span>

Jeżeli chcemy przypisać wartość do konkretnej pozycji w tablicy lub zmienić wartość, któregoś elementu, również używamy nawiasów kwadratowych i indeksów:

```js
numbers[1] = 100;
```

Do indeksu `1` czyli drugiego elementu w tablicy dopisuję wartość `100`.

Możemy także przypisywać wartość do dowolnego indeksu w tablicy:

```js
numbers[100] = 100;
console.log(numbers); // '[ 1, 100, 3, <97 empty items>, 100 ]'
```

W tym przypadku dopisujemy wartość do indeksu 100. Nie jest to zbyt dobre rozwiązanie gdy użyjemy dowolnego indeksu i przypiszemy wartość, w ten sposób tworzymy także 97 pustych pozycji w tablicy, które tak naprawdę są zbędnymi elementami.

### <span id="sprawdzenie-dlugosci-tablicy">Sprawdzenie długości tablicy</span>

Podobnie jak z wartości string, tak i z tablic możemy pobrać długość za pomocą pola `length`. Ta właściwość jest niezwykle przydatna i często będzie przez was używana:

```js
const list = [1, 2, 3, 4, 5];
console.log(list.length); // 5
```

Właściwość `length` pokazuje dokładnie, ile elementów znajduje się w tablicy.

Jeżeli chcemy pobrać ostatni element z tablicy także użyjemy `length`:

```js
console.log(list[list.length - 1]); // 5
```

Przez nawiasy klamrowe odwołujemy się do indeksu wskazanego, wskazanego przez długość tablicy, ale minus 1 pozycja. To daje nam wartość ostatniego indeksu.

Długość tablicy wskazuje nam także ostatni wolny indeks:

```js
list[list.length] = 6;
console.log(list);
```

Możemy to wykorzystać, aby wstawić na końcu tablicy wartość. Nie jest to jednak popularny sposób ponieważ do tego istnieje specjalna metoda `push`, którą potem poznamy.

### <span id="czyszczenie-tablicy">Czyszczenie tablicy</span>

Jeżeli chcemy wyczyścić tablicę, sprawa wydaje się dość prosta:

```js
let origin = [1, 2, 3];
let copy = origin;
```

Stworzyłem tablicę `origin`. Jak wiemy, tablica jest typem obiektowym, zmienna `origin`, tak naprawdę przetrzymuje referencję do tablicy. Referencja ta kopiowana jest także do drugiej zmiennej `copy`. W ten sposób mam dwie zmienne, które odnoszą się do jednej i tej samej tablicy, przez referencję.

Chcąc wyczyścić tablicę, mogę przypisać do zmiennej pustą tablicę:

```js
copy = [];
console.log(origin, copy); // [ 1, 2, 3 ] []
```

Po wyniku widzimy, że pierwsza tablica `origin` zachowała swoje wartości. Natomiast tablica `copy` ma teraz przypisaną pustą tablicę. Tak naprawdę to nie wyczyściłem tablicy, ale referencję w zmiennej `copy`. Teraz ta zmienna odnosi się do zupełnie innej referencji tablicy.

Oczywiście, jeżeli przetrzymujemy tablice w jednej zmiennej, to takie wyczyszczenie jest skuteczne. Takie przypisanie pustej tablicy jako usunięcie starej tablicy jest spotykane bardzo często w kodzie.

Innym sposobem na wyczyszczenie tablicy jest takie podejście:

```js
let origin2 = [1, 2, 3];
let copy2 = origin2;

origin2.length = 0
console.log(origin2, copy2); // [] []
```

W tym przypadku mamy zmienną `origin2`, która przekazuje referencję tablicy do zmiennej `copy2`. Do właściwości `length`
przypisuję wartość 0. Oznacza to, że zeruję długość tablicy, czyli tak naprawdę usuwam wszystkie jej wartości.

Widzimy, że ma to efekt na wszystkie zmienne, które przechowują referencję do tej tablicy. W tym przypadku konkretnie odniosłem się do wskazywanej tablicy przez referencję. Jest to sposób na to, aby wyzerować tablice w całej aplikacji.

### <span id="usuwanie-pojedynczych-wartosci">Usuwanie pojedynczych wartości</span>
#### Metoda splice

Często będziemy usuwać pojedyncze wartości z tablicy, są na to różne sposoby, pokażę Wam dwa najbardziej dominujące:

Pierwszy sposób z użyciem metody `splice`:

```js
const toDelete = 2;
const nums = [1, 2, 3];

const index = nums.indexOf(toDelete);
nums.splice(index, 1);
console.log(nums); //  [ 1, 3 ]
```

Mamy wartość, którą chcemy usunąć, oraz tablicę wartości. Na początku za pomocą metody `indexOf` pobieramy indeks wartości do usunięcia. Mając indeks, wiemy, w którym miejscu tablicy znajduje się wartość. Teraz możemy usunąć wartość za pomocą metody `splice`. Pierwszym argumentem jest indeks, drugim
ile wartości należy usunąć.

Jest to popularny sposób na usuwanie wartości. Jej zaletą albo wadą ( w zależności od potrzeb) jest to, że modyfikuje oryginalną tablicę.

### Metoda filter

Inny sposób to użycie higher-order function o nazwie `filter`. Jest to moja ulubiona metoda:

```js
const toRemove = 1;
const numss = [1, 2, 3];

const removed = numss.filter((e) => e !== toRemove);
console.log(numss, removed); // [ 1, 2, 3 ] [ 2, 3 ]
```

W tym rozwiązaniu odwołujemy się do tablicy i wywołujemy metodę `filter`. Przekazujemy tam funkcję callback. Jej zadaniem jest zwrócenie tylko tych wartości, które różne są od wartości wskazanej do usunięcia. Tym sposobem filtrujemy tablicę i zwracamy zupełnie nową tablicę bez tej wartości.

W tym rozwiązaniu widzimy, że mamy zachowaną oryginalną tablicę, oraz dostajemy nową tablicę już bez wartości usuniętej.

#### Metoda includes

Kolejny sposób to usuwanie większej ilości elementów. Mamy listę elementów, którą chcemy usunąć:

```js
const values = [1, 3];
const numes = [1, 2, 3];
const notIncluded = numes.filter((e) => !values.includes(e));
console.log(numes, notIncluded); // [ 1, 2, 3 ] [ 2 ]
```

W tym przypadku znowu używamy metody `filetr`. Jako parametr do metody przekazujemy funkcję, która sprawdza czy elementy listy znajdują się w elementach do usunięcia. Jeżeli tak to dostaniemy wartość `true`, ale negując zwrócimy `false` co spowoduje, że metoda `filter` pominie ten element.

Użyliśmy tutaj metody `includes`, która jest stosunkowo nowa w JavaScript i jej implementacja może jeszcze nie istnieć w przeglądarkach.

### <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- tablica jest typem obiektowym, odwołujemy się do niej przez referencję
- tablica w JavaScript może przetrzymywać każdy typ danych
- właściwość `length` zwraca długość tablicy
- odwołanie się poza indeks tablicy zwraca `undefined`, a nie błąd
- pamiętajmy, że pracując z tablicami, pracujemy na referencjach, zmiana w jednym miejscu oznacza zmiany w innych
- do usunięcia pojedynczego elementu użyjemy `splice` albo `filter`
- wiele elementów można usunąć za pomocą `includes`

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
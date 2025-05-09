---
title: "Obiekty JavaScript w JavaScript: Szybki Kurs #47"
description: "Szczegółowe omówienie obiektów w JavaScript: tworzenie, odczyt, modyfikacja i skrócone metody tworzenia."
date: 2025-02-04
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Tworzenie obiektów](#tworzenie-obiektow)
* [Odczyt danych](#odczyt-danych)
* [Zapis danych](#zapis-danych)
* [Modyfikacja obiektu](#modyfikacja-obiektu)
* [Skrót do tworzenia obiektów](#skrot-do-tworzenia-obiektow)
* [Co warto zapamiętać](#co-warto-zapamietac)

Z prostymi obiektami w tym kursie już spotykaliśmy się wielokrotnie. Są to jedne z najpopularniejszych struktur w tym języku podobnie jak tablice. W tym dziale rozłożymy obiekty na czynniki pierwsze i dowiemy się, jak dokładnie działają.

## <span id="tworzenie-obiektow">Tworzenie obiektów</span>

Tak samo, jak tablice, obiekty są typami referencyjnymi. Praca z nimi jest nieco inna niż z typem prymitywnym. Tworzymy je jako postać literałowa:

```js
const obj = {};
```

Tworzymy zmienną i przypisujemy do niej dwie klamerki. W ten sposób tworzymy pusty obiekt. Jest to pusty, ale wciąż poprawny obiekt w JavaScript.

Zazwyczaj jednak obiekt trzyma w sobie jakieś *properties* (właściwości) lub częściej spotykane w polskiej nomenklaturze pola obiektu:

```js
const user = {
  name: 'John',
  surname: 'Rambo',
  'full name': 'John James Rambo',
};
```

Każde pole w obiekcie to klucz, czyli `key` oraz jakaś wartość, czyli `value`. Dlatego często spotkacie się z nazwą `key:value`, która po prostu określa pole w obiekcie. Nazwa ta często pojawia się w dokumentacji.

Zwrócę jeszcze uwagę na przypisanie wartości, które następuje po dwukropku, a nie po znaku równości. Kolejne pola obiektu oddzielane są od siebie przecinkiem.

Kluczem może być dowolna nazwa, starajmy się jednak nie używać nazw zastrzeżonych dla JavaScript. Zazwyczaj stosuje się notację camelCase lub jednowyrazowe nazwy. Jest jednak możliwość stworzenia nazwy składającej się z więcej niż dwóch wyrazów. Wtedy zapisujemy ją jako string i ujmujemy w dodatkowe
znaki cudzysłowów.

Do pola w obiekcie możemy przypisać każdą wartość. Nie musi być to typ prymitywny, może to być obiekt, funkcja czy tablica.

```js
const obj1 = {
  a: 'text',
  b: [1, 2, 3],
  c: {
    a: 1,
    b: { z: [1, 2, 3] },
  },
  f: function() {
    return 1;
  },
};
```

Widzimy tutaj obiekt o wiele bardziej skomplikowany z dodatkowymi zagnieżdżonymi strukturami. Jeżeli mamy wpływ na tworzenie obiektów, dobrze jest zapanować nad ich skomplikowaniem i głębokością. Z takimi obiektami pracuje się gorzej i zawsze jest większa możliwość popełnienia błędu.

Ciekawostką jest także to, że możemy tworzyć pola, których nazwy są bardziej dynamiczne:

```js
const obj2 = {
  [Math.random()]: 'random',
};
console.log(obj2); // { '0.9301655569559864': 'random' }
```

Jest to już skrajny przypadek, ale ten obiekt jako klucz posiada randomową liczbę. Tym razem klucz jest definiowany w nawiasach kwadratowych. Między nimi może znaleźć się dowolne wyrażenie JavaScript. Ja akurat wywołuję konkretną metodę `Math.random()`.

Wbrew pozorom taka możliwość przydaje się, gdy chcemy tworzyć obiekty w dynamiczny sposób na przykład jakimś generatorem, a kluczem mają być kolejne liczby lub na przykład aktualna data. Z takimi obiektami pracuje się nieco inaczej i później poznamy różne metody, które w tym pomagają.

## <span id="odczyt-danych">Odczyt danych</span>

Dane z obiektów możemy odczytać przynajmniej na dwa sposoby.

Pierwszy z nich to notacja z kropką:

```js
console.log(user.name); // 'John'
```

Odnosimy się do obiektu i po kropce do odpowiedniego pola w obiekcie. W ten sposób pobieramy wartość.

Drugi zapis to notacja w nawiasach kwadratowych nazywana *bracket notation*:

```js
console.log(user['name']); // 'John'
console.log(user['full name']); // 'John'
```

W tym przypadku odwołujemy się do obiektu, ale nie odwołujemy się już przez kropkę. Podobnie jak przy tablicy używamy nawiasy kwadratowe i podajemy w nich nazwę pola. Nazwa musi być podana jako wartość string.

Zauważ, że jest to też jedyna możliwość, aby dostać się do pól zadeklarowanych jako `string`. Nie było by to możliwe z użyciem kropki.

Zapis *bracket notation* przydaje się także, gdy nazwa pola przetrzymywana jest w zmiennej, a zdarzy się tak niejednokrotnie w naszym kodzie JavaScript:

```js
const fullName = 'full name';
console.log(user[fullName]);
```

Zazwyczaj pisząc aplikację, używamy notacji z kropką. Jednak w niektórych sytuacjach `brakcet notation` jest bardzo pomocne.

Jeśli chcemy odwoływać się do pół zagnieżdżonych, wstawiamy kolejne kropki:

```js
console.log(obj1.c.b.z) // [ 1, 2, 3 ]
console.log(obj1['c']['b']['z']) // [ 1, 2, 3 ]
```

lub kolejne nawiasy kwadratowe. Widzimy, że notacja z kropką ma tutaj przewagę w czytelności i zwięzłości kodu.

Może się przydarzyć sytuacja w której, nie uda nam się odczytać pola, bo takie nie istnieje:

```js
console.log(user.enemy) // undefine
console.log(user.enemy.name) // error
```

Jeżeli odwołamy się do pola, które nie istnieje w obiekcie, otrzymamy wartość `undefined`. JavaScript nie zgłasza błędu. Czasem jednak próbujemy dalej grzebać w obiekcie i wywołanie kolejnego pola na `undefined` wywoła błędu.

Takie obiekty z niepewną strukturą i brakującymi polami mogą się zdarzyć. Dlatego stosujemy wtedy serię instrukcji `if`
lub *optional chaining*, które poznaliśmy w poprzednich częściach kursu.

## <span id="zapis-danych">Zapis danych</span>

Przypisanie nowej wartości do obiektu jest bardzo proste:

```js
user.surname = 'Rambo 3';
```

Odwołujemy się przez znak przypisania, a nie przez dwukropek jak przy tworzeniu obiektu. W ten sposób przypisujemy nową wartość do pola obiektu.

Możemy oczywiście przypisać każdą wartość na przykład `undefined`:

```js
user.surname = undefined;

console.log(user.surname); // undefined
console.log(user.xyz); // undefined
```

Gdy przypiszemy wartość `undefined` i odwołamy się do tego pola, otrzymamy oczywiście wartość `undefined`. Również taką wartość otrzymamy, gdy odwołamy się do pola, które nie istnieje.

Dlatego należy być ostrożnym, gdy operujemy na polach obiektu i otrzymujemy `undefined`. Może być to albo wartość tego pola, albo takie pole po prostu nie istnieje. Potem poznamy dodatkowe metody, które pozwalają stwierdzić czy konkretne pola istnieją w obiekcie.

## <span id="modyfikacja-obiektu">Modyfikacja obiektu</span>

W JavaScript możemy nie tylko modyfikować pola obiektu, ale także sam obiekt, dodając do niego nowe właściwości:

```js
user.address = 'Jungle';
console.log(user);
```

Jest to bardzo proste. Odwołujemy się do obiektu i po kropce wstawiamy nazwę, którą chcemy dodać do obiektu.

```text
  {
    name: 'John',
    surname: undefined,
    'full name': 'John James Rambo',
    address: 'Jungle'
  }
```

Od tego momentu obiekt będzie posiadał nowe pole. W JavaScript często możecie się spotkać z takimi modyfikacjami w locie. W jednym miejscu obiekt nie będzie miał jakiegoś pola, a w drugim miejscu już będzie miał dodane nowe właściwości. Możemy w ten sposób dodawać nie tylko wartości prymitywne, ale
funkcje, tablice i inne obiekty.

Praca z takimi obiektami może być kłopotliwa. Dlatego starajmy się przewidzieć, jakie pola będzie posiadał obiekt i zadeklarować obiekt ze wszystkimi niezbędnymi polami. Do aktualnie nieużywanych pól można przypisać wartość `null`.

Nie tylko możemy modyfikować obiekty, dodając do nich nowe pola. Możemy też całkowicie usuwać pola z obiektów:

```js
delete user.address;
```

Używamy instrukcji `delete`, która całkowicie usuwa pole z obiektu. Nie jest ono ustawione na `null` czy `undefined`
tylko całkowicie usuwane.

```text
  {
  name: 'John',
    surname
:
  undefined,
    'full name'
:
  'John James Rambo',
}
```

Operator ten jest jednak bardzo wolny. Jeżeli chcemy zmienić obiekt, być może warto przepisać obiekt tylko z tymi polami, które chcemy w dalszej części aplikacji obsługiwać, są na to różne sposoby, które potem poznamy.

W mojej opinii czasami lepiej stworzyć nowy obiekt na bazie istniejącego niż manipulować nim tak mocno przez dodawanie nowych pól czy usuwanie ich. Kod wtedy może być bardziej zrozumiały, a także nasz edytor kodu analizujący kod łatwiej wychwyci możliwość popełnienia błędu.

## <span id="skrot-do-tworzenia-obiektow">Skrót do tworzenia obiektów</span>

W specyfikacji ES6 pojawiła się jeszcze ciekawa opcja tworzenie obiektu w nieco krótszy sposób. Dotyczy to głównie obiektów zwracanych z jakichś funkcji lub obiektów tworzonych z danych:

```js
const name = 'John';
const surname = 'Rambo';

const person = {
  name,
  surname,
};
```

W tym przykładzie mamy dwie zmienne, z których chcemy stworzyć obiekt. Możemy skorzystać ze skrótu i stworzyć obiekt wstawiając zmienne między dwie klamry. Nazwy tych zmiennych będą nazwami kluczy, a wartości zmiennych staną się wartościami obiektu.

Jest to oczywiście odpowiednik tego zapisu:

```js
const person1 = {
  name: name,
  surname: surname,
};
```

W taki sposób tworzyło się obiekty z gotowych danych, zanim pojawiła się nowa opcja w ES6.

Ten krótki zapis często wykorzystywany jest w funkcjach JavaScript:

```js
function create(name, surname) {
  return { name, surname };
}

console.log(create('John', 'Rambo')); // { name: 'John', surname: 'Rambo' }
```

Tutaj mamy funkcję, która z otrzymanych parametrów tworzy obiekt i zwraca go. Oczywiści jest to uproszczony przykład. Często jednak będziecie się spotykać w JavaScript właśnie z taką formą tworzenia obiektów.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- obiekty tworzymy jako postać literałowa
- pole obiektu reprezentowane jest przez klucz - wartość
- kluczem może być niemalże dowolną wartość, przy wartości string używamy cudzysłowów, przy wartościach dynamicznych nawiasów kwadratowych
- wartością może być wartość prymitywna, funkcja, obiekt czy tablica, dosłownie każda struktura
- do pól odwołujemy się przez kropkę lub nawiasy kwadratowe
- możemy w czasie działania aplikacji dodawać nowe pola lub je usuwać za pomocą `delete`
- z gotowych danych można tworzyć obiekty w krótszej formie

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
---
title: "Spread i rest operator z obiektami w JavaScript: Szybki Kurs #52"
description: "Przykłady użycia operatora spread do pracy z obiektami w JavaScript."
date: 2025-01-30
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Łączenie obiektów](#łączenie-obiektów)
* [Operator spread na innych wartościach](#operator-spread-na-innych-wartościach)
* [Co warto zapamiętać](#co-warto-zapamiętać)

Operator spread omawiałem już przy pracy z tablicami. Możemy go także używać do pracy z obiektami. Zerknijmy na kilka przykładów operatora spread i obiektów w JavaScript.

## <span id="łączenie-obiektów">Łączenie obiektów</span>

Na początek bardzo prosty przykład łączenia obiektów za pomocą operatora `spread`:

```js
const obj1 = {
  name: 'John',
};

const obj2 = {
  surname: 'Rambo',
};

const obj3 = {
  ...obj1,
  ...obj2,
  spec: 'soldier',
};
console.log(obj3); //   { name: 'John', surname: 'Rambo', spec: 'soldier' }
```

Tak naprawdę przepisaliśmy tutaj właściwości z dwóch obiektów do zupełnie nowego obiektu i jeszcze dopisaliśmy nową właściwość. Możemy też dodać nowe metody, jeśli mamy taką potrzebę.

Obiekt, który powstał, jest kopią tych obiektów i nie ma tutaj żadnego związania referencyjnego. Jeżeli dokonamy teraz zmian w obiekcie trzecim, zmiany te nie będą widoczne w pozostałych obiektach.

O kopiowaniu obiektów będzie oddzielny dział. Od razu jednak powiem, że kopia wykonana za pomocą `spread` operatora to *shallow copy*. Oznacza to, że jeżeli w jakimś obiekcie znajdą się inne obiekty referencyjne jak tablice czy obiekty to operator `spread` przepisze tylko referencje do tych obiektów. W takim przypadku zmiana pól referencyjnych będzie widoczna w każdym obiekcie. Kopia `spread` operatora działa tylko
na pola prymitywne.

Warto jeszcze sprawdzić co się stanie, gdy obiekty mają te same pola:

```js
const obj4 = {
  name: 'John',
};

const obj5 = {
  name: 'Batman',
};

const obj6 = { ...obj4, ...obj5 };
console.log(obj6); // { name: 'Batman' }
```

Obiekty w JavaScript nie mogą mieć dwóch tych samych nazw pól. Jednak może się zdarzyć, że będziemy łączyć ze sobą podobne obiekty lub nawet takie same. W tym przypadku mamy dwa obiekty z tym samym polem `name`. W nowym obiekcie zachowa się więc pole z ostatniego obiektu.

Jest to dość przydatne rozwiązanie, gdy chcemy zwrócić taki sam obiekt z tylko jednym zmienionym polem:

```js
const obj7 = {
  name: 'John',
  surname: 'Rambo',
  spec: 'soldier',
  status: 'active',
};

function changeStatus(soldier) {
  return { ...soldier, status: 'non active' };
}

console.log(changeStatus(obj7));
```

W tym przypadku mamy zdefiniowany obiekt, w którym znajduje się kilka pól. Mamy też funkcję, której zadaniem jest zmiana jednego pola w obiekcie o nazwie `status`.

```js
 {
  name: 'John',
    surname
:
  'Rambo',
    spec
:
  'soldier',
    status
:
  'non active'
}
```

Funkcja zwraca nowy obiekt przez `spread` operatora i dopisuje pole `status` z nową wartością. W ten sposób nadpiszemy poprzednie pole w obiekcie. Z takim użyciem `spread` operatora spotkacie się bardzo często. Zwracamy obiekt o tych samych wartościach, lekko go modyfikując.

## <span id="operator-spread-na-innych-wartościach">Operator spread na innych wartościach</span>

Operator spread możemy także użyć do innych wartości niż obiekty. Przydatność takiego działania nie jest zbyt duża, ale zobaczmy kilka przykładów:

Rozbicie wartości string:

```js
console.log({ ...'foo' }); // { '0': 'f', '1': 'o', '2': 'o' }
```

Otrzymujemy obiekt, gdzie kluczami są kolejne indeksy, a wartościami pojedyncze znaki.

Rozbicie tablicy:

```js
console.log({ ...[100, 200, 300] }); // { '0': 100, '1': 200, '2': 300 }
```

Przy tablicach sytuacja jest bardzo podobna. Pomimo tego, że tablice też są obiektami to nadal istnieją jako podtyp `Array`. Dlatego czasami w kodzie spotkacie się z taką konwersją tablic na typowe obiekty.

Co się jednak stanie, jeżeli użyjemy wartości `null` lub `undefined`:

```js
console.log({ ...null }); // {}
console.log({ ...undefined }); // {}
```

W takim przypadku otrzymamy puste obiekty. Z taką sytuacją już częściej możemy się spotkać w naszym kodzie. Z wartości `null` i `undefined` powstaje pusty obiekt, ale posiada on jako prototyp główny Object z JavaScript. Nie jest to więc w pełni pusty obiekt, jaki może powstać przy przekazaniu
do `Object.create()` wartości `null`.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- operator `spread` rozbija obiekt na pojedyncze właściwości
- operator `spread` może nam posłużyć do łączenia obiektów lub tworzenia kopii
- operator `spread` tworzy *shallow copy* obiektów

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
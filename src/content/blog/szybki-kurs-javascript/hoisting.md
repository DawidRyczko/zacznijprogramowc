---
title: "Hoisting w JavaScript: Szybki Kurs #28"
description: "Omówienie hoistingu w JavaScript: przenoszenie deklaracji, funkcje, wyrażenia funkcji, const i let."
date: 2025-02-23
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Hoisting](#hoisting)
* [Przenoszenie deklaracji](#przenoszenie-deklaracji)
* [Hoisting a funkcje](#hoisting-a-funkcje)
* [Wyrażenie funkcji a hoisting](#wyrażenie-funkcji-a-hoisting)
* [Hoisting przy const i let](#hoisting-przy-const-i-let)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="hoisting">Hoisting w JavaScript</span>

Omawiając zakresy w JavaScript, trzeba jeszcze wspomnieć o bardzo ważnej rzeczy, którą jest hoisting. Jest to zagadnienie, które może zdziwić naprawdę wielu programistów.

Tylko dobry przykład może nam to zobrazować:

```js
a = 42;

var a;

console.log(a);
```

Na początku do zmiennej `a` przypisuję wartość 42. Dopiero w kolejnej linii deklaruję zmienną `a`. W ostatniej linii wypisuję wartość.

Pytanie teraz jakiej wartości się spodziewacie? Czy to będzie `undefined`, błąd czy może po prostu `42`

```text
42
```

Odpowiedzią jest wartość 42. Jeżeli programujecie w innych językach programowania, prawdopodobnie spotkacie się z błędem, a JavaScript sobie z tym poradził.

Zobaczmy jeszcze jeden przykład, zanim zacznę tłumaczyć, dlaczego tak to działa w JavaScript:

```js
console.log(b) // undefined
var b = 2;
```

W tym przykładzie staram się wypisać zmienną `b` do konsoli, a dopiero potem następuje deklaracja zmiennej `b`. Jak widzimy zmienna `b` ma wartość `undefined`, tak jakby była zadeklarowana wcześniej, ale bez przypisanej wartości. JavaScript znowu nie zgłasza w tym przypadku błędu. Wyjaśnijmy sobie,
jak to działa.

## <span id="przenoszenie-deklaracji">Przenoszenie deklaracji</span>

JavaScript wykonuje kompilację kodu, a dopiero potem go wykonuje. Gdy JavaScript dokonuje kompilacji kodu, wyszykuje między innymi wszystkie deklaracje zmiennych czy funkcje. Deklaracje, które zostają znalezione w czasie kompilacji kodu, są ustawiane na początku zakresu.

Przykład, który widzieliśmy:

```js
a = 42;

var a;

console.log(a);
```

zmienia postać na taką:

```js
var a;

a = 42;

console.log(a);
```

Deklaracja w czasie kompilacji przeniesiona jest na początek zakresu, dlatego w czasie wykonywania kodu program wygląda już normalnie i nie zgłasza błędu o tym, że próbujemy przypisać wartość do zmiennej, która nie jest zadeklarowana.

Podobnie wygląda to z drugim przykładem:

```js
console.log(b) // undefined
var b = 2;
```

Po wykonaniu hoistingu kod wygląda tak:

```js
var b;
console.log(b) // undefined
b = 2;
```

Tutaj także nastąpi najpierw deklaracja, potem wypisanie zmiennej i dopiero na końcu przypisanie wartości. Kompilator rozbije sobie tę jedną linię kodu, gdzie nastąpiła deklaracja z przypisaniem. Przeniesie deklarację na początek zakresu.

Patrząc na ten przykład jeszcze raz, widzimy, że kompilator rozdziela deklarację od przypisania zmiennej. Są to dla niego dwa różne działania. Deklaracje tworzone są w czasie kompilacji i są przenoszone na początek zakresu.

Dopiero w czasie wykonywania kodu następuje przypisanie do zmiennej wartości. I to jest bardzo ważna rzecz do rozróżnienia.

## <span id="hoisting-a-funkcje">Hoisting a funkcje</span>

Hoisting działa także w przypadku deklaracji funkcji:

```js
bar();

function bar() {
  console.log('bar')
};
```

W tym przykładzie wykonujemy funkcję `bar`  przed jej zadeklarowaniem. JavaScript nie ma z tym żadnego problemu.

```js
function bar() {
  console.log('bar')
};

bar();
```

Dzieje się tak, jak w przypadku zmiennych. Funkcja `bar` zostaje przeniesiona na początek zakresu jako deklaracja funkcji. Dlatego znowu JavaScript pozwala na wykonanie kodu, który jest zadeklarowany później.

## <span id="wyrazenie-funkcji-a-hoisting">Wyrażenie funkcji a hoisting</span>

Trochę inaczej jest, gdy stworzymy wyrażenie funkcji:

```js
foo()
var foo = function test() {
};
```

W takim przypadku czeka nas błąd, ponieważ w czasie hoistingu, deklaracja zmiennej `foo` zostanie przeniesiona na początek zakresu:

```js
var foo;
foo() // error
foo = function test() {
};
```

Najpierw mamy deklarację funkcji, potem mamy jej wywołanie, a dopiero na końcu mamy jej przypisanie. Wyrażenie funkcji to tak naprawdę stworzenie zmiennej i proces hoistingu jest tutaj dokładnie taki sam.

## <span id="hoisting-przy-const-i-let">Hoisting przy const i let</span>

Do tej pory pokazywałem przykłady Hoistingu związane z deklaracją za pomocą `var`. Hoisting obejmuje także deklaracje za pomocą słów kluczowych `const` i `let`. Są tutaj jednak pewne różnice:

```js
console.log(x); // undefined
console.log(z); // error

var x;
let z;
```

W tym przykładzie jeszcze przed zadeklarowaniem zmiennych próbuję wypisać je do konsoli. Obie deklaracje podlegają pod hoisting i są przenoszone na początek zakresu.

Zmienna `x` jako zadeklarowana, ale nie mająca przypisanej wartości otrzymuje wartość `undefined`.

Zmienna `z`, także trafia na początek zakresu i jest zadeklarowana, jednak odwołanie się do niej nie jest możliwe. Zmienna ta znajduje się w Tymczasowej Martwej Strefie (TDZ - Temporal Dead Zone).

Zmienna przebywa tam tak długo, aż program w czasie wykonywania kodu natrafi na deklarację zmiennej  `z`. Trzeba pamiętać, że nasz kod fizycznie nie zmienia się i jest wykonywany linia po linii. To, że następuje hoisting, nie oznacza, że fizycznie nasze zmienne przenoszone są na początek zakresu.
Kod będzie wykonywał się tak, jak został zapisany.

Jednak przy zmiennych `var`, JavaScript nie czeka, aż napotka je w kodzie, jeżeli są deklaracje wyniesione przez hoisting, to następuje ich inicjalizacja.

Przy zmiennych `const` i `let`, je inicjalizacja oczekuje w Tymczasowej Martwej Strefie i gdy JavaScript przy wykonywaniu kodu natrafi na deklarację, to usuwa ją z Tymczasowej Martwej Strefy i dopiero wtedy tę deklarację wykonuje.

Tak naprawdę, można to wszystko sprowadzić do zdania, że nie możemy użyć zmiennych `const` i `let` przed ich deklaracją w kodzie, to odróżnia ich od zmiennej `var`.

Różnica w działaniu jest znaczna, a dzięki `const` i `let` możemy w kodzie zachować naturalny porządek.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- hoisting to przeniesienie deklaracji na początek zakresu kodu
- w czasie kompilacji następuje deklaracja zmiennych
- w czasie wykonania kodu następuje przypisanie wartości do zmiennych
- hoisting dotyczy także funkcji
- zmienne `const` i `let` podlegają pod hoisting, nie można się do nich odwołać przed deklaracją
- z hoistingiem nie powinniśmy mieć problemów, gdy nie używamy `var`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
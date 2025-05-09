---
title: "Deklaracje funkcji w JavaScript: Szybki Kurs #30"
description: "Różne sposoby deklarowania funkcji w JavaScript: standardowe funkcje, wyrażenia funkcyjne, funkcje strzałkowe."
date: 2025-02-21
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Deklaracje funkcji](#deklaracje-funkcji)
* [Standardowa funkcja](#standardowa-funkcja)
* [Funkcja bez parametrów](#funkcja-bez-parametrow)
* [Wyrażenie funkcyjne](#wyrazenie-funkcyjne)
* [Wyrażenie funkcyjne z nazwą](#wyrazenie-funkcyjne-z-nazwa)
* [Arrow functions](#arrow-functions)
* [Arrow function i return](#arrow-function-i-return)
* [Arrow function i jeden parametr](#arrow-function-i-jeden-parametr)
* [Arrow function bez parametrów](#arrow-function-bez-parametrow)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="deklaracje-funkcji">Deklaracje funkcji</span>

W JavaScript funkcję możemy zadeklarować na kilka sposobów. Dodatkowo sama funkcja może mieć kilka rodzajów. Spotkamy się zatem z definicją funkcji, metody, konstruktora funkcji, funkcją strzałową. W tym dziale zajmiemy się wszystkim, co dotyczy działania funkcji.

## <span id="standardowa-funkcja">Standardowa funkcja</span>

Na początek przyjrzymy się deklaracji funkcji:

```text
function fun1(a, b) {
  return a + b;
}
```

Ten zapis pokazuje standardową funkcję w JavaScript znaną od początku istnienia tego języka. Słowo kluczowe `function` poprzedza deklarację funkcji, potem mamy nazwę funkcji `fun1` oraz nawiasy okrągłe z parametrami. Klamra odpowiedzialna jest za ciało funkcji. A słowo kluczowe `return` za zwracanie
z funkcji wyniku dodania dwóch parametrów.

Wywołanie funkcji wiąże się z użyciem jej nazwy i przekazaniem parametrów:

```text
const result = fun1(1, 3);
console.log(result); // 4
```

Zwracany wynik jest przechowywany w zmiennej i wyświetlony za pomocą `console.log`.

## <span id="funkcja-bez-parametrow">Funkcja bez parametrów</span>

Funkcja oczywiście nie musi przyjmować parametrów i nie musi zwracać jawnie wyniku.

```text
function fun2() {
  console.log('hello');
}
```

W tym przypadku mamy funkcję bez parametrów z wykonaniem instrukcji `console.log`.

## <span id="wyrazenie-funkcyjne">Wyrażenie funkcyjne</span>

W JavaScript możemy także przypisać funkcję do zmiennej.

```text
const fun3 = function(a, b) {
  return a + b;
};
fun3(1, 3);
```

Nazywamy to wyrażeniem funkcyjnym. Funkcja w tym przypadku jest wartością dopisaną do zmiennej `fun3`. Zauważcie, że funkcja nie ma nazwy, jest to funkcja anonimowa.

Funkcje wywołujemy przez nazwę zmiennej, działa to podobnie jak standardowa funkcja. Zauważcie, że na końcu deklaracji takiej funkcji jest średnik, a przy tworzeniu standardowej funkcji nie używamy średnika.

Standardowa funkcja jest instrukcją jak pętla `for` czy warunek `if`, tam też na końcu nie ma średnika. Natomiast wyrażenie funkcyjne jest przypisaniem wartości do zmiennej, gdzie zawsze używa się średnika.

## <span id="wyrazenie-funkcyjne-z-nazwa">Wyrażenie funkcyjne z nazwą</span>

Wyrażenie funkcyjne może być też zapisane z nazwą funkcji:

```text
const fun4 = function fun5(a, b) {
  console.log('foo');
};
fun4();
// fun5(); // error
```

Ten przypadek pokazuje zapis wyrażenia funkcyjnego z nazwą funkcji. Nie możemy się jednak posługiwać jej nazwą, nadal musimy korzystać z nazwy zmiennej, do której została dopisana funkcja.

Nazwa funkcji w tym przypadku jest dostępna tylko w środku tej funkcji. Oraz ma znaczenie przy debugowaniu kodu. Gdy używamy wielu anonimowych funkcji bez nazwy, podczas debugowania trudno jest się zorientować, która funkcja jest która. Nadawanie nazw funkcjom anonimowym może nam pomóc w czasie
debugowania, gdyż nazwy funkcji w stosie wywołania będą wyświetlane.

Pomimo tej zalety w kodzie JavaScript raczej nie spotkacie się z nadawaniem nazw funkcjom anonimowym.

## <span id="arrow-functions">Arrow functions</span>

Oprócz standardowych funkcji w JavaScript, od ES6 mamy dostęp do arrow functions:

```text
const arrow1 = (a, b) => a + b;
```

Funkcje strzałkowe są wyrażeniem, zawsze dopisywanym do zmiennej tak jak wyrażenie funkcyjne. Nie mają nazwy i słowa kluczowego function. Przed strzałką definiujemy parametry funkcji, a po strzałce jest ciało funkcji. W przypadku funkcji jednolinijkowy nie musimy używać dodatkowych nawiasów
klamrowych i słowa kluczowego return.

## <span id="arrow-function-i-return">Arrow function i return</span>

Jeżeli chcemy zapisać w ciele funkcji więcej niż jedną linię, to możemy zrobić taki zapis:

```text
const arrow2 = (a, b) => {
  const c = a + b;
  return c;
};
```

Ten przykład pokazuje funkcję strzałkową, gdzie mamy normalne ciało funkcji z nawiasami klamrowymi i słowem kluczowym return.

## <span id="arrow-function-i-jeden-parametr">Arrow function i jeden parametr</span>

Inny zapis funkcji to bez nawiasów okrągłych. Nawiasy na początku funkcji możemy ominąć w przypadku jednego parametru:

```text
const arrow4 = (a) => a * 2;
```

To jest przykład funkcji gdzie mamy tylko jeden parametr.

## <span id="arrow-function-bez-parametrow">Arrow function bez parametrów</span>

Jeżeli nie mamy parametrów, to musimy wstawić puste nawiasy okrągłe:

```text
const arrow5 = () => 'boo';
```

Ta funkcja nie przyjmuje parametrów, ale zwraca wartość string. Jeżeli arrow function nie przyjmuje parametrów, musimy wstawić puste okrągłe nawiasy.

Do arrow functions będziemy jeszcze wracać, ponieważ posiada ona o wiele więcej ciekawostek niż przedstawione tutaj przykłady.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- standardowe funkcje deklarujemy za pomocą słowa kluczowego `function`
- możemy tworzyć wyrażenie funkcji przypisując ją do zmiennej
- przy wyrażeniu funkcyjnym tworzymy najczęściej funkcje anonimowe
- funkcje anonimowe mogą być nazwane, ale nazwę takiej funkcji możemy użyć tylko wewnątrz funkcji
- od ES6 mamy dostęp do nowoczesnych funkcji strzałkowych
- funkcje strzałkowe mają wiele form zapisu

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
---
title: "Typy w JavaScript: Szybki Kurs #2"
description: "Przegląd typów danych w JavaScript: prymitywne, obiektowe, funkcje i tablice."
date: 2025-03-21
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## <span id="spis-tresci"></span>Spis treści
* [Zmienna nie ma typu, tylko jej wartość](#zmienna-nie-ma-typu-tylko-jej-wartosc)
* [Wypisywanie typu](#wypisywanie-typu)
* [Typ dla funkcji](#typ-dla-funkcji)
* [Typ dla tablicy](#typ-dla-tablicy)
* [Typ bigint](#typ-bigint)
* [Podsumowanie](#podsumowanie)
* [Co warto zapamiętać:](#co-warto-zapamietac)

W tym dziale porozmawiamy o typach. Dowiemy się jakie podstawowe typy istnieją w JavaScript, a także o tym dlaczego wartość null to typ object.

## <span id="zmienna-nie-ma-typu-tylko-jej-wartosc"></span>Zmienna nie ma typu, tylko jej wartość
Można powiedzieć, że w języku JavaScript zadeklarowane zmienne nie mają typów. Dopiero wartości przypisane do tej zmiennej mają typ.

Mało tego JavaScript nie pilnuje w żaden sposób typu przypisanego do zmiennej, w jednej chwili może być to number a w drugiej string czy boolean. Z jednej strony jest to fajne, bo język jest bardzo elastyczny. Z drugiej strony nigdy nie wiadomo, jaki typ kryje się pod zmienną i może to doprowadzić do wielu pomyłek i błędów.

W poniższym przykładzie mamy zmienną value, która na początku zainicjalizowana jest typem string, potem przypisana jest liczba, czyli typ number i na końcu wartość true czyli typ boolean.

```javascript
let value = 'some value';
value = 42;
value = true;
```
Warto jednak pilnować się z taką zmianą wartości dla pojedynczej zmiennej. Może to powodować nieoczekiwane i trudne do znalezienia błędy. Dobrze jest, jeśli stworzona zmienna ma wartość o jednym typie przez cały czas działania programu. Warto przestrzegać tej zasady.

Przyjrzyjmy się teraz dostępnym typom. W języku JavaScript mamy typy proste nazywane też prymitywne jak:

Primitives types:
* null
* undefined
* boolean
* number
* string
* symbol
* bigint

oraz typ złożony (możemy nazwać typ obiektowy czy referencyjny) Object:

Object type:
* object
  subtypes from object:
* function
* array

Typ Object ma jeszcze podtypy, a najważniejsze z nich to Function i Array, które omówimy szczegółowo w oddzielnych działach.

Typ symbol sobie odpuścimy i nie będziemy się teraz nim zajmować ani przejmować. Typ bigint jest stosunkowo nowym typem, omówimy go na końcu.

## <span id="wypisywanie-typu"></span>Wypisywanie typu
Stworzymy teraz zmienne dla poszczególnych typów oraz użyjemy operatora typeof. Za pomocą tego operatora, możemy wypisać typy wartości do konsoli:

Na początek zdefiniuję zmienne dla każdego z podstawowych typów:

```javascript
const nullValue = null;
const undefinedValue = undefined;
const booleanValue = true;
const numberValue = 42;
const stringValue = 'hello';
const objectValue = { a: 42 };
const bigIntValue = 1234567890123456789012345678901234567890n;
```
teraz za pomocą cosnole.log i typeof możemy wypisać typy wartości, które przypisane są do zmiennych:

```javascript
console.log(typeof nullValue); //object
console.log(typeof undefinedValue); //undefined
console.log(typeof booleanValue); //boolean
console.log(typeof numberValue); //number
console.log(typeof stringValue); //string
console.log(typeof objectValue); //object
console.log(typeof bigIntValue); //bigint
```
Widzimy typy dla każdej wartości. Widzimy, że wartość undefined, true, liczba 42, tekst hello, stworzony obiekt i liczba bigint, mają prawidłowo wypisane typy za pomocą operatora typeof.

Natomiast wartość null nie ma swojego typu null, ale jest typu object. Jest to niestety błąd i problem od początku istnienia JavaScript i dzisiaj błąd ten jest już nienaprawialny. To, że jest to typ object nie oznacza, że null jest referencją do czegoś, null niczego nie reprezentuje i nie odnosi się do żadnej referencji. Reprezentuje brak wartości.

## <span id="typ-dla-funkcji"></span>Typ dla funkcji
Będąc przy określaniu typów, warto wspomnieć jeszcze o typach dwóch ważnych elementów języka JavaScript, są to funkcje i tablice.

```javascript
function test() {}

console.log(typeof test); //function
```
Stworzyłem funkcję test i wypisałem jej typ do konsoli. Widzimy typ function. Tak naprawdę typ function jest podtypem object. Dlatego nie rozpatrujemy go jako oddzielnego typu najwyższego rzędu i o funkcjach nie wspomina się jako o oddzielnych typach.

## <span id="typ-dla-tablicy"></span>Typ dla tablicy
Kolejnym elementem jest tablica, która wyświetla typ object. Również możemy powiedzieć, że jest to podtyp typu object.

```javascript
const arr = [];
console.log(typeof arr); // object
```
Do tablic wrócimy jeszcze w oddzielnym dziale i będziemy je szczegółowo omawiać.

## <span id="typ-bigint"></span>Typ bigint
Ostatnim typem, na który zwrócę uwagę jest bigint. Typ ten powstał po to aby operować na bardzo dużych liczbach, z którymi nie radzi sobie typ number. Mowa tu o liczbach większych niż 2^53. Wtedy typ number traci swoją precyzję i dlatego powstał typ bigint.

Sam nie miałem jeszcze okazji używać takich wartości. Jeżeli jednak będziemy pracować na takich liczbach, konieczne jest użycie bigint, a deklaruje się go używając litery n na końcu liczby:

```javascript
const big = 1234567890123456789012345678901234567890n
console.log(typeof big) // bigint
```
Gdy sprawdzimy typ wartości w zmiennej o nazwie big, operator typeof zwróci nam typ bigint.

## <span id="podsumowanie"></span>Podsumowanie
Tak wyglądają typy w języku JavaScript, o którym się mówi, że nie ma typów. O ile sama zadeklarowana zmienna nie ma typu, to wartość przypisana do zmiennej jest określona przez konkretny typ.

W następnych częściach przejdziemy przez poszczególne typy i zapoznamy się z nimi dokładniej. Dowiemy się jak z nimi pracować, jakie powodują problemy i pułapki. Choć mówi się, że JavaScript jest prostym językiem, to niestety posiada wiele niuansów, które warto zrozumieć.

Również dla funkcji, tablic i obiektów poświęcimy zupełnie oddzielne działy.

## <span id="co-warto-zapamietac"></span>Co warto zapamiętać:
* mamy 8 dostępnych typów jak: null, undefined, boolean, number, string, symbol, bigint, object oraz function i array jako podtyp.
* zmienne nie posiadają typów, to wartości posiadają typ
* operator typeof służy do sprawdzania typu wartości przypisanej do zmiennej
* warto przestrzegać zasady i pilnować, aby przez cały program do zmiennej była przypisana wartość jednego typu, wyjątkiem może być wartość null, którą czasami specjalnie musimy przypisać.
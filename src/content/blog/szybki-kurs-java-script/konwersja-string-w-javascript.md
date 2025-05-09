---
title: "Konwersja string w JavaScript: Szybki Kurs #13"
description: "Omówienie konwersji na typ string w JavaScript."
date: 2025-03-10
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Konwersja string](#konwersja-string)
* [`String()`](#string)
* [Konwersja ze znakiem `+`](#konwersja-ze-znakiem--)
* [String na number](#string-na-number)
* [String na boolean](#string-na-boolean)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="konwersja-string">Konwersja string</span>

Konwersja do typu string będzie zdarzała się niezwykle często. Do konwersji na typ `string` możemy użyć funkcji `String()` lub też metody `toString()`, którą można wywołać na każdej zmiennej i obiekcie. Metoda `toString()`
bardzo często wywoływana jest przy wszelkich konwersjach niejawnych na przykład przy poleceniu `console.log()`.

## <span id="string">`String()`</span>

Do funkcji `String()` możemy przekazać każdą wartość:

```js
console.log(String(42)); // '42'
console.log(String(NaN)); // 'NaN'
console.log(String(Infinity)); // 'Infinity'
console.log(String(null)); // 'null'
console.log(String(undefined)); // 'undefined'
console.log(String(true)); // 'true'
console.log(String(false)); // 'false'
```

Zawsze otrzymamy jakaś wartość w postaci łańcuchowej.

Funkcja `String()` jest o tyle bezpieczna, że możemy tam wciąż przekazać `null`  i `undefined`. Czego nie da się zrobić wywołując bezpośrednio funkcję `toString()`.

```js
console.log(42..toString()); // '42'
// console.log(null.toString()); // error
// console.log(undefined.toString()); // error
console.log(NaN.toString()); // 'false'
console.log(true.toString()); // 'false'
console.log(false.toString()); // 'false'
```

W przypadku `null` i `undefined` otrzymamy błąd. Dlatego zawsze bezpieczniej jest wywołać funkcję `String()`.

## <span id="konwersja-ze-znakiem--">Konwersja ze znakiem `+`</span>

Bardzo popularnym sposobem konwersji na typ `string` jest użycie znaku `+` i dodanie pustego stringa do innej wartości. Jest to bardzo często spotykany sposób konwersji do typu `string`.

```js
console.log(42 + ''); // '42'
console.log(null + ''); // 'null'
console.log(undefined + ''); // 'undefined'
console.log(false + ''); // 'false'
console.log(true + ''); // 'false'
```

Gdy po jednej ze stron znaku `+` stoi wartość typu `string` nie zostanie wykonane działanie matematyczne, ale konkatenacja stringów. Oczywiście przed konkatenacją następuje konwersja wartości do typu `string`, a potem połączenie wartości z pustym stringiem. W ten sposób możemy przekonwertować na
typ `string` każdą wartość.

Przy typie `number` możemy wpaść w pułapkę:

```js
console.log(40 + '2'); // '402'
console.log(99 + '1'); // '991'
```

Jeżeli po której stronie operatora `+` stoi string, zawsze nastąpi połączenie stringów. Nie wykonamy w ten sposób działania matematycznego. Trzeba uważać na taką pułapkę i mieć świadomość czy pracujemy na typie `number` czy też na typie `string`.

## <span id="string-na-number">String na number</span>

String na `number` omawiany był już przy okazji konwersji typu `number`:

```js
console.log(Number('')) // 0
console.log(Number('42.5')) // 42.5
console.log(parseInt('42.5')) // 42.5
console.log(parseFloat('42.5')) // 42.5

console.log(Number('42.5xyz')) // NaN
console.log(parseInt('42.5xyz')) // 42
console.log(parseFloat('42.5xyz')) // 42.5
```

Do dyspozycji mamy znane nam już funkcje `Number(), parseInt(), parseFloat()`. Zasada jest bardzo prosta, jeżeli używamy funkcji `Number()` musimy dbać, aby literał typu string reprezentował liczbę.

Jeżeli używamy `parseInt()` lub `parseFloat()` literał nie musi dokładnie przedstawiać liczby, niepotrzebne znaki zostaną wycięte.

Każda liczba w typie string musi zostać zapisana z kropką nie przecinkiem. Wtedy jest to poprawna reprezentacja liczby w JavaScript.

## <span id="string-na-boolean">String na boolean</span>

Jeśli chodzi o konwersję wartości w typie `string` na typ `boolean` wiemy już, że pusty string to wartość `false`, a każdy niepusty string to wartość `true`.

```js
console.log(Boolean('')); // false
console.log(Boolean('foo')); // true
```

Jeżeli będziemy operować takimi wartościami jak `'true'` oraz `'false'` zapisane jako string

```js
console.log(Boolean('false')) // true
console.log(Boolean('true')) // true
```

nie będziemy mogli użyć wbudowanej funkcji `Boolean()` do ich konwersji na typ `boolean`.

Przy takiej konwersji zawsze otrzymamy wartość `true`. Musimy zatem stworzyć własną implementację i porównać wartości:

```js
const someValue = 'false';
const result = someValue === 'true';
console.log(result); // false
```

Wynikiem porównania w JavaScript jest zawsze jakaś wartość `boolean`. Porównujemy czy zmienna `value` jest napisem `'true'` jeżeli tak otrzymamy `true` jako `boolean`, jeżeli nie, otrzymamy `false`. Tak w najprostszy sposób możemy dokonać konwersji literałów `'true'` oraz `'false'` na typ `boolean`.

Przy tym zapisie, warto jeszcze mieć pewność, że porównywane łańcuchy mają tą samą wielkość liter. Dla bezpieczeństwa warto dołożyć wywołanie metody `toUpperCase()` i być może obciąć puste znaki przez metodę `trim()`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- funkcja `String()` to doskonały sposób na konwersję do typu `string`

- innym sposobem jest wywołanie metody `toString()` która jest zapewniona dla każdego typu
- dodanie pustego stringa do jakiejś wartości spowoduje konwersję na typ `string`
- na typ `number` konwertujemy stringi za pomocą funkcji `Number(), parseInt() lub parseFloat()`
- stringowy zapis wartości `true` i `false` możemy przekonwertować przez stworzenie własnej funkcji
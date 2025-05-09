---
title: "Konwersja boolean w JavaScript: Szybki Kurs #11"
description: "Omówienie konwersji na typ boolean w JavaScript. Wartości fałszywe i prawdziwe, konwersja przez negację, konwersja boolean na number i string."
date: 2025-03-12
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Konwersja boolean](#konwersja-boolean)
* [Wartości fałszywe i prawdziwe](#wartości-fałszywe-i-prawdziwe)
* [Konwersja przez operator logicznej negacji do `boolean`](#konwersja-przez-operator-logicznej-negacji-do-boolean)
* [Konwersja `boolean` na `number`](#konwersja-boolean-na-number)
* [Konwersja `boolean` na `string`](#konwersja-boolean-na-string)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="konwersja-boolean">Konwersja boolean</span>

W tym dziale będziemy omawiać konwersję na typ `boolean` oraz konwersje wartości `boolean` na inne typy jak `string` i `number`. Przyjrzymy się jawnym metodom konwersji jak na przykład funkcji `Boolean()`, którą już trochę omawialiśmy.

Oprócz jawnej konwersji na typ często będziecie mieli do czynienia z niejawną konwersją. Dotyczy ona często instrukcji warunkowych, pętli, operatorach porównania i operatorach logicznych.

Wszystkie sposoby porównania także logicznego omówimy sobie jeszcze w oddzielnych działach. Teraz skupmy się na tym jak konwertować na typ `boolean` i jak konwertować wartości tego typu do innych typów.

## <span id="wartości-fałszywe-i-prawdziwe">Wartości fałszywe i prawdziwe</span>

Jednym z jawnych sposobów konwersji jest użycie funkcji `Boolean()`. Do tej funkcji możemy wstawić dosłownie wszystko.

Niektóre wyniki jawnych konwersji mogą być łatwe do przewidzenia, niektóre jednak mogą wydawać się nam mało logiczne. Wszystko natomiast opiera się na wartościach fałszywych. Wartości fałszywe, są określone w specyfikacji, a także na stronie
MDM https://developer.mozilla.org/en-US/docs/Glossary/Falsy.

Jest to krótka i ściśle określona lista, pokazująca, która wartości po konwersji do typu `boolean`, staną się wartościami `false`.

Lista wartości fałszywych jest czymś, co powinniśmy zapamiętać, pracując w JavaScript:

```js
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

Specyfikacja dokładnie określa, jaka wartość jest konwertowana na wartość `false`. Są to wszystkie wartości puste, nic nie reprezentujące jak `null` i `undefined`, wszystkie liczby, które nie mają żadnej wartości jak zera i wartość `NaN`, pusty string oraz oczywiście sama wartość `false`.

Drugą rzeczą do zapamiętania jest to, że wszystko, co nie znajduje się na liście wartości fałszywych, konwertuje się do wartości `true`. Jak się domyślacie listy z wartościami `true` nie ma, ponieważ byłaby ona niesamowicie długa, a może nawet nieskończenie długa.

Podam tylko kilka ciekawych przypadków wartości `true`, które mogą wydawać się `false`:

```js
console.log(Boolean('false')); // true
console.log(Boolean('0')); // true
console.log(Boolean(-1)); // true
console.log(Boolean('""')); // true
console.log(Boolean('   ')); // true
console.log(Boolean(Infinity)); // true
console.log(Boolean(-Infinity)); // true
console.log(Boolean({})); // true
console.log(Boolean([])); // true
```

Zero jest tutaj zapisane jako string, a niepusta wartość string konwertuje się do `true`.

Liczba `-1` także konwertuje się do `true`, ponieważ nie ma jej na liście wartości fałszywych.

Wątpliwości mogą budzić te dwie wartości wyglądające jak puste znaki:

```js
console.log(Boolean('""')); // true
console.log(Boolean('   ')); // true
```

Pierwsza z nich reprezentuje dwa znaki podwójnego cudzysłowu, druga reprezentuje trzy spacje. Nie są to więc puste stringi więc konwertują się na wartość `true`.

Tak samo obiekty i listy. Nie jest istotne czy są to elementy puste, czy nie. Zawsze nastąpi konwersja do wartości `true`
.

Nie dajmy się więc zmylić takimi wartościami. Jak wspominałem, wystarczy zapamiętać, co jest wartościami fałszywymi, jeżeli coś nie istnieje na liście wartości fałszywych, przekonwertuje się do `true`.

## <span id="konwersja-przez-operator-logicznej-negacji-do-boolean">Konwersja przez operator logicznej negacji do `boolean`</span>

Oprócz funkcji `Boolean()`, możecie spotkać się z konwersją do typu `boolean` przez użycie podwójnego operatora logicznej negacji. Operator logicznej negacji omówmy jeszcze dodatkowo przy operatorach logicznych.

Teraz bardziej skupimy się na tym, jak konwertować wartości za pomocą tego operatora.

Na razie przyjrzyjmy się, co robi operator negacji, czyli pojedynczy wykrzyknik `!`:

```js
console.log(!true); // false
console.log(!false); // true
console.log(!null); // true
console.log(!'test'); // false
```

Za jego pomocą, jawnie konwertujemy do wartości `boolean`, ale odwracamy wynik. Dlatego wszystko, co powinno być `true`
staje się `false`, a wszystko, co powinno być `false`, staje się `true`.

Co prawda przekonwertowaliśmy wartości na typ `boolean`, ale są one odwrócone. Jeżeli jednak chcemy przekonwertować wartość do typu `boolean` bez odwracania wartości, należy użyć podwójnego operatora negacji:

```js
console.log(!!null); // false
console.log(!!0); // false
console.log(!!'test'); // true
```

To działanie tak naprawdę ma dwa kroki. Pierwszy to konwersja do `boolean` i odwrócenie wartości. Drugi krok to ponowne odwrócenie wartości `boolean`. Otrzymujemy tym razem prawidłowe wartości w typie `boolean`.

Może się to wydawać za mało wydajne lub zbyt skomplikowane, sposób ten jest jednak dość często spotykany w kodzie. Jest bardzo krótki zapis jawnej konwersji do `boolean`.

## <span id="konwersja-boolean-na-number">Konwersja `boolean` na `number`</span>

Gdy chcemy dokonać konwersji `boolean` na typ `number` mamy sporo możliwości.

Pierwszą z nich jest oczywiście użycie funkcji `Number()`:

```js
console.log(Number(true)); // 1
console.log(Number(false)); // 0
```

Jest to bardzo czytelny zapis konwersji. Z wartości `true` otrzymujemy wartość `1`, natomiast z wartości `false`
otrzymujemy wartość `0`. To wynika głównie ze specyfikacji ECMAScript.

Niech was jednak nie zmyli to, że tylko liczba `1` konwertuje się ponownie na wartość `true`:

```js
console.log(Boolean(-1)); // true
console.log(Boolean(-100)); // true
console.log(Boolean(999)); // true
console.log(Boolean(1.2)); // true
console.log(Boolean(0.000009)); // true
```

Oczywiście każda liczba różna od `0` i `-0` będzie konwertowana na `true` bo tak wynika ze specyfikacji i tabelki wartości fałszywych. Więc nie wpadnijmy w pułapkę, że tylko liczba `1` jest wartością `true`.

Możemy jeszcze dokonać konwersji za pomocą jednoargumentowego operatora `+`:

 ```js
console.log(+true); // 1
console.log(+false); // 0
 ```

Jest to jawna konwersja do typu `number`. Operator `+` jest używany do konwersji wszystkich wartości na typ `number`, nie tylko wartości `boolean` i oczywiście może nam zastąpić funkcję `Number()`.

To samo możemy zrobić za pomocą jednoargumentowego operatora negacji reprezentowanego przez znak `-`, ale wtedy otrzymujemy wartości ujemne:

```js
console.log(-true); // -1
console.log(-false); // -0
```

Niech was nie zdziwi wartość `-0`, wartość taka istnieje w JavaScript.

W Internecie znajdziecie jeszcze więcej pomysłów konwersji wartości `boolean` na typ `number`. Co będziecie używać, zależy głównie od Waszych preferencji i ustaleń w teamie. Dla mnie najczytelniejszą wersją konwersji jest wersja z funkcją `Number()`.

## <span id="konwersja-boolean-na-string">Konwersja `boolean` na `string`</span>

Ostatnią możliwą konwersją typu `boolean` jest konwersja na typ `string`. Konwersja na typ `string` jest bardzo prosta, możemy na wartości `boolean`, wywołać metodę `toString()`:

```js
const b1 = true;
const b2 = false;

console.log(b1.toString()); // 'true'
console.log(b2.toString()); // 'false'
```

Otrzymamy wartości w postaci tekstu. Pamiętajmy, że nie ma już odwrotu i nie możemy z wartości tekstowej `'false'`, uzyskać wartości `false` w typie `boolean`. Z tekstowej wartości `'false'` otrzymamy wartość `true` po konwersji za pomocą funkcji `Boolean()` :

```js
console.log(Boolean('false')); // 'true'
```

Oczywiście już wiemy dlaczego tak się dzieje. Tylko puste stringi według tabelki wartości fałszywych mogą konwertować się do wartości `fasle`. Dlatego powrotu do wartości `false` już nie ma za pomocą zwykłej konwersji do `boolean`.

Ponieważ wywołanie metody `toString()` może być czasami niebezpieczne, gdy natrafimy na wartość `null` lub `undefined`
warto też wykorzystać funkcję `String()` do jawnej konwersji.

```js
console.log(String(b1)); // 'true'
console.log(String(b2)); // 'false'
```

Kolejnym sposobem na konwersję, chociaż mniej jawne jest użycie operatora `+` z dwoma argumentami:

```js
console.log(true + ''); // 'true'
console.log(false + ''); // 'false'
```

Gdy jedna ze stron reprezentuje typ `string` nie następuje tutaj działanie matematyczne a konkatenacja stringów. Dlatego w tym przypadku wartości `boolean` przechodzą przez konwersję do typu `string` i ostatecznie są łączone z pustym stringiem. Dostajemy więc wartości `boolean` zapisane jako string.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- każdą wartość w JavaScript da się przekonwertować na typ `boolean`
- jawna konwersja na typ `boolean` jest przewidywalna, gdy znamy tabelkę wartości fałszywych
- jeżeli czegoś nie ma w wartościach fałszywych to zawsze będzie wartością `true`
- do konwersji jawnej na typ `boolean` używamy funkcji `Boolean()`
- kolejnym sposobem konwersji jawnej jest użycie operatora logicznej negacji `!`
- przy konwersji na typ `number` używamy funkcji `Number()` lub operatora jednoargumentowego `+` oraz `-`
- przy konwersji na typ `string` używamy metody `toString()`, funkcji `String()` lub korzystamy z konkatenacji znaków przez operator `+`
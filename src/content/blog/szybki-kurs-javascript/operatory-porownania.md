---
title: "Operatory porównania w JavaScript: Szybki Kurs #14"
description: "Omówienie operatorów porównania w JavaScript."
date: 2025-03-09
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Operatory porównania](#operatory-porownania)
* [Operatory równości i nierówności `==` i `!=`](#operatory-rownosci-i-nierownosci--i-)
* [Operatory równości i nierówności `===` i `!==`](#operatory-rownosci-i-nierownosci--i--)
* [Operator większy `>` i mniejszy `<`](#operator-wiekszy--i-mniejszy-)
* [Porównanie stringów](#porownanie-stringow)
* [Operator większy i równy `>=` oraz mniejszy i równy `<=`](#operator-wiekszy-i-rowny--oraz-mniejszy-i-rowny-)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="operatory-porownania">Operatory porównania</span>

Ten dział poświęcony jest operatorom porównania. Operatory porównania, po porównaniu wartości zawsze zwracają nam wartości `boolean`. W języku JavaScript mamy w miarę standardowe operatory porównania:

```text
== Equality operator
!= Inequality operator
=== Identity operator
!== Nonidentity operator
> Greater than operator
< Less than operator
>= Greater than or equal operator
<= Less than or equal operator
```

Większość tych operatorów zobaczycie także w innych językach programowania. W większości języków mogą działać podobnie, ale mamy do czynienia z JavaScript i zawsze czają się jakieś niuanse. Na szczególną uwagę na pewno zasługuje podwójny operator porównania i nierówności.

Przeanalizujemy więc sobie wszystkie operatory oraz te niuanse.

## <span id="operatory-rownosci-i-nierownosci--i-">Operatory równości i nierówności `==` i `!=`</span>

O operatorze równości, który jest reprezentowany przez dwa znaki, mówiliśmy już kilka razy. Porównuje on wartości, dokonując niejawnej konwersji:

```js
console.log(1 == 1); // true
console.log("1" == 1) // true
console.log(true == 1) // true
console.log(null == undefined) // true
```

Wyniki tych porównań nie są dla nas oczywiste ani intuicyjne. Bez wspomagania się specyfikacją czy specjalną tabelką, która została stworzona przez użytkownika `Dorey` na Githubie ciężko zorientować się, jaki wynik otrzymamy https://dorey.github.io/JavaScript-Equality-Table/

To samo dotyczy sprawdzenia nierówności za pomocą operatora dwuznakowego `!=`:

```js
console.log(1 != 1); // false
console.log("1" != 1) // false
console.log(true != 1) // false
console.log(null != undefined) // false
```

Wyniki ze sprawdzenia nierówności w taki sposób również nie są oczywiste i logiczne. Tu również zachodzą niejawne konwersje do różnych typów i dopiero potem następuje porównanie.

Dobra rada dla programistów JavaScript to unikanie operatorów dwuznakowych do porównywania i sprawdzania nierówności.

## <span id="operatory-rownosci-i-nierownosci--i--">Operatory równości i nierówności `===` i `!==`</span>

Operator równości i nierówności z trzema znakami to dzisiaj standard porównania dwóch wartości w JavaScript. Działa on bardzo dokładnie i transparentnie.

```js
console.log(1 === 1); // true
console.log("1" === 1); // false
console.log(true === 1) // false
console.log(null === undefined); // false
```

Jego zadaniem jest sprawdzenie, czy wartości mają ten sam typ, jeżeli tak to następuje porównanie wartości i zwrócenie `true` lub `false`. Jeżeli typy są różne, od razu dostajemy wynik `false` bez sprawdzania już wartości.

Również operator nierówności działa tak samo:

```js
console.log(1 !== 1); // false
console.log("1" !== 1); // true
console.log(true !== 1) // true
console.log(null !== undefined); // true
```

Najpierw sprawdza, czy próbujemy porównać te same typy. Jeżeli typy są różne, to zwracane jest `true` ponieważ już wiadomo, że różne typy mają różne wartości. Jeżeli typy są takie same, porównuje jeszcze wartości.

Operator równości i nierówności reprezentowane przez trzy znaki to operatory, które na co dzień będziecie używać w JavaScript. Działanie tych operatorów jest proste i intuicyjne, bo nie zachodzą tutaj żadne konwersje.

## <span id="operator-wiekszy--i-mniejszy-">Operator większy `>` i mniejszy `<`</span>

Operator większości w JavaScript działa tak samo, jak w matematyce:

```js
console.log(100 > 1); // true
console.log(1 > 100); // false
console.log(1 > 1); // false
```

Jeżeli lewa strona jest większa otrzymujemy wartość `true` w innym wypadku wartość `false`.

Operator mniejszości działa w drugą stronę sprawdzając, czy lewa strona jest mniejsza:

```js
console.log(100 < 1); // false
console.log(1 < 100); // true
console.log(1 < 1); // false
```

Wszystko jest bardzo proste i oczywiste, gdy pracujemy na liczbach. Zobaczmy co się dzieje, gdy używamy różnych typów:

```js
console.log('100' > 1); // true
console.log(true > false); // true
console.log(false < 1); // true
```

Jeżeli używamy różnych typów, JavaScript próbuje wartości sprowadzić do typu `number` . Dlatego udaje nam się porównać liczbę `'100'` zapisaną jako string z liczbą 1. Nastąpi konwersja `string` do `number`, a potem nastąpi porównanie.

Również udaje nam się porównać wartości `true` i `false` ponieważ to są wartości, które konwertują się na typ `number`.

Zobaczmy jednak ciekawsze przykłady:

```js
console.log(1 > 'foo'); // false
```

W tym przykładzie próbujemy sprawdzić, czy `1` jest większe od losowej wartości tekstowej. String, który nie reprezentuje liczby w żaden sposób, zostanie przekonwertowany na wartość `NaN`.

Wartość `NaN` ani nie jest większa od liczby, ani nie jest mniejsza od żadnej liczby:

```js
console.log(0 > NaN); // false
console.log(0 < NaN); // false
```

Nie da się porównać wartości `NaN` z liczbami, pomimo że jest typu `number`. Każde porównanie zwróci `false`.

Samo `undefined` konwertowane do liczby także zwraca `NaN`.

```js
console.log(0 > undefined); // false
console.log(0 < undefined); // false
```

Porównanie `undefined` z jakąś wartością liczbową zawsze będzie zwracała wartość `false` w każdym wariancie.

Inaczej jest z wartością `null`:

```js
console.log(1 > null); // true
console.log(1 < null); // false
```

Wartość `null` konwertowana do `number` zwraca wartość `0` dlatego jest możliwe porównanie z liczbą. W przypadku sprawdzenia, czy 1 jest większe od `null` otrzymamy wartość `true`.

Tak więc gdy używamy dwóch różnych typów, następuje próba sprowadzenia ich do typu `number` i trzeba mieć to na uwadze.

## <span id="porownanie-stringow">Porównanie stringów</span>

Inaczej jest, gdy próbujemy porównać dwie wartości o typie `string`, nie zachodzi tutaj żadna konwersja do typu `number`, a porównanie ciągów tekstowych:

```js
console.log('a' > 'A'); // true
console.log('AB' > 'a') // false
console.log('a' > '1234') // true
```

Przy takim porównaniu pod uwagę brany jest każdy znak, a nie długość ciągów tekstowy. Porównany jest nie tyle znak co jego wartość w tablicy Unicode.

W pierwszym przypadku literka `a` ma numer kodowy `97` natomiast duża litera `A` ma numer kodowy `65`, dlatego wbrew intuicji otrzymujemy wartość `true`. Czyli mała literka jest większa od dużej.

W drugim przypadku gdzie porównujemy ciąg z dwóch znaków, do ciągu z jednym znakiem okazuje się, że ciąg znaków `AB`
wcale nie jest większy niż jedna litera `a`. Duża litera `A` ma mniejszy numer kodowy niż mała litera `a` dlatego od razu zwracany jest wynik `false`, a dalsze porównanie nie następuje.

Takich porównań na wartościach `string` raczej nie będziecie używać lub nie powinniście. Przy porównaniach większe i mniejsze najbezpieczniejszą opcją jest praca na wartościach typu `number`.

## <span id="operator-wiekszy-i-rowny--oraz-mniejszy-i-rowny-">Operator większy i równy `>=` oraz mniejszy i równy `<=`</span>

Operatory większy i równy oraz mniejszy i równy podlegają tym samym zasadom co operator większy i mniejszy.

Oprócz tego, że dodatkowo sprawdzają możliwą równość.

```js
console.log(100 <= 1); // false
console.log(1 >= 100); // false
console.log('100' >= 1); // true
console.log(1 <= '100'); // true
console.log(1 >= 'blabla'); // false
console.log(1 >= null); // true
console.log(1 <= null); // false
```

Jeżeli jakaś strona jest inna niż typ `number` następuje konwersja.

Jeżeli są to stringi, następuje porównanie ciągów znakowych według tabeli Unicode i tych samych zasad co omówiliśmy.

```js
console.log('AB' >= 'a') // false
console.log('a' <= '1234') // false
```

Pomimo tego, że przy operatorach większy i mniejszy, także następują niejawne konwersje, nie są one tak straszne jak przy podwójnym operatorze sprawdzania równości. Warto jednak te operatory pozostawić do pracy z liczbami, ponieważ praca na typie `string` nie jest zbyt czytelna i intuicyjna.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- dwuznakowy operator równości dokonuje niejawnych konwersji przed porównaniem i jego wyniki nie są oczywiste
- operator porównania z trzema znakami sprawdza typ i wartość, jest to bezpieczna i najlepsza forma porównania
- operatory większości i mniejszości pracują na typie `number` jeżeli nie dostarczamy typu `number` następuje konwersja do takiego typu
- jeżeli do operatorów większości i mniejszości podstawimy stringi nastąpi próba porównywania stringów według kodów Unicode
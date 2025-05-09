---
title: "Typ boolean - typ logiczny w JavaScript: Szybki Kurs #4"
description: "Omówienie typu boolean w JavaScript, wartości true i false, konwersje i pułapki związane z obiektem Boolean."
date: 2025-03-19
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Typ boolean - typ logiczny](#typ-boolean---typ-logiczny)
* [Wartość typu boolean](#wartość-typu-boolean)
* [Wartość "false", "true" to nie boolean](#wartość-false-true-to-nie-boolean)
* [Wartość 0 i 1 nie reprezentują typu `boolean`](#wartość-0-i-1-nie-reprezentują-typu-boolean)
* [Obiekt Boolean i funkcja Boolean()](#obiekt-boolean-i-funkcja-boolean)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="typ-boolean---typ-logiczny">Typ boolean - typ logiczny</span>

Przed nami omówienie typu boolean. Jest to typ, który występuje niezwykle często w języku JavaScript, przeważnie po niejawnych konwersjach. Dowiedzmy się jak rozpoznać co będzie `true`, a co `false` w naszej aplikacji.

## <span id="wartość-typu-boolean">Wartość typu boolean</span>

Typ logiczny `boolean`, jest używany do sprawdzania wszelkich warunków, ustawiania flag czy stanów aplikacji. Typ `boolean` jest na pewno znany każdemu kto uczył się lub zna jakikolwiek język programowania.

Jest to typ który może posiadać tylko dwie wartości:

```js
true
false
```

Poprzedni typ `undefined` miał jedną wartość `undefined`, a `null` który był niestety typem `object` miał jedną wartość `null`. W tym przypadku mamy już typ, który może mieć dwie wartości.

Utwórzmy dwie zmienne, które będą przechowywały wartość `true` i wartość `false`:

```js
const isDone = false;
const isAdult = true;
```

wypiszę teraz obie zmienne za pomocą `console.log` i sprawdzę także ich typy:

```js
console.log(isDone, typeof isDone) // false boolean
console.log(isAdult, typeof isAdult) // true boolean
```

W konsoli zobaczymy wartość `false` i typ `boolean` oraz wartość `true` i typ `boolean`. Tym razem JavaScript  (na razie) nas niczym nie zaskakuje.

Przy okazji zwrócę uwagę na `console.log` do którego po przecinku przekazałem więcej niż jeden argument. Jest to zapis, który pozwala wypisać nam jednocześnie więcej wartości. Możemy tam przekazać dowolną liczbę argumentów.

### <span id="wartość-false-true-to-nie-boolean">Wartość "false", "true" to nie boolean</span>

Jeżeli spotkacie się z zapisem wartości `false` lub `true` w cudzysłowie, to musicie pamiętać, że nie jest to wartość `boolean`. Zobaczmy taki przykład gdzie mam zadeklarowaną zmienną `isOpen`:

```js
const isOpen = 'false';
console.log(typeof isOpen); // string
```

Do zmiennej `isOpen` mam przypisaną wartość `'false'`, ale jako tekst, czyli jest to typ `string`. Nie ma to nic wspólnego z typem `boolean`.

Jeszcze bardziej możecie być zdziwieni, gdy przekonwertuję tego stringa na wartość `boolean`:

```js
console.log(Boolean(isOpen)); // true
```

Konwersja na typ `boolean` napisu `'false'`, zwraca `true`. I oczywiście działa to prawidłowo, mówiliśmy już o specyfikacji ECMAScript, w której umieszczone są informacje, jakie wartości konwertowane są do `false`.

https://developer.mozilla.org/en-US/docs/Glossary/Falsy

Przypominam jeszcze raz tę rozpiskę:

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

Jak widzimy, tylko pusty string `''` jest konwertowany do wartości `false`. Tak więc napis `'false'` konwertowany do typu `boolean` będzie miał wartość `true` ponieważ nie jest pustym stringiem.

Mówię o tym tyle, ponieważ jest to częsta zagwozdka początkujących programistów JavaScript. Często też, możecie być o to zapytani na rozmowie rekrutacyjnej.

Należy zapamiętać, że napis `'true'` i `'false'` to jest typ `string` a nie `boolean`. Nie ma to nic wspólnego z wartościami `true` i `false`, które są typu `boolean`.

Niepusty string konwertowany do `boolean`, da nam zawsze wartość `true`. Ponieważ każdy niepusty string konwertowany jest do wartości `true`, a tylko pusty string konwertowany jest do wartości `false`.

## <span id="wartość-0-i-1-nie-reprezentują-typu-boolean">Wartość 0 i 1 nie reprezentują typu `boolean`</span>

Będąc przy tym problemie warto jeszcze wspomnieć o wartości `1` i `0`. Również często możecie zostać zapytani o to na rozmowie o pracę. Wartość `1` i `0` nie reprezentują typu `boolean`. Wartości te reprezentują typ `number`. Niestety jest mylne przekonanie, że te wartości reprezentują
kolejno `true` i `false`.

```js
console.log(typeof 1, Boolean(1));
console.log(typeof 0, Boolean(0));
```

Wartość `0` zawsze będzie konwertowana do wartości `false`, bo tak wynika ze z listy wartości fałszywych, wartość `1`
zawsze będzie konwertowana do wartości `true`, bo nie ma jej w naszej liście wartości fałszywych.

Często też kod JavaScript opiera się na wartościach `1` i `0` do sprawdzenia, czy coś jest `true` lub `false`. Przykładem może być sprawdzenie długości listy:

```js
if ([].length) {
  console.log('Do something');
}
```

Gdy lista jest pusta, właściwość `lenght` zwraca `0` co jest konwertowane do wartości `false`. Gdy lista ma jakieś elementy, zwróci konkretną liczbę tych elementów. Może być to wartość `1`, `2` a nawet `10` i będzie to konwertowane do `true`. Ponieważ każda liczba prócz `0` jest konwertowana
do `true`. Znowu dotykamy tutaj tematu niejawnej konwersji, który jeszcze będziemy poruszać.

## <span id="obiekt-boolean-i-funkcja-boolean">Obiekt Boolean i funkcja Boolean()</span>

O konwersji typów i jej zawiłościach będziemy jeszcze mówić w oddzielnych odcinkach. Również o obiekcie `Boolean`
zapisywanym wielką literą. Jak się potem okaże, prawie każdy typ ma taki obiekt zapisywany wielką literą. Obiekty te nazywane są wraperami.

Ja do tej pory używałem funkcji `Boolean()` do konwertowania różnych typów na prostą wartość `boolean`. I od razu powiem, że funkcji `Boolean()` najlepiej używać tylko do konwersji. Będąc już przy dużym `Boolean` warto zwrócić uwagę na jedną bardzo ważną rzecz.

Gdy używamy obiektu `Boolean` ma znaczenie czy użyjemy go ze słowem kluczowym `new` czy bez.

Wywołanie ze słowem kluczowym `new`, zainicjalizuje nowy typ obiektowy:

```js
const bObject = new Boolean(false); // [Boolean: false] object
```

Wywołanie `Boolean() ` tylko z nawiasami okrągłymi już bez słowa `new` jest traktowane jako wywołanie funkcji:

```js
const bConverted = Boolean(false);
```

w taki sposób właśnie robimy konwersję do typu prostego `boolean`. Używając słowa kluczowego `new` stworzymy nowy obiekt. Jest to ważna różnica, która dotyczy nie tylko obiektu `Boolean`, ale także pozostałych jak `String`
czy `Number`, które jeszcze poznamy.

Oto przykład, dlaczego nie warto używać `new Boolean` do inicjalizowania zmiennej:

```js
const a = new Boolean(false);
console.log(a, typeof a) // [Boolean: false] object
```

Zainicjalizowałem zmienną `a` obiektem `new Boolean`, gdy wypiszemy zmienną `a` do konsoli zobaczymy obiekt z wartością `false`. Zwracam szczególną uwagę, że jest to `object`, nie wartość prymitywna `boolean`.

Co się stanie, gdy stworzymy teraz blok `if` i spróbujemy sprawdzić zmienną `a`. Blok `if` zadziała gdy `a` ma wartość `true` i wtedy do konsoli wypisze tekst:

```js
if (a) {
  console.log('It works, why?');
}
```

Okazuje się, że zobaczymy w konsoli napis, a przecież zainicjalizowaliśmy zmienną `a` obiektem `Boolean` z wartością `fasle`. I tutaj jest cały problem, że `a` jest obiektem, nie wartością prymitywną. Konwertowany obiekt do wartości `boolean` będzie zwracał zawsze `true`, nieważne czy obiekt jest
pusty, czy ma swoje właściwości.

Przykładem jest ta konwersja pustego obiektu za pomocą `Boolean()`:

```js
console.log(Boolean({})) // true
```

Obiekt konwertowany do wartości `boolean` zwraca zawsze `true`. Nie ma go na rozpisce wartości fałszywych. Jeżeli czegoś nie ma na liście wartości fałszywych, to zawsze otrzymujemy `true`. Dla JavaScript nie ma znaczenia, że my tworzymy obiekt `Boolean` i inicjalizujemy go wartością `fasle`.
JavaScript zmienną `a` rozpatruje po prostu jako typ `object`, a nie `boolean`.

Gdy już posługujemy się obiektem `new Boolean` zamiast wartością prymitywną, nasz zapis powinien wyglądać tak:

```js
console.log(a.valueOf()) // false
if (a.valueOf()) {
  console.log('Now, it does not work');
}
```

wywołujemy metodę `valueOf()`, która zwróci nam wartość prymitywną `boolean` z obiektu stworzonego za pomocą  `new Boolean`. Dopiero nasz kod działa zgodnie z założeniem. Widzicie sami jak wiele komplikacji wprowadza typ obiektowy `new Boolean`.

Dlaczego one istnieją i do czego są potrzebne powiemy sobie w oddzielnym odcinku. Główną naszą zasadą powinno być używanie tylko wartości prymitywnej `boolean`. Natomiast samo wywołanie obiektu `Boolean()` jako funkcji możemy z powodzeniem używać do konwertowania wartości na typ prymitywny `boolean`
. Trudno mi natomiast znaleźć powody, dla których warto by było używać obiektu tworzonego za pomocą `new Boolean`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- typ `boolean` przyjmuje tylko dwie wartości `false` i `true`
- wartość w cudzysłowie `'true'` lub `'false'` to nie `boolean` to `string`
- wartość `1` i `0` nie reprezentują typu `boolean` ale są konwertowane na `true` i `false`
- pamiętajmy co jest konwertowane do wartości fałszywych zgodnie ze specyfikacją ECMAScript
- wszystko, co nie jest na liście wartości fałszywych jest wartością prawdziwą
- istnieje obiekt `Boolean` do opakowania wartości prymitywnej `boolean`, tworzymy go za pomocą `new Boolean`
- wywołanie funkcyjne `Boolean()` najlepiej używać jedynie do konwersji
- inicjalizacja zmiennej za pomocą obiektu `new Boolean` może powodować niespodziewane działanie kodu, unikamy tego
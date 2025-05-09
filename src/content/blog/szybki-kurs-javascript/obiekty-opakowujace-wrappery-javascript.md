---
title: "Obiekty opakowujące - wrappery w JavaScript: Szybki Kurs #9"
description: "Omówienie obiektów opakowujących (wrapperów) dla typów prymitywnych w JavaScript: Boolean, Number i String. Tworzenie, konwersja, prototype i inne obiekty."
date: 2025-03-14
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Obiekty opakowujące - wrappery](#obiekty-opakowujące---wrappery)
* [Tworzenie obiektu](#tworzenie-obiektu)
* [Opakowanie wartości prymitywnej](#opakowanie-wartości-prymitywnej)
* [Konwersja za pomocą funkcji `Boolean(), Number() i String()`](#konwersja-za-pomocą-funkcji-boolean-number-i-string)
* [Prototype](#prototype)
* [Inne objecty](#inne-objecty)
* [Co warto zapamiętać:](#co-warto-zapamiętać)

## <span id="obiekty-opakowujące---wrappery">Obiekty opakowujące - wrappery</span>

Do tej pory mówiliśmy głównie o trzech typach prymitywnych jak `boolean`, `number` czy `string`. Z tymi typami w JavaScript będziecie pracować na co dzień.

Od czasu do czasu zwracałem uwagę, że istnieją także obiekty zapisywane wielką literą jak `Boolean`, `Number`
i `String`. Często są to obiekty nazywane wraperami, ponieważ ich głównym zadaniem jest opakowywanie wartości prymitywnej po to, abyśmy mogli na niej wywoływać metody.

Możemy je dodatkowo wykorzystać do konwersji czy też nadpisywania metod przez właściwość `prototype`. Omówimy sobie teraz sposoby działania tych mechanizmów.

## <span id="tworzenie-obiektu">Tworzenie obiektu</span>

Kilka razy już zwracałem uwagę na możliwość tworzenia obiektu przez wywołanie konstruktora, stwórzmy sobie trzy takie obiekty i zobaczmy, jak działają:

```js
const bool = new Boolean(true);
const num = new Number(42);
const str = new String('Lorem Ipsum');

console.log(bool); // [Boolean: true]
console.log(num); // [Number: 42]
console.log(str); // [String: 'Lorem Ipsum']
```

Obiekty te tworzymy przez wywołanie konstruktora ze słówkiem `new`. W ten sposób stworzymy obiekty, które będą w sobie przetrzymywały wartości prymitywne jak `boolean, number i string`, jednak same obiekty są typu ogólnego, czyli `object`:

```js
console.log(typeof num); // object
console.log(typeof str); // object
console.log(typeof bool); // object
```

Oznacza to, że za każdym razem, gdy chcemy skorzystać z wartości prymitywnej musimy wywołać metodę `valueOf()`:

```js
console.log(num.valueOf()); // 42
console.log(str.valueOf()); // 'Lorem Ipsum'
console.log(bool.valueOf()); // true
```

Tylko takim sposobem możemy pobrać wartość prymitywną z wartości obiektowej jak `Boolean, Number czy String`. Ponieważ są to typy `object` a nie wartości prymitywne, wiele zasad działania w porównaniu do typów prymitywnych, o których mówiliśmy, nie działa.

Zainicjalizowany obiekt `Boolean` z wartością `false` i przekonwertowany na prymitywną wartość będzie zwracał `true`:

```js
console.log(Boolean(new Boolean(false))); // true
```

Stringi nigdy nie będą sobie równe:

```js
console.log('test' === new String('test')); // false
```

i to samo dotyczy obiektu `Number`:

```js
console.log(42 === new Number(42)); // false
```

Dlatego używanie tych obiektów do inicjalizowania wartości wydaje się mało praktyczne i bardziej kłopotliwe. My głównie pracujemy na wartościach prymitywnych, natomiast obiekty `Boolean, Number i String` są głównie używane przez JavaScript. Przynajmniej teraz wiemy, do czego służą.

## <span id="opakowanie-wartości-prymitywnej">Opakowanie wartości prymitywnej</span>

Gdy zadeklarujemy wartości prymitywne w JavaScript, okazuje się, że możemy wywoływać na nich przeróżne metody.

```js
const b = true;
const n = 42.123456;
const s = 'Lorem Ipsum';

console.log(b.toString()); // true
console.log(n.toFixed(2)); // 42.12
console.log(s.toUpperCase()); // 'LOREM IPSUM'
```

Możemy na przykład wywołać `toString, toFixed, toUpperCase`. Metody te zależne są od typu, z jakim pracujemy. Zdefiniowane są one w obiektach z dużej liter jak `Boolean, Number i String` jednak jest możliwość ich wywołania na typie prymitywnym.

Dzieje się tak, ponieważ JavaScript opakowuje wartości prymitywne w typ obiektowy. JavaScript robi to automatycznie, gdy na wartości wywołujemy jedną z metod. Po zakończeniu działania metody, zwracana jest wartość prymitywna. Opakowanie to działa w tle i w pełni automatycznie, bez naszej większej
kontroli. Dlatego mamy dostęp do wielu metod zadeklarowanych w typach obiektowych i możemy je wywołać na typie prymitywnym.

Jest to jedna z podstawowa funkcja tych obiektów w JavaScript.

## <span id="konwersja-za-pomocą-funkcji-boolean-number-i-string">Konwersja za pomocą funkcji `Boolean(), Number() i String()`</span>

Natomiast dobrym pomysłem jest używanie obiektów `Boolean, Number i String` jako funkcji, a więc bez wywołania konstruktora ze słówkiem `new`, oto przykłady takich działań:

```js
const value1 = Number('42.12');
const value2 = String(42.12);
const value3 = Boolean('false');

console.log(value1); // 42
console.log(value2); // '42'
console.log(value3); // true
```

Wywołanie jako funkcja powoduje konwersję wartości na określony typ. Jest to jedna z najlepszych metod na konwersję, ponieważ działa bardzo precyzyjnie i samo wywołanie jest bardzo czytelne.

Właściwie do tego obiekty wrappery przydają się najbardziej, do konwersji wartości na określony typ.

Jeśli zastanawiacie się co z `null` i `undefined` te wartości prymitywne nie mają swojego obiektu opakowującego.

## <span id="prototype">Prototype</span>

`Prototype` to mechanizm, za pomocą którego obiekty w JavaScript dziedziczą metody od siebie. Jeżeli zatem stworzymy sobie prymitywną wartość string i wywołamy metodę `toUpperCase()` to właśnie dzięki `prototype`.

```js
const str1 = 'Lorem Ipsum';
console.log(str.toUpperCase()); //  'LOREM IPSUM'
```

Metoda ta dostępna jest w obiekcie `String` . Jeżeli wywołujemy na naszej wartości prymitywnej jakąś metodę, wartość ta jest opakowana w nowy obiekt `String`, który od razu ma w sobie gotowe metody zdefiniowane w globalnym obiekcie `String`
. Każdy stworzony obiekt ma pakiet metod, które są dziedziczone.

Same obiekty jak `Boolean, Number i String` mogą także dziedziczyć metody z globalnego obiektu `Object`. Właśnie to zapewnia `prototype`, że tworzone obiekty dziedziczą po sobie metody, które są już zdefiniowane w JavaScript.

Metody `prototype ` możemy też modyfikować:

```js
String.prototype.toUpperCase = () => 'Ha hahahaha';
console.log(str1.toUpperCase()); //  'Ha hahahaha'
```

Jest to jednak słaby pomysł i raczej nie należy tego robić. Modyfikacja taka ma zasięg globalny. Możemy więc nadpisać metodę, która używana jest w wielu miejscach, co może doprowadzić do nieoczekiwanego działania.

Możemy także do `prototype` dopisać nowy obiekt:

```js
String.prototype.test = () => 'This is my method';
console.log(str1.test());
```

Dodawanie nowej metody do `prototype` też nie jest za dobrym pomysłem. Możemy na przykład wejść w konflikt z inną biblioteką, która to robi. Dziś najczęściej `prototype` używa się przy polyfillingu. Czyli do wspierania nowych funkcjonalności języka JavaScript w przeglądarkach, które jeszcze nie
wspierają najnowszych implementacji.

O `prototype` jeszcze porozmawiamy, gdy zajmiemy się tworzeniem obiektów i klas w JavaScript. Teraz widzicie kolejny przykład, w którym można użyć obiektów jak `Boolean, Number i String`.

## <span id="inne-objecty">Inne objecty</span>

W JavaScript występują także inne obiekty jak `Array, Object, Function, RegExp, Date` czy `Error`.

Zazwyczaj będziemy używać konstruktorów `new Date`, `new Error` i `new RegExp` do tworzenia obiektów przy pomocy konstruktora.

```js
const date = new Date('1 January 1970');
const error = new Error('Some error!');
const regExp = new RegExp('abc');
```

Jednak sam RegExp można zapisać w formie literałowej:

```js
const re = /abc/;
```

Jeżeli wiemy z góry, jaką postać będzie miało nasze wyrażenie regularne, dobrym pomysłem jest tworzenie formy literałowej. Taka forma jest kompilowana w czasie ładowania skryptu. Wpływa to na czytelność i wydajność.

Jeżeli jednak nasze wyrażenie regularne będzie musiało powstawać w dynamiczny sposób, jedynym wyjściem jest używanie wywołania z konstruktorem.

Nie ma natomiast potrzeb używania konstruktora dla obiektu `Object`:

```js
const obj = new Object({ a: 42 });
```

używamy normalnej formy literałowej:

```js
const obj1 = { a: 42 };
```

Również nie ma potrzebny definiowania funkcji przy pomocy konstruktora:

```js
const fun = new Function('param', 'return param + 100');
```

chyba, że mamy potrzebę tworzenia funkcji w bardziej dynamiczny sposób. Zdarza się to niezwykle rzadko i zapis normalny jest wystarczający:

```js
const fun1 = function(param) {
  return param + 100;
};
```

Również unikamy tworzenia tablic przy pomocy konstruktora Array:

```js
const arr = new Array(1, 2, 3);
```

i stosujemy tradycyjny zapis literałowy:

```js
const arr1 = [1, 2, 4];
```

Do funkcji, obiektów i tablic jeszcze wrócimy w naszym kursie. Warto jednak stosować się do tych zasad i upraszczać swój kod. Tworzenie obiektów zamiast wartości prymitywnych czy używanie konstruktorów do funkcji, tablic czy obiektów jest niepotrzebną komplikacją i wielu przypadkach bardziej
zaszkodzi, niż pomoże. Działanie ich może być zupełnie różne. Bardzo często obiekty te wykorzystywane są przez mechanizmy JavaScript. W naszym kodzie zazwyczaj są zbędne.

## <span id="co-warto-zapamiętać">Co warto zapamiętać:</span>

- obiekty dla wartości prymitywnych używane są głównie przez silnik JavaScript do opakowania tych wartości
- obiekty w JavaScript zapewniają wiele metod, które są dziedziczone przez `prototype`
- w nowoczesnym JavaScript unikamy nadpisywania czy dodawania metod przez `prototype`
- JavaScript ma wiele wbudowanych obiektów, które używa do swoich wewnętrznych mechanizmów
- takich obiektów jak `Object`, `Array ` czy `Function ` nie powinniśmy używać z konstruktorem, chyba że mamy konkretne uzasadnienie i zapis literałowy nam nie wystarczy
- Obiekty `Date` i `Error` używa się z konstruktorem, ponieważ nie mają zapisu literałowego
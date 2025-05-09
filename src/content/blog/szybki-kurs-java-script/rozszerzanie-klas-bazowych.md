---
title: "Rozszerzanie klas bazowych w JavaScript: Szybki Kurs #64"
description: "Rozszerzanie klas w ES6, tworzenie własnych błędów oraz różnice między operatorami typeof i instanceof w JavaScript."
date: 2025-01-17
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Dziedziczenie po Array](#dziedziczenie-po-array)
* [Tworzenie własnych błędów](#tworzenie-wlasnych-bledow)
* [Co warto zapamiętać](#co-warto-zapamietac)
* [Operator typeof vs instanceof w JavaScript](#operator-typeof-vs-instanceof-w-javascript)
* [Operator typeof](#operator-typeof)
* [Operatora instanceof](#operatora-instanceof)
* [Kiedy jaki operator używać?](#kiedy-jaki-operator-uzywac)

## <span id="dziedziczenie-po-array">Dziedziczenie po Array</span>

Wprowadzenie klas w ES6 i słowa kluczowego `extends` dało łatwiejsze możliwości rozszerzani klas bazowych, czego do wersji ES5 nie dało się tak łatwo i przyjemnie osiągać. Od teraz możemy rozszerzać takie klasy wbudowane jak `Array`
, `Error`, `Date` a nawet `Object` i zachować pełną funkcjonalność obiektów bazowych, tego właśnie brakowało w ES5.

Może się zdarzyć, że będziemy w naszej aplikacji potrzebować tablice o specjalnym działaniu. Najlepszym sposobem do osiągnięcia tego w JavaScript jest po prostu rozszerzenie klasy `Array`:

```js
class MyArray extends Array {
  toString() {
    return this.join('-');
  }

  mapDouble() {
    return this.map((x) => x * 2);
  }
}
```

Stworzyłem klasę i za pomocą słowa kluczowego `extends` rozszerzam wbudowaną w JavaScript klasę `Array`. W mojej nowej klasie dodatkowo nadpisuję metodę `toString()`, która pochodzi z klasy `Array`. Dodaje także zupełnie nową metodę, która będzie zwracała tablice z podwojonymi wartościami.

Zobaczmy jak pracować z taką własną tablicą:

```js
const arr = new MyArray(1, 2, 3, 4);

console.log(arr.length); // 4
console.log(arr.filter(x => x % 2 === 0)); // [2, 4]
console.log(arr.toString()); // 1-2-3-4
console.log(arr.mapDouble()); // [2, 4, 6, 8]
```

Jak przy każdej klasie, powołuję obiekt przez wywołanie `new MyArray()` i do konstruktora podaję wartości oddzielone przecinkiem. Oczywiście nie robimy inicjalizacji w formie literalnej, wywołanie konstruktora jest tutaj potrzebne.

Na obiekcie pochodzącym z mojej klasy mogę wywołać nie tylko moje metody, ale wszystkie, które pochodzą z `Array.prototype`. Mam tutaj dostęp do właściwości `length`, mogę wywołać metodę `filter`. Mam nadpisaną metodę `toString()` oraz własną nową metodę `mapDouble`().

W ten sposób stworzyłem własną wersję tablic w JavaScript. To właśnie w takich sytuacjach rozszerzanie klas i dziedziczenie właściwości pokazuje swoje ogromne możliwości.

W mojej klasie nie stworzyłem konstruktora, korzystam z domyślnego wywołania, jeżeli chciałbym umieścić konstruktor wyglądałby on tak:

```js
  constructor(...items)
{
  super(...items);
}
```

Jeżeli zatem chcemy stworzyć własną funkcjonalność dla tablic, możemy stworzyć swój typ i posługiwać się nim w całej aplikacji. Jest to o wiele lepsze rozwiązanie niż modyfikowanie `Array.prototype`. Od wersji ES6 w JavaScript proces rozszerzania wbudowanych obiektów JavaScript jest o wiele
łatwiejszy.

## <span id="tworzenie-wlasnych-bledow">Tworzenie własnych błędów</span>

Rozszerzenie wbudowanej klasy `Error` może być najczęściej spotykanym przypadkiem wykorzystania dziedziczenia w JavaScript. Co prawda jest wbudowanych kilka klas do obsługi pojawiających się błędów, ale czasem chcemy mieć bardziej szczegółowe informacje, co się stało:

```js
class EmptyArrayError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmptyArrayError'
  }
}
```

Dlatego tworzę własną klasę o nazwie `EmptyArrayError`, która rozszerza bazową klasę `Error`. Klasa `Error` jest bazową klasą dla wszystkich błędów w JavaScript. Dodatkowo tworzę konstruktor, ale nie muszę tego robić. Chcę jednak bardziej dopasować klasę do moich potrzeb.

Tworząc konstruktor muszę wywołać `super()` i przekazać tam `message`, jest to wartość typu string informująca nas jaki błąd powstał. Tworzę także pole `name`, a tak naprawdę nadpisuję pole `name` bo istnieje ono także w klasie `Error`, chce jednak aby to pole reprezentowała nazwę mojego błędu.
Standardowo w klasie `Error`, pole `name` ustawione jest na nazwę `'Error'` jako string. Tutaj przypisuję po prostu nazwę mojego błędu.

Tak przygotowaną klasę mogę teraz wykorzystywać w swoim kodzie

```js
const array = [];
if (array.length === 0) {
  throw new EmptyArrayError('Array should not be empty');
}
```

Hipotetyczny przypadek. W jakiejś części kodu tablica nie może być pusta. Instrukcja `if` sprawdza, czy tablica jest pusta, jeżeli tak to wyrzucam błąd przez użycie `throw new EmptyArrayError()` i do konstruktora podaję komunikat. Dzięki temu w konsoli pojawia się błąd:

```text
Uncaught EmptyArrayError: Array should not be empty
```

Widzimy, że jest to błąd pochodzący z naszej klasy i z naszym komunikatem. Takie klasy z błędami mogą się przydać w wielu miejscach aplikacji, gdy chcemy zareagować na niestandardową sytuację. Każda aplikacja wymaga obsługi błędów, możemy więc tworzyć kolejne klasy błędów jak `AccesError`
, `ValidationError`, `ReadOnlyError` i tym podobne.

Rozszerzane innych klas, szczególnie wielopoziomowe, to kolejne stopnie skomplikowania kodu. Musimy rozważnie używać tych możliwości. W wielu przypadkach jednak może nam to usprawnić działanie aplikacji i poszerzyć możliwości jak w przypadku obsługi błędów. Przy językach obiektowych, jest to jednak
coś, co musimy opanować.

## <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- w ES6 dziedziczenie po wbudowanych klasach w JavaScript jest łatwiejsze niż wcześniej
- można na przykład rozszerzyć klasę `Array` i stworzyć własną tablicę
- rozszerzenie klas bazowych daje ogromne możliwości na przykład tworzenia własnych błędów aplikacji
- dziedziczenie zawsze wprowadza kolejny stopień skomplikowania, używajmy tam, gdzie musimy, a nie dlatego, że jest fajne

## <span id="operator-typeof-vs-instanceof-w-javascript">Operator typeof vs instanceof w JavaScript</span>

Na początku tego kursu pracowaliśmy głównie z podstawowymi typami w JavaScript. Do ich sprawdzania używałem operatora `typeof`. W JavaScript istnieje jeszcze jeden operator `instanceof`, który użyłem kilka razy przy omawianiu prototypów. Zobaczmy, jaka jest różnica i który operator warto używać.

## <span id="operator-typeof">Operator typeof</span>

Za pomocą operatora `typeof` możemy wyświetlić typ sprawdzanej wartości lub też wykorzystać go do porównania czy dana wartość jest określonego typu:

```js
console.log(typeof 'boo'); // 'string'
```

Gdy użyjemy `typeof` do sprawdzenia jakiego typu jest wartość, zostanie zwrócony typ w postaci stringa.

Dlatego, gdy wykorzystujemy ten operator do porównania, musimy typy zapisywać jako string:

```js
console.log(typeof 'foo' === 'string'); // true
console.log(typeof 42 === 'number'); // true
console.log(typeof 42n === 'bigint'); // true
console.log(typeof true === 'boolean'); // true

console.log(typeof null === 'object'); // true
console.log(typeof undefined === 'undefined'); // true

console.log(typeof function() {
} === 'function'); // true
console.log(typeof Symbol('Sym') === 'symbol'); // true
console.log(typeof [] === 'object'); // true
console.log(typeof {} === 'object'); // true
```

W ten sposób za pomocą `typeof` i zwykłego operatora porównania możemy sprawdzić, czy dana wartość ma konkretny typ. Nazwa każdego typu zapisana jest w formie tekstu.

Operator `typeof ` potrafi zwrócić tylko te typy, które są w budowane w JavaScript. Zwraca więc wszystkie typy prymitywne, dodatkowo potrafi rozróżnić typ `object` i `function`.

Nie potrafi jednak dokładnie określić typu na podstawie klasy:

```js
console.log(typeof new Date()); // 'object'
console.log(typeof new Error('error')); // 'object'
console.log(typeof new Array()); // 'object'
console.log(typeof new String('boo')); // 'object'
console.log(typeof new Number(42)); // 'object'

class Foo {
}

console.log(typeof new Foo()); // 'object'
```

Mamy tutaj przykład klas wbudowanych jak `Date`, `Error` czy `Array`. Dla tych typów zawsze będzie zwracał typ `object`. Nawet jeżeli stworzymy własną klasę, `typeof` nie będzie umiał rozpoznać typu `Foo`, również będzie zwracał typ `object`
. Oczywiście jest to także prawda, ponieważ każdy obiekt w JavaScript również ma typ `Object` co jest związane z dziedziczeniem prototypowym.

Małe podsumowanie tego operatora. Operator `typeof` na podstawie wartości podstawionej z prawej strony, zwraca typ tej wartości w formie string. Jest to albo jeden z typów prostych, podtyp `function` albo typ `object`. Operuje tylko na typach zdefiniowanych w JavaScript. Nie potrafi różnić
konkretnych klas jak `Date`, `Error`, `Array` czy nasze własne klasy. Dla niego wszystkie te konstrukcje będą typu `object`.

## <span id="operatora-instanceof">Operatora instanceof</span>

Operator `instanceof` z technicznej strony sprawdza łańcuch prototypów, aby dokładnie rozpoznać, w jaki sposób powstał dany obiekt, a więc używamy go tylko do testowania obiektów:

```js
console.log(new Date() instanceof Date); // true
console.log(new Array() instanceof Array); // true

class Boo {
}

console.log(new Boo() instanceof Boo); // true
```

Na tym przykładzie widzimy, że za jego pomocą możemy dokładnie określić, na jakiej bazie klasy powstał obiekt (a dokładniej z jakiego konstruktora funkcji). Stworzony obiekt `Date` jest rozpoznawalny jako klasa `Date`, tak samo jest z obiektem `Array` oraz naszym obiektem zbudowanym z klasy `Boo`.

Ten operator zwraca zawsze wartość `boolean`, musimy więc podstawić obiekt do testowania, a także typ, z którym chcemy porównać dany obiekt. Operator nie wyświetli nam typu jak to robi operator `typeof`.

Wspominałem, że operator potrafi przetestować cały łańcuch prototypów:

```js
console.log(new Date() instanceof Object); // true
console.log(new Array() instanceof Object); // true

class Bar extends Boo {
}

console.log(new Bar() instanceof Boo); // true
console.log(new Bar() instanceof Bar); // true
console.log(new Bar() instanceof Object); // true
```

W tym przypadku widzimy, że obiekty powstałe z `Date` oraz `Array` to także typy `Object`. Ponieważ na końcu ich łańcucha jest dołączony `Object.prototype`.

Podobnie jest z naszą klasą `Bar`, która rozszerza klasę `Boo`. Obiekt klasy `Bar` zbudowany jest więc z trzech prototypów, dlatego dla każdej z klas, które są przekazane do porównania zwróci `true`.

Wspomnę jeszcze raz, że `instanceof` nie działa na typach prymitywnych:

```js
console.log('abc' instanceof String); // false
console.log(new String('abc') instanceof String); // true
```

Nie możemy prymitywnej wartości 'abc' porównać do typu prymitywnego `'string'` , który zwraca choćby operator `typeof`. Po prawej stronie operatora `instanceof` musi stać jakiś konstruktor funkcji czy nasza klasa.

Dlatego, jeżeli stworzymy obiekt za pomocą `new String()` to możemy go porównać do konstruktora `String`. Należy jednak pamiętać, że prymitywny `string`, a obiekt stworzony za pomocą `new String()` to dwa różne byty, z którymi nie pracuje się tak samo.

## <span id="kiedy-jaki-operator-uzywac">Kiedy jaki operator używać?</span>

Nie ma jednoznacznej odpowiedzi, który operator najlepiej użyć. Jeżeli musimy przetestować typy prymitywne to używamy operatora `typeof`.

Jeżeli pracujemy na własnych obiektach zdecydowanie przydatniejszy jest operator `instanceof`, który dokładnie potrafi określić, jaki konstruktor został użyty do stworzenia obiektu.

Mówi się też, że `typeof` jest szybszy niż `instanceof`. Głównym powodem wolniejszego działania jest to, że `instanceof`
przeszukuje cały łańcuch prototypów. Dla bardzo skomplikowanych obiektów może to być dość pracochłonne zadanie, dla mniej skomplikowanych, nie powinniśmy się przejmować.

## Co warto zapamiętać

- operator `typeof` zwraca typ w postaci `string`
- operator `instanceof` służy do porównania czy coś jest danego typu i zwraca wartość `true` lub `false`
- operator `typeof` może zwrócić tylko jeden z kilku typów wbudowanych JavaScript
- operator `instanceof` pracuje tylko na typach obiektowych, nie sprawdzi typu dla wartości prymitywnej
- operatora `typeof` dla typów obiektowych zwraca tylko `function` lub `object`, nie określi dokładnie typu stworzonego z klasy `Date`, zawsze będzie to `object`
- operator `instanceof` może pomóc w dokładnym określeniu typu również dla obiektów tworzonych z naszych klas

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
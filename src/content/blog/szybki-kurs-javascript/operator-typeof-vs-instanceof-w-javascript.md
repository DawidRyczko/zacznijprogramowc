---
title: "Operator typeof vs instanceof w JavaScript: Szybki Kurs #65"
description: "Porównanie operatorów typeof i instanceof w JavaScript."
date: 2025-01-16
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Operator typeof](#operator-typeof)
* [Operatora instanceof](#operatora-instanceof)
* [Kiedy jaki operator używać?](#kiedy-jaki-operator-używać)
* [Co warto zapamiętać](#co-warto-zapamiętać)

Na początku tego kursu pracowaliśmy głównie z podstawowymi typami w JavaScript. Do ich sprawdzania używałem operatora `typeof`. W JavaScript istnieje jeszcze jeden operator `instanceof`, który użyłem kilka razy przy omawianiu prototypów. Zobaczmy, jaka jest różnica i który operator warto używać.

## <span id="operator-typeof">Operator typeof</span>

Za pomocą operatora `typeof` możemy wyświetlić typ sprawdzanej wartości lub też wykorzystać go do porównania czy dana wartość jest określonego typu:

```javascript
console.log(typeof 'boo'); // 'string'
```

Gdy użyjemy `typeof` do sprawdzenia jakiego typu jest wartość, zostanie zwrócony typ w postaci stringa.

Dlatego, gdy wykorzystujemy ten operator do porównania, musimy typy zapisywać jako string:

```javascript
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

```javascript
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

```javascript
console.log(new Date() instanceof Date); // true
console.log(new Array() instanceof Array); // true

class Boo {
}

console.log(new Boo() instanceof Boo); // true
```

Na tym przykładzie widzimy, że za jego pomocą możemy dokładnie określić, na jakiej bazie klasy powstał obiekt (a dokładniej z jakiego konstruktora funkcji). Stworzony obiekt `Date` jest rozpoznawalny jako klasa `Date`, tak samo jest z obiektem `Array` oraz naszym obiektem zbudowanym z klasy `Boo`.

Ten operator zwraca zawsze wartość `boolean`, musimy więc podstawić obiekt do testowania, a także typ, z którym chcemy porównać dany obiekt. Operator nie wyświetli nam typu jak to robi operator `typeof`.

Wspominałem, że operator potrafi przetestować cały łańcuch prototypów:

```javascript
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

```javascript
console.log('abc' instanceof String); // false
console.log(new String('abc') instanceof String); // true
```

Nie możemy prymitywnej wartości 'abc' porównać do typu prymitywnego `'string'` , który zwraca choćby operator `typeof`. Po prawej stronie operatora `instanceof` musi stać jakiś konstruktor funkcji czy nasza klasa.

Dlatego, jeżeli stworzymy obiekt za pomocą `new String()` to możemy go porównać do konstruktora `String`. Należy jednak pamiętać, że prymitywny `string`, a obiekt stworzony za pomocą `new String()` to dwa różne byty, z którymi nie pracuje się tak samo.

## <span id="kiedy-jaki-operator-używać">Kiedy jaki operator używać?</span>

Nie ma jednoznacznej odpowiedzi, który operator najlepiej użyć. Jeżeli musimy przetestować typy prymitywne to używamy operatora `typeof`.

Jeżeli pracujemy na własnych obiektach zdecydowanie przydatniejszy jest operator `instanceof`, który dokładnie potrafi określić, jaki konstruktor został użyty do stworzenia obiektu.

Mówi się też, że `typeof` jest szybszy niż `instanceof`. Głównym powodem wolniejszego działania jest to, że `instanceof`
przeszukuje cały łańcuch prototypów. Dla bardzo skomplikowanych obiektów może to być dość pracochłonne zadanie, dla mniej skomplikowanych, nie powinniśmy się przejmować.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- operator `typeof` zwraca typ w postaci `string`
- operator `instanceof` służy do porównania czy coś jest danego typu i zwraca wartość `true` lub `false`
- operator `typeof` może zwrócić tylko jeden z kilku typów wbudowanych JavaScript
- operator `instanceof` pracuje tylko na typach obiektowych, nie sprawdzi typu dla wartości prymitywnej
- operatora `typeof` dla typów obiektowych zwraca tylko `function` lub `object`, nie określi dokładnie typu stworzonego z klasy `Date`, zawsze będzie to `object`
- operator `instanceof` może pomóc w dokładnym określeniu typu również dla obiektów tworzonych z naszych klas

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
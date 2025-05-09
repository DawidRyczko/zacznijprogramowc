---
title: "Dziedziczenie prototypowe w JavaScript: Szybki Kurs #56"
description: "Omówienie dziedziczenia prototypowego, wewnętrznej właściwości [[Prototype]] oraz prototypów obiektów w JavaScript."
date: 2025-01-25
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Dziedziczenie po Object.prototype](#dziedziczenie-po-object-prototype)
* [__proto__ vs [[Prototype]] vs Object.prototype](#__proto__-vs-prototype-vs-objectprototype)
* [Inne prototypy](#inne-prototypy)
* [Co warto zapamiętać](#co-warto-zapamietac)

W tym dziale będę chciał omówić dziedziczenie w JavaScript, a także budowę i zachowanie obiektów. Omówimy wewnętrzną właściwość `[[Prototype]]` a także prototypy obiektów, które są używane przy tworzeniu obiektów w JavaScript. Są to tematy, którymi nie będziecie zaprzątać sobie głowy jako
programiści JavaScript. Być może nigdy świadomie nie zmodyfikujecie prototypu obiektu. Wydaje mi się jednak, że wiedza o tym, jak działają obiekty pod spodem, pomoże lepiej zrozumieć ten język.

Przede wszystkim warto wspomnieć, że jest to język inny niż Java czy C++. Trudno tutaj mówić o typowym dziedziczeniu. Częściej spotkacie się z określeniem dziedziczenie prototypowe. W każdym razie nie warto skupiać się na terminologii, ale na tym, jak to w JavaScript działa.

## <span id="dziedziczenie-po-object-prototype">Dziedziczenie po Object.prototype</span>

Zawsze jak stworzymy jakiś obiekt w JavaScript, dziedziczy on po globalnym obiekcie Object, a dokładniej po tym, co znajduje się w `Objec.prototype`:

```js
const personA = {
  name: 'John',
  surname: 'Rambo',
};
```

W chwili tworzenia obiektu ustawiana jest jego wewnętrzna właściwość `[[Prototype]]`. W dokumentacji jest ona zapisana z dwoma nawiasami kwadratowymi. Jeżeli zastanawiacie się jak dostać się do właściwości `[[Prototype]]` to jest do tego specjalny getter i setter o nazwie `__proto__`:

```js
console.log(personA);
```

```text
{name: "John", surname: "Rambo"}
name: "John"
surname: "Rambo"
__proto__: Object
```

Gdy wypiszemy sam obiekt do przeglądarki, to widzimy, że obiekt ten ma dodatkową właściwość `__proto__`. Jest to właśnie getter i setter do ustawiania prototypu obiektu. To właśnie do tej właściwości dopisana jest cała zawartość z  `Object.prototype`.

Tak jak wspomniałem na początku, wszystkie obiekty w JavaScript wywodzą się z globalnego obiektu `Object` ,a dokładniej dziedziczą z `Object.prototype`.  `Object.prototype` to taka podstawowa funkcjonalność dla każdego obiektu. W `Object.prototpype` znajdują się gotowe pola i metody, które od razu
możemy wykorzystać do pracy z obiektem.

Gdy wypiszemy właściwość `__proto__` do konsoli:

```js
console.log(personA.__proto__);
```

Zobaczymy, że posiada ona kilka zdefiniowanych metod jak `toString`, `hasOwnProperty`, `isPrototypeOf`:

```text
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```

Te metody pochodzą właśnie z `Object.prototype`. Gdy stworzymy nowy obiekt, to JavaScript łączy `Object.prototype` z wewnętrzną właściwością obiektu o nazwie `[[Prototype]]`. Do tej właściwości możemy się właśnie odwołać przez getter i setter o nazwie `__proto__`. Nawet jeżeli stworzymy pusty obiekt
to i tak otrzyma on prototyp z `Object.prototype`. Tak to działa w JavaScript, każdy obiekt ma zapewniony jakiś prototyp.

W niektórych przypadkach możemy stworzyć obiekt bez prototypu. Gdy omawialiśmy metodę `Object.create` mówiłem, że wywołanie jej z wartością `null`, stworzy obiekt bez prototypu:

```js
const empty = Object.create(null);
```

W ten sposób tworzymy obiekt, którego wewnętrzna właściwość `[[Prototype]]` ustawiona jest na `null`. W tej sytuacji obiekt ten nie ma żadnych metod i właściwości, które zapewnia `Object.prototype`. Jest to dopuszczalne w JavaScript, zazwyczaj jednak nie będziemy spotykać się z takimi obiektami.

## <span id="__proto__-vs-prototype-vs-objectprototype">__proto__ vs [[Prototype]] vs Object.prototype</span>

Wrócę jeszcze na chwilę do nazewnictwa i definicji, które pojawiają się przy omawianiu prototypów. Niestety wszystkie nazwy są do siebie podobne, a wcale nie oznaczają tego samego:

- `[[Prototype]]` - zapis `[[Prototype]]` w podwójnych klamrach to określenie wewnętrznej właściwości obiektu, który tworzymy. Nie mamy dostępu bezpośrednio do tej właściwości przez taką nazwę, tak jest ona po prostu określona w dokumentacji. Do tej właściwości dopisywany jest prototyp z innego
  obiektu zazwyczaj będzie to prototyp z `Object.prototype`. Jest to więc miejsce, w którym przetrzymywany jest prototyp obiektu z którego został stworzony nasz nowy obiekt.
- `__proto__` - zapis z podwójnymi podkreśleniami na początku i końcu słowa `proto` to setter i getter do wewnętrznej właściwości obiektu `[[Prototype]]`. Między innymi ten akcesor pozwala nam pobrać prototyp, który posłużył do stworzenia obiektu. Również przez tą właściwość możemy ręcznie ustawić
  prototyp obiektu. Ponieważ nie możemy się dostać do obiektu przez nazwę `[[Prototype]]` to mamy dostęp przez ten akcesor.
- `Object.prototype` to prototyp dla obiektów. Gdy obiekty są tworzone, prototyp ten jest wykorzystywany przez JavaScript i ustawiony na wewnętrznej właściwości `[[Prototype]]`. W `Object.prototype` istnieją pewne gotowe funkcjonalności, które są przekazywane właśnie przez dziedziczenie prototypowe.
  Dla uproszczenia posługuję się ciągle `Object.prototype`, ale mamy też `Array.prototype`, `String.prototype` czy `Function.prototype`. Jak się można domyślić, są to prototypy do budowy odpowiednich podtypów w JavaScript.

Podsumowując: wszelkie prototypy jak `Object.prototype` są wykorzystane do zbudowania podstawowych funkcjonalności w obiektach JavaScript. Funkcjonalności te są umieszczone w wewnętrznej właściwości `[[Prototype]]`, do której mamy dostęp przez akcesor `__proto__`.

## <span id="inne-prototypy">Inne prototypy</span>

W JavaScript istnieją także inne prototypy jak `Array.prototype`, `String.prototype` czy `Boolean.prototype` i więcej. W przyszłości mogą być dodawane kolejne.

Jeżeli stworzymy obiekt tablicy to nasz obiekt będzie dziedziczył po `Array.prototype`:

```js
const arr = [1, 2, 3];
console.log(arr)
```

```text
(3) [1, 2, 3]
0:1
1:2
2:3
length: 3
__proto__: Array(0)
```

Wypisując do konsoli obiekt, możemy zobaczyć, że `__proto__` jest typu `Array`. Dzięki temu każda nowo tworzona tablica posiada mnóstwo gotowych metod jak `map`, `filter`, `reduce` i tak dalej. Wszystkie one pochodzą właśnie z `Array.prototype` z podstawowego obiektu dla wszystkich tablic.

To właśnie dzięki prototypom, możemy od razu korzystać z gotowych funkcjonalności. Przeglądając `__proto__` dla naszej tablicy, zobaczymy, że `Array.prototype`, także ma swoje `__proto__`. Tym kolejnym `__proto__` jest `Object.prototype`.

Możemy się do tego prototypu odwołać, tworząc taki łańcuch wywołań:

```js
console.log(arr.__proto__.__proto__); // Object.prototype
```

Na początku jest nasza tablica, potem jest `Array.prototype` i potem jest `Object.prototype`.

Możemy z ciekawości jeszcze raz odwołać się do `__proto__`:

```js
console.log(arr.__proto__.__proto__.__proto__); // null
```

Otrzymamy wartość `null`. Łańcuch prototypów kiedyś się kończy i kończy się właśnie na `Object.prototype`
.  `Object.prototype` jest podstawowym prototypem dla wszystkich obiektów. Nie ważne czy to są nasze tworzone obiekty, czy wbudowane jak `Array`, `String` czy `Boolean`. To zawsze od `Object.prototype` zaczyna się tworzenie podstaw obiektu, dlatego on zawsze znajdzie się na końcu łańcucha
prototypów.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- każdy obiekt w JavaScript dziedziczy po `Object.prototype`
- każdy obiekt ma wewnętrzną właściwość `[[Prototype]]` w której znajdują się odziedziczone właściwości prototypów innych obiektów
- obiekty mają wewnętrzną właściwość `__proto__` ,która jest setterem i getterem dla `[[Prototype]]` obiektu
- JavaScript ma wiele gotowych wbudowanych prototypów jak `String.prototype`, `Array.prototype` i inne
- wbudowane prototypy wykorzystywane są przy tworzeniu obiektów danego typu i zapewniają szereg gotowych funkcjonalności

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
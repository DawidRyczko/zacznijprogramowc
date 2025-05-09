---
title: "Prototyp funkcji w JavaScript: Szybki Kurs #60"
description: "Funkcje w JavaScript jako obiekty, właściwość prototype, wywoływanie konstruktora funkcji, słówko new i sprawdzanie typu przez instanceof."
date: 2025-01-21
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Obiekt funkcyjny](#obiekt-funkcyjny)
* [Wywołanie konstruktora funkcji](#wywolanie-konstruktora-funkcji)
* [Słówko `new` jest bardzo ważne](#slowko-new-jest-bardzo-wazne)
* [Sprawdzanie typu przez instanceof](#sprawdzanie-typu-przez-instanceof)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="obiekt-funkcyjny">Obiekt funkcyjny</span>

Funkcje w JavaScript tak naprawdę są obiektami, a obiekty te mają swój specjalny podtyp `Function`. Gdy więc tworzymy funkcję, to tak naprawdę tworzymy obiekt, do którego możemy zaglądnąć. Jest tam jedna bardzo interesująca rzecz.

Na początek stworzę prostą funkcję:

```js
function person() {
  console.log('John rambo');
}

console.dir(person);
```

W ogóle na razie nie interesuje nas, co robi ta funkcja, bardziej interesuje nas jaki obiekt ta funkcja wytworzyła. Wykorzystując `console.dir` mogę wypisać nazwę funkcji do konsoli i w ten sposób podejrzę obiekt, jaki tworzy. Również mógłbym przypisać po prostu funkcje do zmiennej i w ten sposób
przechwycić ten obiekt:

```text
arguments: null
caller: null
length: 0
name: "person"
prototype: {constructor: ƒ}
__proto__: ƒ ()
```

Okazuje się, że obiekt, który został stworzony przez funkcję, posiada wiele różnych właściwość związanych z funkcją, ale posiada także właściwość `prototype`, którą do tej pory mogliśmy zauważyć głównie tylko w obiektach wbudowanych jak `Object.prototype`, `Array.prototype` i tak dalej. Nigdy
jednak, obiekty, które tworzyliśmy nie miały swojej właściwości `prototype`.

Nie mylmy jednak tej właściwości z właściwością `[[Prototype]]`, którą zapisuje się z dwoma nawiasami kwadratowymi i do której jest dostęp przez akcesor `__proto__`. Prototyp, który posłużył do stworzenia tego obiektu jest tutaj dostępny właśnie przez akcesor `__proto__` i pochodzi on
z `Function.prototype`.

Wróćmy jednak do tej zwykłej właściwości `prototype`. Okazuje się, że tylko obiekty podtypu `Function` mają właściwość `prototype`, która jak wiemy, może być dziedziczona przez kolejne obiekty. Czyli ten obiekt może nam posłużyć do budowania innych obiektów.

Tak jak inne prototypy jak `Object.prototype`, `Array.prototype` i tak dalej, tak nasz prototyp `person.prototype` może również posłużyć do stworzenia innych obiektów. W ten sposób stworzyliśmy bazowy prototyp dla naszych własnych obiektów.

## <span id="wywolanie-konstruktora-funkcji">Wywołanie konstruktora funkcji</span>

Wiemy już, że obiekty funkcyjne mają unikatową cechę w postaci właściwości `prototype`, możemy to zatem wykorzystać i tworzyć własne obiekty na bazie tego prototypu:

```js
function Animal(name) {
  this.name = name;
  this.voice = function() {
    console.log('hrum hrum');
  };
};

const animalObj = new Animal('Cat');
console.log(animalObj);
```

Stworzyłem nową funkcję o nazwie `Animal`. Zauważcie, że tworzę w tej funkcji właściwości przez odwołanie się do `this`.

Tym razem również zmienna zaczyna się wielką literą. Jest to konwekcja, która powstała w środowisku JavaScript, aby funkcje lub wyrażenia funkcyjne, które będą tworzyć obiekty zapisywać wielką literą.

W JavaScript, obiekty możemy wywołać jako funkcje lub też możemy wywołać je z konstruktorem, czyli słówkiem `new`. Zawsze, gdy używamy `new`, wywołujemy konstruktor obiektu. Każdy obiekt wbudowany w JavaScript ma swój konstruktor jak `new String()`, `new Array()` czy nawet `new Object()`.

Gdy wywołamy `new` na obiekcie typu `Function` czyli naszym `Animal`, powstanie normalny obiekt, jaki znamy do tej pory, ale prototypem dla tego właśnie obiektu będzie `Animal.prototype`. Czyli nie jak do tej pory `Object.prototype`
, `Array.prototype` czy `Function.prototype` tylko nasz stworzony prototyp obiektu.

```text
Animal {name: "Cat", voice: ƒ}
name: "Cat"
voice: ƒ ()
__proto__:
	constructor: ƒ Animal(name)
	__proto__: Object
```

Po wywołaniu funkcji z konstruktorem to, co było w `Animal.prototype` stało się wewnętrzną właściwością `[[Prototype]]`
stworzonego właśnie obiektu. Stworzony `animalObject` ma akcesor `__proto__` prowadzący teraz do `Animal.prototype`. Oczywiście na końcu tego łańcuchu prototypów jest `Object.prototype`, ale wcześniej jest nasz ustalony `Animal.prototype`.

Obiekt, który został zwrócony przez `new Animal()` to zwykły obiekt JavaScript, taki sam jak tworzyliśmy do tej pory literalnie za pomocą nawiasów klamrowych, jednak jego podstawowym prototypem jest `Animal.prototype`, a nie `Object.prototype`. Jest to nowy typ `Animal`, który sami stworzyliśmy.

Co nam daje taka funkcjonalność? Przede wszystkim mając zdefiniowaną funkcję i wywołując ją z konstruktorem za pomocą słówka `new` możemy tworzyć kolejne obiekty w bardzo prosty sposób:

```js
const animalObj2 = new Animal('Dog');
const animalObj3 = new Animal('Mouse');
```

Obiekty te mają te same pola i te same metody. Otrzymujemy więc namiastkę klas, które znane są z języków obiektowych jak `Java`, `C++` czy `C#`. Dodatkowo obiekty te bazują na naszym stworzonym prototypie `Animal.prototype`:

```js
Animal.prototype.run = function() {
  console.log('running');
};

animalObj.run();
```

Możemy więc swobodnie modyfikować ten prototyp, dodawać nowe właściwości. Zmiany te będą dotyczyć tylko naszego stworzonego obiektu.

Ma to duża przewagę nad zwykłymi obiektami, które tworzyliśmy do tej pory literalnie i dziedziczyły one prototyp po `Objec.prototype`. Trudno jest tworzyć seryjnie obiekty o tych samych właściwościach w sposób literalny. Dodatkowo obiekty takie mają wtedy ogólny prototyp `Object.prototype`, którego
lepiej nie modyfikować.

Ta właściwość funkcji była bardzo mocno wykorzystywana, zanim pojawiły się klasy w ESCMAScript 6. Dzisiaj w nowoczesnym kodzie raczej nie spotkacie się z tworzeniem obiektów w taki sposób. Obecnie wykorzystuje się klasy, które są trochę *
syntactic sugar* dla tworzenia obiektów przy pomocy konstruktora funkcji. O klasach będzie zupełnie nowy dział.

Jednak to, co teraz widzimy to podstawy do zrozumienia klas i programowania obiektowego w JavaScript, które opiera się na prototypach i dziedziczeniu prototypowym.

## <span id="slowko-new-jest-bardzo-wazne">Słówko `new` jest bardzo ważne</span>

Gdy tworzymy funkcję, z której będziemy potem tworzyć obiekty za pomocą wywołania konstruktora, ważne jest, aby użyć słówko `new`:

```js
function Car(name) {
  this.name = name;
}

const car1 = Car('Audi');
console.log(car1); // undefined
console.log(window.name); // Audi

const car2 = new Car('Opel');
console.log(car2); // {name: "Opel"}
```

Mamy funkcję, która tworzy wewnętrzną właściwość przez `this.name`. Pierwszy przypadek wywołuje funkcję bez `new`. Funkcja ta zwraca `undefined`. Jeżeli nie użyliśmy `return` to funkcja zawsze zwraca sama z siebie `undefined` . Takie wywołanie nie tworzy nam też obiektu.

Nie jesteśmy także w `strict mode` dlatego w tym przypadku, `this` w funkcji wskazuje na obiekt `window`, z tego powodu nasze pole `model` znalazło się w obiekcie `window`. Gdybyśmy użyli trybu ścisłego w ogóle nie moglibyśmy wywołać funkcji bez słówka `new`. W trybie ścisłym `this` w funkcji
wskazuje na `undefined`. I tak zapisana funkcja nie może zostać wywołana bez `new`.

Dlatego tak napisane funkcje powinniśmy wywoływać tylko z konstruktorem, czyli za pomocą `new`. Wtedy otrzymujemy nowy obiekt, a `this` jest odwołaniem do tego obiektu. Na szczęście używając trybu ścisłego, otrzymamy stosowne błędy informujące, że nie możemy wywoływać takich funkcji bez wywołania
konstruktora.

## <span id="sprawdzanie-typu-przez-instanceof">Sprawdzanie typu przez instanceof</span>

Użyliśmy do tej pory funkcji, potem wywoływaliśmy konstruktor tej funkcji i powstawał obiekt. Można się pogubić, co jest czym, dlatego warto sprawdzić sobie typ
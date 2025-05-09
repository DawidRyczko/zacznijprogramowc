---
title: "Klasy w JavaScript: Szybki Kurs #61"
description: "Wprowadzenie do klas w JavaScript i różnice między nimi a funkcjami."
date: 2025-01-20
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Tworzenie klas za pomocą class](#tworzenie-klas-za-pomocą-class)
* [Różnice między klasą, a funkcją](#różnice-między-klasą-a-funkcją)
* [Inne tworzenie klas](#inne-tworzenie-klas)
* [Co warto zapamiętać](#co-warto-zapamiętać)

Do czasów ECMAScript 6 w JavaScript nie było konstrukcji klas. Do tworzenia własnych typów i namiastek klas używano funkcji wywoływanej z konstruktorem. Szczegółowe działanie tego mechanizmu opisałem w dziale o prototypach. W ES6 pojawiły się klasy, które w dużej mierze są *syntatic sugar* dla konstruktora funkcji z paroma różnicami. Niemniej jest to konstrukcja bardziej nowoczesna i przyjazna dla oka.

## <span id="tworzenie-klas-za-pomocą-class">Tworzenie klas za pomocą class</span>

Na początek przypomnę jak tworzyć obiekty i zasymulować działanie klasy za pomocą funkcji:

```js
function PersonFunction(name) {
  this.name = name;

  this.print = function() {
    console.log(this.name);
  };
}

const functionObj = new PersonFunction('Rambo');
functionObj.print(); // Rambo
console.log(functionObj instanceof PersonFunction); // true
```

Tworzymy funkcję, którą według standardów zapisujemy wielką literą. W ciele funkcji wykorzystujemy `this` to tworzenia właściwości. Mamy tutaj pole `name`, które będzie przyjmowało wartość przekazywanego parametru. Mam też zdefiniowaną metodę `print` , która wypisuje pole `name`.

Taką funkcję wywołujemy przez konstruktor ze słówkiem `new`. To, co zwraca funkcja to obiekt, który ma własny typ `PersonFunction`.

Stwórzmy teraz klasę, która ma dokładnie te same właściwości:

```js
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  print() {
    console.log(this.name);
  }
}

const classObj = new PersonClass('Terminator');
classObj.print(); // Terminator
console.log(classObj instanceof PersonClass); // true
```

Do konstrukcji klasy używamy słowa kluczowego `class`. Zaraz po nim podajemy nazwę klasy, także według standardów nazwy klas piszemy zawsze wielką literą. Po nazwie klasy od razu otwieramy klamerki i tworzymy ciało klasy.

Pierwszym elementem jest konstruktor. Jest to metoda specjalna i może wystąpić tylko raz w całej klasie, albo wcale. Konstruktor uruchamia się zawsze na początku tworzenia klasy, jest to pierwsza wywołana metoda przez JavaScript i nie zależy to od nas.

W konstruktorze za pomocą `this` definiujemy pola w klasie. Konstruktor przyjmuje parametry, które są między innymi inicjalizacyjnymi wartościami dla pól klasy.

Niżej mamy też metodę `print`, która wypisuje pole `name` do konsoli, w przypadku klas nie musimy używać słowa `function`. Tak wygląda właśnie klasa w JavaScript. Wydaje się trochę bardziej czytelna. Nie musimy tutaj używać dodatkowych średników czy przecinków oddzielających kolejne właściwości w
klasie.

Stworzenie obiektu z klasy wygląda tak samo, jak stworzenie obiektu przy pomocy konstruktora funkcji, nie ma tutaj żadnej różnicy. Przez `new` wywołujemy nazwę klasy i do nawiasów okrągłych podajemy ewentualne parametry.

## <span id="różnice-między-klasą-a-funkcją">Różnice między klasą, a funkcją</span>

Często spotkacie się ze stwierdzeniem, że klasy to po prostu ładniejsza składania niż funkcje, które potem wywoływane są z konstruktorem. Jednak są pewne różnice między obiektami, które powstają z tych konstrukcji:

Wystarczy wypisać te dwa obiekty do konsoli, pierwszy obiekt pochodzi z funkcji:

```js
console.log(functionObj);
```

```text
PersonFunction {name: "Ramob", print: ƒ}
	name: "Ramob"
	print: ƒ ()
```

Widzimy, że przez `console.log` możemy wypisać wszystkie właściwości obiektu, ponieważ są one wyliczalne, głównie chodzi o to, że widzimy też metod tego obiektu.

Wypiszmy teraz obiekt pochodzący z klasy:

```js
console.log(classObj);
```

```text
PersonClass {name: "Terminator"}
	name: "Terminator"
```

W tym przypadku widzimy tylko i wyłącznie pole `name`, natomiast metoda `print` i konstruktor klasy nie jest widoczny. Metody zdefiniowane w klasie nie są wyliczalne. To oznacza też, że gdy pobieramy klucze obiektu przez `Object.keys` albo wartości przez `Object.values` to metody klasy zostaną
pominięte.

Zazwyczaj jest to wygodne, ponieważ to pola klasy przetrzymują ważne dla nas informacje i nie potrzebujemy iterować po metodach obiektu.

Dodatkowo mamy kilka mniej subtelnych różnic:

- deklaracja klas nie podlega pod hoisting tak jak deklaracja funkcji. Czyli najpierw musimy zadeklarować klasę, a potem możemy ją użyć. Jak pamiętamy `hoisting` przenosi deklaracja funkcji na początek kodu, dlatego możliwe jest użycie funkcji przed jej deklaracją.
- kod w klasie jest uruchamiany w trybie ścisłym, czyli razem z poleceniem `use strict`
- nie możemy wywołać klasy bez słówka `new`
- metod w klasie nie można wywoływać z konstruktorem, czyli ze słówkiem `new`

Poza tymi różnicami obiekty tworzone przez klasy są tymi samymi obiektami, które tworzymy literalnie albo przy pomocy konstruktora funkcji. Możemy na nich używać wszystkich metod pochodzących z `Object.prototype` czy też metod statycznych z `Object`. Obiekty pochodzące z klas nie są żadną nową
konstrukcją JavaScript.

## <span id="inne-tworzenie-klas">Inne tworzenie klas</span>

Są jeszcze inne sposoby na tworzenie klas, które raczej nie są dość często spotykane w kodzie. Podobnie jak przy funkcjach, możemy tworzyć wyrażenie klasy:

```js
const Car = class {
  constructor(model) {
    this.model;
  }
}
const car = new Car('Audi');
console.log(Car.name); // Car
console.log(car instanceof Car); // true
```

W tym zapisie tworzymy zmienną `Car` i przypisujemy wyrażenie klasy. Zauważcie, że po słowie `class` nie ma już nazwy klasy. Ten sposób jest pomocny, gdy chcemy przekazać klasę na przykład jako parametr do funkcji.

Nie ma żadnych specjalnych różnić między klasami deklarowanymi w normalny sposób a między wyrażeniami klas. Nadal możemy sprawdzić dokładnie typ naszego obiektu, który jest określony przez nazwę zmiennej.

Wyrażenie klasy może mieć też nazwę:

```js
const Dog = class Animal {
  constructor(name) {
    this.name = name;
    console.log(Animal.name); // Animal
  }
};
const dog = new Dog();
console.log(Dog.name); // Animal
console.log(dog instanceof Dog); // true
// console.log(Animal) // error
```

W tym przypadku przypisuję wyrażenie klasy do zmiennej `Dog`, ale wyrażenie to ma nazwę `Animal`. Nazwa `Animal` nie jest dostępna spoza klasy i można się do niej odwołać tylko w klasie. Obiekty tworzymy tylko za pomocą nazwy `Dog`, i również ta nazwa opisuje nasz typ.

Kolejną ciekawostką jest to, że możemy tworzyć klasy w sposób bardziej dynamiczny:

```js
function classMaker(name) {
  return class {
    constructor(country) {
      this.name = name;
      this.country = country;
    }
  };
}

const Person = classMaker('Rambo');
const City = classMaker('London');

console.log(new Person('USA').name); // Rambo
console.log(new Person('USA') instanceof Person); // true

console.log(new City('UK').name); // City
console.log(new City('UK') instanceof City); // true
```

Mamy funkcję, która zwraca klasę anonimową. Funkcja może mieć zdefiniowane parametry, które posłużą do inicjalizacji pól dla tej klasy. Możemy również wykorzystać konstruktor. Taką funkcję możemy wykorzystać do tworzenia różnych klas o różnych nazwach, a co za tym idzie o różnych prototypach.
Przydaje się, gdy dynamicznie chcemy tworzyć obiekty o tych samych właściwościach, ale jednocześnie chcemy je rozróżniać poprzez różne typy.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- klasy to ładniejsza składnia dla konstruktora funkcji
- między obiektami tworzonymi z funkcji a obiektami klasy są pewne subtelne różnice
- klasy z powodzeniem zastąpiły konstruktor funkcji i są bardzo często używane we współczesnym JavaScript
- tak jak funkcje, tak i klasy mogą być tworzone za pomocą wyrażenia

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
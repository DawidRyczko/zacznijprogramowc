---
title: "Dziedziczenie w JavaScript: Szybki Kurs #63"
description: "Dziedziczenie właściwości w JavaScript ES6 z użyciem klas i słowa kluczowego extends."
date: 2025-01-18
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Dziedziczenie klas](#dziedziczenie-klas)
* [Metoda super()](#metoda-super)
* [Nadpisywanie metod](#nadpisywanie-metod)
* [Co warto zapamiętać](#co-warto-zapamietac)

Wraz z ES6 w JavaScript dziedziczenie właściwości innych obiektów stało się łatwiejsze. Do tego czasu wykorzystywana była między innymi funkcja `Object.create` aby w jakiś sposób zaimplementować funkcjonalność, do której nie istniały tak proste narzędzia, jak klasy i słowo kluczowe `extends`.

## <span id="dziedziczenie-klas">Dziedziczenie klas</span>

Jeśli chodzi o dziedziczenie, najlepiej od razu zacząć od przykładu:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
```

Na początek przygotowałem klasę bazową o nazwie `Animal`. Ma ona jedno pole o nazwie `name`. Ta klasa będzie bazą dla innych klas do tworzenia różnych typów zwierząt.

Przykładem jest klasa `Dog`:

```js
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  bark() {
    console.log('How how!');
  }
}

const dog = new Dog('Reksio');
console.log(dog.name);
dog.bark();
```

Definicja klasy `Dof` używa słowa kluczowego `extends` i rozszerza klasę `Animal`. Oznacza to, że klasa `Dog` składa się teraz z tego, co znajduje się w `Animal` oraz z tego, co znajduje się w `Dog`. Czyli w skrócie możemy powiedzieć, że połączyłem dwie klasy w jedną.

Wiążą się z tym pewne zobowiązania. Przede wszystkim, nasz konstruktor także przyjmuje jakiś parametr, chociaż klasa `Dog` nie ma sama w sobie żadnego pola. Jednak takie pole istnieje w klasie `Animal` . Do konstruktora klasy `Animal`, odwołujemy się przez metodę `super()`, do której możemy
przekazać parametr `name`. W ten sposób zainicjalizujemy to pole, które znajduje się w klasie nadrzędnej. Do samej metody `super()` jeszcze wrócimy, ponieważ jest tutaj więcej niuansów.

Widzimy, że stworzony obiekt `dog` ma dostęp do pola `name`, a także korzysta z własnej zdefiniowanej metody `bark`. Teraz moglibyśmy stworzyć kolejną klasę na przykład `Cat` z metodą `meow` i w ten sposób na bazie jednego typu `Animal`, możemy tworzyć kolejne typy zwierząt. Oczywiście po
klasie `Animal`, możemy dziedziczyć nie tylko pola, ale także metody i metody statyczne.

To co się tutaj dzieje to tak naprawdę łączenie prototypów. Wiemy, że obiekt `dog` ma swój prototyp `Dog.prototype`. Ten prototyp ma wewnętrzną właściwość `[[Prototype]]`, do której dołączony jest `Animal.prototype` i na koniec jeszcze dołączony jest `Object.prototype`.

## <span id="metoda-super">Metoda `super()`</span>

Metoda `super()` odwołuje się do klasy wyższego rzędu, czyli tej, którą rozszerzamy, wywołuje jej konstruktor:

```js
class Car {
  constructor(model) {
    this.model = model;
  }
}

class Audi extends Car {
}

const audi = new Audi('80');
console.log(audi); // Audi {model: "80"}
```

W tym przykładowym kodzie mamy klasę `Car` z konstruktorem i polem `model`. Tworzymy inną klasę o nazwie `Audi` i rozszerzamy klasę `Car`. Nie używamy jednak konstruktora w klasie `Audi` i nie wywołujemy tym samym metody `super()`. Możemy jednak do konstruktora klasy `Audi` przekazać odpowiedni
parametr, ponieważ konstruktor i tak będzie wywołany, a jeśli przekażemy parametry, to zostanie wywołany z parametrami. Również nastąpi niejawne wywołanie metody `super()` do której zostaną przekazane parametry.

Myślę, że czytelniej dla kodu jest stworzenie konstruktora z parametrami, gdy rozszerzamy jakąś klasę. Od razu wiemy, że powinniśmy zapewnić jakieś inicjalizacyjne dane.

Gdybyśmy jednak dodali konstruktor do klasy musielibyśmy od razu wywołać metodę `super`. Zawsze, gdy rozszerzamy jakąś klasę i mamy konstruktor, wywołanie metody `super` jest obowiązkowe. Jeżeli jednak nie stworzymy konstruktora to i tak po pierwsze JavaScript wywoła konstruktor sam oraz wywoła
metodę `super`. Stanie się to niejawnie, ale i tak zostanie wywołane.

Przede wszystkim należy pamiętać, że rozszerzenie klasy i posiadanie konstruktora zmusza nas do wywołania metody `super()`, nawet gdy klasa nadrzędna sama nie ma konstruktora:

```js
class Person {
}

class Soldier extends Person {
  constructor(weapon) {
    super();
    this.weapon = weapon;
  }
}

const soldier = new Soldier('bow');
```

W tym przykładzie mamy pustą klasę `Person`. Tworzę klasę `Soldier` i przez `extends` rozszerzam klasę `Person`. Jeżeli stworzyłem z jakichś powodów konstruktor w klasie `Soldier`, muszę wywołać metodę `super()` dla klasy nadrzędnej, nie jest istotne, że jest ona całkowicie pusta.

Dobrze, gdy metoda `super()` jest wywołana na początku konstruktora, a na pewno musi być wywołana przed odwołaniem się do `this`. Dlatego najczęściej jest ustawiana na samym początku, to zapewnia zawsze poprawne działanie.

Metoda `super()` może zostać wywołana tylko w konstruktorze, nie można jej wywołać w innej metodzie. Za chwilę się jednak przekonamy, że przez samą właściwość `super`, ale nie jako wywołanie metody, mamy dostęp do właściwości obiektu nadrzędnego i możemy wtedy używać `super` w innych metodach.

Metodę `super()` wywołujemy w konstruktorze tylko wtedy, gdy rozszerzamy jakąś klasę. Wywołanie jej w innym wypadku zgłosi błąd. To akurat będzie bardzo rzadki błąd, ale z doświadczenia wiem, że wiele osób zapomina w ogóle wywołać metodę `super()` gdy rozszerza jakąś klasę i jeszcze częściej
przekazać przez tę metodę parametry do inicjalizacyjne dla konstruktora klasy nadrzędnej.

Gdy rozszerzamy inną klasę, musimy zawsze zwrócić szczególną uwagę na konstruktor klasy, którą będziemy rozszerzać i na parametry jakie przyjmuje. Jeżeli nie przekażemy odpowiednich parametrów spotkamy się z wartościami `undefined`.

## <span id="nadpisywanie-metod">Nadpisywanie metod</span>

Czasami będziemy dziedziczyć po innych klasach różne metody, których funkcjonalność, nie zawsze musi nam pasować:

```js
class Document {
  print() {
    console.log('Print document');
  }
}

class Email extends Document {
  print() {
    console.log('Print to pdf');
  }
}

const email = new Email();
email.print(); // 'Print to pdf'
```

Mamy podstawową klasę `Document`, która ma zaimplementowaną metodę `print`. Metoda ta wykonuje normalne drukowanie dokumentu. Stworzona klasa `Email` rozszerza klasę `Document` i oczywiście dziedziczy metodę `print()`. Jednak gdy w klasie pochodnej, czyli w klasie `Email` zadeklarujemy
metodę `print()` to przysłonimy tą metodę, która została odziedziczona. Od tego momentu będzie wywoływana metoda z klasy `Email` nie z klasy `Document`. W ten sposób nadpisujemy metody z klas nadrzędnych.

Nadpisywanie metod może się przydać, szczególnie gdy chcemy wcześniej wykonać inne czynności:

```js
class Image extends Document {
  print() {
    console.log('do some stuff')
    super.print()
  }
}

const image = new Image();
image.print(); // 'do some stuff', 
// 'Print document'
```

Mamy kolejną klasę `Image`, która rozszerza klasę `Document`. Tutaj także nadpisujemy metodę `print()`. Jednak w tej metodzie wykorzystujemy właściwość `super` i odwołujemy się jeszcze raz do metody `print()`, ale już z klasy nadrzędnej. Taki zapis oznacza odwołanie się do właściwości klasy
nadrzędnej.

Mogliśmy więc nadpisać metodę, wykonać w niej dodatkowe czynności i na końcu wywołać metodę z klasy nadrzędnej. Można powiedzieć, że w ten sposób rozszerzyliśmy możliwości metody nadrzędnej, a nie tylko nadpisaliśmy ją.

Okazuje się więc, że definiując konstruktor w klasie pochodnej, tak naprawdę nadpisujemy konstruktor w klasie nadrzędnej, dlatego zawsze musimy wywołać `super()`, aby zainicjalizować konstruktor w klasie nadrzędnej. Różnica jest taka, że nadpisując konstruktor zawsze jesteśmy zobowiązani
wywołać `super()` czego nie musimy robić przy zwykłych metodach.

Na koniec ważna uwaga, nie twórzmy metod jako `arrow function`, ponieważ nie posiadają one dostępu do `super`. W ogóle tworzenie metod jako `arrow function` w klasach jest złym pomysłem.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- do rozszerzania klas używamy słowa kluczowego `extends`
- dziedziczenie oznacza, że prototyp klasy nadrzędnej wstawiany jest do prototypu klasy pochodnej, czyli `Child.prototype.__proto__` będzie zawierało `Parent.prototype`
- gdy używamy konstruktora w klasie pochodnej musimy wywołać metodę `super()`
- metoda `super()` musi być wywołana przed jakimkolwiek `this`, dlatego najlepiej wywołać ją na początku konstruktora
- możemy nadpisywać metody z klasy nadrzędnej
- do metod z klasy nadrzędnej odwołujemy się przez `super.nazwaMetody`
- metody i pola statyczne również są dziedziczone

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
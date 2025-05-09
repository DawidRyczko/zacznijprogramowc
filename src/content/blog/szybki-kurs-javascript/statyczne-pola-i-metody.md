---
title: "Statyczne pola i metody w JavaScript: Szybki Kurs #62"
description: "Omówienie statycznych pól i metod w JavaScript."
date: 2025-01-19
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Statyczne pola i metody](#statyczne-pola-i-metody)
* [Metody statyczne w JavaScript](#metody-statyczne-w-javascript)
* [This w metodzie statycznej](#this-w-metodzie-statycznej)
* [Pola statyczne](#pola-statyczne)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="statyczne-pola-i-metody">Statyczne pola i metody</span>

Zauważyliście, że możemy wywoływać niektóre metody czy też pola z obiektów bez tworzenia ich instancji. Na przykład mamy dostęp do metody `Object.is()` albo `Array.from()`. Są to metody statyczne, które możemy wywołać od razu przez nazwę klasy, nie potrzebujemy do tego tworzyć instancji klasy.

## <span id="metody-statyczne-w-javascript">Metody statyczne w JavaScript</span>

Stworzymy sobie klasę `Utils`, która posłuży nam do tworzenia metod statycznych:

```javascript
class Utils {
  static magicNumber() {
    return 42;
  }

  foo() {
  }
}

console.log(Utils.magicNumber()); // 42
```

W tym przykładzie mamy klasę `Utils`, która ma zdefiniowaną metodę `magicNumber`. Metoda ta poprzedzona jest słowem kluczowym `static`. Dzięki temu możemy wywołać metodę używając tylko nazwy klasy. Zauważcie, że nie musieliśmy tutaj tworzyć instancji klasy `Utils` przez `new Utils()` tylko od razu
przez nazwę klasy możemy wywołać metodę.

Oznacza to, że metody statyczne tworzone są w klasie, nie w prototypie tej klasy, który potem służy do tworzenia kolejnych obiektów:

```javascript
console.dir(Utils);
```

```text
 Utils()
	arguments: null
	caller: null
	length: 0
	magicNumber: ƒ magicNumber()
	name: "Utils"
	prototype:
		constructor: ƒ Utils()
		foo: ƒ foo()
```

Gdy wypiszemy nazwę klasy przez `console.dir` zobaczymy, że bezpośrednio w klasie znajduje się metoda `magicNumber`. Natomiast zwykła metoda `foo`, która istnieje w tej klasie jest dopiero we właściwości `prototype`. Oznacza to, że do metody `foo` możemy odwołać się dopiero przez stworzenie obiektu
tej klasy, czyli wywołania jej z konstruktorem za pomocą słówka `new`.

## <span id="this-w-metodzie-statycznej">This w metodzie statycznej</span>

Nic nie stoi na przeszkodzie, aby tworzyć metody statyczne także w klasach, z których tworzymy instancje obiektów:

```javascript
class Car {
  constructor(model) {
    this.model = model;
  }

  static info() {
    console.log('Class to create cars');
    console.log(this.model); // undefined
    console.dir(this); // Carr class
  }
}

const carObject = new Car('Opel');
Car.info();

// carObject.info() // error
```

Stworzyłem klasę, która ma jedno pole o nazwie `model`. Klasa ta dodatkowo ma metodę statyczną o nazwie `info`, która wypisuje jakiś tam komunikat do konsoli.

Chciałbym jednak zwrócić uwagę na `this` w metodach statycznych, w których`this` nie odnosi się do instancji obiektu, dlatego po odwołaniu do pola `model`, otrzymujemy wartość `undefined`. W metodach statycznych `this` odnosi się do klasy `Car`. Metoda statyczna przez `this` zwraca klasę, w której
została utworzona, nie zwraca instancji tego obiektu. Jest to bardzo ważne, aby rozróżniać, że mamy klasę i mamy obiekty tworzone z tej klasy.

Pokazuje to także próba wywołania metody statycznej przez stworzony obiekt `carObject`. Przez instancję obiektu nie możemy odwołać się do metody statycznej, otrzymujemy błąd. Metoda statyczna istnieje tylko na poziomie klasy, nie istnieje w prototypie tej klasy jak jej normalne metody. Nie ma jej
w `Car.prototype` tylko jest w klasie `Car`.

Żeby pokazać dokładnie jak działa `this` w metodzie statycznej, stwórzmy jeszcze jeden przykład:

```javascript
class Message {
  constructor(msg, date) {
    this.msg = msg;
    this.date = date;
  }

  static createWithYear(msg) {
    return new this(msg, new Date().getFullYear())
  }

  static createWithDay(msg) {
    return new this(msg, new Date().getDay())
  }
}

const message = Message.createWithYear('Hello');
console.log(message.msg); // Hello
console.log(message.date); // 2020
```

Stworzyłem klasę `Message`, która ma zdefiniowane dwie metody statyczne. W tych metodach odwołuję się przez `this`
właśnie do klasy `Message`. Mając dostęp do klasy mogę wywołać ją ze słówkiem `new` i tworzyć kolejne instancje obiektów.

Pomimo tego, że ta klasa ma konstruktor i moglibyśmy normalnie stworzyć instancję obiektu tej klasy, to mamy dodatkowe metody statyczne, które tworzą instancje, ale na przykład z innym formatem daty.

Metody statyczne powinny być niezależna, zazwyczaj tworzymy je do zwracania pewnych stałych wartości, konfiguracji, mogą wykonywać funkcjonalności, które powtarzamy wiele razy w różnych częściach aplikacji. Zazwyczaj metody statyczne reprezentują jakieś narzędzia jak parsery, formatery i tym
podobne.

W JavaScript często spotkacie się z metodami statycznymi. Istnieją one w każdej klasie jak `Number`, `Object`, `Array`. Cała klasa `Math` do operacji matematycznych jest zbudowana z metod i pól statycznych. Również w klasie `Date`
znajdziemy wiele statycznych metod.

## <span id="pola-statyczne">Pola statyczne</span>

Oprócz tego, że możemy tworzyć metody statyczne, możemy także tworzyć pola statyczne:

```javascript
class Config {
  static url = 'http://www.example.com';
  static version = 0.1;
}

console.log(Config.url); // 'http://www.example.com'
console.log(Config.version); // 0.1
```

Zdefiniowana klasa `Config`, posiada dwa pola statyczne, do których odwołujemy się bezpośrednio przez nazwę klasy. Takie pola świetnie nadają się do przetrzymywania pewnych stałych wartości, tworzenia klas z konfiguracjami i tym podobnych narzędzi.

Tak jak wspomniałem, elementy te istnieją w samej klasie nie w jej prototypie, jeżeli więc chcemy dodać jakieś pole w czasie wykonywania programu, możemy to zrobić tak:

```javascript
Config.app = 'my app';
console.log(Config.app); // 'my app'
```

Odwołujemy się do nazwy i po kropce dodajemy nowe pole statyczne. Nie robimy tego przez `Config.prototype`, a przez samą nazwę klasy. Tak samo postępujemy w przypadku metod:

```javascript
Config.getDate = function() {
  return new Date();
};
```

Tworzymy nową metodę w klasie `Config`, przez stworzenie nowej nazwy i przypisanie jej funkcji.

I tak wyglądają statyczne właściwości klas. Metody statyczne, pola statyczne, zwykłe metody i pola klasy, wszystkie te konstrukcje mogą istnieć w jednej klasie. Nie ma żadnych przeciwwskazań do tworzenia klas o tak urozmaiconych właściwościach.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metody i pola statyczne istnieją w klasie, a nie w jej prototypie
- właściwości statyczne wywołujemy przez odwołanie się do nazwy klasy
- nie możemy odwołać się do właściwości statycznych przez instancję obiektu
- metody i pola statyczne nie mają dostępu do instancji obiektu w środku klasy, `this` wskazuje na klasę nie na instancję obiektu
- właściwości statyczne są dobre do tworzenia stałych wartości, klas narzędziowych, parserów, formaterów, kawałków kodów, które regularnie używamy w różnych częściach aplikacji

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
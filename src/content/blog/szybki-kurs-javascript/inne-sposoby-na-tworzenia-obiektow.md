---
title: "Inne sposoby na tworzenia obiektów w JavaScript: Szybki Kurs #49"
description: "Poznaj różne metody tworzenia obiektów w JavaScript, od literalnej formy po klasy ES6 i Object.create."
date: 2025-02-02
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Tworzenie za pomocą Object](#tworzenie-za-pomoca-object)
* [Tworzenie obiektów za pomocą funkcji](#tworzenie-obiektow-za-pomoca-funkcji)
* [Tworzenie obiektów za pomocą klas](#tworzenie-obiektow-za-pomoca-klas)
* [Tworzenie obiektów za pomocą Object.create](#tworzenie-obiektow-za-pomoca-objectcreate)
* [Co warto zapamiętać](#co-warto-zapamietac)

Do tej pory poznaliśmy literalną formę tworzenia obiektów w JavaScript. Wystarczyło użyć dwóch nawiasów klamrowych i gotowe. Jest to najpopularniejszy sposób na tworzenie obiektów, ale są też inne sposoby.

## <span id="tworzenie-za-pomoca-object">Tworzenie za pomocą Object</span>

Jak większość wartości w JavaScript tak i obiekty mają specjalny obiekt `Object`. Możemy go użyć ze słówkiem `new` jako wywołanie konstruktora lub bez tego słowa. Działanie jest to samo:

```js
const obj1 = new Object();
console.log(obj1); // {}

const obj2 = Object();
console.log(obj2); // {}
```

Przy takim tworzeniu obiektów w obu przypadkach powstają nam puste obiekty. Możemy później do takich obiektów dodawać nowe pola czy metody. Jest to wtedy jedyna forma rozszerzania właściwości obiektu tworzonego w taki sposób.

Możemy również do obiektu `Object` przekazywać różne wartości:

```js
console.log(Object({ a: 1 })); // { a: 1 }
console.log(Object('foo')); // [String: 'foo']
console.log(Object(true)); // [Boolean: true]
console.log(Object(42)); // [Number: 42]
console.log(Object([])); // []
console.log(Object(null)); // {}
```

Jeżeli będziemy przekazywać tam różne wartości, `Object` stworzy dla nas odpowiedni obiekt, który reprezentuje przekazany typ. Tak naprawdę przydatność takiego kodu jest mała. Dlatego też rzadko ujrzycie wywołanie  `Object` do tworzenia czy to normalnych obiektów, czy też obiektów dla innych typów.
Natomiast sam `Object` będzie przez nas często używany do wywołania metod, które ma wbudowane.

## <span id="tworzenie-obiektow-za-pomoca-funkcji">Tworzenie obiektów za pomocą funkcji</span>

Wiemy, że funkcje w JavaScript to tak naprawdę obiekty. Mają swój podtyp `function`, ale wciąż są to obiekty. Możemy wykorzystać konstruktor funkcji do stworzenia obiektu:

```js
const Person = function(name, surname) {
  this.name = name;
  this.surname = surname;
  this.print = function() {
    return this.name + ' ' + this.surname;
  };
};

const person1 = new Person('John', 'Rambo');
console.log(person1); //  Person { name: 'John', surname: 'Rambo', print: [Function] }

console.log(person1.name); // John
console.log(person1.surname); // Rambo
console.log(person1.print()); // John Rambo
```

W tym kodzie definiujemy funkcję, którą przypisałem do zmiennej. Specjalnie tworzę zmienną z dużej litery, czasami możecie się spotkać z takim zapisem przy funkcjach, które wywoływane są potem z konstruktorem.

W ciele funkcji wykorzystuję `this` i przypisuję do niego pola, które będą przetrzyrmywały wartości z parametrów funkcji. Tworzę także dodatkowe pole, które będzie metodą dla tworzonego obiektu.

Funkcję `Person` wywołuję ze słówkiem `new` czyli wywołuję jej konstruktor i przekazuję dane do parametrów. Wywołanie funkcji w taki sposób zwraca nowy obiekt z gotowymi danymi. Posługujemy się nim tak samo, jak zwykłym obiektem JavaScript i nie ma tutaj żadnej różnicy. Możemy odwołać się do każdego
pola czy też do metody.

Zaletą tego rozwiązania jest to, że możemy stworzyć sobie schemat dla obiektu. Potem takich obiektów możemy tworzyć więcej, korzystając właśnie z gotowego schematu. Ten kod jest namiastką klas w JavaScript, które pojawiły się w ES6 i w dużej mierze zastąpiły funkcje tego typu. Dlatego też częściej
spotkacie się z takimi zapisami w starszym kodzie JavaScript.

## <span id="tworzenie-obiektow-za-pomoca-klas">Tworzenie obiektów za pomocą klas</span>

W ES6 pojawiały się klasy w JavaScript. Jest to zupełnie nowy twór znany z wielu innych języków programowania. Tak naprawdę klasy to *syntactic sugar* dla tworzenia obiektów przy pomocy konstruktora funkcji:

```js
class Person2 {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  print() {
    return this.name + ' ' + this.surname;
  }
}

const person2 = new Person2('John', 'Rambo');

console.log(person2); // { name: 'John', surname: 'Rambo' }
console.log(person2.name); // John
console.log(person2.surname); // Rambo
console.log(person2.print()); // John Rambo
```

Ta klasa robi dokładnie to samo, co robiła wcześniejsza funkcja. Ma jednak nowocześniejszą i wygodniejszą konstrukcję. I to właśnie tę składnię spotkacie najczęściej w nowoczesnym JavaScript. Klasy używane są w każdym nowoczesnym frameworku jak React czy Angular. My do klas powrócimy w zupełnie
innym dziale.

Dlatego nie chcę się teraz zagłębiać w ich budowę i sposób wykorzystania, ponieważ wszystko omawiane jest w dalszym dziale.

## <span id="tworzenie-obiektow-za-pomoca-objectcreate">Tworzenie obiektów za pomocą Object.create</span>

Za każdym razem, gdy tworzymy obiekt w JavaScript, dziedziczą one pewne właściwości z `Object.prototype` o czym będziemy jeszcze rozmawiać. To dziedziczenie zapewnia każdemu obiektowi zbiór pewnych funkcjonalności w postaci metod, które możemy wywołać. Zapewnia także pewne gotowe właściwości
opisujące obiekty.

Metoda `Object.create` pozwala nam tworzyć obiekty zarówno z dziedziczeniem prototypu, jak i obiekty bez żadnego prototypu:

```js
const animal = {
  sound: 'Biiip',
  makeSound() {
    console.log(this.sound);
  }
};
const dog = Object.create(animal);
dog.sound = 'How how!';
dog.makeSound() // How how!
```

Ten przykład pokazuje często użycie `Object.create` do tworzenia nowego obiektu na bazie innego obiektu. W tym przypadku rozszerzamy obiekt bazowy `animal`  przekazując go do metody `Object.create`. Otrzymujemy zupełnie nowy obiekt, który bazuje na obiekcie `animal` i również na tym, co dziedziczył
obiekt `animal` wcześniej.

Wykorzystując `Object.create`, możemy też dodać nowe właściwości:

```js
const dog1 = Object.create(animal, { name: { value: 'Reksio' } });
console.log(dog1.name); // Reksio
```

Nowe właściwości przekazujemy jako obiekt, gdzie podajemy nazwę nowej właściwości, do której musimy przekazać wartość. Wartość także zapisujemy jako obiekt. W ten sposób na bazie obiektu `animal`, stworzyliśmy nowy obiekt, który ma dodatkową właściwość `name`.

Drugim działaniem `Object.create` jest tworzenie obiektu bez żadnego prototypu:

```js
const obj = Object.create(null);
console.log(obj);
```

Jest to po prostu pusty obiekt. Nie posiada on żadnych właściwości ani żadnych metod. Nie dziedziczy też po głównym obiekcie `Object`. Taki obiekt czasami był stosowany jako słownik, czyli struktura `Map`, ale obecnie mapy mamy dostępne w JavaScript od wersji ES6. Dlatego ciężko dzisiaj znaleźć
zastosowanie dla tego rozwiązania.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- najprostszą i najlepszą formą tworzenia obiektów to postać literalna
- w JavaScript mamy także opcję skorzystania z konstruktora `Object`
- jeżeli potrzebujemy stworzyć wiele razy ten sam obiekt, możemy użyć konstruktora funkcji
- w ES6 pojawiały się klasy co wydaje się lepszą wersją konstruktorów funkcji
- `Object.create` tworzy obiekt na bazie innego obiektu

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
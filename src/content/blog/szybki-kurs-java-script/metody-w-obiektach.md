---
title: "Metody w obiektach w JavaScript: Szybki Kurs #48"
description: "Poznaj metody, gettery i settery w obiektach JavaScript. Dowiedz się, jak tworzyć i używać metod, oraz jak działają akcesory."
date: 2025-02-03
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Metody w obiektach JavaScript](#metody-w-obiektach-javascript)
* [Getter i setter](#getter-i-setter)
* [Metoda jako arrow function](#metoda-jako-arrow-function)
* [Skrótowy zapis metody](#skrótowy-zapis-metody)
* [Co warto zapamiętać](#co-warto-zapamietac)

Do tej pory zapoznaliśmy się z obiektami, które przetrzymywały typy prymitywne. Jak już wspomniałem, do pól w obiekcie przypisać możemy każdy typ danych. Przede wszystkim możemy używać funkcje, które przypisane do pola w obiekcie nazywamy metodami.

## <span id="metody-w-obiektach-javascript">Metody w obiektach JavaScript</span>

Metody w obiektach JavaScript, mogą być zapisane na różne sposoby. Zobaczmy pierwszy sposób:

```js
const obj1 = {
  print: function(value) {
    console.log(value);
  },
};

obj1.print('Hello'); // 'Hello'
```

W tym przypadku widzimy obiekt z polem `print`. Jego wartością jest przypisana `funkcja`. Funkcję przypisujemy tak samo, jakbyśmy przypisali wartość prymitywną. Funkcje, które znajdują się w obiektach, zazwyczaj nazywamy metodami.

Oczywiście nic nie stoi na przeszkodzie, aby do obiektu dodawać kolejne metody, podobnie jak przy dodawaniu zwykłych pól:

```js
obj1.printError = function(err) {
  console.error(err);
};

obj1.printError('Some error'); // 'Some rror'
```

Nie ma różnicy między dopisaniem metody do obiektu a dopisaniem zwykłej wartości prymitywnej. Postępujemy dokładnie tak samo.

Jednak metody mogą o wiele więcej niż zwykłe wartości prymitywne. W metodzie możemy na przykład odwołać się do pola w obiekcie i jest to częsta praktyka:

```js
const person = {
  name: 'John',
  printName() {
    console.log(this.name);
  },
};

person.printName();
```

Mamy zdefiniowany obiekt, w którym znajduje się pole `name` oraz metoda `printName`. Zadaniem metody jest wydrukowanie danych do konsoli. Zauważ, że do pola `name` odnosimy się przez słowo kluczowe `this`. Bez tego metoda `printName` nie będzie w stanie zlokalizować pola `name`.

Samo `this` w JavaScript może być na tyle problematyczne, że będzie omówione dokładnie w oddzielnym dziale. Dla uproszczenia powiem, że słowo `this` wskazuje na ten obiekt i w tym obiekcie będzie poszukiwane pole `name`.

## <span id="getter-i-setter">Getter i setter</span>

W JavaScript istnieją jeszcze specjalne metody jak `get` i `set`, które możemy zdefiniować w obiekcie. Nazywane są też akcesorami i często mówi się o nich jako `getter` i `setter`.

`Getter`  jest metodą, która zwraca wartość konkretnego pola, a `setter` metodą, która ustawia wartość konkretnego pola:

```js
const person1 = {
  firstName: 'John',
  get name() {
    return this.firstName;
  },
  set name(name) {
    this.firstName = name;
  },
};
```

W tym obiekcie mamy zdefiniowane pole `firstName` oraz akcesory do tego pola. Pierwszym akcesorem jest `get`. Konstrukcja jest nieco inna niż tworzenie metody. Używamy instrukcji `get` po czym następuje stworzenie nazwy gettera.

Podobnie jest z akcesorem `set`. Po instrukcji `set` tworzymy metodę, która musi przyjąć dokładnie jeden parametr. Nie możemy stworzyć `settera` bez parametrów, albo z większą ilością niż jeden parametr.

Gdy tworzymy `getter` i `setter` dla konkretnego pola w obiekcie, zawsze tworzymy taką samą nazwę. W przypadku `gettera`
i `settera` nie jest to problem, że oba `accessory` mają identyczną nazwę.

`Getter` i `setter` obsługuje się tak samo, jak pola w obiekcie:

```js
person1.name = 'Rambo';
console.log(person1.name); // 'Rambo'
```

Nie wywołujemy `settera` o nazwie `name` i nie przekazujemy mu parametru, korzystamy z niego identycznie jak z pola w klasie.

To samo dotyczy wywołania `gettera`, nie są potrzebna okrągłe nawiasy na końcu jak do wywołania metody. Po prostu odwołujemy się do `gettera` jak do pola w klasie.

Akcesory mogą być przydatne, gdy bardziej chcemy kontrolować dane zapisywane do określonego pola. Jeśli mamy potrzebę w jakiś sposób kontrolować pole w klasie możemy zrobić to z getterem i setterem:

```js
const person2 = {
  _name: 'Rambo',
  get name() {
    return this.firstName.split('');
  },
  set name(name) {
    this.firstName = name.toUpperCase();
  },
};
```

W JavaScript jest konwencja, w której podkreślenie przy nazwie pola oznacza, że to pole jest prywatne i nie należy odwoływać się do niego bezpośrednio. W JavaScript do tej pory prywatne pola nie istniały. Jest propozycja ich dodania i być może będziemy mogli ich oficjalnie używać w przyszłości.

Dlatego często używa się zapisu pola z podkreśleniem oraz stworzeniem `gettera` i `settera` ale już o normalnej nazwie. Korzystając z tego obiektu będziemy używać `accessorów` jak normalnego pola obiektu, a pole z podkreśleniem powinno być przez nas omijane.

Dodatkowo `getter` i `setter` pozwala nam na dodanie dodatkowej logiki. Możemy w jakiś sposób modyfikować przychodzące i wychodzące wartości.

Pamiętajmy, że akcesory nie zastąpią nam metod w obiektach i nie należy nimi tego robić. Akcesory jak sama nazwa wskazuje, mają dać nam dostęp do danych obiektu. Metody natomiast mogą pełnić różne funkcje w obiekcie.

## <span id="metoda-jako-arrow-function">Metoda jako arrow function</span>

W obiektach możemy także definiować obiekty jako `arrow function`:

```js
const person3 = {
  firstName: 'John',
  print: () => console.log(this.firstName),
}
person3.print(); // undefined
```

Tworzenie metod jako `arrow function` w obiektach może być atrakcyjne, jednak nie jest to zalecane. Pojawia się tu problem z `this`, który nie odwołuje się tutaj do obiektu, w którym istnieje metoda, ale w tym przypadku do obiektu globalnego `window` jeśli mówimy o przeglądarce. O `this` i
problemach tego typu będziemy rozmawiać w oddzielnym dziale.

Dobrą radą natomiast jest nie używanie `arrow functions` w obiektach JavaScript.

## <span id="skrotowy-zapis-metody">Skrótowy zapis metody</span>

W ES6 pojawił się nowy sposób zapisu metod w obiektach JavaScript:

```js
const person4 = {
  firstName: 'John',
  print() {
    console.log(this.firstName);
  },
};
person4.print(); // 'John'
```

W tym zapisie tworzymy po prostu nazwę funkcji bez słowa kluczowego `function`. Nie musimy też przypisywać funkcji do pola w obiekcie. Wyglądem przypomina `setter` i `getter`. Jest to obecnie dość często stosowany zapis metody w obiektach. Zdecydowanie zmniejsza ilość kodu i poprawia czytelność.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- możemy przypisać funkcję do pola w obiekcie, wtedy staje się ona metodą
- obiekty mogą posiadać akcesory jak `getter` i `setter`
- nie należy używać `arrow function` jako metod w obiektach
- istnieje skrótowy zapis metod w obiektach wprowadzony w ES6

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
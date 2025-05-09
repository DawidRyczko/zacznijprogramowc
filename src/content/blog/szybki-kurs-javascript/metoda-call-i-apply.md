---
title: "Metoda call i apply w JavaScript: Szybki Kurs #71"
description: "Wykorzystanie call i apply do zmiany kontekstu this w JavaScript."
date: 2025-01-10
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Użycie call i apply](#użycie-call-i-apply)
* [Pożyczanie metod](#pożyczanie-metod)
* [Wywoływanie metod z call i apply](#wywoływanie-metod-z-call-i-apply)
* [Call, apply czy bind](#call-apply-czy-bind)
* [Co warto zapamiętać](#co-warto-zapamiętać)

Kolejne metody, które mogą nam posłużyć do operowania kontekstem wywoływanej funkcji to `apply` oraz `call`. Ich działanie jest identyczne, różnią się jedynie sposobem przekazywania parametrów, które można podać przy wywołaniu funkcji.

Metody te działają podobnie do metody `bind`. Główną różnicą jest to, że metoda `bind` zwraca nową funkcję, którą trzeba jeszcze wywołać. Natomiast metody `apply` oraz `call` od razu wykonują funkcję, na której są wywołane.

Niezbyt często będziecie używać tych metod, ale od czasu do czasu mogą pojawić się w kodzie, warto więc wiedzieć, jak działają. Warto też przed tym odcinkiem zapoznać się z metodą `bind`, którą omawiałem odcinek wcześniej.

## <span id="użycie-call-i-apply">Użycie call i apply</span>

Podobnie jak przy metodzie `bind` możemy przez `call` i `apply` wskazać kontekst dla funkcji:

```js
function printName() {
  console.log(this.name);
}

const person = {
  name: 'Rambo',
};

printName.call(person);
printName.apply(person);
```

Mamy samodzielną funkcję `printName` oraz obiekt `person`. Wykorzystując `call` albo `apply` możemy wywołać metodę z przekazanym kontekstem `this`. W odróżnieniu od `bind` funkcja wywołana za pomocą `call` albo `apply` od razu się wykonuje. Natomiast `bind` zawsze zwraca nową funkcję, którą trzeba
dopiero wykonać.

W tym przypadku funkcja `printName` wykonała się z kontekstem obiektu `person`. Bez użycia `call` albo `apply`, funkcja ta przez `this` odwołałaby się do obiektu globalnego, w tym wypadku `window`, a w trybie ścisłym była by to wartość `undefined`. Z pomocą tych dwóch metod ustawiliśmy
funkcji `printName` odpowiedni kontekst `this`.

## <span id="pożyczanie-metod">Pożyczanie metod</span>

Podobnie jak `bind` metodę `call` oraz `apply` możemy użyć do pożyczenia metod z innych obiektów:

```js
const dog = {
  name: 'Reksio',
};

const cat = {
  name: 'Alice',
  run(speed) {
    console.log(this.name + ' run ' + speed + ' km');
  },
};

cat.run.call(dog, 34); // Reksio run 34 km
cat.run.apply(dog, [34]); // Reksio run 34 km
```

Mamy obiekt `dog`, który nie ma metody `run` tak jak obiekt `cat`. Z pomocą metod `call` oraz `apply` możemy wywołać metodę `run` pochodzącą z obiektu `cat`, ale z kontekstem obiektu `dog`.

Do metod przekazujemy jak pierwszy parametr kontekst, z którym ma być wywołana metoda `run`. Drugim parametrem jest parametr dla metody `run`. Przy metodzie `call` podajemy go normalnie, natomiast metoda `apply` przejmuje parametry w formie tablicy. To jest właśnie główna różnica między tymi
metodami, forma przyjmowania parametrów.

Udało nam się pożyczyć metodę z innego obiektu poprzez zastosowanie `call` i `apply` co zmieniło kontekst wykonania metody `run`. Pomimo tego, że początkowo wykonujemy ją na obiekcie `cat`, to `call` oraz `apply` wymuszają zmianę kontekstu dla tej metody.

## <span id="wywoływanie-metod-z-call-i-apply">Wywoływanie metod z call i apply</span>

Podobnie jak przy metodzie `bind` możemy użyć metody `call` i `apply` do wywołania funkcji i przekazania parametrów:

```js
function sum(a, b, c, d) {
  console.log(a + b + c + d);
}

sum.call(null, 1, 2, 3, 4);
sum.apply(null, [1, 2, 3, 4]);
```

Przy użyciu `call` albo `apply`, funkcja od razu jest wywołana z przekazanymi parametrami. Gdy używamy `call` parametry przekazujemy pojedynczo. Gdy używamy metody `apply` parametry przekazywane są w postaci tablicy. To jest cała różnica w działaniu tych metod.

Natomiast jako pierwszy parametr przekazaliśmy `null`, oznacza to, że nie chcemy przekazywać żadnego kontekstu dla tej funkcji, ponieważ i tak nie korzysta ona ze wskaźnika `this`.

Pomimo tego, że wywołanie funkcji z metodą `apply`, gdzie możemy przekazać tablicę parametrów, wydaje się ciekawe, to obecnie w JavaScript mamy lepsze rozwiązanie:

```js
sum(...[1, 2, 3, 4]);
```

Możemy użyć spread operatora i rozbić tablicę na pojedyncze wartości.

W nowoczesnym kodzie JavaScript raczej rzadko spotkacie `call` czy `apply`. Być może dowiązanie `this` za pomocą metody `bind` będzie znacznie częściej spotykane. Są to jednak metody, które często spotyka się w tutorialach czy dokumentacji, dlatego w kontekście `this` poznanie ich jest wręcz
obowiązkowe.

## <span id="call-apply-czy-bind">Call, apply czy bind</span>

Na koniec pozostaje pytanie, której metody kiedy użyć:

- jeżeli potrzebujecie stworzyć funkcję z innym kontekstem `this ` i wywołać ją później to używamy `bind`, taki zabieg przydaje się przy przekazywaniu funkcji jako `callback`

```js
const person = {
  surname: 'Rambo',
  print() {
    console.log(this.surname);
  },
};

setTimeout(person.print.bind(person), 1000); // Rambo
```

- jeżeli potrzebujecie stworzyć funkcję, która jest częściowo wywołana, również używamy `bind`

```js
function sum(a, b) {
  console.log(a + b);
}

const sum2 = sum.bind(null, 10);
sum2(7); // 17
```

- jeżeli chcecie od razu wywołać funkcję z innym kontekstem `this` to używamy `call` albo `apply`

```js
function printName() {
  console.log(this.name);
}

const person = {
  name: 'Rambo',
};

printName.call(person);
printName.apply(person);
```

- jeżeli chcecie od razu wywołać funkcję z innym kontekstem `this` i przekazać pojedynczo parametry, używamy `call`

```js
function sum(a, b, c, d) {
  console.log(a + b + c + d);
}

sum.call(null, 1, 2, 3, 4);
```

- jeżeli chcecie od razu wywołać funkcję z innym kontekstem `this` i przekazać listę parametrów, używamy `apply`

```js
function sum(a, b, c, d) {
  console.log(a + b + c + d);
}

sum.apply(null, [1, 2, 3, 4]);
```

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metoda `call` oraz `apply` pozwalają zmieniać kontekstu `this` dla wywołanej funkcji
- metoda `bind` tworzy nową funkcję, którą potem trzeba wywołać, natomiast metoda `call` oraz `apply` od razu wykonują funkcje
- drugim parametrem dla metody `call` są pojedynczo przekazywane parametry dla wywoływanej funkcji
- drugim parametrem dla metody `apply` są parametry przekazywane jako tablica, które są potem użyte do wywołania funkcji

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
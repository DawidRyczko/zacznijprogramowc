---
title: "Metoda bind w JavaScript: Szybki Kurs #70"
description: "Omówienie metody bind w JavaScript, jej zastosowania i przykłady użycia."
date: 2025-01-11
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Metoda bind](#metoda-bind)
* [Przypadek setTimeout](#przypadek-settimeout)
* [Pożyczanie metod](#pożyczanie-metod)
* [Bindowanie z parametrami](#bindowanie-z-parametrami)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="metoda-bind">Metoda bind</span>

W JavaScript mamy kilka dostępnych narzędzi do operowania kontekstem `this`. Mamy takie metody jak `bind`, `call` oraz `apply`. Często nie będziecie stosować ich w swoim kodzie, ale jak to w programowaniu bywa, warto wiedzieć, co do czego służy. Na początek sprawdźmy możliwości metody bind.

Metoda `bind()` pochodzi z `Function.prototype` oznacza to, że może zostać wywołana na każdej funkcji czy metodzie. Dzięki tej metodzie możemy do funkcji przypisać interesujący nas kontekst `this`:

Rozważmy już znany nam przypadek:

```js
const car = {
  model: 'Opel',
  printModel: function() {
    console.log('Your car is: ', this.model);
  },
};

const print = car.printModel;
print();
```

Mam stworzony obiekt `car`, który ma pole `model` oraz metodę `printModel`. W tej metodzie odwołuję się przez `this` do pola `model` i wypisuję do konsoli.

Tworzę również zwykłą zmienną `print` i do niej przypisuję referencję metody z obiektu `car`. Gdy wywołam teraz przypisaną metodę do `print` to otrzymuję wartość `undefined`.

```text
Your car is:  undefined
```

Metoda ta została wywołana na kontekście obiektu `window`, a gdybym był w trybie ścisłym, pojawiłby się błąd, ponieważ kontekst `this` byłby `undefined`. Jeżeli chcemy użyć metody `printModel` powinna być użyta w kontekście obiektu `car`.

W tym właśnie miejscu możemy wykorzystać metodę `bind()` pochodzącą z `Function.prototype`:

```js
const print2 = car.printModel.bind(car);
print2();
```

Znowu tworzę nową zmienną, do której chcę przypisać referencję do metody `printModel`. Na końcu jednak wywołuję jeszcze metodę `bind` i przekazuję do niej obiekt.

Z technicznego punktu widzenia, metoda `bind` tworzy zupełnie nową funkcję, która jest wrapperem na naszą oryginalną funkcję i potrafi ją wywołać ze wskazanym kontekstem.

Dzięki takiej operacji wywołanie `print2` spowoduje wywołanie metody `printModel` z odpowiednim kontekstem `this`. Przy takiej konstrukcji kodu mówimy, że bindujemy metodę do wskazanego obiektu, jeżeli nie chcemy zagłębiać się w techniczne działanie metody `bind`.

```text
Your car is:  Opel
```

Ważne jest to, że udaje nam się wywołać pożyczoną funkcję z obiektu w zupełnie innym kontekście i działa prawidłowo. Dzięki metodzie `bind` możemy łatwo kontrolować kontekst `this`.

## <span id="przypadek-settimeout">Przypadek setTimeout</span>

Metoda `bind()` pozwala nam wskazać konkretny kontekst  `this` dla wywoływanej funkcji, możemy to wykorzystać przy wywołaniu takiej funkcji jak `setTimeout`:

```js
const person = {
  surname: 'Rambo',
  print() {
    console.log(this.surname);
  },
};

setTimeout(person.print, 1000);
```

Ponownie tworzę obiekt z metodą `print`, której zadaniem jest wypisanie do konsoli pola `surname`. Chciałbym to jednak zrobić z opóźnieniem i do tego mogę wykorzystać funkcję `setTimeout`, do której jako pierwszy parametr przekazuje się funkcję `callback`, a jako drugi parametr opóźnienie.

Przekazuję więc do funkcji `setTimeout` referencję do metody `print` w obiekcie `person`:

```text
Your surname:  undefined
```

Ponieważ przekazuję tylko referencję, to otrzymuję `undefined` przy próbie odczytania pola `surname`. Funkcja `setTimeout` posiada `this` z globalnego obiektu, w tym przypadku `window`. Metoda `setTimeout` istnieje po prostu w obiekcie `window`. Przy takim wywołaniu metoda `print` przekazana do
funkcji `setTimeout` wywoływana jest na obiekcie `window`.

Zapis ten możemy rozpisać jeszcze tak:

```js
const print3 = person.print;
setTimeout(print3, 1000);
```

Przekazaliśmy tylko referencję do wywołania, dlatego metoda zostanie wywołana na kontekście, jaki aktualnie jest w funkcji `setTimeout`, a na pewno nie ma tam kontekstu naszego obiektu. Musimy więc dołączyć za pomocą `bind` kontekst naszego obiektu:

```js
setTimeout(person.print.bind(person), 1000); // Rambo
```

Dopiero takie wywołanie zapewnia prawidłowy kontekst dla metody `print`. Za pomocą metody `bind` dołączamy kontekst naszego obiektu i teraz wywołanie metody działa.

## <span id="pożyczanie-metod">Pożyczanie metod</span>

Metodę `bind` możemy także użyć do tak zwanego pożyczania metod:

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
```

Mamy dwa obiekty, każdy z nich ma pole `name`, ale tylko jeden obiekt ma metodę `run`, która wypisuje dokładnie imię i szybkość biegu. Metoda ta znajduje się w obiekcie `cat`, ale możemy ją pożyczyć i wywołać z obiektem `dog`.

```js
const dogRun = cat.run.bind(dog, 34);
dogRun() // Reksio run 34 km
```

Tworzymy nową zmienną, do której przypisujemy metodę `run` z obiektu `cat`. Jednak metoda `run` jest zbindowana do obiektu `dog`, co oznacza, że zostanie wywołana w kontekście `dog`. Przekazaliśmy dodatkowo do metody `bind` jeszcze jeden parametr. Metoda `bind` może przyjąć dowolną ilość parametrów,
które zostaną użyte w chwili wywołania.

Gdy wywołuję zmienną `dogRun()` nie muszę już przekazywać parametru, jaki oczekuje metoda `run` został on przekazany w czasie bindowania. Ta technika nazywa się pożyczaniem metody, pozwala na użycie metod zadeklarowanych na przykład w innych obiektach.

## <span id="bindowanie-z-parametrami">Bindowanie z parametrami</span>

Jak już widzieliśmy, możemy bindować metody, przekazując dodatkowo parametry, które posłużą do wywołania tej metody:

```js
function sum(a, b) {
  console.log(a + b);
}

const sum1 = sum.bind(null, 2, 5);
sum1();
```

Przykładem jest zwykła funkcja `sum`, która otrzymuje dwa parametry i dodaje je do siebie. Funkcję przypisaliśmy do nowej zmiennej za pomocą metody `bind`. Zauważcie, że nie podaję w tym momencie żadnego kontekstu, tylko wartość `null`. Nasza funkcja aktualnie nie pracuje na żadnym `this` więc mogę
podać wartość `null` jako pierwszy parametr.

Kolejne parametry to wartości, które zostaną przekazane do funkcji. Gdy wywołam zmienną `sum1()` nie muszę już przekazywać parametrów, zostaną użyte te wartości, które podałem do metody `bind()`. Jeżeli spróbuję podać parametry, to i tak zostaną one zignorowane.

Inną ciekawą opcją, jest możliwość podania tylko niektórych parametrów:

```js
const sum2 = sum.bind(null, 10);
sum2(7); // 17
sum2(10); // 20
sum2(-10); // 0
```

W tym przykładzie wykorzystuję `bind` dla funkcji `sum`. Funkcja `sum`  przyjmuje dwa parametry, ale ja przekazuję tylko jeden. Teraz gdy wywołuję zmienną `sum2` mogę przekazać tylko jeden parametr, ponieważ ten przekazany przez metodę `bind` stał się parametrem domyślnym.

Wykorzystanie metody `bind` do stworzenia sobie funkcji wywołanej częściowo może być ciekawym sposobem, gdy chcemy uniknąć wywoływania funkcji ciągle z tymi samymi parametrami.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metoda `bind` pozwala wskazać dokładnie, z jakim kontekstem ma być wywołana funkcja
- metoda `bind` pozwala na pożyczanie metod z innych obiektów
- do metody `bind` można przekazać także parametry do wywołania danej funkcji
- z pomocą metody `bind` możemy stworzyć częściowe wywołanie funkcji

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
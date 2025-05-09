---
title: "Destrukturyzacja obiektów w JavaScript: Szybki Kurs #53"
description: "Poznaj destrukturyzację obiektów w JavaScript: podstawy, zagnieżdżenia, funkcje, parametr rest."
date: 2025-01-29
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Podstawowe użycie destrukturyzacji](#podstawowe-uzycie-destrukturyzacji)
* [Destrukturyzacja do zadeklarowanych zmiennych](#destrukturyzacja-do-zadeklarowanych-zmiennych)
* [Destrukturyzacja do funkcji](#destrukturyzacja-do-funkcji)
* [Parametr rest w destrukturyzacji](#parametr-rest-w-destrukturyzacji)
* [Co warto zapamiętać](#co-warto-zapamietac)

Destrukturyzacja obiektów jest bardzo ciekawym sposobem na wypakowanie z obiektu tylko tych danych, które potrzebujemy. Ma zastosowanie w wielu sytuacjach i często jest używana w kodzie JavaScript.

## <span id="podstawowe-uzycie-destrukturyzacji">Podstawowe użycie destrukturyzacji</span>

Na początek zobaczmy, jak działa podstawowe użycie destrukturyzacji obiektu:

```js
const obj = {
  name: 'John',
  surname: 'Rambo',
};

const { name, surname } = obj;

console.log(name); // John
console.log(surname); // Rambo
```

Mamy zdefiniowany obiekt z polami `name` i `surname`. Tworzę też dwie zmienne `const`, które umieszczam w klamerkach. Do tej konstrukcji przypisuję zadeklarowany wcześniej obiekt. Tak właśnie zapisuje się destrukturyzację obiektu. JavaScript na podstawie tego zapisu wyciągnie z pól obiektu wartości
i przypisze je do zmiennych o tych samych nazwach.

Ważne jest tutaj, aby zadeklarowane zmienne dla destrukturyzacji posiadały te same nazwy pól, które posiada obiekt.

Porównajmy destrukturyzację do normalnego zapisu:

```js
const name2 = obj.name;
const surname2 = obj.surname;
```

Widzimy, że zapis jest dłuższy i przy próbie wyciągnięcia wielu danych naraz musielibyśmy napisać naprawdę wiele kodu.

Możemy też wyciągać dane z bardziej zagnieżdżonych obiektów:

```js
const person = {
  name: 'Ramob',
  address: {
    city: 'Hope',
  },
};

const { address: { city } } = person;
console.log(city); // Hope
```

W tym obiekcie mamy dodatkowo zagnieżdżony obiekt `address`. Przy deklaracji instrukcji pod destrukturyzację obiektu, musimy podać nazwę zagnieżdżonego obiektu, a potem podajemy nazwy zmiennych, które chcemy z tego obiektu wyciągnąć.

Możemy w ten sposób obsłużyć dowolną ilość zagnieżdżeń.

## <span id="destrukturyzacja-do-zadeklarowanych-zmiennych">Destrukturyzacja do zadeklarowanych zmiennych</span>

Może się zdarzyć, że już mamy zadeklarowane zmienne, do których chcemy teraz wypisać dane z obiektu:

```js
const car = {
  brand: 'Opel',
  model: 'Astra',
};
let brand = 'Ford';
let model = 'Mustnag';

({ brand, model } = car);

console.log(brand); // Opel
console.log(model); // Astra
```

W tym przypadku mamy obiekt i zmienne, które mają przypisaną wartość. Chcemy jednak do tych zmiennych przypisać wartości z obiektu. Jeżeli chcemy użyć gotowych zmiennych, musimy całe wyrażenie destrukturyzacji objąć dodatkowymi okrągłymi nawiasami.

Może wydarzyć się sytuacja, w której chcemy wypakować dane z obiektu, ale do innych nazw zmiennych niż pola w obiekcie:

```js
const { brand: brandCar, model: modelCar } = car;

console.log(brandCar); // Opel
console.log(modelCar); // Astra
```

Ten przypadek pokazuje deklarację zmiennych do destrukturyzacji, ale z innymi nazwami niż pola w obiekcie. Ponieważ w obiekcie `car` znajdują się pola `brand` i `model`, również nasze zmienne powinny się tak nazywać. W tym przypadku przy inicjalizacji zmiennych po dwukropku wstawiamy inną nazwę dla
zmiennej. Tworzymy dla niej alias. Ten zapis na pewno może być przydatny, gdy w naszym zakresie znajdują się już zmienne o podobnych nazwach i nie możemy ich użyć.

Możemy też stworzyć zmienną do destrukturyzacji z przypisaną wartością:

```js
const { engine = 'Diesel' } = car;
console.log(engine); // Diesel
```

W tym przypadku obiekt `car` nie ma pola `engine`. Tworząc zmienną, przypisujemy jej jakąś wartość domyślną. Jeżeli w obiekcie `car` nie zostało znalezione pole o nazwie `engine` zachowamy tę wartość, jeśli takie pole byłoby w obiekcie, to nasza zmienna zostanie nadpisana. Jeżeli natomiast nie
przypisalibyśmy domyślnej wartości, miałaby wartość `undefined`. Bardzo przydatne, gdy nie do końca wiadomo czy takie pole będzie istnieć w obiekcie, dzięki temu nasza zmienna ma jakąś domyślną wartość.

## <span id="destrukturyzacja-do-funkcji">Destrukturyzacja do funkcji</span>

Destrukturyzacja obiektu do funkcji to coś, co spotkasz w kodzie JavaScript wielokrotnie:

```js
const book = {
  title: 'Hobbit',
  author: 'Tolkien',
  pages: 333,
};

function print({ title, author }) {
  console.log(title, author); // Hobbit Tolkien
}

print(book);
```

Tworzymy funkcję, która jako parametr przyjmuje zapis destrukturyzacji obiektu. Deklarujemy więc w klamrach dokładne nazwy pól, jakie nas interesują z danego obiektu. Naszym zadaniem jest już tylko przesłanie obiektu, a JavaScript rozpakowuje go w odpowiedni sposób. Taki zapis jest czytelniejszy i
bardziej zwięzły niż tradycyjne odwoływanie się do danych po kropce.

Czasami możecie spotkać destrukturyzację przy przekazywanych funkcjach `callback`:

```js
const books = [
  { brand: 'Audi', model: 'A4' },
  { brand: 'Opel', moel: 'Corsa' },
  { brand: 'Ford', mdoel: 'Mustang' },
];
books.map(({ brand }) => console.log(brand));
```

W tym przypadku na tablicy wywołujemy metodę `map` i chcemy pobrać z każdego procesowanego obiektu tylko pole `brand`. Możemy użyć destrukturyzacji i zapisać, że parametrem będzie przyjmowane właśnie to jedno pole.

Normalny zapis wyglądałby tak:

```js
books.map(car => console.log(car.brand));
```

Przy destrukturyzacji do metod, również działają wszystkie wcześniejsze reguły związane ze zmianą nazwy, ustawieniem domyślnej wartości czy zagnieżdżaniem obiektów. Jest to bardzo wygodny zapis i dość często stosowany w JavaScript.

## <span id="parametr-rest-w-destrukturyzacji">Parametr rest w destrukturyzacji</span>

Parametr `rest` wygląda tak samo, jak operator `spread` i możemy go użyć przy destrukturyzacji obiektu:

```js
const letters = {
  a: 100,
  b: 200,
  c: 300,
  d: 400,
  e: 500,
};

const { a, b, ...rest } = letters;

console.log(a) // 100
console.log(b) // 200
console.log(rest) //  { c: 300, d: 400, e: 500 }
```

Przy destrukturyzacji zazwyczaj pobieramy część danych z obiektu do oddzielnych zmiennych. Jeżeli chcemy przechwycić pozostałą część, może nam się do tego przydać `rest` parametr. W tym przykładzie pobieramy wartości z pól `a` oraz `b`. Natomiast pozostałe pola pobieramy do zmiennej `rest`
poprzedzonej trzema kropkami.

Oczywiście nazwa parametru `rest` może być zupełnie dowolna, ważne, aby parametr był poprzedzony trzema kropkami. Dodatkowo musi znajdować się na końcu wyrażenia i może wystąpić tylko jeden taki parametr.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- destrukturyzacja obiektu to świetne narzędzie do wyciągania pojedynczych danych z obiektu
- destrukturyzacja działa także dla obiektów zagnieżdżonych
- przez destrukturyzację możemy przekazywać parametry do funkcji
- parametr `rest` może przechwycić dla nas resztę, która została po destrukturyzacji obiektu

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
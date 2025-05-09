---
title: "Poruszanie się po obiektach w JavaScript: Szybki Kurs #51"
description: "Różne sposoby na dostęp do właściwości obiektu w JavaScript: Object.keys, Object.values, Object.entries i pętla for...in."
date: 2025-01-31
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pobieranie kluczy obiektu przez Objec.keys](#pobieranie-kluczy-obiektu-przez-objec-keys)
* [Pobieranie wartości obiektu przez Object.values](#pobieranie-wartości-obiektu-przez-objectvalues)
* [Pobieranie właściwości przez Object.entires](#pobieranie-właściwości-przez-objectentires)
* [Pętla for...in](#pętla-forin)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="pobieranie-kluczy-obiektu-przez-objec-keys">Pobieranie kluczy obiektu przez Objec.keys</span>

Zazwyczaj do danych w obiektach JavaScript dostajemy się przez kropkę czy też *bracket notation*. Działa to, gdy potrzebujemy dostać się do jednej konkretnej danej. Czasami jednak potrzebujemy pobrać wszystkie klucze albo też wszystkie wartości, a czasami potrzebujemy iterować po całym obiekcie.
Przed nami kilka sposobów na dostęp do właściwości obiektu w hurtowy sposób.

Wiele z tych metod, które będziemy omawiać to metody dostępne przez obiekt `Object`. Pierwszą metodą jest `Object.keys`:

```js
const obj1 = {
  name: 'John',
  surname: 'Rambo',
  profession: 'soldier',
  print() {
    console.log(this.name);
  },
};
console.log(Object.keys(obj1)); // [ 'name', 'surname', 'profession', 'print ]
```

Do metody `Object.keys` przekazujemy obiekt, metoda zwraca listę kluczy tego obiektu, które są enumerowane i są właściwością tego konkretnego obiektu. Tworząc aplikacje w JavaScript na pewno wielokrotnie będziecie sięgać po tą metodę. Wbrew pozorom lista kluczy obiektów w logice aplikacji przydaje
się stosunkowo często.

Ponieważ `Object.keys` zwraca listę, możemy sobie w łatwy sposób iterować po właściwościach obiektu, używając jakiejkolwiek pętli lub metody z obiektu `Array`:

```js
Object.keys(obj1).forEach(e => console.log(e));
```

W ten sposób wypiszemy do konsoli kolejne klucze obiektu.

Ponieważ `Object.keys` zwraca nam tablicę wszystkich kluczy obiektu, możemy w prosty sposób sprawdzić, jak dużo właściwości ma obiekt:

```js
console.log(Object.keys(obj1).length); // 4
```

Wystarczy na zwróconej tablicy przez `Object.keys` wywołać właściwość `length`.

Do tej metody możemy też przekazać zwykłą tablicę:

```js
console.log(Object.keys(['foo', 'boo', 'bar'])) // [ '0', '1', '2' ]
```

W odpowiedzi dostajemy kolejne indeksy. Ponieważ tablice są tak naprawdę obiektami, to również mają klucze, do których przypisane są wartości.

## <span id="pobieranie-wartości-obiektu-przez-objectvalues">Pobieranie wartości obiektu przez Object.values</span>

Metoda `Object.values` jest bardzo podobna do metody `Object.keys` z tą różnicą, że zwraca wszystkie wartości obiektu:

```js
const obj2 = {
  name: 'John',
  surname: 'Rambo',
  profession: 'soldier',
  print() {
    console.log(this.name);
  },
};
console.log(Object.values(obj2)); // ["John", "Rambo", "soldier", ƒ]
```

Tak jak wcześniej była tworzona lista tylko kluczy, tak teraz jest tworzona lista tylko wartości. Gdy w obiekcie, znajduje się metoda, JavaScript wywołuje na takiej metodzie `toString()` i stara się ją zaprezentować jako wartość tekstową.

Przy tej metodzie także należy pamiętać, że możemy ją używać tylko dla pól danego obiektu. Czyli nie odczyta ona pól, które pochodzą z dziedziczenia. Również metoda ta nie odczyta pól, które nie są numerowalne. W naszym przypadku metoda tego obiektu mogłaby mieć ustawioną konfigurację  `enumerable`
na `false` i pole to nie byłoby pobierane przez `Objec.values`.

## <span id="pobieranie-właściwości-przez-objectentires">Pobieranie właściwości przez Object.entires</span>

Tym razem do dyspozycji mamy metodę, która pobiera zarówno klucze, jak i wartości z pól obiektu. Metoda ta to `Object.entries`:

```js
const obj3 = {
  name: 'John',
  surname: 'Rambo',
  profession: 'soldier',
};
console.log(Object.entries(obj3)); 
```

Struktura, jaką zwraca ta metoda to zagnieżdżona tablica. Każda kolejna zagnieżdżona tablica reprezentuje parę klucz-wartość, czyli jedno pole obiektu:

```text
  [
  ['name', 'John'],
  ['surname', 'Rambo'],
  ['profession', 'soldier']
  ]
```

Nie jest to zbyt wygodna struktura do pracy, ale możemy wykorzystać `forEach` i dostać się do każdej zagnieżdżonej struktury:

```js
Object.entries(obj3).forEach((item) => {
  console.log(item[0]);
  console.log(item[1]);
});
```

W ten sposób dostaniemy się do każdej tablicy i za pomocą indeksów możemy pobrać element `0`, który jest kluczem i element pierwszy, który jest wartością danego pola:

```text
  name
  John
  surname
  Rambo
  profession
  soldier
```

Można więc powiedzieć, że jest to połączenie dwóch poprzednich metod `Object.keys` oraz `Object.values`. I znowu, metoda ta działa tylko na pola zdefiniowane dokładnie w tym obiekcie i tylko na te pola, które są `enumerable`.

Również nie mamy gwarancji, w jakiej kolejności będzie ułożona zwrócona tablica. Jeżeli zależy nam na kolejności, po otrzymaniu tablicy musimy ją jeszcze posortować.

## <span id="pętla-forin">Pętla for...in</span>

Idealną pętlą do iterowania po obiektach jest pętla `for...in`. Pętla ta iteruje tylko po tych polach, które są `enumerable`, czyli tak samo, jak wszystkie inne pętle i metody. Natomiast jej zaletą jest to, że potrafi także odczytać pola, które są dziedziczone po innym obiekcie:

```js
const obj4 = {
  name: 'John',
};

const obj5 = Object.create(obj4);
obj5.surname = 'Rambo';
obj5.profession = 'soldier';

for (const key in obj5) {
  console.log(obj5[key]);
}
```

Mamy tutaj przykład obiektu, który powstaje za pomocą `Object.create`. Potem do obiektu tego dodaję jeszcze dwie właściwości. Jest to więc obiekt, który posiada jedno pole dziedziczone i dwa pola jako własne.

Pętla przy każdym obrocie pobiera kolejny klucz obiektu. Gdy mamy klucz to możemy dostać się do właściwości obiektu i wyświetlić każdą wartość:

```text
  Rambo
soldier
John
```

Widzimy, że metoda ta nie ma problemu z pobraniem wszystkich pól z obiektów. Również wyświetla dziedziczoną wartość z pola `name`.

Jeżeli nie chcemy wyświetlać wartości dziedziczonych, możemy zastosować metodę `hasOwnProperty`:

```js
for (const key in obj5) {
  if (obj5.hasOwnProperty(key)) {
    console.log(obj5[key]); // Rambo ; soldier
  }
}

```

Metodę `hasOnwProperty()` wywołujemy bezpośrednio na obiekcie i za każdym razem przesyłamy do niej kolejny klucz z pętli. Metoda zwraca `true` jeżeli klucz należy do tego obiektu. Czyli został zdefiniowany w tym obiekcie i nie został odziedziczony. W tym przypadku pętla wyświetla już tylko dwie
wartości.

Pętla `for...in` jest na ogół używana tylko do obiektów. Ma małą przydatność dla tablic. Nie zaleca się także modyfikować i usuwać elementów innych niż obecnie odwiedzany przez pętle element. Pętla iteruje po właściwościach obiektu w dowolnej kolejności. Dlatego nie możemy zakładać, że zmodyfikujemy
pole obiektu, które będzie odwiedzone później i będziemy mogli jeszcze w czasie iteracji skorzystać ze zmodyfikowanego elementu.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- za pomocą `Object.keys` pobierzemy wszystkie klucze z obiektu
- za pomocą `Object.values` pobierzemy wszystkie wartości z obiektu
- za pomocą `Object.entries` pobierzemy zarówno klucze, jak i wartości obiektu
- pętla `for...in` idealnie nadaje się do iterowania po właściwościach obiektu, również tych odziedziczonych
- tablice to też obiekty, wiele metod pochodzących z `Object` działa też na tablice

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
---
title: "This w obiektach w JavaScript: Szybki Kurs #67"
description: "Dokładne spojrzenie na to, jak `this` zachowuje się w obiektach JavaScript. Omówienie przypadków użycia i zachowań w różnych kontekstach."
date: 2025-01-14
tags: [ "szybki-kurs-javascript", "javascript" ]
---

W tej części przyjrzymy się dokładnie jak `this` wygląda w obiektach JavaScript. Przyjrzymy się kilku przypadkom, które mogą nas zadziwić. Rozpatrzenie kilku przypadków pomoże nam zrozumieć wskaźnik `this`.

Na początek ważna uwaga, pracuję bez trybu ścisłego, czyli nie używam `use strict`, a także nie uruchamiam skryptu za pomocą żadnego bundlera, jak *Parcel* czy *Webpack* i nie używam modułów ES6. Wczytuję plik JavaScript za pomocą pliku HTML i uruchamiam w przeglądarce. Moim obiektem globalnym
będzie zatem obiekt `window`. W innych konfiguracjach ten kod może działać inaczej.

## Spis treści
* [This jako pole w obiekcie](#this-jako-pole-w-obiekcie)
* [This przy wywołaniu konstruktora](#this-przy-wywolaniu-konstruktora)
* [This w klasie](#this-w-klasie)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="this-jako-pole-w-obiekcie">This jako pole w obiekcie</span>

Pierwszy przykład to zwykły obiekt, które zadeklarujemy w formie literalnej:

```js
const obj1 = {
  a: 'some object',
  b: this,
  c: function() {
    return this;
  },
};
```

Mamy tutaj obiekt, który posiada trzy właściwości. Do pola `b` mam dopisaną mam wartość `this`. Natomiast do pola `c`
mam dopisaną metodę, która zwraca `this`. Sprawdzimy teraz za pomocą `conole.log` czym jest `this` w tych dwóch różnych sytuacjach:

```js
console.log(obj1.b); // window
console.log(obj1.c()); // {a: "some object", b: Window, c: ƒ}
```

To co zostało dopisane do pola `b` jest obiektem `window`. Okazuje się, więc, że `this` wskazuje na obiekt globalny. Pole `b` znajduje się w obiekcie `obj1` i wywołanie nastąpiło przez `obj1.b`. Wcześniej mówiłem, że `this` jest tym co stoi przed kropką i jest to prawda, ale dotyczy to tylko
wywołania metody. Kontekst `this` dotyczy tylko wywołania funkcji i metod, wtedy ustalana jest wartość dla `this`.

W tym przypadku pole `b` po prostu przetrzymuje wartość `this`, która jest wartością domyślną, czyli obiektem globalnym. Inny kontekst `this` tworzy się w momencie wywołania funkcji czy metody, a tutaj mamy zwykłe przypisanie `this` do pola `b` i odczytanie tej wartości przez `console.log`.

Wywołanie metody `c` daje już inny wynik. W tym przypadku `this` wskazuje na obiekt. Ponieważ jest to metoda i wywołanie następuje przez zadeklarowany obiekt, kontekstem dla `this` w tej metodzie staje się ten obiekt przed kropką. Następuje normalne wywołanie metody w jakimś kontekście, nie jak w
przypadku pola `b` tylko przypisanie i odczytanie wartości.

## <span id="this-przy-wywolaniu-konstruktora">This przy wywołaniu konstruktora</span>

Przyjrzyjmy się przypadkowi tworzenia obiektów z wywołaniem konstruktora za pomocą funkcji, oraz za pomocą definicji klasy:

```js
function Person() {
  this.a = 'foo';
}
```

Pierwszy przypadek to zwykła funkcja, która odwołuje się w sobie do `this.a` i przypisuje wartość `foo`. Jeżeli funkcję wywołamy z konstruktorem czyli za pomocą `new Person()` stworzymy obiekt:

```js
const p = new Person();
console.log(p.a); // foo
```

Jeżeli wywołujemy `new` tworzony jest obiekt i automatycznie obiekt ten staje się kontekstem dla `this` w tej funkcji. Nie ma tutaj znaczenia gdzie wywołujemy `new Person()`. Użycie `new` sprawia, że obiekt, który powstaje z konstruktora tej funkcji staje się automatycznie kontekstem dla `this`. W
przypadku wywoływania funkcji przez `new` nie musimy się martwić czym będzie kontekst.

Sprawdźmy jeszcze, co się stanie, jeżeli wywołamy funkcję bez `new`:

```js
Person();
console.log(window.a); // foo
```

Funkcja została wywołana z kontekstem domyślnym, czyli na obiekcie `window`. W takim przypadku `this` w tej funkcji wskazuje na obiekt globalny `window`, albo w trybie ścisłym na `undefined` i wtedy zobaczycie błąd.

Takie wywołanie ostatecznie sprawiło, że przez `this`, pole `a` zostało dopisane do obiektu `window`. Ponieważ ta funkcja służy do tworzenia obiektów, nie powinniśmy raczej takich funkcji wywoływać bez użycia słowa kluczowego `new`.

## <span id="this-w-klasie">This w klasie</span>

Przed nami kolejny przypadek dotyczący klas, nie ma tutaj dużej różnicy między funkcją wywołaną z konstruktorem, a klasą.

Warto jednak przyjrzeć się tak zbudowanej klasie:

```js
class MyClass {
  a = this;

  constructor() {
    this.b = this;
    this.c = 'foo';
  }
}

console.log(new MyClass());
```

Wykorzystałem tutaj nowy zapis tworzenia pola w klasie. Pole `a` zostaje po prostu zdefiniowane bez użycia metody `constructor`. Przypadek ten jest podobny do obiektu, który omawialiśmy na początku tego rozdziału. Tak zdefiniowane pole jest nowością w JavaScript i może nie działać w każdej
przeglądarce czy w node.js. W roku 2020 jeszcze oficjalnie nie stanowi część języka JavaScript i możecie potrzebować skryptów polyfills.

Dodatkowo mamy też konstruktor, który definiuje pole `b` w standardowy sposób. Do obu pól dopisuję `this`. Tworzę obiekt i od razu wypisuję do konsoli:

```text
MyClass {a: MyClass, b: MyClass, c: "foo"}
	a: MyClass {a: MyClass, b: MyClass, c: "foo"}
	b: MyClass {a: MyClass, b: MyClass, c: "foo"}
	c: "foo"
```

Widzimy, że zarówno pole `a` jak i `b` wskazuje na nowo stworzony obiekt. Działa to tak samo jak z funkcją i wywołaniem jej przez użycie `new`. Również to samo działanie jest przy klasach. Jeżeli tworzymy obiekt z klasy, zawsze musimy wywołać `new` i w ten sposób tworzony obiekt automatycznie staje
się kontekstem `this`.

Może nam się wydawać, że pole `a` nie jest w żadnej metodzie i że jest to podobny przypadek do obiektu z polem `b` gdzie przypisaliśmy do niego `this`, przypadek ten rozważaliśmy na początku:

```js
const obj1 = {
  a: 'some object',
  b: this,
  c: function() {
    return this;
  },
};
```

Przy klasach działa to jednak inaczej, ponieważ przy użyciu słowa kluczowego `new` następuje automatyczne dowiązanie do obiektu, który zostanie wytworzony przez konstruktor klasy. Dlatego w klasach, `this` ma zawsze kontekst wytworzonego z tej klasy obiektu. W głębi kodu JavaScript, klasy to
funkcje, więc tak naprawdę przez słowo kluczowe `new` wywołujemy funkcje.

Używając czy to funkcji czy to klas ze słowem kluczowym `new` nie musimy się specjalnie martwić o kontekst `this`
ponieważ będzie on zawsze obiektem, który powstaje z takiego wywołania. Nie ma tutaj znaczenia w jakim miejscu kodu występuje wywołanie.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- wiązanie `this` następuje tylko przy wywołaniu funkcji czy metody
- domyślnie `this` wskazuje na obiekt globalny, w przeglądarce jest to `window`
- gdy tworzymy obiekt za pomocą słowa kluczowego `new` , `this` będzie nowo stworzonym obiektem
- gdy w stworzonym obiekcie literalnym stworzymy zwykłe pole i dopiszemy `this`, jest to kontekst domyślny czyli obiekt globalny

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
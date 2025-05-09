---
title: "Zakres Globalny i Obiekt Globalny w JavaScript: Szybki Kurs #25"
description: "Omówienie zakresu globalnego i obiektu globalnego w JavaScript, zmienne globalne, funkcje i ich wpływ na działanie kodu."
date: 2025-02-26
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Zakres globalny](#zakres-globalny)
* [Globalny obiekt window](#globalny-obiekt-window)
* [Globalne zmienne](#globalne-zmienne)
* [Globalne funkcje](#globalne-funkcje)
* [Niezadeklarowana zmienna](#niezadeklarowana-zmienna)
* [Obiekt globalny i inne środowiska](#obiekt-globalny-i-inne-srodowiska)
* [Używać czy nie](#uzywac-czy-nie)
* [Co warto zapamiętać](#co-warto-zapamietac)

Gdy uruchamiamy kod JavaScript, dla takiego kodu zawsze powstaje zakres globalny, a także obiekt globalny. Obiekt ten w przypadku przeglądarki nazywa się `window`. Zarówno w zakresie globalnym, jak i w obiekcie globalnym mogą powstawać zmienne, które mają zasięg globalny. Zasięg globalny oznacza, że
zmienne dostępne są w całym kodzie.

## <span id="zakres-globalny">Zakres globalny</span>

Czym jest w ogóle zakres globalny? Jeżeli zadeklarujemy zmienną albo klasę tak po prostu w pliku JavaScript to tworzymy ten kod w zakresie globalnym. Czyli kod umieszczony poza wszelkimi klamrami i innymi blokami kodu to zakres globalny.

```js
let globalLet = 'My global let';
let globalConst = 'My global const';

class MyGlobalClass {
}
```

Do zakresu globalnego wpadają deklaracja z `let` oraz `const`, a także wszystkie klasy. Zakres globalny jest najwyższym zakresem w JavaScript i wszystkie inne zakresy dziedziczą z tego zakresu. Tak więc inne zakresy mają dostęp do wszystkiego, co jest w zakresie globalnym. Również do tych zmiennych
mamy dostęp w innych plikach JavaScript.

To działanie opisuję przy zwykłym użyciu pliku JavaScript i wczytaniu go przez index.html. Działanie to jest inne, gdy zmienne te znajdą się w module. Również działanie to może być inne, gdy użyjemy narzędzia do budowania kodu jak webpack czy parcel.

## <span id="globalny-obiekt-window">Globalny obiekt window</span>

Czym jest zatem obiekt globalny? Gdy uruchamiamy kolejne zakładki w przeglądarce, zawsze dla każdej zakładki powstaje oddzielny globalny obiekt `window`. Wystarczy uruchomić pustą zakładkę, otworzyć konsolę wpisać `window`, aby się przekonać, że taki obiekt już istnieje dla tej zakładki. Nawet
jeżeli nie załadujemy do niej żadnego skryptu JavaScript.

Sam obiekt `window` zawiera w sobie mnóstwo właściwości, metod, które na co dzień używamy w naszym kodzie JavaScript:

```js
document
location
history
console.log()
setTimeout()
setInterval()
alert()
```

Te właściwości i metody pochodzą z obiektu `window`. Tych właściwości, metod, handlerów i eventów jest bardzo wiele. Zachęcam do przejrzenia dokumentacji na stronie MDN.

Do tych właściwości możemy odwoływać się zarówno przez `window` jak i bezpośrednio.:

```js
window.document;
document;
```

Używanie `window` jest opcjonalne i jest to tylko prefiks. Jeżeli nie używamy prefiksu `window` JavaScript i tak zaczyna poszukiwania w tym globalnym obiekcie.

Obiekt globalny jest dostępny z kontekstu globalnego. Jest więc dostępny z każdej części kodu. W przeglądarce obiekt ten nazywa się `window`, ale na innych środowiskach JavaScript może mieć inną nazwę, ale o tym za chwilę.

## <span id="globalne-zmienne">Globalne zmienne</span>

Już wiemy, że tworząc zmienne za pomocą `let` i `const` umieszczamy je w kontekście globalnym:

```js
const constVariable = 'My const';
let letVariable = 'My let';

console.log(constVariable); // 'My const'
console.log(letVariable); // 'My let'
```

Są więc one dostępne w całym kodzie.

Inaczej trochę się dzieje gdy tworzymy zmienną za pomocą `var`:

```js
var varVariable = 'My var';

console.log(window.varVariable) // 'My var'
console.log(varVariable) // 'My var'
```

Zmienna `var` staje się zmienną obiektu globalnego, czyli w naszym przypadku `window`. Możemy się do niej odwołać przez `window` jak i bezpośrednio nie używając tego prefiksu.

Używając zmiennych `var` w naszym kodzie, modyfikujemy więc globalny obiekt. Dopisujemy do niego zmienne, a nawet możemy nadpisać zmienne, które w nim istnieją:

```js
var alert = 'Achtung!';
```

Stworzyłem zmienna `alert` . Pole `alert` natywnie istnieje w obiekcie `window`, więc tak naprawdę nadpisałem funkcjonalność `window.alert` i od tej pory nie mogę w oknie przeglądarki wywołać okna dialogowego.

Jest to kolejny problem deklaracji zmiennych za pomocą `var`. Możemy przez przypadek nadpisać właściwość obiektu `window`. Jest to szczególnie niebezpieczne, gdy korzystamy z frameworków czy innych bibliotek, które czasami korzystają z globalnego obiektu. W ten sposób możemy wejść w łatwy konflikt
nazw. Dlatego też należy unikać deklaracji zmiennych globalnych za pomocą `var`.

## <span id="globalne-funkcje">Globalne funkcje</span>

Zobaczmy, jak zachowują się funkcje, które definiowane bezpośrednio w pliku stają się globalne:

```js
function myFunction() {
  return 'Hello'
}

console.log(window.myFunction()); // 'Hello'
```

Jeżeli zadeklarujemy funkcję po prostu w pliku również mamy dostęp do niej z obiektu `window`. Działa to podobnie jak przy deklaracji `var`. Możemy funkcję taką wywołać zarówno z prefiksem `window` jak i bez.

Możemy jednak prostym sposobem uniknąć przypisania funkcji do obiektu `window`:

```js
var fun1 = function() {
  return 'fun1'
}
let fun2 = function() {
  return 'fun2'
}
const fun3 = function() {
  return 'fun3'
}

console.log(window.fun1()) // 'fun1'
```

Gdy przypiszemy funkcję do zmiennej zadeklarowanej za pomocą `let` lub `const` to tak samo jak przy zwykłych deklaracjach zmiennych, funkcje te nie staną się częścią obiektu `window`, ale dalej będą w zakresie globalnym. Oczywiście, jeśli to będzie zmienna `var` to działanie jest takie samo jak przy
zmiennych, zmienna `var` staje się częścią obiektu `window`.

Jeżeli nie korzystamy z modułów ES6 lub na przykład ze wzorca modułu to jest to dobry sposób na to, aby uniknąć dopisywania funkcji do obiektu globalnego `window`.

## <span id="niezadeklarowana-zmienna">Niezadeklarowana zmienna</span>

Trudno sobie wyobrazić, ale w języku JavaScript, może powstać zmienna, która nie jest zadeklarowana.

Zobaczmy taki kod:

```js
function fun4() {
  foo = 'boo';
}

fun4();
console.log(window.foo); // 'boo'
console.log(foo); // 'boo'
```

Tworzę zmienną `foo` w funkcji. Nie używam ani `var`, ani `let`, ani `const` do jej deklaracji. Wywołuję funkcję aby mogła się wykonać i okazuje się, że mogę dostać się do tej zmiennej przez obiekt `window`. Zmienna ta zachowuje się podobnie jak zmienna `var` powstaje w globalnym obiekcie i jest
dostępna globalnie.

Gdy kompilator trafi na taką niezadeklarowaną zmienną i nie może odnaleźć deklaracji w żadnym zakresie, to sam deklaruje taką zmienną. Mogłoby się wydawać, że jeżeli używamy niezadeklarowanej zmiennej w funkcji, to jest ona dostępna tylko w funkcji, ale tak nie jest. Stanie się ona częścią
globalnego obiektu.

Na szczęście dzisiaj w swoim kodzie nie powinniście spotkać takich niezadeklarowanych zmiennych. Głównie dlatego, że wprowadzony w ES5 tryb ścisły dla JavaScript wyklucza taką możliwość. O trybie ścisłym będziemy jednak rozmawiać później w tym dziale.

## <span id="obiekt-globalny-i-inne-srodowiska">Obiekt globalny i inne środowiska</span>

Globalny obiekt `window` jest dostępny tylko w środowisku przeglądarki. Na przykład środowisko `Node.js` ma już inny globalny obiekt o nazwie `global`. Do obiektów globalnych w Web Workerach odwołujemy się przez `self`.

```text
window
global
self
```

Gdybyśmy chcieli pisać uniwersalne skrypty, które działają i w `Node.js` i w przeglądarce, a także mogą być uruchamiane przez Web Workery, możemy mieć problem z dostępem do globalnego obiektu, bo w zależności od środowiska, obiekt ten nazywa się inaczej.

Dawniej powstawały skrypty, które pozwalały na dostęp do globalnego obiektu w zależności od środowiska:

```js
function getGlobalObject() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('cannot find the global object');
};
const globalObj = getGlobalObject();
console.log(globalObj)
```

Tutaj mamy funkcję, która sprawdza jaki globalny obiekt jest dostępy i w zależności od tego, zwraca ten obiekt. Wtedy dopiero możemy się tym obiektem posługiwać. Od razu powiem, że ta funkcja nie jest doskonała i w wielu przypadkach może nie zadziałać. Jest to tylko obraz tego, jak próbowano sobie
radzić, gdy skrypty korzystały z globalnego obiektu i były uruchamiane na różnych środowiskach.

Dzisiaj dzięki ECMAScript 2020 do globalnego obiektu możemy dostać się jeszcze prościej:

```js
console.log(globalThis);
```

Mamy przygotowaną specjalną właściwość o nazwie `gloablThis`, która zwraca globalny obiekt z danego środowiska uruchomieniowego. Tym prostym sposobem dostajemy globalny obiekt bez względu na środowisko.

## <span id="uzywac-czy-nie">Używać czy nie</span>

Dowiedzieliśmy się sporo o zakresie globalnym i obiekcie globalnym  `window`. Prawda jest taka, że w nowoczesnych aplikacjach, które przede wszystkim używają trybu ścisłego, czyli `stric mode` oraz używają modułów ES6, nie będziecie musieli przejmować problemami globalnego obiektu i globalnego
zakresu.

Również każdy nowoczesny framework działa na podstawie modułu i uruchamia kod w trybie ścisłym. Jeżeli będziecie pisać kod w czystym JavaScript, należy unikać globalnego obiektu i nie przetrzymywać tam swoich zmiennych. Po prostu nie używamy deklaracji `var`.

Globalny obiekt może być używany przez inne biblioteki lub do pisania wyrafinowanego kodu. Przede wszystkim często jest używany przez skrypty `polyfills`. Używając obiektu `window` możemy nadpisać zmienne nie tylko obiektu `window`, ale innych bibliotek czy skryptów `polyfills`, które z tego obiektu
korzystają bądź muszą skorzystać.

Pomimo tego, że problem zakresu globalnego i obiektu globalnego może Was nie dotknąć w nowoczesnych aplikacjach JavaScript, jest to fundament wiedzy o tym jak działa ten język i warto to wszystko wiedzieć.

## <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- JavaScript uruchamia swój kod w zakresie globalnym
- w zakresie globalnym istnieje także obiekt globalny w przeglądarce jest to `window`
- w zakresie globalnym powstają zmienne zadeklarowane za pomocą `let` i `const`, a także klasy
- w obiekcie globalnym `window` powstają zmienne zadeklarowane za pomocą `var` oraz funkcje
- najlepiej nie używać `var` i nie deklarować zmiennych w obiekcie `window`
- dzisiaj nowoczesne aplikacje korzystają z modułów ES6, znika więc problem trudno kontrolowanych zmiennych globalnych

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
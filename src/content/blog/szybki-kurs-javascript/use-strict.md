---
title: "Use strict w JavaScript: Szybki Kurs #29"
description: "Omówienie dyrektywy 'use strict' w JavaScript."
date: 2025-02-22
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Dyrektywa use strict](#dyrektywa-use-strict)
* [Zmienne muszą być zadeklarowane](#zmienne-musza-byc-zadeklarowane)
* [Nie można używać delete do usuwania zmiennych, funkcji ani obiektów](#nie-mozna-uzywac-delete-do-usuwania-zmiennych-funkcji-ani-obiektow)
* [Zabronione jest duplikowanie parametrów funkcji i pól obiektów](#zabronione-jest-duplikowanie-parametrow-funkcji-i-pol-obiektow)
* [Dawniej liczby ósemkowe można było deklarować za pomocą zera z przodu liczby](#dawniej-liczby-osemkowe-mozna-bylo-deklarowac-za-pomoca-zera-z-przodu-liczby)
* [Nie można przypisywać wartości do natywnych właściwości języka](#nie-mozna-przypisywac-wartosci-do-natywnych-wlasciwosci-jezyka)
* [Przy pracy z obiektami, w trybie strict JavaScript zgłasza błędy, gdy próbujemy wykonać niedozwoloną operację](#przy-pracy-z-obiektami-w-trybie-strict-javascript-zglasza-bledy-gdy-probujemy-wykonac-niedozwolona-operacje)
* [Zabronione jest przypisywanie wartości dla getterów](#zabronione-jest-przypisywanie-wartosci-dla-getterow)
* [Stworzenie nowego pola w obiekcie pomimo zakazu jego rozszerzania](#stworzenie-nowego-pola-w-obiekcie-pomimo-zakazu-jego-rozszerzania)
* [Próba usuwania wartości nieusuwalnych również zgłasza błąd](#proba-usuwania-wartosci-nieusuwalnych-rowniez-zglasza-blad)
* [Nie można dodawać pól do wartości prymitywnych](#nie-mozna-dodawac-pol-do-wartosci-prymitywnych)
* [Zakaz używania słów kluczowych dla języka jako nazwy zmiennych](#zakaz-uzywania-slow-kluczowych-dla-jezyka-jako-nazwy-zmiennych)
* [W funkcjach zadeklarowanych globalnie this jest teraz undefined](#w-funkcjach-zadeklarowanych-globalnie-this-jest-teraz-undefined)
* [Eval oraz with](#eval-oraz-with)
* [Czy i jak używać use strict](#czy-i-jak-uzywac-use-strict)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="dyrektywa-use-strict">Dyrektywa `use strict`</span>

JavaScript jest językiem, który musi zachowywać kompatybilność z kolejnymi wersjami. Oznacza to, że w JavaScript nie można wycofać zmian, które okazały się błędem. Głównym założeniem jest przede wszystkim zapewnienie działania tych skryptów, które zostały już napisane.

W wersji ES5 pojawiły się jednak pewne zmiany, których zadaniem było ulepszenie JavaScript. Zmiany te były standardowo wyłączone, więc nadal język zachowywał kompatybilność z innymi wersjami. Dano nam jednak możliwość decydowania o tym, czy nasza aplikacja będzie używała wprowadzonych zmian i do tego
powstała dyrektywa `'use strict'`. Można powiedzieć, że w ten sposób włączamy bezpieczniejszą i lepszą wersję JavaScript.

Włączenie tak po prostu trybu `strict` w starszym kodzie mógłby doprowadzić do zgłoszenia wielu błędów przez JavaScript i aplikacja nie działałaby dopóki nie wnieślibyśmy do niej kilku poprawek, które teraz sobie omówimy.

## Dyrektywa `use strict`

Dyrektywę `use strict` umieszczamy na początku pliku. Wszystko, co znajduje się pod dyrektywą działa w trybie ścisłym:

```js
'use strict';

/// some code
```

Co ciekawe, możemy także użyć trybu ścisłego wewnątrz funkcji.

```js
(function() {
  'use strict';

  // ...your code here...
})();
```

W tym przypadku tryb `strict` włączony został tylko dla tej funkcji. Kod poniżej tej dyrektywy będzie musiał przestrzegać trybu ścisłego.

Należy pamiętać, że dyrektywa `use strict` musi być umieszczona na początku pliku lub funkcji:

```js
a = 'foo';
// no strict mode

"use strict";
b = 'bar';
// no strict mode

console.log(a); // foo
console.log(b); // bar
```

Ten kod w ogóle nie działa w trybie ścisłym. Przed `use strict` nie możemy umieszczać żadnego kodu. Możemy umieszczać tylko komentarze.

Powyższy kod nie jest prawidłowy w trybie ścisłym, a jednak wykonuje się pomimo umieszczonej dyrektywy. Dzieje się tak, bo tryb ścisły nie został włączony. Deklaracja dla trybu ścisłego musi, znaleźć się przed pierwszą linią kodu w skrypcie lub funkcji inaczej jest ignorowana.

## <span id="zmienne-musza-byc-zadeklarowane">Zmienne muszą być zadeklarowane</span>

```js
name = 'foo';
x = { p1: 10, p2: 20 };  
```

Nie można używać zmiennych bez deklaracji `var`, `let` lub `const`. Zmienna deklarowana w taki sposób w jakimkolwiek miejscu w kodzie, od razu stawała się globalna. Na szczęście tryb ścisły ogranicza tą możliwość.

## <span id="nie-mozna-uzywac-delete-do-usuwania-zmiennych-funkcji-ani-obiektow">Nie można używać  `delete` do usuwania zmiennych, funkcji ani obiektów</span>

```js
a = 3.14;
a1 = function() {
}
a3 = { o: 42 };
delete a;
delete a1;
delete a3;
```

W trybie ścisłym nie ma możliwości usuwania niezadeklarowanych zmiennych. Jeżeli istnieją z jakiegoś powodu, to nie można ich usuwać.

Nadal jednak można używać `delete` do usuwania wewnętrznych właściwości obiektu.

## <span id="zabronione-jest-duplikowanie-parametrow-funkcji-i-pol-obiektow">Zabronione jest duplikowanie parametrów funkcji i pól obiektów</span>

```js
function x(p1, p1) {
};
const o = { p: 1, p: 2 }; 
```

Niestety taki kod gdzie mamy zduplikowane nazwy parametrów i pola obiektu jest poprawny w JavaScript. Dopiero tryb `strict` wyklucza możliwość stworzenia funkcji o dwóch takich samych parametrach.

## <span id="dawniej-liczby-osemkowe-mozna-bylo-deklarowac-za-pomoca-zera-z-przodu-liczby">Dawniej liczby ósemkowe można było deklarować za pomocą zera z przodu liczby</span>

```js
const octal = 010;
```

Taka deklaracja jest niepoprawna, jak wiemy, liczby ósemkowe zapisujemy z notacją zero i literką o:

```js
const octal2 = 0o10;
```

Dopiero taka deklaracja jest poprawna. Jednak przed trybem ścisłym można było zapisać deklarację tylko z zerem na początku.

## <span id="nie-mozna-przypisywac-wartosci-do-natywnych-wlasciwosci-jezyka">Nie można przypisywać wartości do natywnych właściwości języka</span>

```js
var undefined = 5;
var Infinity = 5;
```

JavaScript jest tak elastycznym językiem, że można zrobić nawet takie cuda i nadpisać natywną wartość `undefined`
czy `Infinity` i wiele innych. Teraz jest to zabronione, zgłaszany jest błąd.

## <span id="przy-pracy-z-obiektami-w-trybie-strict-javascript-zglasza-bledy-gdy-probujemy-wykonac-niedozwolona-operacje">Przy pracy z obiektami, w trybie `strict` JavaScript zgłasza błędy, gdy próbujemy wykonać niedozwoloną operację</span>

Zdefiniuję teraz pusty obiekt:

```js
const obj1 = {};
Object.defineProperty(obj1, 'x', { value: 0, writable: false });
```

Za pomocą metody `defineProperty` deklaruję w obiekcie pole `x` oraz przypisuję mu wartość `0`, a także oznaczam, że pole to jest tylko do odczytu:

```js
obj1.x = 42;
```

Próbuję nadpisać wartość `x`. Pomimo tego, że wartość pola `x` nie zostanie nadpisana, to i tak JavaScript nie zgłaszał błędu. Teraz w trybie ścisłym jest zgłaszany błąd.

## <span id="zabronione-jest-przypisywanie-wartosci-dla-getterow">Zabronione jest przypisywanie wartości dla getterów</span>

Stworzymy sobie kolejny obiekt, z getterem:

```js
const obj2 = {
  get x() {
    return 17;
  }
}; 
```

Getter powinien tylko zwracać wartość:

```js
obj2.x = 5;
```

JavaScript traktuje metodę obiektu `obj2` jako pole tego obiektu i pozwala na zapis przypisania wartości. W trybie ścisłym taki zapis powoduje wyrzucenie błędu.

## <span id="stworzenie-nowego-pola-w-obiekcie-pomimo-zakazu-jego-rozszerzania">Stworzenie nowego pola w obiekcie pomimo zakazu jego rozszerzania</span>

Tworzę obiekt, i za pomocą metody `preventExtensions`, oznaczam, że obiekt nie może być rozszerzony o nowe pola:

```js
var obj3 = {};
Object.preventExtensions(obj3);

```

Mogę jednak spróbować dodać nowe pole.

```js
obj3.newProp = 'foo'; 
```

Do tej pory wykonanie takich operacji i tak nie miało żadnego skutku, ale też nie zgłaszało błędu. Wydawało się więc, że kod jest poprawny. Teraz JavaScript zgłasza wyjątki w trybie `strict`.

## <span id="proba-usuwania-wartosci-nieusuwalnych-rowniez-zglasza-blad">Próba usuwania wartości nieusuwalnych również zgłasza błąd</span>

Można było użyć `delete` do usuwania predefiniowanych właściwości języka:

```js
delete Object.prototype;
```

Mogliśmy stworzyć zapis, który usuwa `prototype` z globalnego obiektu `Object`. Chociaż kod te nie miał efektu, to nie zgłaszał też żadnego błędu. Teraz otrzymujemy wyjątek.

## <span id="nie-mozna-dodawac-pol-do-wartosci-prymitywnych">Nie można dodawać pól do wartości prymitywnych</span>

Do obiektu `false` dodaje pole `true`, lub do literału `41` dodaje pole `name`:

```js
false.true = 'foo';
(41).name = 'boo';
```

Przy takich dziwnych zapisach przed trybem `strict` JavaScript nie zgłaszał żadnych błędów. Dla trybu `strict` takie zapisy nie są już możliwe.

## <span id="zakaz-uzywania-slow-kluczowych-dla-jezyka-jako-nazwy-zmiennych">Zakaz używania słów kluczowych dla języka jako nazwy zmiennych</span>

Kolejną dziwną sytuacją bez trybu ścisłego jest możliwość zadeklarowania zmiennej o nazwie `let` albo `public:`

```js
var let = 42;
var public = 42;
```

Poza trybem `strict` można było używać niektórych słów kluczowych do deklaracji zmiennych. W specyfikacji istnieje teraz lista słów, które są ważne dla języka i będą istotne w przyszłości, są teraz zabronione.

## <span id="w-funkcjach-zadeklarowanych-globalnie-this-jest-teraz-undefined">W funkcjach zadeklarowanych globalnie `this` jest teraz `undefined`</span>

Gdy tworzyliśmy funkcję, mogliśmy się odwołać w niej do globalnego obiektu:

```js
function test() {
  console.log(this) // undefined in strict mode
}
```

Poza trybem `strict` w funkcji przez `this` mieliśmy dostęp do globalnego obiektu. W przeglądarce był to obiekt `window`
. Teraz `this` w funkcji zwraca `undefined`.

## <span id="eval-oraz-with">Eval oraz with</span>

Dodatkowo tryb `strict` reguluje funkcję `eval` oraz instrukcję `with`. Jednak tego tematu już nie będę omawiał. Raczej nie powinniśmy używać tych właściwości języka JavaScript w naszym kodzie.

Poznaliśmy kilka przypadków, w których JavaScript działał naprawdę dziwnie i poza wszelką intuicją. Tryb `strict`
wymusza poprawne działanie i zgłaszanie wyjątków w sytuacjach, kiedy powinny być zgłoszone. Język w tym trybie jest czytelniejszy i bezpieczniejszy.

## <span id="czy-i-jak-uzywac-use-strict">Czy i jak używać `use strict`</span>

Czy zawsze powinniśmy używać trybu `strict`. Krótka odpowiedź brzmi jak najbardziej. Chroni to nas przed popełnieniem błędu i sam kod jest o wiele bardziej bezpieczny. Są jednak wyjątki, w których nie musimy używać tej dyrektywy.

- klasy JavaScript domyślnie pracują w trybie `strict`
- moduły ES6 w JavaScript także domyślnie pracują w trybie `strict`
- w żadnym nowoczesnym frameworku nie potrzebujesz włączać `use strict`

Pisząc dzisiaj nowoczesny kod w JavaScript, gdzie używa się frameworków, modułów ES6 i klas nie musimy dopisywać na początku naszego pliku `use strict`.

Jeśli jednak pracujesz z bardzo starym kodem lub po prostu używasz Vanilla JS i nie używasz modułów, klas to włączenie tego trybu pomoże Ci pisać lepszy kod.

Ja tworząc przykłady dla tego kursu, nie używam trybu `strict`, głównie po to, aby Wam pokazać pełne działanie JavaScript.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- tryb ścisły reguluje i poprawia błędy JavaScript
- aby zachować kompatybilność języka ze starymi aplikacjami, tryb ten nie jest domyślny
- klasy JavaScript domyślnie pracują w trybie `strict`
- moduły ES6 w JavaScript także domyślnie pracują w trybie `strict`
- w żadnym nowoczesnym frameworku nie potrzebujesz włączać `use strict`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
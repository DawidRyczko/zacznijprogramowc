---
title: "Co to jest `this` w JavaScript: Szybki Kurs #66"
description: "Wyjaśnienie działania słowa kluczowego this w JavaScript."
date: 2025-01-15
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Co to jest kontekst wykonania](#co-to-jest-kontekst-wykonania)
* [Jak łatwo określić this](#jak-łatwo-określić-this)
* [This a tryb ścisły](#this-a-tryb-ścisły)
* [Główna idea zmiennego this](#główna-idea-zmiennego-this)
* [Co warto zapamiętać](#co-warto-zapamietac)

Jedną z najtrudniejszych rzeczy w JavaScript jest zrozumienie jak działa `this`. Mechanizm ten sprawia wiele problemów każdemu programiście. Nawet doskonale rozumiejąc działanie `this` możemy popełnić błąd. Spróbujmy krok po kroku przeanalizować czym jest `this`.

W kontekście `this` będziemy mówić o funkcjach i metodach. Funkcje rozumiem jako samodzielne byty w kodzie. Natomiast metody są to funkcje, które zdefiniowane są w obiekcie.

Moje przykłady pokazuję w przeglądarce, pracuję bez trybu ścisłego. Moim globalnym obiektem jest obiekt `window`. Przygotowane przykłady uruchamiam także bezpośrednio w przeglądarce, nie korzystam z żadnych bundlerów jak *Parcel* czy Webpack. Po prostu *VanillaJs*.

Mówię, to, ponieważ w przypadku używania bundlerów, frameworków lub środowiska node.js przykłady te mogą działać inaczej. Dodatkowo, jeżeli będziemy omawiać moduły ES6, będziemy musieli obecną wiedzę, trochę zweryfikować.

## <span id="co-to-jest-kontekst-wykonania">Co to jest kontekst wykonania</span>

Bardzo często spotkacie się z definicją, że `this` jest kontekstem wykonania, dlatego na początku wyjaśnijmy sobie, czym jest kontekst wykonania. W JavaScript, kod możemy wykonać albo w jakieś funkcji czy metodzie, czyli w kontekście tej funkcji lub metody, albo w kontekście globalnym.

Jeżeli otworzymy sobie plik JavaScript i zaczniemy pisać kod, a potem wczytamy go do przeglądarki, będziemy mieli kontekst globalny:

```javascript
this.foo = 42;
console.log('Hello World');
console.log(this.foo); // 42
console.log(foo); // 42
console.log(this); // object Window
```

Ten cały kod, który widzicie, został wykonany w kontekście globalnym. Kontekst zawsze możemy wypisać przez wskaźnik `this` i widzimy, że wypisując go otrzymuję obiekt `window`. Obiekt `window` jest globalnym kontekstem dla wykonania kodu w JavaScript i jest kontekstem domyślnym.

Stwórzmy teraz funkcję:

```javascript
function printThis() {
  console.log(this);
}

printThis(); // object Window
```

Stworzyłem funkcję i wywołuję ją bezpośrednio w pliku JavaScript. Kontekstem wykonania jest obiekt globalny `window`. Widzimy to przez wypisanie `this` do konsoli w środku funkcji.

Zróbmy jednak pewien eksperyment:

```javascript
const obj = {
  a: 'My object',
  print: printThis,
};
```

Stworzyłem dodatkowo obiekt, z polem `a` opisującym ten obiekt, oraz stworzyłem pole `print`, do którego przypisuję wcześniej stworzoną funkcję `printThis`. Funkcję tą przypisuję przez referencję, od tego momentu, gdy odwołam się przez `obj.print` to będę wywoływał tak naprawdę funkcję `printThis`,
która zdeklarowana jest poza moim obiektem.

Wywołajmy więc metodę `print` w moim obiekcie:

```javascript
obj.print(); // {a: "My object", print: ƒ}
```

Okazuje się, że funkcja `printThis` nie wypisała do konsoli obiektu globalnego `window`, ale ten mój stworzony obiekt. Funkcja `printThis` pracuje teraz w zupełnie innym kontekście, w kontekście mojego stworzonego obiektu, a nie obiektu `window`.

To jest właśnie to, co najbardziej zaskakuje początkujących programistów JavaScript. Kontekst `this` dla funkcji czy metod może się zmieniać. To, czym jest `this` dla funkcji zależy tylko i wyłącznie od sposobu jej wykonania, nie od miejsca jej deklaracji. Mało tego, kontekst funkcji możemy zmienić
kilka razy w czasie wykonywania kodu.

Dochodzimy pomału do wniosku, że kontekstem wykonania dla funkcji czy metody jest jakiś obiekt. Domyślnie jest to obiekt globalny. W przeglądarce obiektem globalnym jest `window`  gdy nie ma włączonego trybu ścisłego. Może to być też obiekt, który stoi przed kropką, gdy wywołujemy metodę. Miejsce
deklaracji funkcji czy metody nie ma żadnego znaczenia. Znaczenie ma tylko to, na jakim kontekście wywołana została funkcja lub metoda.

## <span id="jak-łatwo-określić-this">Jak łatwo określić `this`</span>

Wiemy już, że `this` zależy od tego, jak została wywołana funkcja, a ściślej mówiąc, na jakim obiekcie została wywołana funkcja. Kontekst wykonywania funkcji może się więc zmienić i w ogóle nie zależy od tego, gdzie dana funkcja została stworzona:

```javascript
const objectA = {
  a: 'objectA',
  bar() {
    console.log('Your this is:', this);
    console.log(this.a);
  },
};
```

Zobaczmy taki przykład, stworzyłem obiekt `objectA`, z polem `a` opisującym ten obiekt, oraz z metodą `bar`. Zadaniem tej metody jest wypisanie `this` do konsoli, a także wypisanie `this.a` do konsoli.

```javascript
objectA.bar();
```

```text
Your this is: {a: "objectA", bar: ƒ}
objectA
```

Gdy wywołam metodę `objectA.bar()` otrzymuję informację, że `this` to ten obiekt, w którym jest metoda. Jest to dla nas naturalne, że jeżeli metoda `bar()` znajduje się w obiekcie `objectA` to `this` zawsze odnosi się do tego obiektu. Jednak nie należy przyzwyczajać się do takiego myślenia w
JavaScript.

Tak jak wspomniałem, `this` zależy tylko i wyłącznie od sposobu wywołania metody, nie od miejsca deklaracji, zobaczcie taki przykład:

```javascript
const objectB = {
  a: 'objectB',
  foo: objectA.bar,
};
objectB.foo();
```

Deklaruję obiekt `objectB`, który ma pole `a` z opisem obiektu oraz pole `foo`. Do pola `foo` przypisuję referencję do metody `bar()` pochodzącej z `objectA`. Wywołuję teraz metodę `objectB.foo()` co tak naprawdę wywołuje metodę `bar()` w obiekcie `objectA`:

```text
Your this is: {a: "objectB", foo: ƒ}
objectB
```

Jednak metoda, która fizycznie znajduje się w obiekcie `objectA` wypisuje dane z `objectB`. To udowadnia, że nie ma znaczenia, gdzie istnieje metoda czy funkcja, tylko jaki jest kontekst wywołania. W tym przypadku kontekstem jest to co stoi przed kropką, gdy wywołujemy metodę, a jest to `objectB`.

Zawsze zawracajmy uwagę na obiekt, który znajduje się przed kropką wywołania metody. To ten obiekt będzie `this` w tej metodzie czy funkcji.

Stwórzmy jeszcze jeden przykład:

```javascript
const baz = objectA.bar;
baz();
```

Stworzyłem teraz zmienną w kontekście globalnym i przypisuję do niej referencję do metody `bar` z obiektu `objectA` oraz wywołuję zmienną `baz()`:

```text
Your this is: Window{…}
undefined
```

W tym przypadku kontekstem wykonania jest obiekt globalny, a przeglądarce jest to `window`. Widzicie, że znowu zmieniłem kontekst wykonania metody. Co prawda nie mamy tutaj obiektu znajdującego się przed kropką wywołania funkcji `baz()`. Jeżeli taki obiekt nie istnieje, kontekstem domyślnym jest
obiekt globalny, a w przeglądarce jest to `window`. Wywołanie funkcji czy metody musi odbywać się zawsze w jakimś kontekście obiektu.

## <span id="this-a-tryb-ścisły">This a tryb ścisły</span>

Swoje przykłady pokazuję bez trybu ścisłego, który został wprowadzony w ES5 i używamy go poprzez polecenie `use strict`
na początku pliku lub funkcji. Robię tak, aby wam pokazać, jak standardowo działa JavaScript. Jednak w większości przypadków będziecie pracować z JavaScript, używając frameworków i modułów ES6, gdzie tryb ścisły jest trybem domyślnym. Również klasy w JavaScript pracują w trybie ścisłym. Zobaczmy
teraz jaka jest różnica w odniesieniu do wskaźnika `this`.

```javascript
'use strict';

function printThis() {
  console.log(this);
}

printThis(); // undefined
```

Stworzyłem funkcję w trybie ścisłym i wypisuję wewnątrz funkcji `this`. Funkcję wywołuję bez żadnego obiektu zdefiniowanego przeze mnie, więc domyślnie z obiektem globalnym. W trybie ścisłym wewnątrz funkcji nie mam dostępu do obiektu globalnego `window` i otrzymuję wartość `undefined`.

Nie oznacza to, że obiekt ten przestał istnieć, wciąż możemy się do niego odwołać przez `window` lub `globalThis`:

```javascript
console.log(window) // object window
console.log(globalThis) // object window
console.log(this) // object window
```

Domyślnie w funkcji i trybie ścisłym, `this` nie wskazuje już na obiekt globalny. Jest to dobra zmiana, bo nie należy posługiwać się obiektem globalnym, pisząc kod JavaScript.

Wy zazwyczaj będziecie tworzyć aplikacje z wykorzystaniem frameworków, gdzie tryb ścisły jest zazwyczaj domyślny. Dlatego w wielu miejscach zamiast obiektu globalnego pod `this` będziecie mieli wartość `undefined`.

## <span id="główna-idea-zmiennego-this">Główna idea zmiennego this</span>

Wiemy już, że nie ma znaczenia deklaracja funkcji tylko to, jak została wywołana, na jakim obiekcie następuje wywołanie. Mechanizm ten jest trochę dziwny i inny niż w językach jak Java czy C#. Twórcy jednak chcieli, aby funkcje w JavaScript mogły być użyczane na potrzeby różnych obiektów, raz
zdeklarowana funkcja mogła być użyta kilka razy:

```javascript
function print() {
  console.log(this.name.toUpperCase(), this.age);
}

const person = {
  name: 'John',
  age: 31,
};

const dog = {
  name: 'Reksio',
  age: 5,
};

print.call(person); // JOHN 31
print.call(dog); // REKSIO 5
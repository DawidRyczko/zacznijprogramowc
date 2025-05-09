---
title: "Zakres funkcji w JavaScript: Szybki Kurs #27"
description: "Zakres funkcyjny w JavaScript."
date: 2025-02-24
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Zakres funkcji](#zakres-funkcji)
* [Funkcje w funkcji](#funkcje-w-funkcji)
* [Funkcje IIFE](#funkcje-iife)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="zakres-funkcji">Zakres funkcji</span>

Kolejny zakres, jaki istnieje w JavaScript to zakres funkcyjny. Zakres funkcyjny definiowany jest przez funkcję. Wszystko, co zadeklarowane jest w ciele funkcji, nie jest dostępne na zewnątrz.

Zerknijmy na przykład funkcji z zadeklarowanymi trzema zmiennymi:

```text
function fun1() {
  var bird = 'a bird';
  const cat = 'a cat';
  let myDog = 'my dog';
  //...
}

// console.log(bird, car, myDog); // error
```

W JavaScript każda funkcja tworzy swój zakres. Nie możemy dostać się do zmiennych zadeklarowanych w funkcji z zewnątrz. Kod w funkcji dostępny jest tylko wewnątrz funkcji. Dotyczy to nawet zmiennych deklarowanych za pomocą `var`.

Funkcje w JavaScript są więc doskonałym miejscem do deklaracji kodu, który nie będzie kolidował z innymi nazwami, a przede wszystkim z zakresem globalnym.

Pamiętajmy jednak przypadek zmiennej niezadeklarowanej:

```text
function notDeclared() {
  foo = 'boo';
}

notDeclared();
console.log(foo); // 'boo'
```

Ta zmienna `foo` od razu stanie się zmienną globalną. Ponieważ nie posiada żadnej deklaracji, jak `let, const i var`. Kompilator, gdy na nią natrafi, po prostu utworzy ją w obiekcie globalnym, w przeglądarce będzie to `window`. Oczywiście w nowoczesnym JavaScript nie musimy się martwić o takie
zmienne, jednak w starym kodzie JavaScript możecie takie zmienne spotkać.

## <span id="funkcje-w-funkcji">Funkcje w funkcji</span>

W funkcjach możemy deklarować nie tylko zmienne, ale też inne funkcje:

```text
function outer() {
  const foo = 'foo';
  return function() {
    const boo = 'boo';
    return foo;
  }
}

console.log(outer()()); // 'foo'
```

W tym przypadku mamy funkcje `outer`, która posiada w sobie zadeklarowaną zmienną `foo` oraz wewnętrzną funkcję anonimową, która jest zwracana od razu z funkcji zewnętrznej.

Funkcja zewnętrzna `outer` nie ma dostępu do zakresu funkcji wewnętrznej i nie może wywołać zmiennej `boo`. Czyli do zakresu funkcji nie możemy się dostać z zewnątrz.

Funkcja wewnętrzna posiada za to dostęp do danych zadeklarowanych w funkcji wyżej, a nawet do zakresu globalnego. Nie ważne jak wiele funkcji będzie zagnieżdżonych. Każda funkcja ma dostęp do wszystkich zakresów, które ją otaczają, aż do zakresu globalnego.

Można powiedzieć, że zakres funkcyjny to taka prywatna przestrzeń dla kodu i często funkcja jest używana do ukrywania kodu. W przypadku tej funkcji `outer`, nie mamy bezpośredniego dostępu do zmiennej `foo`, dopiero wywołanie innej funkcji wewnętrznej zwraca nam wartość. W ten sposób utworzyliśmy
sobie coś na kształt zmiennej prywatnej.

## <span id="funkcje-iife">Funkcje IIFE</span>

Ponieważ funkcja okazuje się fajnym sposobem na stworzenie zakresu i także ukrycie kodu w tym zakresie, powstał ciekawy wzorzec nazwany Immediately-Invoked Function Expression (IIFE):

```text
// Immediately-Invoked Function Expression (IIFE):
```

Zanim pojawiły się moduły, w specyfikacji ES6 był to często wykorzystywany wzorzec do unikania ingerencji w obiekt globalny i tworzenia zamkniętego zakresu dla własnego kodu, zaczęto używać IIFE:

```text
(function() {
  console.log('iife')
})();
```

Jej konstrukcja jest trochę dziwna, ale cała funkcja umieszczona jest w nawiasach okrągłych, a na końcu jeszcze raz użyte są nawiasy okrągłe do wykonania funkcji. Taki zapis od razu wykonuje funkcję i wykonuje cały kod w jej środku. Funkcja ta ma nadal dostęp do zakresu globalnego, ale nie istnieje
w obiekcie globalnym `window`.

Jest sporo różnych zapisów tych funkcji, pokażę Wam jeszcze dwa:

```text
const iife2 = (function zzz() {
  return 'IIFE';
})();
```

Z tej funkcji możemy coś zwrócić i przechwycić do zmiennej. W tym przypadku zwracamy wartość string.

Możemy też:

```text
(function(global) {
  console.log(global);
})(window);
```

do funkcji przekazywać parametry, w tym przypadku przekazuję obiekt `window`. Oczywiście funkcja ma dostęp do obiektu `window`. Jednak przekazanie go w ten sposób pozwala na operowanie tym obiektem wewnętrznie bez poszukiwania go za każdym razem w zakresie nadrzędnym. Druga ważna rzecz to możemy
przekazać tam każdy inny obiekt globalny bez względu na środowisko pracy.

Chociaż funkcje IIFE są dzisiaj mniej popularne, to nadal możecie je spotkać w kodzie, na przykład, gdy traficie na framework jQuery. Dawniej były bardzo popularne do tworzenia kodu w oddzielnym zakresie i unikania zakresu globalnego.

Na podstawie tej funkcji powstał także wzorzec modułu, który był używany, zanim pojawiły się moduły ES6. O modułach będzie zupełnie nowy dział i tam wrócimy do tego tematu.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- funkcja tworzy zakres funkcyjny, do tego zakresu nie można się dostać z zewnątrz
- inne zagnieżdżone bloki czy funkcje mają zawsze dostęp do zakresu ich otaczającego
- funkcja pozwala na ukrywanie kodu w swoim zakresie i na kontrolowaniu dostępu
- nieważne ile zagnieżdżeń funkcji, dostęp mamy do wszystkich otaczających zakresów

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
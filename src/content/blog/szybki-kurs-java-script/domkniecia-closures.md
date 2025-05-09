---
title: "Domknięcia - closures w JavaScript: Szybki Kurs #34"
description: "Wyjaśnienie działania domknięć (closures) w JavaScript, zakres leksykalny oraz praktyczne przykłady użycia."
date: 2025-02-17
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Lexical scope. Zakres leksykalny](#lexical-scope-zakres-leksykalny)
* [Lexical scope i closure](#lexical-scope-i-closure)
* [Zachowanie zakresu](#zachowanie-zakresu)
* [Używanie closure](#uzywanie-closure)
* [Co warto zapamiętać](#co-warto-zapamietac)

Kolejnym zagadnieniem związanym z funkcjami są domknięcia po angielsku closures. Możecie być pewni, że na rozmowie o pracę będziecie o to zapytani. Gdy pada to pytanie, często trudno jest wytłumaczyć, czym są domknięcia, a prawda jest taka, że domknięcia używamy w kodzie nieustannie. Także pojawiły
się wiele razy w tym kursie.

## <span id="lexical-scope-zakres-leksykalny">Lexical scope. Zakres leksykalny</span>

Zanim przejdziemy do typowego przykładu domknięcia, warto jeszcze zaznajomić się z zakresem leksykalnym:

```js
function foo() {
  const a = 42;

  function bar() {
    console.log(a);
  }

  bar();
}

foo(); // 42
```

Widzimy w tym przypadku wywołanie funkcji `foo`. W środku funkcji zdefiniowana jest funkcja `bar`, która wyświetla zmienną `a` zdefiniowaną wyżej, wewnątrz funkcji otaczającej. Na końcu mamy wywołanie funkcji `bar`, która wypisuje wartość 42, po wywołaniu funkcji zewnętrznej `foo`.

Oznacza to, że wewnętrzna funkcja ma dostęp do wszystkich zakresów, które ją otaczają, również globalnego. Zakres jest jednak tworzony na podstawie deklaracji, a nie wywołania funkcji. Tutaj pojawia się właśnie zakres leksykalny, czyli lexical scope.

> Zakres leksykalny jest definiowany w miejscu deklarowania funkcji. Nie w miejscu jej wywołania.

Ma to duże znaczenie, ponieważ od miejsca zadeklarowania funkcji, czyli jej zakresu leksykalnego będą poszukiwane zmienne, które ta funkcja używa. Oznacza to, że jeżeli teraz przeniesiemy wywołanie funkcji `bar` poza funkcję `foo` to i tak funkcja `bar` będzie miała dostęp do zmiennej `a`. Ponieważ
jej zakresem leksykalnym jest miejsce jej położenia w kodzie. Ten mechanizm wykorzystuje closure.

Zwrócę jeszcze uwagę, że zakres leksykalny zależy tylko do nas, programistów. To my decydujemy, w którym miejscu deklarujemy funkcję i decydujemy o jej zakresie leksykalnym.

## <span id="lexical-scope-i-closure">Lexical scope i closure</span>

Zobaczmy teraz przykład, gdzie idea zakresu leksykalnego będzie bardziej widzialna:

```js
const a = 0;

function outer() {
  const a = 42;

  function inner() {
    console.log(a);
  }

  return inner;
}

const innerFunction = outer();
innerFunction(); // 42
```

W tym przypadku mamy funkcję `outer`, która w środku definiuje funkcję `inner` i jej zadaniem jest wypisanie zmiennej `a`.

Na początku wywołujemy funkcję `outer` i przypisujemy do zmiennej `innerFunction`. Mamy więc w zmiennej `innerFunction`
funkcję, która znajduje się w środku funkcji `outer`. Wykonujemy teraz funkcję `innerFunction` i otrzymujemy wartość `42`.

Wykonaliśmy funkcję `inner` w zakresie globalnym, gdzie także mamy zdefiniowaną zmienną `a` o wartości `0`. Widzimy jednak, że wykonana funkcja `inner` przypisana do zmiennej `innerFunction` i tak pobrała wartość z funkcji `outer`. Pomimo tego, że wykonywana jest w zakresie globalnym, to nadal ma
dostęp do zakresu gdzie została zdefiniowana. I to jest właśnie lexical scope i clouser jednocześnie.

Closure, czyli domknięcie to mechanizm pozwalający funkcji na zachowanie dostępu do zakresu leksykalnego (czyli miejsca jej deklaracji), nawet gdy funkcja jest wykonywana poza tym zakresem.

O ile pierwszy przykład był bardziej rozwodniony i trudno było zobaczyć zakres leksykalny, bo wszystko działo się w jednej funkcji, to tym razem wyciągnęliśmy funkcję poza jej zakres i widzimy teraz działanie zakresu leksykalnego.

## <span id="zachowanie-zakresu">Zachowanie zakresu</span>

Mogłoby się wydawać, że gdy zwrócimy funkcję z innej funkcji, to zewnętrzna funkcja jest całkowicie usuwana z pamięci. Zobaczmy taki przykład:

```js
function counter() {
  let a = 0;

  function add() {
    console.log(++a);
  }

  return add;
}

const increment = counter();
increment(); // 1
increment(); // 2
increment(); // 3
```

Mamy zewnętrzną funkcję `counter`, która zwraca funkcję wewnętrzną `add`. Zadaniem tej funkcji jest zwiększanie wartości w zmiennej `a`. Gdy wywołamy funkcję `counter` i przypiszemy sobie funkcję `add` do zmiennej `increment` będziemy mogli wywołać ją kilka razy.

Wywołanie jej kilka razy powoduje zwiększanie wartości `a` w zewnętrznej funkcji. Oznacza to, że przy domknięciach, cały czas mamy dostęp do zakresu zewnętrznego tej funkcji. Nie działa więc mechanizm czyszczenia funkcji, który działa w przypadku normalnych funkcji. Zawsze bowiem po zakończeniu
działania funkcji jest ona usuwana z pamięci.

Tutaj cały czas dostępny jest zakres zewnętrzny i jest wykorzystany do realizowania logiki aplikacji.

## <span id="uzywanie-closure">Używanie closure</span>

Jeżeli teraz się zastanawiacie gdzie i jak używać domknięć i koniecznie chcecie mieć je w swoim kodzie to możecie być spokojni. Tak naprawdę domknięcia są przez Was używane niemalże codziennie, jeżeli piszecie kod w JavaScript. Są one bardzo naturalne i często połączone z funkcjami `callback`:

```js
function delay(message) {
  setTimeout(() => {
    console.log(message);
  }, 1000);
}

delay('Closure!');
```

Spójrzmy na taki przykład gdzie w funkcji `delay` definiujemy `setTimeout`. Funkcja `delay` posiada dodatkowo parametr `message`. Parametr ten jest przekazywany do funkcji callback w funkcji `setTimeout`. W ten sposób tworzymy domknięcie.

Inny przykład:

```js
function init() {
  let counter = 0;
  button.addEventListener('click', () => {
    console.log(++counter);
  });
}
```

Funkcja, która przechowuje zmienną i zlicza kliknięcia na przycisku. Również mamy tutaj przykład funkcji `callback`, która tworzy domknięcie i korzysta ze zmiennej funkcji zewnętrznej.

Domknięcia w swoim kodzie znajdziecie w wielu miejscach, nie musimy się skupiać na tym, aby je używać, one są po prostu naturalnym sposobem pisania kodu w JavaScript.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- zakres leksykalny jest tam, gdzie zadeklarowana jest funkcja
- `closure` to możliwość wywołania funkcji poza jej zakresem leksykalnym, ale z zachowaniem dostępu do zakresu leksykalnego
- w momencie wytworzenia domknięcia funkcja wewnętrzna ma dostęp do zakresów zewnętrznych, są one nadal utrzymywane w pamięci
- nawet jeżeli nie znałeś pojęcia `closure ` to i tak tworzyłeś kod, który wykorzystywał ten mechanizm

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
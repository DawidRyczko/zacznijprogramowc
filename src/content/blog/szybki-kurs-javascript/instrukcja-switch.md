---
title: "Instrukcja Switch w JavaScript: Szybki Kurs #18"
description: "Omówienie instrukcji switch w JavaScript. Grupowanie warunków, wyrażenia w instrukcji switch."
date: 2025-03-05
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Instrukcja Switch](#instrukcja-switch)
* [Grupowanie](#grupowanie)
* [Wyrażenia](#wyrazenia)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="instrukcja-switch">Instrukcja Switch</span>

W przypadku sprawdzania wielu warunków warto użyć instrukcji `switch` zamiast instrukcji `if` i pojedynczych bloków `else if`:

```js
const randomize = Math.floor(Math.random() * 4) + 1;
switch (randomize) {
  case 1:
    console.log('Number one');
    break;
  case 2:
    console.log('Number two');
    break;
  default:
    console.log('Another number');
}
```

W instrukcji `switch` analizujemy wartość i tworzymy warunki do analizowanej wartości. Jeżeli wylosujemy liczbę `1`
lub `2` to wydrukujemy odpowiednią informację do konsoli. Jeżeli nie, wykona się instrukcja `default`, która działa podobnie jak `else` czyli wykonuje się zawsze, gdy wszystkie inne warunki zawiodły.

Instrukcja `default` nie jest obowiązkowa i możemy je nie używać.

Podobnie jest ze słowem kluczowym `break`, którego zadaniem jest wyjście z instrukcji `switch` gdy jeden z warunków będzie spełniony.

```js
switch (randomize) {
  case 1:
    console.log('Number one');
  case 2:
    console.log('Number two');
  default:
    console.log('Another number');
}
```

W tym przykładzie usuwam wszystkie słowa `break`. Jeżeli jakiś warunek zostanie spełniony, to zostanie wykonany. Jednak brak słowa kluczowego `break` oznacza także wykonanie kolejnych warunków, nawet jeżeli nie spełniają porównania. Czasami takie rozwiązanie może się przydać, ale zazwyczaj należy
pamiętać o umieszczeniu `break`.

### <span id="grupowanie">Grupowanie</span>

Możemy też grupować warunki:

```js
switch (randomize) {
  case 1:
  case 3:
    console.log('Value is odd: ', randomize);
    break;
  case 2:
  case 4:
    console.log('Value is even: ', randomize);
    break;
  default:
    console.log('An unknown value');
}
```

W tym przypadku tworzymy warunki dla liczb parzystych i nieparzystych. Warunki są zgrupowane i gdy któryś z nich się sprawdzi to wykonana zostanie dana klauzula `case`. Taki zapis grupowania może się przydać, gdy chcemy sprawdzić kilka warunków:

```js
const browser = 'IE 11';
switch (browser) {
  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
  case 'Edge':
    console.log('Supported!');
    break;
  case 'IE 11':
    console.log('Change your browser');
    break;
  default:
    alert('An uknown browser');
}
```

Ten zapis bardzo ładnie grupuje opcje, gdzie jest kilka wartości do wyboru. Możemy sobie wyobrazić, że taki zapis w instrukcji `if` nie będzie zbyt czytelny i najlepszą opcją jest użycie `switch`.

Warto zwrócić uwagę, że warunki w instrukcji `switch` przez JavaScript porównywane są za pomocą potrójnego znaku porównania. Mamy więc dokładne porównanie zarówno typu, jak i wartości.

### <span id="wyrazenia">Wyrażenia</span>

W instrukcji `switch` możemy także używać wyrażeń:

```js
const n = randomize * 10;
switch (n) {
  case 1 * 10 || 3 * 10:
    console.log('Value is odd: ', n);
    break;
  case test(n):
    console.log('Value is even: ', n);
    break;
  default:
    console.log('An unknown value');
}

function test(value) {
  return value === 2 * 10 || 4 * 10;
}
```

W tym przypadku klauzule `case` używają bardziej skomplikowanego wyrażenia do sprawdzenia wartości. Również możemy wywołać funkcję, która zostanie wykonana w klauzuli `case`. Do takiej funkcji oczywiście możemy przesłać analizowaną wartość w instrukcji `switch`.

### <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- do wielu warunków mamy instrukcję `switch` zamiast `if`
- za pomocą instrukcji `switch` możemy sprawdzać pojedyncze warunki lub grupę warunków
- słowo kluczowe `break` pozwala wyjść z instrukcji po wykonaniu warunku, ale nie jest obowiązkowe
- klauzula `default` wykonywana jest, gdy żaden inny warunek się nie wykonał, nie jest obowiązkowa

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
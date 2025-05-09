---
title: "Higher-order function w JavaScript: Szybki Kurs #35"
description: "Higher-order function czyli funkcje wyższego rzędu."
date: 2025-02-16
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
1.  [Przykład higher-order function](#przykład-higher-order-function)
2.  [Kompozycja funkcji](#kompozycja-funkcji)
3.  [Programowanie funkcyjne](#programowanie-funkcyjne)
4.  [Co warto zapamiętać](#co-warto-zapamietac)


Kolejnym zagadnieniem związanym z funkcjami w JavaScript jest higher-order function. Z tym zagadnieniem spotkacie się
najczęściej przy programowaniu funkcyjnym albo też na rozmowie o pracę. Tak naprawdę higher-order function dotyczą
codziennego programowania i jeżeli programujesz już w JavaScript na
pewno używasz funkcji wyższego rzędu.

### Przykład higher-order function

```js
const double = (x) => x * 2;
const result = [1, 2, 3].map(double);
console.log(result); // [ 2, 4, 6 ]
```

Higher-order function to funkcja, która przyjmuje jakąś funkcję lub ją zwraca. W przykładzie widzimy funkcję `map`,
która przyjmuje inną funkcję jako parametr, czyli funkcję callback. W tym przypadku `map` jest funkcją wyższego rzędu,
ponieważ przyjmuje inną funkcję.

Gotowych funkcji wyższego rzędu znajdziemy w JavaScript całą masę. Są one ważne, ponieważ pozwalają na pisanie
prostszego i czytelniejszego kodu. Wykorzystanie higher-order function to także mniej bugów i łatwiejsze testowanie.

Zobaczmy teraz przykład, gdybym nie wykorzystał funkcji `map`, a chciał wszystko zaimplementować ręcznie:

```js
const numbers = [1, 2, 3];
const result2 = [];
for (let i = 0; i < numbers.length; i++) {
  const element = numbers[i] * 2;
  result2.push(element);
}
console.log(result2);
```

Ten kod robi dokładnie to samo co funkcja `map` i stworzony do niej callback. Tutaj jednak musieliśmy stworzyć o wiele
więcej kodu, który jest mniej czytelny, podatny na błędy i mało re-używalny. Dlatego, jeżeli tylko jest możliwość,
używajcie gotowych rozwiązań.

### Kompozycja funkcji

Samo pojęcie programowania funkcyjnego i kompozycji funkcji to temat na zupełnie inny kurs. Pokażę Wam jednak przykłady
jak można użyć funkcji callback i higher-order function to stworzenia czytelnego i re-używalnego kodu.

```js
const multiply = (x) => x * 2;
const even = (x) => x % 2 === 0;
const sum = (accumulator, currentValue) => accumulator + currentValue;

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result3 = list.filter(even).map(multiply).reduce(sum);
console.log(result3); // 40
```

Mamy zdefiniowane funkcje callback, które robią konkretne rzeczy. Pierwsza funkcja mnoży wszystkie wartości przez 2.
Funkcja `even` zwraca tylko liczby parzyste, a funkcja `sum` dodaje do siebie kolejne wartości. Te funkcje `callback`
będziemy mogli używać w aplikacji wielokrotnie przesyłając je do funkcji wyższego rzędu jak w tym przypadku.

Wywołuję funkcje `filter`, `map` oraz `reduce` jako idealny przykład higher-order functions. Przekazuję tam poszczególne
funkcje do wykonania zadania. W ten sposób zrobiłem prostą kompozycję funkcji, która mi pozwoliła uzyskać konkretny
wynik.

Widzimy, że taki kod jest bardziej czytelny, bardzo prosty w testowaniu i możemy go użyć wiele razy w różnych częściach
aplikacji. Jeżeli nie wiecie jak dokładnie działają funkcje `filter`, `map` i `reduce`, wrócimy do nich przy omawianiu
tablic.

Tak wygląda koncepcja higher-order function. Są to funkcje, do których możemy przekazać funkcje lub funkcje, które
zwracają inne funkcje.

### Programowanie funkcyjne

Programowanie funkcyjne w JavaScript jest bardzo popularne, nie jest to jednak temat na ten kurs. Jeżeli jednak chcecie
zgłębić temat kompozycji funkcji, a także dodatkowych funkcji wyższego rzędu, warto sprawdzić dwie dodatkowe biblioteki.

Pierwsza z nich to Underscore.js:

https://underscorejs.org/

Ta biblioteka świetnie uzupełnia JavaScript o niezbędne dodatkowe funkcje przydatne przy programowaniu funkcyjnym

Kolejna biblioteka to Lodash:

https://lodash.com/

W tej bibliotece znajdziemy mnóstwo pomocnych funkcji wyższego rzędu, które często piszemy w JavaScript, a są one po
prostu dostępne w tej bibliotece. Jeżeli brakuje Wam funkcji do operowania na listach, strukturach danych, typach
prostych to w tej bibliotece znajdziecie wszystkie narzędzia.

### Co warto zapamiętać

- higher-order function to funkcja, która przyjmuje funkcje lub zwraca funkcje
- w JavaScript mamy kilka gotowych funkcji wyższego rzędu, są to głównie funkcje dotyczące manipulacji na tablicach i
  podobnych strukturach
- higher-order function ściśle związane jest z programowaniem funkcyjnym
- programowanie funkcyjne to zupełnie oddzielny koncept języka JavaScript, któremu trzeba poświęcić dodatkowy
  czasKolejnym zagadnieniem związanym z funkcjami w JavaScript jest higher-order function. Z tym zagadnieniem spotkacie
  się najczęściej przy programowaniu funkcyjnym albo też na rozmowie o pracę. Tak naprawdę higher-order function dotyczą
  codziennego programowania i jeżeli programujesz już w JavaScript na
  pewno używasz funkcji wyższego rzędu.

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)

---
title: "Pętle do...while oraz while w JavaScript: Szybki Kurs #24"
description: "Omówienie pętli do...while oraz while w JavaScript."
date: 2025-02-27
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pętla `do...while`](#petla-do-while)
* [Pętla `while`](#petla-while)
* [Co warto zapamiętać](#co-warto-zapamietac)

Pętla `do...while` oraz `while` to rodzaj pętli, który będziecie używać niezwykle rzadko. Sam nie pamiętam kiedy ostatni raz użyłem tych instrukcji. Mogą się jednak przydać w specyficznych przypadkach, dlatego szybko zerkniemy na te pętle.

## <span id="petla-do-while">Pętla `do...while`</span>

Pętla `do...while` działa dopóty, dopóki warunek w pętli nie będzie wartością `false`:

```text
do {
  console.log('foo'); // 'foo'
} while (false);
```

Warunek pętli jest na końcu wyrażenia, dlatego też pętla `do...while` wykona się zawsze przynajmniej raz. Jeżeli do warunku wstawimy po prostu wartość `true`, pętla będzie się kręcić w nieskończoność.

Dobrym przykładem użycia pętli jest próba wylosowania 6 oczek na kostce:

```text
let randomNumber;
do {
  randomNumber = Math.floor(Math.random() * 6) + 1;
  console.log(randomNumber);
} while (randomNumber !== 6);
```

Poza pętlą tworzymy zmienną `randomNumber`. Zmienna musi być stworzona poza pętlą, ponieważ nie będzie widoczna w instrukcji `while`. Warunek `while` mówi, losuj liczbę, dopóki jest różna od `6`. W pętli podejmujemy pierwszą próbę wylosowania liczby. Jeżeli trafia się `6` to pętla się kończy, jeżeli
nie, to losuje dalej.

Na pewno, pętla ta będzie miała przynajmniej jedną iterację. I jeżeli od razu trafi się `6` to wygraliśmy, spróbujcie sami w przeglądarce. Wklejcie kod do konsoli i zobaczcie, ile iteracji potrzebowaliście, aby trafić na `6`.

## <span id="petla-while">Pętla `while`</span>

Pętla `while` jest trochę inna i warunek zakończenia pętli jest na początku instrukcji:

```text
while (false) {
  console.log('boo')
}
```

Jeżeli warunek od razu jest fałszywy, nie zostanie wykonana żadna operacja. Oczywiście, jeżeli znowu wstawimy do instrukcji `while` stałą wartość `true` to otrzymamy nieskończoną pętlę.

Tutaj również przykładem może być losowanie liczby `6`:

```text
let randomNum = Math.floor(Math.random() * 6) + 1;
while (randomNum !== 6) {
  console.log(randomNum);
  randomNum = Math.floor(Math.random() * 6) + 1;
}
console.log(randomNum);
```

Ponieważ pętla `while` od razu sprawdza warunek, możemy podjąć próbę wylosowania liczby `6` przed pętlą, jeżeli to się nie uda, wtedy wpadamy do pętli i losowanie trwa tak długo, aż `randomNum` będzie liczbą `6`. W optymistycznym wariancie możemy nigdy nie wykonać iteracji pętli `while`. Czasami to
się udaje.

Zarówno w pętli `do...while` jak i w pętli `while` możemy używać instrukcji `break` oraz `continue`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- pętla `do...while` i `while` są dzisiaj pętlami, które rzadko używa się w prawdziwym kodzie
- pętla `do...while` zawsze wykona jedną iterację, zanim sprawdzi warunek. Zawsze więc wykona jakieś zadanie
- pętla `while` najpierw sprawdza warunek, potem coś wykonuje
- w tych pętlach też można użyć `break` oraz `continue`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
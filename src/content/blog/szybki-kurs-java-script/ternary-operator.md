---
title: "Ternary operator w JavaScript: Szybki Kurs #19"
description: "Omówienie ternary operatora w JavaScript. Łączenie operatorów, przypadki użycia."
date: 2025-03-04
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Ternary operator](#ternary-operator)
* [Łączenie operatorów](#laczenie-operatorow)
* [Kilka przypadków użycia](#kilka-przypadkow-uzycia)
* [Dodatkowy kod](#dodatkowy-kod)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="ternary-operator">Ternary operator</span>

W JavaScript do sprawdzania warunków mamy też ternary operator. Operator ten bardzo często zastępuje instrukcję `if`:

```js
const num = 1;
const result = num === 1 ? 'one' : 'two';
console.log(result); // 'one'
```

Po porównaniu, operator zwraca jakąś wartość, którą możemy przypisać do zmiennej. Jeżeli porównanie daje `true` zwracana jest pierwsza wartość po znaku zapytania w innym wypadku zwracana jest druga wartość stojąca na końcu operatora.

Wbrew pozorom, ternary operator nie musi zwracać wartości, może wykonać jakaś funkcję:

```js
const test = Math.floor(Math.random() * 2) + 1;
test === 1 ? console.log('value is one') : console.log('value is two');
```

W tym przypadku w zależności, jaka wartość znajdzie się w zmiennej test zostanie wykonana jedna z funkcji `console.log`. Możemy więc w prosty sposób kontrolować wykonywanie kodu. Niektórzy jednak uważają, że wykonywanie kodu w taki sposób nie jest zbyt czytelne i lepiej zastosować tutaj blok `if`.

Ternary operator przyda się bardzo przy sprawdzaniu, czy obiekt nie jest `null`:

```js
const user = null;
const value = user ? user.name : 'User is null';
console.log(value); // 'User is null'
```

W ten sposób bardzo prosto możemy sprawdzać obiekty, zanim pobierzemy z nich wartość. Ten zapis na pewno bardzo często znajdziecie w kodzie JavaScript.

## <span id="laczenie-operatorow">Łączenie operatorów</span>

Ternary operator możemy też łączyć w łańcuch wywołań:

```js
const number = Math.floor(Math.random() * 4) + 1;
const val = number === 1 ? 'one' : number === 2 ? 'two' : number === 3 ? 'three' : 'fourth';
console.log(val);
```

Niestety nie jest to zbyt czytelna forma. Przy jeszcze bardziej skomplikowanych warunkach można szybko się pogubić. Przy większej ilości warunków jak tutaj zdecydowanie czytelniejsza będzie instrukcja `if` lub `switch`.

Nie życzę, Wam więc spotkania w kodzie takiego zapisu:

```js
const a = true, b = false, c = true, d = false, e = true, f = false, g = false, h = true, i = true, j = false;
const k = a ? (b ? (c ? d : e) : (d ? e : f)) : f ? (g ? h : i) : j;
console.log(k);
```

Niestety może to się zdarzyć, ponieważ ternary operator jest bardzo często używany przez programistów do skracania zapisów.

## <span id="kilka-przypadkow-uzycia">Kilka przypadków użycia</span>

Pokażę Wam teraz kilka ciekawych przypadków użycie ternary operatora.

Zdarzają się przypadki, gdy ternary operator nie będzie potrzebny:

```js
const age = 28;
const isAdult = age >= 18 ? true : false;
console.log(isAdult);
```

W tym przypadku chcemy uzyskać wartość dla zmiennej `isAdult` w zależności od sprawdzenia zmiennej `age`. Zmienna `isAdult` będzie przechowywała wartość `true` lub `false.`

Ten zapis można zrobić o wiele krócej:

```js
const isAdult2 = age >= 18;
console.log(isAdult2);
```

Wystarczy proste przypisane i sprawdzenie warunku za pomocą operatora porównania.

Możecie też się zastanawiać, jak użyć ternary operatora do zwrócenia tylko jednej wartości. Ogólnie nie jest to możliwe, ale możemy zrobić taki zapis:

```js
age >= 18 ? console.log('You can enter') : false;
```

Nie musimy przypisywać wartości z ternary operatora, a jeżeli warunek będzie prawdziwy to wykonujemy jakaś funkcję, która dalej wykonuje program. Jeżeli warunek nie jest prawdziwy, to zwracamy jakaś fałszywą wartość, która nic nie znaczy, bo nie zostaje nigdzie przypisana i nie musimy jej używać.

Tak naprawdę w takiej sytuacji nie powinniśmy na siłę szukać opcji użycia ternary operatora. A zapis ten możemy jeszcze prościej wykonać za pomocą operatora logicznego `AND`:

```js
age >= 18 && console.log('Yes, you can enter!')
```

Jak pamiętamy przy operatorze `AND` jeżeli pierwsza wartość okaże się prawdziwa, to zwracana lub wykonywana jest ta druga wartość. I w tym wypadku albo wykona się nasza funkcja, albo nie. Unikamy w tym przypadku zwrócenia jakiejkolwiek wartości.

## <span id="dodatkowy-kod">Dodatkowy kod</span>

Kolejnym ciekawym przypadkiem jest możliwość wykonania dodatkowego kodu przed zwróceniem wartości:

```js
const isAdult3 = age >= 18 ? (
    console.log('Yes you are adult'),
      console.log('You can enter'),
      true

  ) :
  (
    console.log('nope'),
      false

  )
console.log(isAdult3);
```

Zanim zostanie zwrócona wartość `true` lub `false` wykonujemy dodatkowy kod. Zauważcie, że w tym przypadku poszczególne linie kodu oddzielone są przecinkiem. Natomiast instrukcje po stronie lewej i prawe ujęte są dodatkowo w nawiasy okrągłe. Ostatnia wartość z takiego nawiasu jest zwrócona.

Tak wygląda ternary operator, często też nazywa po polsku skróconym ifem i może to sugeruje najlepsze użycie. Używajmy go, aby skrócić zapis instrukcji warunkowej `if else`. Niektóre zapisy bowiem mogą powodować dużą nieczytelność.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- ternary operator jest idealny, aby zapisać instrukcję `if else` w krótszej formie
- ternary operator zwraca jedną z dwóch wartości
- możemy łączyć wywoływanie ternary operatorów
- ternary operator może wykonywać dodatkowy kod, zanim ostatecznie zwróci wartość

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
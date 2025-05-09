---
title: "Praktyczne przykłady AND i OR w JavaScript: Szybki Kurs #16"
description: "Praktyczne zastosowanie operatorów AND i OR w JavaScript na przykładach."
date: 2025-03-07
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Praktyczne przykłady AND i OR](#praktyczne-przykłady-and-i-or)
* [Przykład AND](#przyklad-and)
* [Przykład OR](#przyklad-or)

## <span id="praktyczne-przykłady-and-i-or">Praktyczne przykłady AND i OR</span>

Przygotowałem dodatkowe przykłady do tego, jak można wykorzystać możliwość AND oraz OR w sytuacji, gdy operatory te zwracają konkretne wartości.

## <span id="przyklad-and">Przykład AND</span>

Na początek zobaczmy przykład z operatorem AND.

W naszym przykładzie posiada my prosty obiekt, reprezentujący użytkownika:

```js
let user = {
  isLogged: true,
}
```

Posiadając taki obiekt, chcemy sprawdzić, czy w ogóle obiekt nie jest `null` i sprawdzić, czy `user` faktyczne jest zalogowany, standardowo kod może wyglądać tak:

```js
function isUserLoggedNormal(user) {
  if (user && user.isLogged) {
    return true;
  }
  return false;
}
```

Stworzyliśmy zwykłą funkcję z instrukcją `if`. Sprawdzamy, czy obiekt `user` nie jest `null` i czy pole `isLogged` ma wartość `true`. Jeżeli tak to zwracamy `true` w innym wypadku `false`. Nasza funkcja zawsze jawnie zwraca typ `boolean`.

Możemy ten zapis jednak wykonać nieco krócej, z operatorem AND:

```js
function isUserLogged(user) {
  return Boolean(user && user.isLogged);
}

console.log(isUserLogged(user)); // true
```

W tym przypadku, jeżeli `user` istnieje, to zwracana jest wartość `true` z pola `isLogged`. Jeżeli natomiast `user` nie istnieje, to zwracana jest wartość ze zmiennej `user`.

Jeżeli się zastanawiacie, dlaczego robię konwersję do typu `boolean` to zobaczmy ten przykład:

```js
user = null;
console.log(isUserLogged(user));
```

Jeżeli `user` byłby `null`, otrzymałbym wartość `null` przy operatorze `AND`. Ponieważ nazwa mojej funkcji wskazuje że będzie zwracała typ `boolean` dokonuję więc konwersji na ten typ.

Takim prostym sposobem wykorzystując operator `AND` mogę sprawdzić, czy `user` istnieje i czy jest zalogowany.

## <span id="przyklad-or">Przykład OR</span>

W sytuacji, gdy chcemy zwrócić jakaś domyślną wartość, gdy pierwsza wartość nie istnieje, możemy użyć operatora OR.

```js
function sayHello(greetings) {
  return greetings || 'Have a nice day!';
}

console.log(sayHello()) // 'Have a nice day!'
console.log(sayHello('Hello there')) // 'Hello there'
```

W tym przypadku, jeżeli do funkcji nie zostanie przesłana wartość zostanie zwrócona domyślna wartość `Have a nice day!`. Jeżeli natomiast zmienna `greetings` nie będzie wartością pustą, zwrócona zostanie wartość z tej zmiennej. Jest to fajne i proste zabezpieczenie przed użyciem pustej wartości.

Tradycyjna implementacja mogłaby wyglądać tak:

```js
function sayHelloNormal(greetings) {
  if (greetings) {
    return greetings;
  }
  return 'Have a nice day!';
}
```

Jest to nieco dłuższy i bardziej rozwlekły kod. Oczywiście można go zapisać jeszcze krócej za pomocą ternary operatora, którego jeszcze omówimy w innym dziale:

```js
return greetings ? greetings : 'Have a nice day!';
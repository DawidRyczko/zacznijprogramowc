---
title: "Optional Chaining Operator w JavaScript: Szybki Kurs #21"
description: "Omówienie operatora Optional Chaining (?.) w JavaScript. Wywoływanie funkcji, wykorzystanie przy tablicach, połączenie z operatorem nullowym. Przykłady użycia."
date: 2025-03-02
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Optional Chaining Operator](#optional-chaining-operator)
* [Wywołanie funkcji](#wywolanie-funkcji)
* [Wykorzystanie przy tablicach](#wykorzystanie-przy-tablicach)
* [Połączenie z operatorem nullowym](#polaczenie-z-operatorem-nullowym)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="optional-chaining-operator">Optional Chaining Operator</span>

W ESCMAScript 2020 pojawia się kolejny nowy operator o nazwie Optional Chaining. Jeżeli chcemy go używać, warto sprawdzić, czy jest już zaimplementowany w przeglądarkach, które będziemy wspierać. W innym wypadku należy użyć skryptów .

Operator ten reprezentowany jest przez znak zapytania i kropki `?.`:

```js
const obj = {
  person: null,
}
console.log(obj.person?.name)
```

Za jego pomocą możemy wykonać proste sprawdzenie, czy kolejne właściwości obiektu istnieją, zanim nastąpi próba ich odczytania. Widzimy w tym przypadku, że zanim odwołam się do pola `name` to operator sprawdza wcześniej, czy obiekt `person` istnieje. Jeżeli właściwość, do której się odwołujemy nie
istnieje to zwracana jest wartość `undefined`
i nie zostanie zwrócony błąd przez JavaScript.

Obiekt person nie musi być też koniecznie obiektem o wartości nullowej:

```js
const obj2 = {
  person: '',
}
console.log(obj.person?.name) // undefined
```

Optional Chaining sprawdza po kolei ścieżkę odwołania i jeżeli nie uda mu się pobrać kolejnego odwołania, zwracana jest wartość `undefined`. Dla tego operatora nie ma znaczenia, do jakich pól się odwołujemy, operator ten sprawdza czy możliwy jest łańcuch wywołania, który zapisaliśmy w wyrażeniu.

Gdybyśmy chcieli zrobić to w tradycyjny sposób, użylibyśmy na przykład operatora AND:

```js
console.log(obj.person && obj.person.name) // null
```

Optional Chaining ma zdecydowaną przewagę, zapewniając prosty i czytelny kod.

Możemy sobie dodatkowo wyobrazić, że pracujemy z obiektami z jakiegoś zewnętrznego API i nigdy nie wiadomo co do nas przyjdzie, a obiekty takie zazwyczaj są mocno zagnieżdżone w sobie:

```js
response = {};
const res = response.data?.user?.adress?.postcode
```

Czasami musimy sprawdzić dosłownie każdą właściwość obiektu, zanim pobierzemy z niej jakaś wartość. Z tym operatorem robimy to w bardzo eleganckiej formie. Już pozostawiam Wam wyobrażenie sobie, jak wiele warunków trzeba by sprawdzić z operatorem AND.

## <span id="wywolanie-funkcji">Wywołanie funkcji</span>

Operator ten możemy także użyć w przypadku wywołania funkcji:

```js
const person = {
  name: 'John',
}
console.log(person.getName?.()); // undefined
```

Mamy obiekt person, który ma zdefiniowane pole `name`, nie ma w nim jednak funkcji `getName()`. Możemy więc przed wywołaniem funkcji użyć operatora Optional Chaining. Widzimy, że między nazwą funkcji a nawiasami wstawiamy operator.

Bardzo fajne zastosowanie tego operatora można znaleźć przy funkcjach callback:

```js
function print(printer, error) {
  try {
    printer('Print');
  } catch (err) {
    error?.('Some error')
  }
}

print(console.log) // 'Print'
```

Mamy funkcję `print`, do której mogę przekazać inną funkcję, która będzie wypisywała tekst do konsoli. Funkcja `print`
wyłapuje też możliwość wystąpienia błędu, na przykład, jeśli nie przekażemy do funkcji `print` żadnego callbacka. Teraz przekazaliśmy funkcję `console.log` jako callback i wszystko działa ok.

Jednak przy takim wywołaniu:

```js
print();
```

W bloku `try` wystąpi błąd, który będzie obsłużony w bloku `catch`, tam powinna zostać wywołana funkcja `error`, jednak funkcja `error`, nie została przekazana. Normalnie JavaScript zgłosiłby kolejny błąd, że próbujemy wywołać funkcję, która jest `undefined`. Operator Optional Chaining pozwala nam
zabezpieczyć się przed wywołaniem funkcji, która może nie istnieć.

## <span id="wykorzystanie-przy-tablicach">Wykorzystanie przy tablicach</span>

Operator ten może być również użyty przy tablicach:

```js
const array = undefined;
console.log(array?.[1]) // undefined
```

Mamy obiekt `array`, który ma wartość `undefined`, ale jego nazwa sugeruje, że jest to tablica. Próba pobrania jakiegoś elementu za pomocą indeksu skończy się błędem zgłoszonym przez JavaScript. Za pomocą operatora Optional Chaining możemy uniknąć błędu i otrzymać wartość `undefined`.

## <span id="polaczenie-z-operatorem-nullowym">Połączenie z operatorem nullowym</span>

Operator Optional Chaining świetnie nadaje się do połączenia go z operatorem nullowym:

```js
const user = {
  name: "Carl",
};
console.log(user?.address ?? "Unknown address"); // 'Unknown address'
```

Mamy obiekt `user`, który posiada tylko właściwość `name`. My natomiast próbujemy znaleźć właściwość `address`. Jeżeli jej nie będzie to zwrócimy wartość domyślną `Unknow address`. Tutaj świetną synergię robią te dwa operatory.

Gdybym chciał to zapisać bez operatorów:

```js
const address = user && user.address ? user.address : "Unknown address";
console.log(address) // 'Unknown address'
```

W moim rozwiązaniu łączę operator `AND` oraz ternary operator. Cały zapis wygląda na bardziej rozwlekły i skomplikowany.

Operator Optional Chaining ma bardzo duże możliwości i na pewno nie wykorzystaliśmy jego całego potencjału. Wszędzie tam, gdzie będziecie pracować z niepewnymi danymi jak obiekty o nieznanej strukturze, operator ten będzie bardzo przydatny.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- operator Optional Chaining reprezentowany jest przez `?.` znak zapytania i kropkę
- operator ten chroni nas przed wywołaniem lub odczytaniem właściwości, która nie istnieje
- operator ten możemy użyć przy dostępnie do pól obiektu, dostępie do danych w tablicach czy przy wywołaniu funkcji
- w prosty sposób może nam zastąpić operator `AND`

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
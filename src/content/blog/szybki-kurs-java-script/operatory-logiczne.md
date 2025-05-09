---
title: "Operatory logiczne w JavaScript: Szybki Kurs #15"
description: "Omówienie operatorów logicznych w JavaScript."
date: 2025-03-08
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Operatory logiczne](#operatory-logiczne)
* [Operator logiczny `!` oraz `!!`](#operator-logiczny--oraz-)
* [Operatory logiczne `&&` oraz `||`](#operatory-logiczne--oraz-)
* [Operator logiczny `AND`](#operator-logiczny-and)
* [Operator logiczny `OR`](#operator-logiczny-or)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="operatory-logiczne">Operatory logiczne</span>

Zadaniem operatorów logicznych jest sprawdzenie wartości typu `boolean` i odpowiednio zwrócenie wartości typu `boolean`. Jednak gdy do operatorów logicznych wstawimy inne wartości niż `boolean` zwrócona jest jedna z tych wartości. Być może brzmi to teraz trochę dziwnie, ale zaraz zobaczymy wszystko w działaniu.

## <span id="operator-logiczny--oraz-">Operator logiczny `!`  oraz  `!!`</span>

Na początek omówimy operator logicznej negacji. Reprezentowany jest przez znak wykrzyknika `!`. Wiemy już, że możemy go użyć do konwersji na typ `boolean`:

```js
console.log(!true); // false
console.log(!false); // true
console.log(!null); // true
console.log(!1); // false
console.log(!'test'); // false
```

Za jego pomocą, jawnie konwertujemy do wartości `boolean`, ale odwracamy wynik. Dlatego wszystko co jest `true` staje się `false`, a wszystko, co `false`, staje się `true`. Taka negacja może się przydać przy takiej konstrukcji:

```js
const a = null;
if (!a) {
  console.log('Falsy value'); // Falsy value
}
```

Gdy do bloku `if` wstawimy logiczną negację, możemy to przeczytać jako: Wykonaj kod, gdy zmienna `a` nie jest `true`. Wiemy, że `null` w tym miejscu konwertuje się do `false`, więc odwrócimy wartość do `true` i wykonamy blog `if`.

W dłuższej wersji i bardziej czytelnej zapisalibyśmy to tak:

```js
if (Boolean(a) === false) {
  console.log('Falsy value'); // Falsy value
}
```

Wykonalibyśmy jawną konwersję to typu `boolan` i sprawdzi, czy ma wartość `false`.

Możemy także zanegować całe wyrażenie:

```js
if (!(Boolean(a) === true)) {
  console.log('Falsy value'); // Is null
}
```

W ten sposób sprawdzamy, czy konwersja zmiennej do `boolean` daje nam wartość `true`. I negujemy całe wyrażenie. Znowu możemy to tłumaczyć. Wykonaj blok `if` jeśli warunek nie jest `true`.

Możemy więc za pomocą operatora negacji, negować wyrażenia.

Wiemy też, że używając podwójnego znaku możemy przekonwertować wartość do typu `boolean` bez odwracania wartości, należy użyć podwójnego operatora negacji:

```js
console.log(!!true); // true
console.log(!!false); // false
console.log(!!null); // false
console.log(!![]); // true
console.log(!!'test'); // true
```

Znamy już to działanie z konwersji do typu `boolean`.

## <span id="operatory-logiczne--oraz-">Operatory logiczne `&&` oraz `||`</span>

W JavaScript jak w wielu językach programowania mamy jeszcze operatory logiczne AND reprezentowane przez dwa znaki ampersand `&&` oraz operator `OR` reprezentowane przez dwa znaki pionowej kreski `||`.

Operatory te w JavaScript pracują w dwóch wariantach. Jeżeli podstawimy do operatorów wartości typu `boolean`, zwrócą nam również wartość `boolean`. Jednak gdy podstawimy do nich inną wartość niż `boolean`, zwrócą jedną z tych dwóch wartości. Najlepiej oczywiście zobaczyć to na przykładach.

## <span id="operator-logiczny-and">Operator logiczny `AND`</span>

Na początek sprawdźmy typowe działanie operatora `AND`, takie, jakie jest znane z innych języków programowania:

```js
console.log(100 > 5 && 1 < 10); // true
console.log(100 > 5 && 1 > 10); // false
console.log(100 < 5 && 10 > 1); // false
```

W tych przypadkach, po każdej stronie operatora logicznego `AND` stoją porównania. Jak wiemy porównania zwracają jakaś wartość  `boolean`. Operator `AND` też zwróci wartość `boolean`.

W tym przypadku operator `AND` działa jak w wielu innych językach programowania:

```js
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false
```

Jeżeli wszystkie wartości są `true`, zawsze otrzymamy `true`. Jeżeli jakakolwiek jest `false`, zawsze otrzymamy `false`. Oczywiście można użyć wielu operatorów AND w porównaniu.

Dodatkowo w JavaScript możecie się spotkać z innym zastosowaniem operatora `AND`. Gdy operator ten, będzie zwracał jedną z wartości użytą przy porównaniu, rozpatrzmy takie dwa przypadki:

```js
console.log('boo' && 'foo'); // 'foo'
console.log(0 && true); // 0
```

W pierwszym przypadku otrzymujemy wartość `foo`. Ponieważ pierwsza wartość po konwersji do `boolean` zwraca `true`. Więc za każdym razem, gdy na pierwszym miejscu stoi wartość prawdziwa, to zwracana jest wartość druga.

W drugim przypadku zwrócona jest wartość `0`, ponieważ jest to wartość fałszywa. Jeżeli więc pierwsza wartość dała wartość `false` jest ona zwracana jako wynik.

W skrócie:

> Zwróć pierwszą wartość, gdy jest fałszywa, w innym wypadku zwróć drugą wartość.

Zauważ, że nie są zwracane wartości `true` lub `false`. No chyba, że stoją one po którejś stronie znaku. Zawsze zwracana jest jedna z wartości podstawionej do operatora `AND`.

Polecam przejrzeć więcej przypadków, ponieważ nie jest to na początku takie intuicyjne:

```js
console.log(false && 'Two'); // false
console.log('One' && false); // false
console.log(-1 && 0); // 0
console.log(null && 'Two'); // null
console.log('Two' && null); // null
```

Tam gdzie pierwsza wartość po konwersji mogła dać wartość `false` , zwracana jest pierwsza wartość. Gdy pierwsza wartość po konwersji daje `true` zwracana jest druga wartość. Tak działa operator `AND`, pełni dwie funkcje. Zwraca wartości `boolean` gdy operuje na takich wartościach. Lub zwraca konkretne wartości, gdy operuje na innych wartościach niż `boolean`.

## <span id="operator-logiczny-or">Operator logiczny `OR`</span>

Operator `OR` podobnie jak operator `AND` również ma podwójne działanie, przyjrzyjmy się jego standardowemu działaniu.

Gdy operatora użyjemy razem z wartościami `boolean`, również zwróci nam wartość `boolean`:

```js
console.log(100 > 5 || 1 < 10); // true
console.log(100 > 5 || 1 > 10); // true
console.log(100 < 5 || 10 > 1); // true
console.log(1 > 100 || 0 > 1); // false
```

W tym kodzie widzimy, że operator zawsze zwraca `true` gdy przynajmniej jedna wartość jest `true`. Gdy obie wartości są `false` dopiero wtedy zwraca wartość `false`. W naszym kodzie jest to ostatni przypadek, gdzie oba warunki są nieprawidłowe.

Zobaczmy bardziej przejrzysty kod, do którego wstawiamy już wartości typu `boolean`:

```js
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false
```

Jak widzimy, to działanie jest identyczne, jak w wielu innych językach programowania. Wystarczy jedna wartość `true`, aby otrzymać `true`. Jeżeli obie wartości są `false` to otrzymamy wtedy `false`.

Zobaczmy jednak jak działa operator logiczny `OR`, gdy pracujemy na innych wartościach niż `boolean`:

```js
console.log('boo' || 'foo'); // 'boo'
console.log(0 || true); // true
```

Gdy pierwsza wartość będzie wartością prawdziwą, zwrócona zostanie ta pierwsza wartość. Gdy natomiast pierwsza wartość jest fałszywa, zwracana jest druga wartość.

Jeszcze krócej:

> Zwróć pierwszą wartość, gdy jest prawdziwa, w innym wypadku zwróć drugą.

Pamiętajcie, że tak jak przy operatorze `AND` otrzymujemy jedną z dwóch wartości podstawioną do równania. Nie otrzymujemy typu `boolean` jako wynik, chyba że taka wartość `boolean` także została użyta przy porównaniu.

Porównamy to wszystko na większej ilości przykładów:

```js
console.log(false || 'Two'); // 'Two'
console.log('One' || false); // 'One'
console.log(-1 || 0); // -1
console.log(null || 'Two'); // 'Two'
console.log('Two' || null); // 'Two'
```

Tam, gdzie pierwsza wartość była prawdziwa, tam została zwrócona pierwsza wartość, jeżeli nie, to zwrócona została wartość druga.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- operator logicznej negacji konwertuje wartości na typ `boolean` ale odwracając wartość

- podwójnie użyty operator logicznej negacji konwertuje wartości na typ `boolean` tak samo jak funkcja `Boolean()`

- gdy operator `AND` pracuje na wartościach `boolean` sam jako wynik zwraca typ `boolean`

- gdy operatora `AND` pracuje na innych wartościach niż `boolean` zwraca jedną z tych wartości:

  > Zwróć pierwszą wartość, gdy jest fałszywa, w innym wypadku zwróć drugą wartość.

- gdy operator `OR` pracuje na wartościach `boolean` sam jako wynik zwraca typ `boolean`

- gdy operatora `OR` pracuje na innych wartościach niż `boolean` zwraca jedną z tych wartości:

  > Zwróć pierwszą wartość gdy, jest prawdziwa, w innym wypadku zwróć drugą.

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
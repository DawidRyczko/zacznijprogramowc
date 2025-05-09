---
title: "Instrukcja `if` w JavaScript: Szybki Kurs #17"
description: "Omówienie instrukcji warunkowej if w JavaScript. Operatory logiczne w instrukcji if. Różne przypadki użycia instrukcji if."
date: 2025-03-06
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Instrukcja `if`](#instrukcja-if)
* [Operatory logiczne](#operatory-logiczne)
* [Inne przypadki](#inne-przypadki)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="instrukcja-if">Instrukcja `if`</span>

W JavaScript jest wiele sposobów na sprawdzenie warunków. Służą do tego różnego rodzaju instrukcje warunkowe. Poznaliśmy też operatory logiczne jak AND i OR, a także poznamy kolejne operatory. Ten dział będzie o sposobach na sterowanie programem.

Podstawową instrukcją warunkową w JavaScript jest instrukcja `if`:

```js
if (true) {
  console.log('it works!')
}
```

Taka sama lub podobna instrukcja warunkowa występuje w prawie każdym języku programowania. Do instrukcji `if` możemy wstawić każdą wartość, jeżeli nie jest ona typu `boolean` zostanie przekonwertowana na typ `boolean` zgodnie z tabelą wartości fałszywych. Jeżeli wstawiona wartość okaże się `true`
instrukcja w środku bloku zostanie wykonana.

Możemy także w instrukcji warunkowej wykonać warunek `else`:

```js
if (false) {
  console.log('not printed')
} else {
  console.log('printend')
}
```

Warunek `else` zostanie wykonany, gdy wartość w instrukcji okaże się `false`. Wtedy oczywiście pierwsza instrukcja `if`
nie jest wykonywana.

Możemy także zbudować instrukcję `if` w zwiększą ilością warunków:

```js
const value = Math.floor(Math.random() * 4) + 1;
if (value === 1) {
  console.log('First condition:', value);
} else if (value === 2) {
  console.log('Second condition:', value);
} else if (value === 3) {
  console.log('Third condition:', value);
} else {
  console.log('Last condition:', value);
}
```

W tym przypadku w zależności od wylosowanej liczby wykona się blok `if`, `else if` lub `else` po wykonaniu się któregoś bloku od razu wykonywanie dalszej instrukcji `if` zostaje zakończone.

## <span id="operatory-logiczne">Operatory logiczne</span>

Warunki wstawiane w instrukcję `if` mogą być bardziej skomplikowane niż zwykłe sprawdzenie pojedynczej wartości:

```js
if (random === 1 || random === 2) {
  console.log('Random is 1 or 2: ', random)
}
```

Możemy używać wszelkich operatorów porównania czy logicznych. Również wywołać funkcję, która zwróci jakaś wartość.

Warunki mogą być też bardzo skomplikowane:

```js
if (random === 1 || random === 2 && random > 0 || random < 4) {
  console.log('It works?')
}
```

Taki kod niestety nie jest czytelny, również nie do końca jasna jest kolejność wykonywania operatorów. Starajmy się raczej unikać takich wyrażeń.

Jeżeli już musimy użyć takiego wyrażenia, najlepiej grupować warunki w okrągłe nawiasy:

```js
if ((random === 1 || random === 2) && (random > 0 || random < 4)) {
  console.log('It works?')
}
```

lub nawet wydzielić poszczególne logiczne porównania do funkcji i wywołać jako czytelne nazwy funkcji.

## <span id="inne-przypadki">Inne przypadki</span>

Samo wyrażenie `if` jest bardzo proste w działaniu. Można jednak spotkać wiele różnych zapisów tego wyrażenia:

```js
if (true) console.log('works')
```

Możemy pozbyć się nawiasów klamrowych. Jest to bardzo atrakcyjny i krótki zapis. Jednak zalecanym zapisem jest użycie nawiasów klamrowych dla czytelności.

Możemy też zbudować taki warunek:

```js
if (number === (1 || 2)) {
  console.log('It is always 1:', number);
}
```

Ten zapis ma jednak pewien problem. W tym przypadku zawsze sprawdzimy tylko i wyłącznie porównanie do wartości `1`. Jak pamiętamy z operatorów logicznych przy warunku `OR` gdy sprawdzane są inne wartości niż `boolean`, to gdy pierwsza z nich jest prawdziwa, zwracana jest jako wartość. Więc tak
naprawdę to porównanie zawsze sprawdza, czy `number === 1`:

```js
if (number === 1) {
  console.log('It is 1');
}
```

Poprzedni kod wykonuje więc tylko i wyłącznie takie sprawdzenie, nigdy nie sprawdzi, czy zmienna `number` może być równa
2.

Warto zwrócić uwagę przy zagnieżdżaniu warunków `if`:

```js
if (number > 1) {
  if (number < 3) {
    console.log('Print when number is two: ', number);
  }
}
```

W tym przypadku mamy zagnieżdżone w sobie dwie instrukcje `if`.

Zazwyczaj takie dwa `ify` możemy ze sobą połączyć:

```js
if (number > 1 && number < 3) {
  console.log('Print when number is two: ', number);
}
```

Dwa zagnieżdżone `ify` możemy ze sobą połączyć za pomocą operatora `AND`. Mniej kodu i od razu bardziej czytelnie.

Ciekawym przykładem jest to, że w instrukcji `if` możemy stworzyć przypisanie:

```js
let x = false;
if (x = true) {
  console.log('Assignment: ', x);
}
```

Nie jest to przypadek kodu, który jest czytelny. Moim zdaniem takie przypisanie lepiej wykonać przed instrukcją `if`. Głównie dlatego, że przyjęło się, że w instrukcji `if` wykonujemy porównania, ten zapis może nas wprowadzić w mylne myślenie, iż jest to porównanie, a nie przypisanie.

Jeśli jednak już chcemy posłużyć się takim wyrażeniem:

```js
if ((x = true)) {
  console.log('Assignment: ', x);
}
```

Lepiej będzie dodatkowo ująć je w nawiasy okrągłe. W ten sposób dokładnie wyróżnimy przypisanie i zaznaczymy, że warunek będzie sprawdzony dopiero po wykonaniu przypisania.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- najprostszą instrukcją warunkową jest `if` w którym do dyspozycji mamy jeszcze `if else` oraz `else`

- do instrukcji `if` możemy wstawić różne wyrażenia, ostatecznie będą one wykonane i sprowadzone do wartości `boolean`

- przy instrukcji `if` warto dbać o czytelność

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
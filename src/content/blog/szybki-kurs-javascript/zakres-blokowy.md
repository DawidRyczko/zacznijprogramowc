---
title: "Zakres blokowy w JavaScript: Szybki Kurs #26"
description: "Omówienie zakresu blokowego w JavaScript przed i po ES6 (ECMAScript 6)."
date: 2025-02-25
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Zakres blokowy](#zakres-blokowy)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="zakres-blokowy">Zakres blokowy</span>

Kolejnym zakresem, który sobie omówimy, jest zakres blokowy. Przed wersją `ES6` zakres blokowy praktycznie nie istniał, zobaczmy najprostszy przypadek kodu:

```text
{
  var x = '1';
  const y = '2';
  let z = '3';
}
```

Stworzyłem blok za pomocą dwóch nawiasów klamrowych. Tworzenie takich bloków kodu jest możliwe, ale raczej na co dzień nie spotkacie się z takimi blokami kodu w aplikacjach JavaScript.

Gdy wypiszemy te zmienne do konsoli:

```text
console.log(x); // 1
// console.log(y); // error
// console.log(z); // error
```

Widzimy, że mamy dostęp tylko do zmiennej `x` natomiast pozostałe zmienne, które zadeklarowane są za pomocą `const`
i `let` nie są dostępne. Oznacza to, że zmienne zadeklarowane za pomocą `var` nie respektują zakresu blokowego. Zmienna `var` w tym przypadku jest zadeklarowana globalnie w obiekcie `window`. Zakres bloku nie ma dla niej znaczenia.

Naprawiono to dopiero w ESCMAScript 6 wprowadzając deklaracje `const` i `let`.

Oczywiście takiego kodu blokowego raczej nie piszemy, a jak już używamy `let` i `const`. Jednak warto zwrócić uwagę, że z `var` są także problemy w innych blokach kodu:

```text
for (var i = 0; i < 5; i++) {
  console.log(i) // 1, 2, 3, 4
}
console.log(i) // 5
```

Jest to jeden z najbardziej znanych przykładów braku zakresu bloku dla zmiennych `var`. Zadeklarowana zmienna `var` na potrzeby funkcji nadal była dostępna spoza tego bloku. Programista przez nieuwagę w dalszej części mógł jeszcze raz użyć zmiennej `i`. Rozwiązaniem jest tutaj użycie
deklaracji `let`.

Problemy te dotyczą oczywiście innych instrukcji blokowych jak `if`, `while` :

```text
if (true) {
  var a = 'bar';
  const b = 'foo';
}
console.log(a)
// console.log(b) // error
```

Tutaj nadal mamy dostęp do zmiennej `a` zadeklarowanej w bloku `if`. Dlatego najlepszą opcją jest nieużywanie zmiennych deklarowanych za pomocą `var`. Dla tych zmiennych zakres blokowy nie istnieje i wpadają one zawsze do obiektu globalnego i są dostępne globalnie.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- zmienna `var` nie przestrzega zakresu blokowego, używanie `var` w blokach jest jednoznaczne z tworzeniem zmiennych globalnych
- dopiero `let` i `const` wprowadzone w ECMAScript 6 przestrzegają zakresu blokowego, między innymi takich jak `if`
  oraz `for`
- dobra rada nie używamy `var`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
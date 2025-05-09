---
title: "Operator nullowej koalescencji w JavaScript: Szybki Kurs #20"
description: "Omówienie operatora nullowej koalescencji (??) w JavaScript."
date: 2025-03-03
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Operator nullowej koalescencji](#operator-nullowej-koalescencji)
* [Różnica do OR i teranry](#roznica-do-or-i-teranry)
* [Czego nie robić z tym operatorem](#czego-nie-robic-z-tym-operatorem)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="operator-nullowej-koalescencji">Operator nullowej koalescencji</span>

Operator nullowej koalescencji albo też operator nullowego scalania, albo jeszcze lepiej po angielsku Nullish Coalescing Operator jest reprezentowany przez dwa znaki zapytania `??`. Operator ten pochodzi ze specyfikacji ECMAScript 2020. Jeżeli chcecie z niego korzytać, upewnijcie się, że ma wsparcie
przeglądarki lub też posiadacie stosowane skrypty polyfills.

Przyjrzyjmy się pierwszemu przykładowi:

```js
const value2 = 'foo' ?? undefined;
console.log(value2) // 'foo'

const value1 = null ?? 'boo';
console.log(value1) // 'boo'
```

Zadaniem operatora jest sprawdzanie wartości po lewej stronie. Tak długo jak nie jest ona `null` lub `undefined` wartość ta będzie zwracana przez operator. Jeżeli okaże się, że lewa strona ma wartość `null`  lub `undefined` zwrócona zostanie wartość po prawej stronie.

Co się stanie gdy obie wartości będą `null` lub `undefined`:

```js
console.log(null ?? undefined) // undefined
console.log(undefined ?? null) // null
```

Gdy lewa wartość jest `null` lub `undefinde` od razu zwraca, jest wartość po prawej stronie bez jej sprawdzenia. Dlatego prawa strona tego operatora powinna nam najczęściej służyć do stworzenia jakiejś domyślnej wartości:

```js
const message = {
  greetings: null,
}
console.log(message.greetings ?? 'Have a nice day!');
```

Takim przypadkiem może być praca z obiektem `message`, jeżeli nie będzie zawierał pozdrowień, zwrócimy domyślną wartość.

Operator ten jest świetną opcją do skrócenia naszego kodu i zwrócenia konkretnej wartości, gdy jedna jest `null`
lub `undefined`. Zastępuje on operator logiczny OR lub ternary operator, są jednak pewne różnice.

## <span id="roznica-do-or-i-teranry">Różnica do OR i teranry</span>

Wspomniałem, że operatora ten sprawdza, czy lewa strona jest `null` lub `undefined`. Jest to bardzo ważne, bo operator ten jak wiele innych operatorów nie pracuje na wartościach fałszywych. Operator ten pracuje dokładnie tylko na wartościach nullowych, czyli  `null` oraz `undefined`:

```js
const greetings = '';
console.log(greetings ?? 'Have a nice day!'); // ''
console.log(greetings ? greetings : 'Have a nice day!'); // 'Have a nice day!'
console.log(greetings || 'Have a nice day!'); // 'Have a nice day!'
```

Mamy zmienną `greetings`, która jest pustym znakiem, czyli wartością fałszywą. Dla nullowego operatora jest to jakaś wartość i to ona zostanie zwrócona, z kolei dla operatora OR i ternary operatora zostaną zwrócone wartości domyślne, ponieważ te dwa operatory bazują na wartościach fałszywych.

Jest to bardzo istotne i różnica w działaniu jest bardzo duża. W końcu mamy w JavasScript operator, który dokładnie rozpoznaje wartości `null` i `undefined` i nie pracuje na wszystkich wartościach fałszywych.

```js
console.log(false ?? 'Have a nice day!'); // false
```

Dlatego musimy go używać z większą uwagą i spodziewać się, że przepuści inne wartości fałszywe oprócz `null`
oraz `undefind`. Do tej pory za pomocą instrukcji warunkowych i innych operatorów, takie wartości także były odsiewane.

## <span id="czego-nie-robic-z-tym-operatorem">Czego nie robić z tym operatorem</span>

Gdy będziemy tworzyć różne kombinacje, z tym operatorem należy uważać:

```js
console.log(null || undefined ?? "foo") // error
```

Przy takim połączeniu JavaScript zgłosi nam błąd. Takie zestawienie operatorów jest przede wszystkim problematyczne, jeśli chodzi o pierwszeństwo wykonania.

Dlatego zaleca się użycie dodatkowych nawiasów:

```js
console.log((null || undefined) ?? "foo") // 'foo'
console.log(('boo' && null) ?? "foo") // 'foo'
```

Ujęcie dodatkowych operatorów w nawiasy okrągłe nie tylko poprawia zgłaszany błąd przez JavaScript, ale także zwiększa czytelność. Jeżeli oczywiście możemy mówić o czytelności przy łączeniu wielu operatorów.

## <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- operator nullowego scalania jest reprezentowany przez dwa znaki zapytania
- lewa strona jest zwracana, gdy jest różna od `null` lub `undefined` w innym przypadku zwracana jest prawa strona
- operator nullowy sprawdza tylko wartości `null` i `undefined`, nie sprawdza wartości fałszywych w porównaniu do operatorów logicznych OR i AND oraz ternary operatora
- przy łączeniu z innymi operatorami stosujemy nawiasy

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
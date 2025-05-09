---
title: "Co to jest use strict / strict mode w JavaScript?"
description: "Omówienie trybu ścisłego (strict mode) w JavaScript: jego zalety, działanie i sposób włączania."
date: 2021-01-04
tags: [ "javascript", "slowniczek-java-script" ]
---

Strict mode, czyli tak zwany tryb ścisły, został wprowadzony do JavaScript w ECMAScript 5. Tryb ten nie jest domyślny i,
aby go włączyć, należy użyć polecenia `use strict`. Ponieważ JavaScript musi zachowywać kompatybilność ze wcześniejszymi
wersjami, tryb ten jest opcjonalny. Gdyby zmiany, które wprowadza tryb ścisły, byłyby wprowadzone do języka
bezpośrednio, wiele stron internetowych mogłoby przestać działać.

Zadaniem strict mode jest poprawa wielu problemów i ukrytych błędów JavaScript, które są zaimplementowane w tym języku.
Tryb ten pozwala unikać błędów, poprawia bezpieczeństwo kodu, poprawia wydajność i trochę go unowocześnia:

* tryb ścisły eliminuje tak zwane ciche błędy poprzez ich widoczną sygnalizację. Na przykład, mogliśmy stworzyć zmienną
  bez użycia deklaracji jak `var`, `let`, `const`:

  ```javascript
  myVariable = 'foo';
  ```
* bez trybu ścisłego możemy przypisać wartość do `undefined`:

  ```javascript
  var undefined = 5;
  ```
* możemy też tworzyć funkcje z takimi samymi nazwami parametrów:

  ```javascript
  function sum(a, a, c) {
  return a + a + c;
  }
  ```

Taki kod bez trybu ścisłego w JavaScript jest poprawny. W trybie ścisłym dostaniemy konkretne informacje o błędach i
nasz kod będzie musiał być naprawiony. W JavaScript jest bardzo dużo tak dziwnych problemów, które tryb ścisły wyklucza.

* dzięki trybowi ścisłemu kod może być lepiej optymalizowany przez przeglądarki, co poprawia wydajność.
* tryb ścisły wprowadza także zabronione słowa kluczowe dla przyszłych wersji języka, na przykład nie możemy użyć
  `interface`, `package`, `private` jako nazwy zmiennych.
* kod w trybie ścisłym jest bezpieczniejszy.
* tryb ścisły poprawia czytelność kodu, sygnalizację błędów, usprawnia podstawowe mechanizmy JavaScript. W skrócie,
  poprawia błędy języka JavaScript, które powstały w czasie jego implementacji.

Ponieważ lista rzeczy, które poprawia strict mode, jest bardzo długa, muszę Was odesłać
do [dokumentacji](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) lub mojego kursu
JavaScript. Tutaj chciałem tylko omówić, czym jest tryb ścisły.

Żeby go włączyć, na początku kodu wystarczy użyć deklaracji:

```javascript
'use strict';
```

Możliwe jest użycie także tylko dla funkcji:

```javascript
function strict() {
    'use strict';
}
```

Może się przydać, gdy pracujemy w bardzo starym kodzie i nie chcemy włączać trybu ścisłego dla całego kodu, ale tylko
dla tej nowej części, którą musimy dopisać.

W ES6 pojawiły się klasy i moduły, które domyślnie pracują w trybie ścisłym. Także każdy współczesny framework pracuje w
trybie ścisłym. Zazwyczaj więc nie musisz się martwić i dopisywać deklaracji `use strict` do frameworka, jak Angular,
React czy Vue.

Jeżeli jednak będziesz pisał kod bez modułów, klas i frameworka, czyli czysty JavaScript, zadbaj o to, aby pojawiła się
deklaracja `use strict` na początku Twojego skryptu.

Należy też pamiętać, że bardzo stare wersje przeglądarek, jak IE9, mogą nie obsługiwać tego trybu. Współcześnie ten
problem nie powinien nas jednak spotkać. Teoretycznie jednak taka sytuacja może się zdarzyć i nasz kod będzie po prostu
pracował jak dawniej, bez trybu ścisłego.

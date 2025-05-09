---
title: "Co to jest Polyfilling?"
description: "Wyjaśnienie koncepcji polyfillingu w JavaScript i jego zastosowania."
date: 2020-11-05
tags: [ "javascript", "slowniczek-java-script" ]
---

Co jakiś czas JavaScript rozwija się i do języka przybywają nowe funkcjonalności. Niestety producenci przeglądarek nie
zawsze nadążają za tymi nowościami lub też nie chcą już nadążać. Często więc dochodziło do sytuacji, gdy nie można było
korzystać z natywnych rozwiązań języka JavaScript w przeglądarce, ponieważ rozwiązanie to nie było zaimplementowane.

Drugim problemem było wspieranie starszych przeglądarek, które nie były już rozwijane, ale wciąż popularne. Chcąc zatem
pisać kod w najnowszej wersji JavaScript, trzeba było jakoś obejść ten problem. Dlatego powstał polyfilling.

Polyfilling jest to kod, który pozwala używać funkcjonalności w przeglądarce, nawet gdy nie jest ona natywnie
zaimplementowana przez producenta.

Niemalże każdy framework musi korzystać ze skryptów polyfills do zapewnienia kompatybilności ze starszymi przeglądarkami
jak IE10 i niżej. Dzięki temu możemy korzystać z nowoczesnego JavaScript i pisać aplikacje dla starszych przeglądarek.

Gdy pojawiła się wersje ES5 dla JavaScript metoda filter dla tablic nie była wspierana przez przeglądarkę IE8. Z tego
powodu powstał polyfill, który pozwalał używać metody filter.

Nie będę implementował kodu, ale pokażę ogólną idee:

```javascript
if (!Array.prototype.filter) {
    Array.prototype.filter = function () {
        // implementacja
    };
}
```

Jeżeli prototyp Array nie posiadał metody filter, oznaczało to, że przeglądarka nie wspiera tej funkcjonalności. Dlatego
do prototype była dopisywana funkcja, której miała całą implementację odpowiedzialną za filtrowanie.

Mając taki dodatkowy skrypt w swoim kodzie, można było wywoływać na tablicach metodę filter nawet w starszych
przeglądarkach.

Warto zajrzeć też na stronę MDN gdzie znajdziecie cały gotowy skrypt polyfill dla metody filter.

Samo pojęcie polyfilling stworzył Remy Sharp, a jego post możecie przeczytać na jego blogu tutaj.

Publikacja: listopad 05, 2020
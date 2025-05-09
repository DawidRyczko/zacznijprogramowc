---
title: "Co to jest Babel?"
description: "Wyjaśnienie działania Babel jako transpilatora JavaScript i jego roli we wspieraniu starszych przeglądarek."
date: 2020-11-12
tags: [ "javascript", "slowniczek-java-script" ]
---

Babel przekształca kod JavaScript do takiej postaci, aby był kompatybilny ze wszystkimi przeglądarkami, a także
zadziałał na starszych wersjach przeglądarek. W czasie kompilacji Babel zmienia składnię kodu do kompatybilnej postaci,
jest transpilatorem kodu JavaScript.

Babel powstał na potrzeby nowej wersji JavaScript ES6 i wyżej. Z jego pomocą możemy używać funkcje strzałkowe w
starszych wersjach przeglądarek:

```javascript
[1, 2, 3].map((n) => n + 1);
```

Taka funkcja strzałowa nie jest wspierana przez starsze wersje Internet Explorer, Babel kod ten zmieni do takiej
postaci:

```javascript
[1, 2, 3].map(function (n) {
    return n + 1;
});
```

Kod taki jest już kompatybilny ze starszą wersją JavaScript ES5, która była wspierana przez większość przeglądarek.

Babel tak naprawdę zajmuje się jedynie transformacją kodu do czytelnej postaci przez przeglądarki. Nie zajmuje się
dodawaniem funkcjonalności, które w ogóle nie są wspierane. Za to zadanie odpowiadają skrypty polyfill. Jednak sam Babel
posiada dodatkowe rozszerzenie i może dodawać polyfill do naszego kodu.

Podobnie jak polyfills Babel pozwala nam pisać kod w nowoczesnej postaci i korzystać z funkcjonalności, które nie są
wspierane przez przeglądarki.

Więcej informacji znajdziecie oczywiście na stronie [Babel](https://babeljs.io/).
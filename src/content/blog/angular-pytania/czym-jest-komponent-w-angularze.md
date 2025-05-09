---
title: "Czym jest komponent w Angularze?"
description: "Komponenty w Angularze służą do budowania UI aplikacji. Jest to jedna z głównych składowych Angulara."
date: 2020-03-04
tags: [ "angular", "angular-pytania" ]
---

Komponenty w Angularze służą do budowania UI aplikacji. Jest to jedna z głównych składowych Angulara. Każda aplikacja w Angularze zaczyna się od jednego komponentu, kolejne tworzą drzewo komponentów.

W Angularze komponenty tworzą drzewo komponentów.

Każdy komponent posiada klasę, plik HTML i plik stylów. Opcjonalnie komponent może posiadać plik testów. Są też komponenty inline, które zbudowane są w jednym pliku.

Komponent służy do pokazywania danych i interakcji z użytkownikiem.

Przykładowy komponent:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Some example title'
}
```

Przykładowy komponent inline:

```typescript
@Component({
  selector: 'app-inline',
  template: ` <h1>Hello World</h1> `,
  styles: ['h1 { font-weight: normal; }'],
})
export class AppComponentInline {
  title = 'Some example title'
}
```

Każdy komponent musi znaleźć się w module aplikacji aby można było go używać.

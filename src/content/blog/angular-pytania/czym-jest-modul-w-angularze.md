---
title: "Czym jest moduł w Angularze?"
description: "Aplikacje napisane w Angularze posiadają przynajmniej jeden moduł. Jest to serce aplikacji, które zbiera w sobie wszystkie składowe Angulara jak serwisy, komponenty, dyrektywy, pipes inne moduły."
date: 2020-03-06
tags: [ "angular", "angular-pytania" ]
---

Aplikacje napisane w Angularze posiadają przynajmniej jeden moduł. Jest to serce aplikacji, które zbiera w sobie wszystkie składowe Angulara jak serwisy, komponenty, dyrektywy, pipes inne moduły. Wszystko co jest załączone w module aplikacji będzie skompilowane do wersji produkcyjnej.

W Angularze jest przynajmniej jeden moduł.

Aplikacja może być podzielona na kilka modułów. Podział na moduły jest przydatny przy podziale aplikacji na poszczególne funkcje. Możemy mieć oddzielny moduł logowania, oddzielny moduł do wyświetlania użytkowników etc.

Aplikacja w Angularze może mieć kilka modułów.

W module deklarujemy najważniejsze składowe Angulara:

*   komponenty w tablicy `declaration`
*   serwisy w tablicy `providers`
*   inne moduły w tablicy `imports`
*   komponent startowy podajemy w tablicy `bootstrap`

Przykładowy moduł

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Moduł jest zwykłą klasą TypeScript, ale posiada rozbudowany dekorator, który służy do jego konfiguracji.

---
title: "Czym jest serwis w Angularze?"
description: "Serwis w Angularze jest zwykłą klasą TypeScript. Opatrzony jest dodatkowym dekoratorem, który może mieć różne właściwości konfiguracyjne."
date: 2020-07-09
tags: [ "angular", "angular-pytania" ]
---
Serwis w Angularze jest zwykłą klasą TypeScript. Opatrzony jest dodatkowym dekoratorem, który może mieć różne właściwości konfiguracyjne. Serwis może działać jako singleton dla całej aplikacji lub może zostać powołany dla konkretnego komponentu.

W najnowszych wersjach Angulara, serwis opatrzony jest dekoratorem w takiej postaci:

```typescript
@Injectable({
  providedIn: 'root',
})
export class LoggerService {}
```

Właściwość `providedIn: 'root'` oznacza, że serwis będzie dostępny w całej aplikacji dla każdego komponentu. Taki serwis powstaje i utrzymywany jest przez całe działanie aplikacji. Dzięki takiemu serwisowi możemy utrzymywać stan aplikacji czy wspomagać komunikację między komponentami.

Jeżeli chcemy uruchomić serwis tylko dla komponentu:

```typescript
@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  providers:  [ LoggerService ]
})
export class AppComponent {
  constructor(private service: LoggerService ) { }
}
```

W dekoratorze Component wstawiamy serwis we właściwości `providers`. Instancja serwisu, która powstanie będzie dostępna tylko dla tego komponentu i jego dzieci.

Serwisy wstrzykuje się zawsze przez konstruktor.

## Do czego potrzebne są serwisy w Angularze?

*   wykonują pracę dla komponentów
*   komunikują się z REST API
*   zapewniają komunikację między komponentami
*   pozwalają na stworzenie stanu aplikacji

Serwisy w Angularze są back-end’em aplikacji webowej :-).

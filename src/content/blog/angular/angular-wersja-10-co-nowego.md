---
title: "Angular wersja 10 - co nowego?"
description: "Przegląd nowości i zmian w Angularze 10. Nowy Date Range Picker, tryb strict, aktualizacja zależności i inne."
date: 2020-06-25
tags: [ "angular", "frontend"  ]
---
Właśnie została wydana nowa 10 wersja Angulara. Nie ma w niej tyle zmian co w wersji 9. Dodatkowo jeszcze w tym roku ma pojawić się jeszcze jedna *major* wersja o numerze 11. Głównym założeniem jest utrzymanie synchronizacji z całym środowiskiem JavaScript.

Co roku wypuszczane są okrągłe wersje Angulara, tak też ma się zadziać i tego roku. Gdy wszyscy opóźnienia zrzucają na pandemię, developerzy Angulara bronią swoich terminów :).

## Co nowego w Angularze w wersji 10?

1.  Nowy komponent *Date Range Picker* z Angular Material.  
    Jego działanie możemy podejrzeć tutaj: [https://stackblitz.com/angular/nknyovevygv?file=src%2Fapp%2Fdate-range-picker-overview-example.html](https://stackblitz.com/angular/nknyovevygv?file=src%2Fapp%2Fdate-range-picker-overview-example.html)

2.  Ostrzeżenie przed importami CommonJs w dependency  
    Gdy podczas budowania aplikacji okaże się, że gdzieś używany jest CommonJs otrzymasz ostrzeżenie i podpowiedź co możesz z tym zrobić.

3.  Tworzenie projektu w wersji *strict*  
    Teraz tworząc projekt w Angularze możesz użyć nowej właściwości `--strict`, dokładne polecenie wygląda tak:

```shell
ng new --strict
```

Dzięki tej opcji zostanie stworzony projekt z nowymi ustawieniami, których zadaniem jest ścisłe przestrzeganie reguł i optymalizacja aplikacji. Oto co zostanie włączone:

*   strict mode dla TypeScript
*   sprawdzanie typów dla widoku HTML
*   zredukowany bundle do 75%
*   konfiguracja lintera zakazująca używanie typu `any`
*   bardziej zaawansowana optymalizacja tree-shaking

4.  Podniesienie wersji dla zależności

   *   TypeScript do wersji 3.9
   *   TSLib do wrersji 2.0
   *   TSLint do wersji 6  
       Przebudowano także plik konfiguracyjny dla TypeScript `tsconfig.json`

5.  Nowa konfiguracja dla domyślnie obsługiwanych przeglądarek.  
    Kilka naprawdę starych przeglądarek wypadło z `browserslist`.

    Trzeba także zwrócić uwagę, że projekty nie budują się już do ES5. Jeżeli chcemy wspierać starsze przglądarki jak IE musimy sami o to zadbać dodając je do pliku `.browserslistrc`.

## Jak wykonać update do Angular 10?

Jak zwykle możemy skorzystać z narzędzia na stronie [https://update.angular.io/](https://update.angular.io/).

Lub po prostu wywołać komendę:

```shell
ng update @angular/cli @angular/core
```

Więcej informacji o Angularze w wersji 10:

[https://next.angular.io/guide/updating-to-version-10](https://next.angular.io/guide/updating-to-version-10)

[https://blog.angular.io/version-10-of-angular-now-available-78960babd41](https://blog.angular.io/version-10-of-angular-now-available-78960babd41)

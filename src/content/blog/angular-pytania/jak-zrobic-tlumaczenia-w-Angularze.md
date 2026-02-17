---
title: "Jak zrobić tłumaczenia w Angularze?"
description: "Co to są pliki xlf, skrót i18n i jak działa lokalizacja w Angularze? "
date: 2026-02-08
tags: [ "angular", "angular-pytania" ]
---

## Wstęp

Skrót **i18n** oznacza internationalization w języki angielskim. Jest to proces dostosowania aplikacji do różnych
języków i regionów. Sam proces lokalizacji nie dotyczy tylko języka, ale także formatowania dat, walut czy
liczb.

Angular posiada swój wewnętrzny pakiet do obsługi lokalizacji. Jest to biblioteka `@angular/localize`, która została
wprowadzona w wersji 9 wraz z nowym silnikiem do kompilacji IVY. Efektem pracy tej biblioteki są pliki `xlf`. Są to
pliki w formacie XML, które zawierają informacje o tłumaczeniach i formatowaniu dla różnych języków.

## Lokalizacja w Angularze

Aby dodać tłumaczenia do aplikacji w Angularze, musimy dodać bibliotekę `@angular/localize` do projektu. Do tego celu
najlepiej posłużyć się narzędziem Angular CLI:

```bash
ng add @angular/localize
```

Instalacja zmodyfikuje nam kilka plików w projekcie, ale to nie koniec. Pozostała konfiguracja należy do nas. Na
początku musimy ustalić, jaka jest nasza główna i podstawowa lokalizacja aplikacji. Musimy ustalić ID dla wybranej
lokalizacji, co niekoniecznie jest takie proste i oczywiste.

W różnych krajach możemy bowiem mówić w tym samym języku, na przykład:

- Francuski - Francja - fr-FR
- Francuski - Kanada - fr-CA
- Niemiecki - Niemcy - de-DE
- Niemiecki - Austria - de-AT

ID lokalizacji składa się z dwóch elementów `{language_id}-{locale_extension}`. W pierwszej części podajemy symbol
języka na przykład: `fr`, `de` czy `pl`. Jeżeli chcemy określić rozszerzenie lokalizacji, czyli region dla
tego języka dodajemy symbol regionu na przykład: `fr-CA` czy `de-AT`.

Jeżeli nie podamy symbolu regionu, to Angular przyjmie domyślny region dla danego języka. Na przykład dla języka
angielskiego to `en-US`, dla francuskiego `fr-FR` i dla niemieckiego `de-DE`. Nie zawsze jest to oczywiste, jaki region
przypisany jest to języka, warto więc określać region szczegółowo, jeżeli chcemy mieć określone formatowanie dat, walut
czy liczb.

Na szczęście dla języka `pl` mamy tylko jeden region. W pliku `angular.json` ustalamy podstawową lokalizację dla naszej
aplikacji:

```json
{
  "projects": {
    "nazwa-aplikacji": {
      "i18n": {
        "sourceLocale": "pl"
      }
    }
  }
}
```

Należy pamiętać, że domyślna lokalizacja w Angularze to `en-US`. Bez tej zmiany daty, waluty czy liczby będą formatowane
jak w USA: np. `$22.00` zamiast `22,00 USD`.

### Dodawanie tłumaczeń

W tym tekście pokażę tylko podstawową pracę z oznaczeniem tekstu do tłumaczeń za pomocą atrybutu `i18n`. Ponieważ
wystarcza to tylko do prostych tekstów umieszczonych w elementach HTML, odsyłam Was do oficjalnej strony
Angulara: [https://angular.dev/guide/i18n/prepare](https://angular.dev/guide/i18n/prepare) gdzie znajdziecie bardziej
zaawansowane techniki do pracy z tłumaczeniami.

Mamy prosty tekst w aplikacji, który chcemy przetłumaczyć:

```html
<h1>Witaj świecie!</h1>
```

Aby to zrobić, musimy dodać atrybut `i18n` do elementu `<h1>`:

```html
<h1 i18n>Witaj świecie!</h1>
```

I to wszystko, prosty przykład i bardzo proste rozwiązanie. Zazwyczaj, napotkane teksty są bardziej dynamiczne,
posiadają zmienne, specjalne formatowania czy wyświetlają się warunkowo. Dlatego odsyłam Was jeszcze raz do oficjalnej
strony Angulara o [i18n](https://angular.dev/guide/i18n/prepare](https://angular.dev/guide/i18n/prepare), jeżeli
chcecie poznać wszystkie techniki.

### Generowanie plików do tłumaczeń

Gdy już oznaczyliśmy teksty do tłumaczeń, czas na wygenerowanie plików `xlf` w których będziemy umieszczać tłumaczenia.

W terminalu w głównym katalogu aplikacji uruchamiamy komendę:

```bash
ng extract-i18n
```

Komenda ta wygeneruje plik o nazwie `messages.xlf` w głównym katalogu aplikacji. Przyjmuje ona także opcjonalne
parametry, które znajdziecie na
tej [stronie](https://angular.dev/guide/i18n/translation-files#extract-the-source-language-file). Dzięki dodatkowym
możemy określić dodatkowe konfiguracje dla generowanego pliku.

Plik, który powstał `messages.xlf`, dotyczy naszej głównej lokalizacji, w tym przypadku `pl`. Jest to ta lokalizacja,
którą ustawiliśmy w pliku `angular.json`. Potrzebujemy zatem pliku dla lokalizacji `en`. W tym celu tworzymy kopię
`messages.xlf` i zmieniamy nazwę na `messages.en.xlf`. Jeżeli chcemy wprowadzić więcej lokalizacji, tworzymy więcej
plików jak `messages.fr.xlf` i `messages.de.xlf`. Nigdy nie zmieniamy nic w pliku głównym `messages.xlf`.

Nasz główny plik `messages.xlf` posiada wszystko, co powinniśmy przetłumaczyć, zostało to wygenerowane z kodu aplikacji.
Każdy element do tłumaczenia znajduje się w `<trans-unit>` z unikalnym identyfikatorem. Sam tekst do tłumaczenia
znajduje się w `<source>`:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
    <file source-language="pl" datatype="plaintext" original="ng2.template">
        <body>
            <trans-unit id="3176754346177457699" datatype="html">
                <source>Witaj świecie!</source> <!-- Tekst do tłumaczenia -->
                <context-group purpose="location">
                    <context context-type="sourcefile">src/app/app.component.html</context>
                    <context context-type="linenumber">1,2</context>
                </context-group>
            </trans-unit>
        </body>
    </file>
</xliff>
```

Aby przetłumaczyć ten tekst, modyfikujemy plik `messages.en.xlf`. Pod elementem `<source>` dodajemy nowy tag
`<target>` z docelowym tłumaczeniem:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
    <file source-language="pl" datatype="plaintext" original="ng2.template">
        <body>
            <trans-unit id="3176754346177457699" datatype="html">
                <source>Witaj świecie!</source>
                <target>Hello World!</target> <!-- Tutaj dodajemy tłumaczenie -->
                <context-group purpose="location">
                    <context context-type="sourcefile">src/app/app.component.html</context>
                    <context context-type="linenumber">1,2</context>
                </context-group>
            </trans-unit>
        </body>
    </file>
</xliff>
```

To wszystko, tak wygląda tłumaczenie w pliku `messages.en.xlf`.

### Uruchomienie aplikacji z tłumaczeniami

W naszym przypadku mamy jeden dodatkowy język, który będzie obsługiwany przez aplikację. Skonfigurujmy aplikację tak,
aby móc ją uruchamiać w tej drugiej lokalizacji.

Do tego celu musimy rozszerzyć konfigurację Angulara w pliku `angular.json`.

```json
{
  "projects": {
    "nazwa-aplikacji": {
      "i18n": {
        "sourceLocale": "pl",
        "locales": {
          "en-US": {
            "translation": "messages.en.xlf"
          }
        }
      }
    }
  }
}
```

Dodajemy właściwość `locales` i w niej dodajemy nową lokalizację `en-US` z plikiem `messages.en.xlf`. Konfiguracja ta
mówi jaką lokalizację obsługujemy i który plik z tłumaczeniami za to odpowiada.

Następnie modyfikujemy sekcję `build` a w niej `configuration`:

```json
{
  "build": {
    // ...
    "configurations": {
      "en-US": {
        "localize": [
          "en-US"
        ]
      }
      // ...
    }
  }
}
```

Dodajemy właściwość `en-US`, a w niej tablicę `localize`. W tej tablicy umieszczamy ID lokalizacji, które chcemy
zbudować dla konfiguracji `en-US`. Zazwyczaj chcemy umieścić tutaj jeden język.

Teraz będziemy mogli posłużyć się komendami:

```bash
ng build --configuration en-US
ng serve --configuration en-US
```

Ostatnim krokiem jest modyfikacja `configuration` w sekcji `serve` w pliku `angular.json`:

```json
{
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "configurations": {
      "en-US": {
        "buildTarget": "my-app:build:development,en-US"
      },
      "production": {
        "buildTarget": "my-app:build:production"
      },
      "development": {
        "buildTarget": "my-app:build:development"
      }
    },
    "defaultConfiguration": "development"
  }
}
```

Dodajemy nową konfigurację `en-US` do zbudowania i uruchamiania aplikacji w tej lokalizacji. W tym przypadku
konfigurujemy uruchomienie aplikacji dla trybu `development`. Skonfigurowanie pozostałych trybów w razie konieczności
pozostawiam Wam.

Pozostaje nam uruchomić aplikację poleceniem:

```bash
ng serve --configuration en-US
```

lub dodać konfigurację do pliku `package.json`:

```json
{
  "scripts": {
    "start-en-US": "ng serve --configuration=en-US"
  }
}
```

## Budowanie aplikacji w kilku lokalizacjach

Gdy uruchomimy proces budowania aplikacji przez komendę `ng build`, to Angular będzie budował aplikację dla wszystkich
skonfigurowanych lokalizacji. W tym przypadku budujemy aplikację dla lokalizacji `en-US` i domyślnej lokalizacji
`pl`.

Otrzymamy dwie skompilowane aplikacje w katalogu `dist` w dwóch różnych wersjach językowych:

```
dist
|-my-app
    |-browser
        |-en-US
        |-pl
```

Jest to najbardziej, optymalna opcja serwowania aplikacji dla użytkownika. Do tego celu musimy także skonfigurować
oddzielnie serwer jak `nginx` czy inny serwer HTTP. To nie jest już tematem tego wpisu i muszę was odesłać do
[tej instrukcji](https://angular.dev/guide/i18n/deploy).

## Dodawanie nowych tłumaczeń i łączenie zmian

W Angularze niestety brakuje jednego narzędzia, z którego będziemy zmuszeni korzystać, gdy zaczniemy dodawać nowe teksty
wymagające tłumaczenia. Jeżeli dodamy nowy element html do aplikacji i oznaczymy go `i18n`, za pomocą komendy możemy
wygenerować nowy plik `messages.xlf` i ponownie zostaną zebrane tam wszystkie teksty wymagające tłumaczeń.

Niestety nie zaktualizuje to naszego pliku `messages.en.xlf`. Do tego potrzebujemy nowego narzędzia
https://www.npmjs.com/package/ng-extract-i18n-merge. Zainstalujmy i zobaczmy, jak działa:

```bash
npm install --save-dev ng-extract-i18n-merge
```

Po instalacji musimy teraz zmienić konfigurację w pliku `angular.json`, odnajdujemy właściwość `extract-i18n` i
podmieniamy na tę konfigurację:

```json
{
  "extract-i18n": {
    "builder": "ng-extract-i18n-merge:ng-extract-i18n-merge",
    "options": {
      "buildTarget": "my-app:build",
      "format": "xlf",
      "outputPath": ".",
      "targetFiles": [
        "messages.en.xlf"
      ],
      "includeContext": true,
      "trim": true,
      "newTranslationTargetsBlank": true
    }
  }
}
```

Pamiętajcie, aby w konfiguracji `buildTarget` podać prawidłową nazwę aplikacji, dla `outputPath` prawidłową ścieżkę,
oraz dla `targetFiles` nazwy plików do tłumaczeń.

W `package.json` będziemy potrzebowali nowego skryptu, który będzie uruchamiał cały proces:

```json
{
  "extract-i18n": "ng extract-i18n"
}
```

Dodajmy teraz nowy element HTML do aplikacji:

```html
<span i18n>To świat Angulara</span>
```

Uruchamiamy komendę `npm run extract-i18n` i widzimy, że nowy tekst pojawił się w pliku `messages.xlf`, ale został
także zmergowany do pliku `messages.en.xlf`. Możemy teraz dodać kolejne tłumaczenie w tagu `<target>`.

## Podsumowanie

Tak mniej więcej wygląda proces dodawania tłumaczeń/lokalizacji do aplikacji Angulara. Początkowa konfiguracja nie jest
ani łatwa, ani intuicyjna. W Angularze brakuje także narzędzi do mergowania nowych tłumaczeń. Pokazałem tutaj tylko
proces oznaczania tekstów za pomocą `i18n`. Jeżeli natomiast będziecie tłumaczyć większe i bardziej skomplikowane
aplikacje, napotkacie przeróżne problemy, które rozwiążecie z dokumentacją Angulara lub pomocą AI ;).

## Źródła

https://angular.dev/guide/i18n

https://www.loc.gov/standards/iso639-2/php/code_list.php

https://www.npmjs.com/package/ng-extract-i18n-merge

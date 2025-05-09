---
title: "Co to jest package.json?"
description: "Opis pliku package.json, jego struktury i roli w projektach Node.js."
date: 2020-10-15
tags: [ "javascript", "slowniczek-java-script" ]
---

`package.json` jest plikiem w formacie JSON, który istnieje w każdym projekcie opartym na Node.js. Jest to plik
zawierający informacje o projekcie, takie jak wersja, opis, autorzy i wiele innych ważnych informacji.

Drugą jego bardzo ważną rolą, jest przechowywanie informacji o dodatkowych zależnościach jakie zostały wykorzystane do
stworzenia projektu. Zależności te najczęściej pochodzą z repozytorium NPM-a. Zależności zapisane są za pomocą nazwy i
wersji.

Gdy inicjalizujemy nowy projekt na przykład w Angularze inicjalizuje się gotowy `package.json` który zawiera wszystkie
niezbędne zależności. Gdy zaczynam pracę w projekcie który już trwa i pobieramy go z repozytorium kodu, tam również
istnieje `package.json`. Zazwyczaj wystarczy uruchomić komendę:

```bash
npm install
```

i wszystkie niezbędne zależności zostaną dociągnięte do naszego projektu. Wtedy dopiero możemy zacząć proces
developmentu.

Zależności podzielone są przeważnie na dwie grupy. Pierwsza z nich kryje się pod właściwością `dependencies` i te
zależności są niezbędne do działania Twojej aplikacji. Przykładem może być paczka UUID, która służy do generowania
unikalnych id.

```json
"dependencies": {
"@angular/animations": "~10.0.14",
"@angular/common": "~10.0.14",
"@angular/compiler": "~10.0.14",
"@angular/core": "~10.0.14",
"@angular/forms": "~10.0.14",
"@angular/platform-browser": "~10.0.14",
"@angular/platform-browser-dynamic": "~10.0.14",
"@angular/router": "~10.0.14"
}
```

Druga grupa kryje się pod nazwą `devDependencies` i w tej grupie znajdziemy zależności, które wspomagają proces
tworzenia aplikacji jak wszelkiego rodzaju narzędzia do sprawdzania kodu, budowania kodu, zarządzania projektem,
pisaniem testów.

```json
"devDependencies": {
"@angular-devkit/build-angular": "~0.1000.8",
"@angular/cli": "~10.0.8",
"@angular/compiler-cli": "~10.0.14",
"@types/node": "^12.11.1",
"@types/jasmine": "~3.5.0",
"@types/jasminewd2": "~2.0.3",
"codelyzer": "^6.0.0",
"jasmine-core": "~3.5.0",
"jasmine-spec-reporter": "~5.0.0",
"karma": "~5.0.0",
"karma-chrome-launcher": "~3.1.0",
"karma-coverage-istanbul-reporter": "~3.0.2",
"karma-jasmine": "~3.3.0",
"karma-jasmine-html-reporter": "^1.5.0"
}
```

Pod właściwością `scripts` znajdują się komendy, które uruchamiane są przez narzędzie linii komend NPM. Komendy te mogą
dotyczy wywołania innych skryptów jak formatowanie kodu, uruchomienie projektu w wersji developerskiej, zbudowanie
projektu w wersji produkcyjnej itd.

```json
"scripts": {
"ng": "ng",
"start": "ng serve",
"build": "ng build",
"test": "ng test",
"lint": "ng lint",
"e2e": "ng e2e"
}
```

Sam plik `package.json` posiada o wiele więcej właściwości, jeśli chcemy się z nimi dokładnie zapoznać warto sprawdzić
dokumentację.

Uruchomienie komendy `npm install` powoduje pobranie wszystkich zależności do katalogu `node_modules`. W ten sposób nasz
kod korzysta z tych zależności lokalnie. Wykonanie komendy `npm install` powoduje także powstanie pliku
`package-lock.json`, jeżeli nie istniał. Jest to plik, który opisuje dokładnie jakie paczki i w jakiej wersji zostały
pobrane.

Plik ten jest ważny dla innych developerów i powinien być dostarczony do nich wraz z `package.json`. Gwarantuje on
bowiem, że inni developerzy pobiorą te same wersje zależności. Sam plik `package.json` nie gwarantuje tego, ponieważ
często pobierane zewnętrzne paczki kodu to zależności, które wciąż są rozwijane i mogą być pobrane w innej wersji iż są
opisane w `package.json`. Pozwala na to dodatkowa adnotacja przy wersji np. "~10.0.14" lub "^12.11.1".

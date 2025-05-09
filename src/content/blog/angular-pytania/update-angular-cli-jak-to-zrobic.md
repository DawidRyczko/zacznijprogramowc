---
title: "Update Angular CLI. Jak to zrobić?"
description: "Jak zaktualizować Angular CLI do najnowszej wersji. Instrukcja krok po kroku dla różnych wersji CLI."
date: 2020-06-30
tags: [ "angular", "angular-pytania" ]
---

Od czasu do czasu warto zrobić aktualizację Angular CLI. Szczególnie gdy chcemy korzystać z nowych wydań Angulara i wszelkich usprawnień Angular CLI.

Aby sprawdzić aktualną wersję Angular CLI wydaj polecenie:

```shell
ng v
```

Aktualnie moja wersja wygląda tak:

```text
Angular CLI: 9.0.2
Node: 12.16.2
OS: win32 x64

Angular:
...
Ivy Workspace:

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.900.2
@angular-devkit/core         9.0.2
@angular-devkit/schematics   9.0.2
@schematics/angular          9.0.2
@schematics/update           0.900.2
rxjs                         6.5.3
```

## Aktualizacja dla Angular CLI powyżej CLI 1.0.0-beta.28

Jeżeli posiadasz nowszą wersję Angular CLI sprawa jest bardzo prosta i wystarczy wykonać polecenie:

```shell
npm install -g @angular/cli@latest
```

Tym sposobem zrobimy aktualizację globalną.

Jeżeli dodatkowo chcemy aktualizować Angular CLI w projekcie to będąc w katalogu projektu wykonujemy:

```shell
npm install --save-dev @angular/cli@latest
```

Na koniec musimy także odświeżyć projektowe `node_modules`:

```shell
npm install 
```

Jeżeli pojawiły się problemy przy aktualizacji, można usunąć starszą wersję Angular CLI i powtórzyć kroki instalacji:

```shell
npm uninstall -g @angular/cli        
npm uninstall --save-dev @angular/cli
```

## Aktualizacja dla Angular CLI 1.0.0-beta.28 i niżej.

Jeżeli posiadasz, aż tak starą wersję Angular CLI to:

1.  Odinstaluj wersję globalną i lokalną z projektu. Zwróć uwagę, że usuwamy `angular-cli`, a nie `@angular/cli`

```shell
npm uninstall -g angular-cli
npm uninstall --save-dev angular-cli
```

2.  Wyczyść cache i usuń `node_module`

Jeżeli masz wersję NPM < 5 to:

```shell
npm cache verify
```

Usuń cały folder `node_modules` z Twojego projektu.

3. Zainstaluj nową wersję

Wykonaj instalację globalną:

```shell
npm install -g @angular/cli@latest
```

Wykonaj instalację dla projektu:

```shell
npm install --save-dev @angular/cli@latest
```

Odnów `node_modules`:

```shell
npm install
```

Najnowsza wersja Angular CLI powinna być zainstalowana co można sprawdzić przez `ng v`.
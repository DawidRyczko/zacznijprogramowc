---
title: "Konfiguracja Prettiera w 4 punktach - Prettier i Angular"
description: "Jak dodać Prettier do Angulara i dlaczego warto go mieć w projekcie."
date: 2020-01-29
tags: [ "angular", "frontend" ]
---

W tym wpisie dowiesz się jak dodać Prettier do Angulara i w ogóle dlaczego warto mieć Prettiera w projekcie.

## Prettier vs Linter (TSLint, ESLint)

Warto rozróżnić te dwa narzędzia:

*   Linter to narzędzie do sprawdzania poprawności naszego kodu. Zwraca uwagę na złą składnię, błędy, nieużywane zmienne etc. Główną jego ideą jest sprawdzanie poprawności kodu.
*   Prettier to formater kodu. Możemy go użyć do sprawdzania plików `.js`, `.ts`, `.css`, `.scss` i wiele innych. Główną różnicą w porównaniu do lintera jest to, że nie sprawdza jakości kodu.

Widzimy że narzędzia te robią dwie różne rzeczy, jednak często w kwestii wyglądu kodu i jego formatowania mogą mieć te same reguły, które są sprzeczne. Ale jest i na to sposób.

## Dlaczego warto używać tych narzędzi

TSLint jest standardowo dodawany do każdego nowo wygenerowanego projektu Angulara. I na pewno nie warto go usuwać. Prettier dodatkowo pomaga nam utrzymać kod według tych samych reguł formatowania. Wcięcia, długość linii, średniki, przecinki, pozycja klamerek, wywołanie łańcuchów funkcji itd. W każdym edytorze kod będzie wygląda tak samo.

Jednym z prozaicznych powodów jest code review. Nagle się okaże, że nasze taski przechodzą go bez problemu, bo po prostu nie ma się do czego doczepić 😸.

## Dodanie Prettiera do Angulara w 4 krokach

1.  Instalujemy Prettiera z opcją `--save-exact`<br>Pozwala to na sztywno ustawić wersję Prettiera. Pomoże nam to uniknąć aktualizacji wersji i być może kłopotów ze zmianą formatowania.

```powershell
npm install --save-dev --save-exact prettier
```

2.  Instalujemy `tslint-config-prettier`<br>Ponieważ TSLint z Prettierem mają różne zdania przy niektórych regułach formatowania, to warto do konfiguracji dodać tą wtyczkę. W innym przypadku musielibyśmy sami przeglądać plik `tslint.json` i usunąć konfiguracje, które się kłócą ze sobą. Może w ogóle warto to też zrobić 😼.

```powershell
npm install --save-dev tslint-config-prettier
```

3.  Konfigurujemy wtyczkę w `tslint.json`<br>W pliku `tslint.json` musimy dodać do tablicy `extends` nazwę wtyczki, którą właśnie zainstalowaliśmy. Powinno to wyglądać tak:<br>

```json
 "extends": [ "tslint:recommended", "tslint-config-prettier" ]
```

4.  Konfigurujemy Prettiera:<br>Warto dodać plik konfiguracyjny dla Prettiera. Plik może być w skonfigurowany w formacie JSON, JS, YAML, TOML lub po prostu bez rozszerzenia. Ja osobiście tworzę plik `.prettierrc`:<br>

```json
{ 
    "printWidth": 80, 
    "trailingComma": "es5", 
    "tabWidth": 2, 
    "semi": true, 
    "singleQuote": true 
}
```

Wszelkie opcje konfiguracyjne znajdziecie w dokumentacji Prettier: <a href="https://prettier.io/docs/en/options.html">https://prettier.io/docs/en/options.html</a>

## Uruchomienie Prettiera

Po instalacji możemy uruchomić Prettiera. Za pomocą tej komendy, przelecimy cały projekt i poprawimy formatowanie w każdym pliku o poniższych rozszerzeniach:

```powershell
prettier --write "**/*{.ts,.js,.json,.scss,.html}"
```

Jeżeli chcemy formatować tylko pliki w katalogu `src/` to możemy użyć takiej komendy:

```powershell
prettier --write "src/**/*{.ts,.js,.json,.scss,.html}"
```

## Dodanie komendy do `package.json`

Dobrym pomysłem jest dodanie komendy do `package.json`:

```powershell
"format": "prettier --write --config ./.prettierrc src/**/*{.ts,.js,.json,.scss,.html}"
```

i gdy mamy taką potrzebę to uruchamiamy komendą:

```powershell
npm run format
```

## Konfiguracje w edytorze

Prettiera możemy skonfigurować w swoim edytorze i wywoływać go za pomocą skrótu klawiszowego czy kontekstowego menu. Wszystko zależy od edytora, warto sprawdzić w dokumentacji jak to zrobić w Waszym edytorze. <a href="https://prettier.io/docs/en/editors.html">https://prettier.io/docs/en/editors.html</a>

## Prettier hooks – automatyzacja

Często zapominamy puścić Prettiera po kodzie, a zazwyczaj przypominamy sobie gdy już wykonamy commita do repozytorium. Dlatego warto pomyśleć o automatyzacji, a do tego potrzebujemy `pretty-quick` i `husky`.

Dzięki tym bibliotekom, w czasie wykonywania commitu, Prettier uruchomi się, sprawdzi formatowanie plików i poprawi je. Potem nastąpi commit z już poprawionymi plikami.

1.  Instalujemy zależności

```powershell
npm install pretty-quick husky --save-dev
```

2.  Dodajemy konfiguracje do `package.json`

```json
  "husky": {
       "hooks": {
         "pre-commit": "pretty-quick --staged"
       }
     }
```

Nasz hook uruchomi się zaraz przed commitem. Uruchomienie hooka `pre-commit` oznacza uruchomienie `pretty-quick` z opcją `--staged`. Oznacza to, że pliki zostaną przeformatowane jeszcze przed samym commitem i zmiany zostaną dodane do commita.

Bez tej opcji pliki zostaną zcommitowane i dopiero wtedy sprawdzone zostanie formatowanie. Jeżeli coś będzie poprawione, będziemy musieli wykonać drugiego commita z tymi zmianami.

## Podsumowanie

*   TSLint sprawdza poprawność kodu
*   Prettier to formater
*   aby pogodzić TSLint i Prettier warto zainstalować `tslint-config-prettier`
*   warto dodać plik konfiguracyjny `.prettierrc`
*   warto dodać komendę do `package.json` uruchamiającą formatowanie
*   Prettiera możemy też skonfigurować w ulubionym edytorze
*   automatyczne formatowanie ustawimy za pomocą `pretty-quick` i `husky`

## Linki, które mogą pomóc:

Linki, które mogą pomóc:

<a href="https://prettier.io/">https://prettier.io/</a>

<a href="https://github.com/typicode/husky">https://github.com/typicode/husky</a>

<a href="https://github.com/azz/pretty-quick">https://github.com/azz/pretty-quick</a>
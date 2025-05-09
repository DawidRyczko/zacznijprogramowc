---
title: "Jak dodać Bootstrapa 4 - bootstrap i Angular"
description: "Sposoby na dodanie Bootstrap 4 do projektu Angularowego. Przegląd mniej i bardziej rekomendowanych metod."
date: 2019-05-12
tags: [ "angular", "frontend"  ]
---

Bootstrap 4 to biblioteka, która chętnie jest używana w projektach angularowych. Jest kilka sposobów na dodanie Bootstrap 4 do projektu. Przyjrzyjmy się tym sposobom, zarówno tym które są mniej jak i bardziej rekomendowane.

Bootstrap 4 został napisany w Sass i jest podzielony na moduły. Pracując z Bootstrap 4 w Angularze warto również pracować z plikami `*.sass` zamiast zwykłych plików `*.css`.

Niektóre elementy Bootstrapa potrzebują dodatkowych skryptów JS w postaci biblioteki JQuery, Popper.js. Instalowanie ich w Angularze nie zawsze jest dobrym pomysłem i samo korzystanie z komponentów Bootstrapa może być niezbyt wygodne.

Dlatego zamiast instalowania dodatkowych zależności warto rozważyć użycie dodatkowych bibliotek, które oferują komponenty Bootstrapa w postaci komponentów Angulara, a z Bootstrapa instalujemy jedynie style. Ostatecznie pokazuję każdy sposób instalowania Bootstrapa i korzystania z jego komponentów.

## Quick start – najprostszy i najszybszy sposób dodania Bootstrapa

Najprostszy sposób dodania Boostrapa do aplikacji to wykorzystanie BootstrapCDN. Nie musimy nic instalować przez `npm` wystarczy dodać linki do stylów i potrzebnych plików Java Script. Adresy URL możemy znaleźć na stronie Bootstrapa.

W pliku `index.html` dodajemy w nagłówku `<head>` link do styli css:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
crossorigin="anonymous">
```

Ponieważ wiele komponentów wykorzystuje JQuery oraz Propper.js, potrzebujemy także dodać dodatkowe skrypty. Dodajemy je bezpośrednio w `<body>`:

```html
<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"
>&lt;/script>

<script
  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"
>&lt;/script>

<script
  src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"
>&lt;/script>
```

Tak wygląda plik index.html w Angularze z dodanym Bootstrapem:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BootstrapExample</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <!-- Link do styli -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <app-root>&lt;/app-root>
    <!-- Dodatkowe skrypty -->
    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"
    >&lt;/script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    >&lt;/script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    >&lt;/script>
  </body>
</html>
```

Aktualne linki zawsze znajdziesz na stronie Bootstrapa:

[https://getbootstrap.com/docs/4.0/getting-started/introduction/](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

Od tej pory możemy korzystać z pełnego Bootstrapa. Jest to bardzo szybki i prosty sposób, nie jest on zalecany. Przydaje się jednak gdy chcemy coś przetestować, sprawdzić i nie myślimy na serio o tym aby używać Bootstrapa w projekcie :).

## Użycie angular.json

Rekomendowanym sposobem jest dodanie Bootstrapa do naszych zależności, a potem deklaracja w pliku `angular.json`. Musimy więc zainstalować 3 paczki zależności jeżeli chcemy korzystać ze wszystkich elementów Bootstrapa 4. Ponieważ niektóre elementy wymagają JQuery i Propper.js. Na końcu pokaże jak można się pozbyć tych zależności.

```shell
npm install bootstrap
npm install jquery
npm install popper.js
```

Gdy wszystkie biblioteki znajdą się w `package.json` w `dependencies` możemy wskazać je w pliku `angular.json`. W tym celu w sekcji `build` i potem w sekcji `options` odnajdujemy `styles` i tam umieszczamy link do Bootstrapa:

```json
"styles": [
   "node_modules/bootstrap/dist/css/bootstrap.css",
   "src/styles.css"
  ],
```

Jeżeli używasz Sass-a to zmieniamy nieco ścieżkę, ponieważ pliki `scss` znajdują się w innym miejscu niż gotowe pliki `css`.

```json
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  "src/styles.scss"
 ],
```

Natomiast w sekcji `script` umieszczamy linki do plików `js`:

```json
"scripts": [
  "node_modules/jquery/dist/jquery.slim.js",
  "node_modules/popper.js/dist/umd/popper.js",
  "node_modules/bootstrap/dist/js/bootstrap.js"
 ]
```

Przy takiej konfiguracji, nie musimy niczego dodawać do pliku `index.html`. Po uruchomieniu projektu jeszcze raz wszystkie elementy Bootstrap jakie zechcemy użyć będą działały prawidłowo.

**Ważne:** Ważną rzeczą jest to, aby w sekcji `style` ścieżka do Bootstrapa znalazła się nad ścieżką do naszego głównego pliku `"src/styles.scss"`. W przypadku innej kolejności mogło by dojść do sytuacji, że Bootstrap nadpisałby nasze style. Kolejność ta jest tym bardziej ważna, gdy to my chcemy nadpisywać style Bootstrapa.

## Import w głównym pliku styli

Możemy też pominąć konfigurację w `angular.json` i dodać import Bootstrapa bezpośrednio w głównym pliku `style.scss`.

```css
@import '~bootstrap/scss/bootstrap';
```

Zaimportowanie `css`:

```css
@import '~bootstrap/dist/css/bootstrap';
```

Wtedy nie musimy wskazywać w `angular.json` ścieżki do Bootstrapa. Oczywiście jeżeli chcemy korzystać z elementów, które potrzebują JQuery i Propper.js to musimy podać do nich ścieżki w pliku `angular.json` w sekcji `script`.

W tym przypadku nie ma żadnej specjalne różnicy. Jednak możemy zyskać przewagę, korzystając z możliwości Sass-a i tego jak został zbudowany Boostrap 4. Ponieważ elementy Bootstrapa podzielone są na moduły, możemy importować tylko te pliki `scss`, które nas interesują: `style.scss`:

```css
// wymagane
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/forms";
```

W tym przypadku zdecydowałem się, że będę używał `grid`, `navbar` i `forms` bo tylko tego potrzebuję w aplikacji, więc korzystam tylko z tych importów. Dodatkowo importy dotyczące `functions`, `variables` i `mixins` będą zaimportowane zawsze, ponieważ są niezbędne przy każdym elemencie Bootstrapa.

Oczywiście ma to dla nas korzyści gdy zależy nam na zmniejszeniu objętości gotowej zbudowanej aplikacji. W tym przypadku mamy wszystko pod kontrolą, niektórzy to lubią 🙂

Tutaj lista wszystkich plików, które warto mieć wrzucone do pliku styli i w razie konieczności odkomentować odpowiedni import:

```css
//@import "~bootstrap/scss/functions";
//@import "~bootstrap/scss/variables";
//@import "~bootstrap/scss/mixins";
//@import "~bootstrap/scss/grid";
//@import "~bootstrap/scss/reboot";
//@import "~bootstrap/scss/forms";
//@import "~bootstrap/scss/buttons";
//@import "~bootstrap/scss/dropdown";
//@import "~bootstrap/scss/nav";
//@import "~bootstrap/scss/navbar";
//@import "~bootstrap/scss/jumbotron";
//@import "~bootstrap/scss/utilities";
//@import "~bootstrap/scss/type";
//@import "~bootstrap/scss/root";
//@import "~bootstrap/scss/images";
//@import "~bootstrap/scss/code";
//@import "~bootstrap/scss/tables";
//@import "~bootstrap/scss/transitions";
//@import "~bootstrap/scss/button-group";
//@import "~bootstrap/scss/input-group";
//@import "~bootstrap/scss/custom-forms";
//@import "~bootstrap/scss/card";
//@import "~bootstrap/scss/breadcrumb";
//@import "~bootstrap/scss/pagination";
//@import "~bootstrap/scss/badge";
//@import "~bootstrap/scss/alert";
//@import "~bootstrap/scss/progress";
//@import "~bootstrap/scss/media";
//@import "~bootstrap/scss/list-group";
//@import "~bootstrap/scss/close";
//@import "~bootstrap/scss/modal";
//@import "~bootstrap/scss/tooltip";
//@import "~bootstrap/scss/popover";
//@import "~bootstrap/scss/carousel";
//@import "~bootstrap/scss/print";
```

## Uniknięcie JQuery i pozostałych skryptów JS

Ponieważ Bootstrap 4 używa w niektórych elementach JQuery i innych skryptów JS, może być to problematyczne przy pracy z samym Angularem. Warto wtedy rozważyć i zainstalować dodatkową bibliotekę jak [Ngx-Bootstrap](https://valor-software.com/ngx-bootstrap) lub [Ng-Bootstrap](https://ng-bootstrap.github.io/).

Biblioteki te wykorzystują elementy Bootstrapa 4 i tworzą z nich komponenty dla Angulara. Praca z gotowymi komponentami może okazać się łatwiejsza. Jeżeli zdecydujemy się na taki krok, konfiguracja samego Bootstrapa (którego i tak musimy zainstalować) sprowadza się do zaimportowania tylko plików ze stylami na przykład przez konfigurację w `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  "src/styles.scss"
 ],
```

Ponieważ takie elementy jak Dropdown, Datepicker, Modal i wiele innych są zbudowane jako komponenty Angulara, użycie ich różni się od tego jak używa się ich przy czystym Bootstrapie. Warto wtedy korzystać z dokumentacji konkretnego frameworka.

Ten sposób jest chyba najlepszą opcją do korzystania z Bootstrapa i jego elementów. Koniec końców okaże się, że korzystanie z czystego Bootstrapa i tak zmusza nas do opakowania jego elementów w dodatkowe angularowe komponent. Skorzystajmy więc z gotowej biblioteki bo przecież ta praca została wykonana juz za nas :).

## Końcowe wnioski

Jeżeli chcemy używać inny frameworków CSS, konfiguracja będzie bardzo podobna. Na szybko, możemy zrobić to przez plik `index.html`. Jednak jeśli chcemy używać konkretnego frameworka produkcyjnie, warto skonfigurować go przez `angular.json` lub też użyć importów w głównym pliku styli `style.scss`, który i tak musi znaleźć się w `angular.json`. Ale o to za nas dba już Angular CLI, który dodaje ten plik przy generowaniu projektu.

Zachęcam także do korzystania z SASS-a ponieważ większość frameworków zbudowana jest z użyciem tego preprocesora CSS.

Gdy modyfikujemy `angular.json` musimy zawsze uruchomić projekt od nowa. Angular nie widzi zmian w tym pliku jeśli ponownie nie uruchomimy aplikacji.
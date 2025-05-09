---
title: "Co nowego w Angular 9 - Podsumowanie w 12 punktach"
description: "Podsumowanie najważniejszych zmian w Angular 9, w tym kompilator Ivy, mniejszy rozmiar aplikacji, szybsze testy i inne."
date: 2020-02-07
tags: [ "angular", "frontend" ]
---

Spis treści
Najważniejsza zmiana to kompilator Ivy

1. Mniejszy rozmiar zbudowanej aplikacji
2. Szybsze uruchamianie testów
3. Lepsze debugowanie aplikacji
4. Ulepszenia w bindowaniu klas i styli CSS
5. Ulepszenia w sprawdzaniu typów
6. Lepsza obsługa błędów przy budowaniu aplikacji
7. Poprawiono czas budowania aplikacji. Kompilacja Ahead-of-time (AOT) jest teraz domyślna
8. Ulepszona internacjonalizacja
9. Bardziej niezawodna aktualizacja
10. Nowe opcje dla providedIn w serwisach
11. Nowe komponenty dla YouTube i Google Maps
12. Wsparcie dla TypeScript 3.7

Dokładnie 6 lutego 2020r. pojawiła się 9 wersja Angulara. Zmiany dotyczą całego frameworka, Angular Material i Angular
CLI, sposobu testowania komponentów. Największą zmianą jest nowy kompilator pod nazwą Ivy. Zobaczmy co nowego w „Angular
9”.

Jak można wyczytać z informacji o aktualizacji, to największy update od 3 lat. Jeżeli chcecie już teraz zrobić update
Waszych projektów to warto skorzystać z https://update.angular.io/. Za pomocą tej strony bez problemów podbijecie wersję
w projekcie. Dowiecie się także o potencjalnych problemach.

## Najważniejsza zmiana to kompilator Ivy

Od wersji Angular 9 Ivy jest już oficjalnym kompilatorem. Opcjonalnie Ivy można było włączyć w wersji 8, a teraz działa
już domyślnie. Oto co ulepsza Ivy:

### 1. Mniejszy rozmiar zbudowanej aplikacji

Najwięcej skorzystają na tym małe i duże aplikacje. Rozmiar zbudowanej aplikacji może zmniejszyć się nawet o 40% w
przypadku dużych aplikacji i 30% w przypadku małych aplikacji. Niestety aplikacje średniej wielkości nie zyskają przy
Ivy zbyt dużo.

Cały trick polega na eliminowaniu nieużywanego kod i generowaniu mniejszej ilości kodu dla każdego komponentu.

### 2. Szybsze uruchamianie testów

Główne zmiany przeszedł TestBed, który wraz z Ivy został znacznie ulepszony. Do tej pory TestBed kompilował wszystkie
komponenty za każdym razem gdy uruchamialiśmy testy, nawet wtedy gdy nic się nie zmieniło.

Od teraz TestBed nie kompiluje komponentów między kolejnym uruchomieniem testów. Angular tworzy cache i trzyma
skompilowane komponenty i moduły, dzięki temu uruchamianie kolejnych testów jest znacznie szybsze. Jeżeli nadpiszemy
komponent ręcznie będzie on ponownie skompilowany.

### 3. Lepsze debugowanie aplikacji

Wraz z Ivy dostajemy nowe możliwości debugowania. Mamy teraz dostęp do specjalnego obiektu `ng`.

Przez obiekt `ng` możemy dostać się do aktualnego stanu aplikacji. Wyciągnąć instancję komponentu, dyrektywy czy
serwisu. Możemy ręcznie zmieniać stan aplikacji czy nawet uruchamiać Change Detection.

Jeżeli często miałeś problem z ExpressionChangedAfterItHasBeenCheckedError sam stack trace błędu został poprawiony i
będzie go można łatwiej debugować.

Warto zajrzeć do dokumentacji https://angular.io/api/core/global.

### 4. Ulepszenia w bindowaniu klas i styli CSS

Ivy poprawia także bindowanie styli do elementów. Do tej pory bindowanie stylów polegało na inicjalizacji zmiennych. W
zależności, która z zmienna zainicjalizowała się ostatnia, taki styl był prezentowany. Od teraz Ivy wprowadza
nadrzędność styli. Warto sprawdzić w dokumentacji jak to
działa: https://angular.io/guide/template-syntax#styling-precedence

### 5. Ulepszenia w sprawdzaniu typów

W tym przypadku kompilator Ivy jest jeszcze dokładniejszy i możemy skonfigurować go do jeszcze bardziej zaostrzonych
reguł pilnowania typów. Dostajemy dwie nowe opcje konfiguracyjne dla tsconfig.json:

* `fullTemplateTypeCheck` – gdy przestawione na true Angular będzie sprawdzał typów w szablonie komponentu
* `strictTemplates` – gdy przestawione na true Angular jeszcze bardziej będzie pilnował typów w szablonie komponentu. W
  skrócie wersja hardkor 😻

Na pewno warto doczytać o tych zmianach na stronie Angulara: https://angular.io/guide/template-typecheck

### 6. Lepsza obsługa błędów przy budowaniu aplikacji

Dzięki temu usprawnieniu błędy wyrzucane przez kompilator są czytelniejsze, bardziej dla ludzi. W końcu programiści to
ludzie 😹. Będziemy mieli trochę łatwiej gdy przyjdzie nam walczyć z błędami kompilacji.

### 7. Poprawiono czas budowania aplikacji. Kompilacja Ahead-of-time (AOT) jest teraz domyślna

Do tej pory, kompilacja AoT była opcjonalna. W skrócie, kompilacja AoT to zbudowana wersja produkcyjna. Jednak używanie
kompilacji AoT w procesie developmentu przed wersją 9 Angulara, znacznie wydłużało czas pracy, choć sama aplikacja
działała wtedy o wiele sprawniej.

Najważniejsze jest to, że kompilacja AoT włączona jest teraz jako domyślna w trybie developerskim. Dzięki temu
usprawnieniu developerzy będą mieli znacznie szybszą aplikację w przeglądarce i lepsze wrażenia przy pracy z
kompilatorem.

Warto doczytać o tym procesie: https://angular.io/guide/aot-compiler

### 8. Ulepszona internacjonalizacja

Jeżeli budujesz aplikacje wielojęzykowe to tutaj również pojawiło się wiele usprawnień. Znowu dobrym pomysłem jest
sprawdzenie nowości w dokumentacji.

https://angular.io/guide/i18n

### 9. Bardziej niezawodna aktualizacja

W wersji 9 Angulara poprawiono także `ng update`. Jest to komenda do wykonywania aktualizacji. Teraz ma działać bardziej
niezawodnie i sprawnie.

### 10. Nowe opcje dla providedIn w serwisach

To coś, co na pewno każdego zainteresuje. Serwisy otrzymują dwie dodatkowe opcje dla ustawienia `providedIn`.

* `providedIn: 'platform'` – przyda się przy wielu aplikacjach. Sprawia, że serwis jest dostępny dla wielu aplikacji,
  które mogą pracować na jednej stronie.
* `providedIn: 'any'` – udostępnia unikalne instancje dla każdego modułu, również w lazy modules.

### 11. Nowe komponenty dla YouTube i Google Maps

Za pomocą dwóch udostępnionych komponentów, łatwo możemy podłączyć YouTube i Google Maps do angularowych aplikacji

https://github.com/angular/components/tree/master/src/youtube-player

https://github.com/angular/components/tree/master/src/google-maps

### 12. Wsparcie dla TypeScript 3.7

To coś na co ja czekałem z niecierpliwością. Przede wszystkim dzięki temu, że możemy teraz używać optional chaining.
Więcej o tym tutaj https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining

Pisząc to podsumowanie korzystałem z:

https://blog.angular.io/version-9-of-angular-now-available-project-ivy-has-arrived-23c97b63cfa3

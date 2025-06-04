---
title: "Co to jest Hydracja (Hydration) strony"
description: "Czym jest hydracja strony w kontekście Server Side Rendering (SSR)? Jak działa i kiedy warto ją stosować?"
date: 2025-06-04
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Hydration (Hydracja) strony to proces związany z SSR, czyli Server-Side Rendering. W SSR wygenerowana strona
na serwerze jest prostym dokumentem HTML bez żadnej interaktywności. Wysłana do przeglądarki, wygląda jak zwykły
dokument tekstowy. Zadaniem hydracji jest dołączenie do elementów HTML kodu Java Script już po stronie przeglądarki.

W tym momencie następuje hydracja elementów strony kodem JavaScript. Chodzi o to, żeby wykorzystać istniejący HTML
wygenerowany na serwerze i dodać do niego interaktywność. Hydracja pozwala ożywanie pojedynczych elementów, zamiast
renderować w całości od nowa DOM.

## Hydracja w dalszych szczegółach

Hydracja jest procesem związanym z SSR i dostępna w wielu popularnych frameworkach. W zależności od frameworków
działanie może różnić się, a często wymagana jest ręczna konfiguracja i włączenie hydracji.

Ponieważ w SSR możemy włączyć lub wyłączyć hydrację, warto opisać jaka jest różnica w działaniu:

- **SSR bez hydracji:** Serwer generuje statyczny HTML i wysyła go do przeglądarki. Przeglądarka wyświetla zawartość,
  ale strona nie jest interaktywna. Framework na froncie musi "od nowa" zrenderować całą aplikację, "wyrzucając"
  wyrenderowany przez serwer HTML i tworząc nowy DOM. Może to powodować "miganie" ekranu (tzw. flicker), ponieważ
  użytkownik widzi przez chwilę statyczny HTML, a potem interaktywną aplikację. Dodatkowo, cały JavaScript aplikacji
  musi zostać pobrany i wykonany, zanim strona stanie się interaktywna, co wpływa na czas do interakcji

- **SSR z hydracją:** Serwer generuje statyczny HTML i wysyła go do przeglądarki. Przeglądarka wyświetla zawartość, a
  framework "przyłącza się" do istniejącego DOM (wygenerowanego przez serwer). Hydracja polega na powiązaniu event
  listenerów i innych interakcji z elementami DOM, które już istnieją. Dzięki temu unikamy ponownego renderowania całej
  aplikacji na froncie i "migania" ekranu. Strona staje się interaktywna znacznie szybciej, ponieważ przeglądarka nie
  musi pobierać i wykonywać całego JavaScript od zera, tylko "ożywia" istniejący HTML.

Dodatkowo wiele frameworków pozwala zarządzać procesem hydracji:

- możemy włączać i wyłączać hydrację dla poszczególnych komponentów
- możemy używać częściowej hydracji dla komponentów, części strony czy elementów
- możemy zarządzać priorytetyzacją i kolejnością hydracji
- mamy dostęp do dyrektyw i atrybutów do konfigurowania hydracji

Każdy framework ma swoją implementację hydracji i przed używaniem warto zapoznać się z dokumentacją, aby w pełni
zrozumieć proces działania.

## Korzyści z hydracji

- lepsze wrażenia użytkownika z używania aplikacji, unikamy ponownego renderowanie DOM
- poprawia wydajność strony, skraca czas ładowania strony
- wszystkie korzyści wynikające z lepszego SEO

## Wady hydracji

- hydracja wykorzystuje SSR, więc wiążą się z nią wady typowe dla SSR np. większe obciażenie serwera
- hydracja jest skomplikowana i niektóre elementy mogą być trudne do debugowania
- niektóre biblioteki mogą nie być kompatybilne z hydracją i SSR

## Kiedy warto użyć hydrację?

Hydracja jest ciekawym dodatkiem dla stron SSR. Jeżeli zależy nam na poprawie "user experience" to warto rozważyć
jej włączenie. Szczególnie warto gdy zależy nam na dobrym SEO i tak zwanych Core Web Vitals dla naszej strony. Hydracja
w znaczący sposób poprawia wszelkie wskaźniki ładowania strony.

Należy jedynie pamiętać, że jest to dodatkowy poziom komplikowania naszego kodu.

## Podsumowanie

- hydracja jest związana z SSR - Server-Side Rendering, dodatkowa technika optymalizacji renderowania
- hydracja polega na wypełnieniu elementów strony interaktywnym kodem JavaScript bez renderowania od nowa DOM
- hydracja jest dodatkowym elementem, który dodaje złożoność do naszego kodu
- hydracja poprawia user experience dla użytkownika

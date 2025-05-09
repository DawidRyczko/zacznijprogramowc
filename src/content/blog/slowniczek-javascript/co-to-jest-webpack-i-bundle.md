---
title: "Co to jest Webpack i bundle?"
description: "Wyjaśnienie, czym są Webpack i bundle oraz jaką rolę pełnią w tworzeniu nowoczesnych aplikacji JavaScript."
date: 2024-10-22
tags: [ "javascript", "slowniczek-java-script" ]
---

Dzisiejsze aplikacje JavaScript składają się z wielu różnych plików. Dodatkowo między tymi plikami występują wszelkiego
rodzaju zależności. Uruchamianie takiego kodu w przeglądarce bez żadnego narzędzia, które zajmie, się tymi zależnościami
może być nie lada wyczynem.

Dawniej strony przeważnie składały się z kilku plików HTML i może kilku plików JS. Zapanowanie nad kolejnością
wczytywania było stosunkowo łatwe, ale i to czasami powodowało wiele problemów. Używając takiego narzędzia jak Webpack,
nie musimy się przejmować kolejnością wczytywania naszego kodu i obawiać o to czy odpowiednie zależności znalazły się w
odpowiednim miejscu.

Webpack za pomocą przygotowanej konfiguracji zajmie się zbudowaniem grafu zależności między modułami naszej aplikacji.
Zajmie się nie tylko plikami `.js`, ale także innymi plikami jak `.css` czy `.html`. Następnie przygotuje kod w taki
sposób aby jego wykonywanie przebiegło bez problemów. Zachowa kolejność importowanych modułów i zależności. Zadba o
wszelkie zależności dla każdej linii kodu.

Z tak przygotowanego kodu powstanie tak zwany bundle. Może to być jeden lub więcej plików, które są ze sobą połączone.
Bundle jest pakietem zoptymalizowanym dla przeglądarki. Plik lub pliki są tak małe jak możliwe, aby proces pobierania,
ładowania i uruchamiania w przeglądarce przebiegał jak najszybciej.

To właśnie robią narzędzia takie jak Webpack. Nie jest to jedyne takie narzędzia. Są jeszcze inne jak Parcel czy Grunt.
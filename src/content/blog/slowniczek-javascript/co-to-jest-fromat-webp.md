---
title: "Co to jest format WebP?"
description: "Do czego służy i czym jest format WebP używany do wyświetlania grafiki na stronach internetowych?"
date: 2025-11-21
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Format WebP jest najnowszym formatem pliku graficznego coraz częściej spotykanym na stronach internetowych. Zapewnia o
wiele lepszą kompresję obrazów w internecie. Jego główną zaletą jest łączenie w sobie kompresji stratnej (jak w JPEG)
oraz kompresji bezstratnej (jak w PNG).

## WebP w dalszych szczegółach

Obrazy WebP mają bardzo wiele zalet i coraz częściej używane są przez developerów stron internetowych. Przede wszystkim
cenione są za mniejszą wielkość plików w przypadku kompresji bezstratnej, są mniejsze nawet o 26% od plików PNG. Natomiast
przy kompresji stratnej wielkość plików jest mniejsza nawet o 25-34% od plików JPEG jak
podaje [źródło Google](https://developers.google.com/speed/webp?hl=pl).

Obrazy WebP obsługują także przeźroczystość, a nawet animacje. W obu przypadkach są lepszą alternatywą dla starszych
technologii. Wszystko to wpływa nie tylko na samo odczucie, że strona działa lepiej. WebP to także znacząca poprawa
wskaźników SEO oraz Core Web Vitals.

Format WebP nie zawsze obsługiwany jest przez starsze przeglądarki. Dobrą praktyką jest użycie elementu HTML
`<picture>`.
Element `<picture>` pozwala automatycznie wybrać przeglądarce obsługiwany format:

```html

<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Opis obrazu" />
</picture>
```
Mechanizm ten działa na zasadzie listy priorytetów:
1. Przeglądarka sprawdza kod od góry. Najpierw trafia na element <source>.
2. Sprawdza atrybut type="image/webp". Jeśli przeglądarka "rozumie" ten format, pobiera plik WebP i ignoruje resztę.
3. Jeśli przeglądarka jest stara i nie obsługuje WebP, ignoruje linię <source> i przechodzi dalej.
4. Na końcu trafia na standardowy znacznik <img> i ładuje plik .jpg, który działa wszędzie (tzw. fallback).

WebP opiera się na technologii kompresji wideo VP8, która pochodzi od firmy On2 Technologies. Google przejęło tę firmę,
a następnie zaadaptowało i rozwinęło jej technologię, tworząc format WebP jako standard graficzny mający na celu
przyspieszenie ładowania stron internetowych.

## Zalety WebP

- lepsza kompresja niż w formatach JPEG i PNG
- łączy kompresję stratną i bezstratną w jednym formacie pliku
- obsługuje przeźroczystość
- obsługuje animacje
- poprawia wydajność strony, dzięki mniejszym plikom

## Wady WebP

- brak kompatybilności ze starszymi przeglądarkami
- mniej narzędzi do edycji (ale to sie zmienia)
- wiele urządzeń i aparatów nie obsługuje formatu WebP i wymagana jest ręczna konwersja
- dłuższy czas kompresji

## Kiedy warto użyć WebP

Format WebP warto używać niemalże zawsze. Znacznie przyśpiesza on ładowanie grafiki i zmniejsza rozmiar pliku. Format
WebP skutecznie zastępuje JPEG i PNG i pomału staje się standardowym formatem graficznym na stronach internetowych.

## Podsumowanie

- WebP to nowoczesny format graficzny w kompresji stratnej i bezstratnej
- warto wprowadzić go jako nasz nowy standard graficzny na stronach internetowych
- jego stosowanie pozytywnie wpływa na wskaźniki Core Web Vitals i pozycjonowanie SEO
- z powodzeniem zastępuje zarówno pliki JPEG (zdjęcia), jak i PNG (grafika z tłem), oferując mniejszy rozmiar
- dla zachowania kompatybilności ze starszymi przeglądarkami należy stosować go wewnątrz znacznika `<picture>`
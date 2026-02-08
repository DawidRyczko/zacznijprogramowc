---
title: "Co to jest WCAG - dostępność cyfrowa?"
description: "Czym jest dostępność cyfrowa i jak tłumaczyć skrót WCAG?"
date: 2026-02-08
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Skrót WCAG tłumaczymy jako Web Content Accessibility Guidelines, w Polsce często określane jako Dostępność Cyfrowa.
WCAG to standard, który określa, jak mają wyglądać i działać strony internetowe (ale też aplikacje) dla różnych grup
użytkowników, w tym osób z niepełnosprawnościami np. wzroku, słuchu, ruchu.

Celem WCAG jest zapewnienie, że strony internetowe są dostępne dla wszystkich użytkowników. Główne zasady WCAG to:
postrzegalność, funkcjonalność, zrozumiałość, solidność

## WCAG w dalszych szczegółach

WCAG został stworzony i jest rozwijany przez W3C (World Wide Web Consortium). Jest to ta sama organizacja, która tworzy
standardy HTML i CSS. Oficjalnym źródłem informacji na temat WCAG jest strona W3C: https://www.w3.org/TR/WCAG21/. Polski
odpowiednik tej strony znajdziemy pod adresem: https://www.w3.org/Translations/WCAG21-pl/.

W Polsce, jak i w całej Unii Europejskiej WCAG jest standardem. Wszystkie instytucje, podmioty publiczne i niektóre
prywatne mają obowiązek spełnienia wytycznych WCAG. Standard ten opiera się na 4
zasadach ([POUR](https://accessibility.umich.edu/basics/concepts-principles/pour)):

1. Postrzegalność (Perceivable): Użytkownik musi móc "zobaczyć" treść (np. tekst alternatywny dla obrazków dla osób
   niewidomych, odpowiedni kontrast kolorów).
2. Funkcjonalność (Operable): Interfejs musi dać się obsługiwać (np. nawigacja samą klawiaturą, brak pułapek, z których
   nie da się wyjść tabulatorem).
3. Zrozumiałość (Understandable): Treść i obsługa muszą być jasne (np. komunikaty błędów w formularzach muszą
   precyzyjnie mówić, co jest źle).
4. Solidność (Robust): Kod musi być poprawny technicznie, aby działał na różnych urządzeniach i czytnikach ekranu (
   assistive technologies).

Dodatkowo WCAG ma trzy poizomy zgodności:

- A (Podstawowy): Absolutne minimum (np. nawigacja klawiaturą). Bez tego strona jest nieużywalna dla wielu osób.
- AA (Standardowy): Standard wymagany przez prawo w wielu krajach (w tym w UE i Polsce dla podmiotów publicznych).
  Obejmuje np. wymogi kontrastu.
- AAA (Najwyższy): Bardzo rygorystyczny, stosowany w specyficznych przypadkach.

WCAG występuje w kilku wersjach, w tym WCAG 2.0, WCAG 2.1 i WCAG 2.2:

- WCAG 2.1: To jest obecny "złoty standard". Większość przepisów prawnych (w tym polska ustawa o dostępności cyfrowej)
  odwołuje się do tej wersji.
- WCAG 2.2: Zostało opublikowane w październiku 2023 r. Dodaje kilka nowych kryteriów (głównie dotyczących urządzeń
  mobilnych i osób z niepełnosprawnościami poznawczymi), ale nie rewolucjonizuje poprzedniej wersji.

Obecnie trwają prace nad WCAG 3.0, ale to odległy temat. Warto go jednak śledzić, gdyż będzie to napisany standard
zupełnie od nowa.

Ponieważ dokumentacja WCAG jest trudna do przetworzenia i wygląda jak akt prawny, mogę polecić dwa źródła:

- MDN Web Docs (Mozilla): Mają świetny dział
  o "[Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)".
- The A11Y Project: To społecznościowy projekt, który tłumaczy zasady WCAG na "ludzki" język i daje
  gotowe [checklisty](https://www.a11yproject.com/checklist/#images).

## WCAG w praktyce

Przyjrzyjmy się kilku przykładom, jak wygląda złamanie zasda POUR i ich poprawne wersje:

### **1. Postrzegalność (Perceivable) - Użytkownik musi móc "zobaczyć" treść:**

**Typowy błąd**: Obrazek będący linkiem lub niosący informację nie ma tekstu alternatywnego. Czytnik ekranu powie wtedy
tylko "obrazek" lub przeczyta nazwę pliku.

❌ **ŹLE (Złamanie zasady):**

```html
<img src="/promocja-wiosenna.jpg" class="rounded-lg" />
```

✅ **DOBRZE (Naprawione):**

```html
<!-- Czytnik przeczyta opis -->
<img
  src="/promocja-wiosenna.jpg"
  alt="Promocja wiosenna: -20% na wszystkie kurtki do końca marca"
  class="rounded-lg"
/>
```

### **2. Funkcjonalność (Operable) - Interfejs musi dać się obsługiwać:**

**Typowy błąd**: Robienie przycisków ze zwykłych div-ów. Wyglądają jak przyciski dzięki Tailwindowi, ale nie da się na
nie "wejść" tabulatorem ani aktywować ich Enterem.

❌ **ŹLE (Złamanie zasady):**

```html

<div class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
     onclick="openMenu()">
  Menu
</div>
```

✅ **DOBRZE (Naprawione):**

```html
<!-- Użycie natywnego elementu button -->
<button
  type="button"
  class="bg-blue-600 text-white px-4 py-2 rounded"
  onclick="openMenu()"
>
  Menu
</button>
```

### **3. Zrozumiałość (Understandable) - Treść i obsługa muszą być jasne:**

**Typowy błąd**: Brak zdefiniowania języka strony. Jeśli Twoja strona jest po polsku, a przeglądarka "myśli", że
to angielski, syntezator mowy będzie czytał polskie słowa z angielskim akcentem, co brzmi jak bełkot.

❌ **ŹLE (Złamanie zasady):**

```html

<html> <!-- Brak atrybutu lang, domyślny często jest en-US -->
<head>...</head>
<body>
</body>
</html>
```

✅ **DOBRZE (Naprawione):**

```html

<html lang="pl"> <!-- Jasna informacja: czytaj to po polsku -->
<head>...</head>
<body>
<slot />
</body>
</html>
```

### **4. Solidność (Robust) - Kod musi być poprawny technicznie:**

**Typowy błąd**: Przycisk, który zawiera tylko ikonę (np. lupa w wyszukiwarce). Widzący widzi lupę, ale czytnik ekranu
widzi pusty przycisk, bo SVG jest dla niego "przezroczyste". Kod jest poprawny wizualnie, ale nie "solidny"
semantycznie.

❌ **ŹLE (Złamanie zasady):**

```html

<button class="p-2 bg-gray-200 rounded">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
</button>
```

✅ **DOBRZE (Naprawione):**

```html

<button
  class="p-2 bg-gray-200 rounded"
  aria-label="Wyszukaj produkt"
>
  <!-- Dodajemy aria-hidden, żeby czytnik zignorował samą grafikę, skoro ma etykietę przycisku -->
  <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
</button>
```

## Zalety WCAG

- lepsze SEO
- dostępność dla wszystkich
- lepsze UX
- przejrzysty i jasny kod HTML
- bezpieczeństwo prawne

## Wady WCAG

- trudna dokumentacja
- wymaga nauki i dalszej kontroli w procesie tworzenia strony
- większy koszt i czas
- WCAG może ograniczać fantazje designerów UI

## Kiedy warto użyć WCAG

Moim zdaniem zawsze. Strona staje się dostępna dla szerszego grona odbiorców. Spełniamy nowoczesne standardy i regulacje
prawne. Posiadamy prosty i przejrzysty interface bez fajerwerków i dziwactw UI.

## Podsumowanie

- WCAG to międzynarodowy standard tworzony przez W3C, który określa, jak
  budować strony i aplikacje dostępne dla osób z niepełnosprawnościami.
- Dostępność opiera się na zasadach: Postrzegalności, Funkcjonalności, Zrozumiałości i Solidności
  technicznej kodu.
- Najważniejszą obecnie wersją jest WCAG 2.1 na poziomie AA – to ten standard jest wymagany przez
  prawo w Polsce i Unii Europejskiej.
- Wdrożenie WCAG poprawia pozycjonowanie (SEO), zwiększa zasięg o 15% populacji i wymusza pisanie czystszego,
  lepszego jakościowo kodu.
- Choć dostępność wymaga większego nakładu pracy, czasu i nauki (np. atrybutów ARIA), jest niezbędna dla
  tworzenia nowoczesnego i etycznego internetu.

## Bonus:

- WAVE - https://wave.webaim.org/ - sprawdzanie zgodni strony z WCAG, dostępne jako plugin do przeglądarki
- Lighthouse - https://pagespeed.web.dev/ - narzędzie do sprawdzenia wydajności, SEO, WCAG w przeglądarce
- AXE-CORE - https://github.com/dequelabs/axe-core - narzędzie do automatycznego testowania WCAG
- Accessibility Insights for
  Web - https://chromewebstore.google.com/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni - Chrome
  extension
- [WCAG Compliance: Web Accessibility Best Practices](https://www.coursera.org/learn/wcag-compliance-web-accessibility-best-practices) -
  świetny kurs opisujący jak wdrożyć i audytować WCAG w projekcie.
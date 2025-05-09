---
title: "Pętla for w JavaScript: Szybki Kurs #22"
description: "Pętla for w JavaScript"
date: 2025-03-01
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pętla for](#pętla-for)
* [Wyjście z pętli za pomocą `break`](#wyjście-z-pętli-za-pomocą-break)
* [Wyjście z iteracji za pomocą `continue`](#wyjście-z-iteracji-za-pomocą-continue)
* [Problemy z pętlą for](#problemy-z-pętlą-for)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="pętla-for">Pętla for</span>

Najbardziej znaną pętlą w programowaniu jest pętla `for`:

```js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
```

Pętla ta jest znana z wielu innych języków jak Java, C, C ++. W nawiasach okrągłych mamy inicjalizacyjną zmienną `i`, potem mamy warunek dla całej pętli i inkrementowanie zmiennej `i`.

Warunkiem w pętli może być dosłownie wszystko:

```js
for (let i = 0; true; i++) {
  console.log(i); // 0 1 2 3 4
}
```

Możemy tutaj wstawić nawet wartość `true`, oczywiście taka pętla będzie wykonywała się w nieskończoność, ponieważ warunek będzie zawsze prawdziwy.

Możemy też stworzyć `for` pomijając niektóre jej kroki lub nawet wszystkie:

```js
let i = 0;
for (; i <= 3; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
console.log('i:', i) // 4
```

W tym przypadku deklarujemy wartość inicjalizacyjną poza pętlą i pomijajmy ten krok w pętli `for` zostawiając puste miejsce. Zostawiamy jednak średnik. Zauważ też, że zmienna `i` jest teraz dostępna poza pętlą for. I możliwe jest odczytanie wartości poza blokiem pętli.

Możemy takie kombinacje robić z każdym elementem pętli for. Wydaje mi się jednak, że takie formy nie są czytelne i raczej powinniśmy ich unikać.

Możemy nawet stworzyć pustą pętlę:

```js
for (; ;) {
  // infinite
}
```

Taka pętla jest oczywiście nieskończona, w niektórych przypadkach może się przydać. Należy tylko pamiętać, że pusta pętla dla poprawności składni musi zawierać średniki.

## <span id="wyjście-z-pętli-za-pomocą-break">Wyjście z pętli za pomocą `break`</span>

Gdy nasza pętla jest nieskończona lub gdy spełnił się jakiś warunek i nie musi się dłużej iterować, możemy wyjść z pętli za pomocą `break`:

```js
for (let i = 0; i < 100000; i++) {
  if (i === 50) {
    console.log('Break:', i); // 50
    break;
  }
}
```

Gdy pętla dojdzie do momentu, gdzie `i` będzie miało wartość 50, pętla zostanie przerwana. Instrukcja `break` może się przydać w wielu przypadkach, gdy chcemy natychmiast zakończyć pętlę lub gdy oczekujemy na konkretny warunek. Warto wspomnieć, że popularna metoda `forEach`, która często zastępuje
nam instrukcję `for` nie posiada instrukcji `break`
. Natomiast `forEach` omówimy sobie jednak przy omawianiu metod obiektów `array`.

## <span id="wyjście-z-iteracji-za-pomocą-continue">Wyjście z iteracji za pomocą `continue`</span>

Inną delikatniejszą formą `break` jest instrukcja `continue`:

```js
for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) continue;
  console.log('odd:', i); // 1, 3
}
```

W tej pętli używam `continue` do tego aby pominąć liczby parzyste. Jeżeli mój warunek `if` znajdzie liczbę parzystą wywołuje instrukcję `continue` co oznacza przerwanie wykonywania kodu w ciele pętli `for` i przejście do następnej iteracji. Instrukcja `continue` nie przerywa wykonywania pętli, ale
przerywa obecną iterację.

## <span id="problemy-z-pętlą-for">Problemy z pętlą for</span>

Pętla for, deklaracja `var` oraz asynchroniczność to pewien znany problem, z którym możecie się spotkać:

```js
for (var k = 0; k < 3; k++) {
  setTimeout(() => console.log(k), 0) // 3, 3, 3
}
console.log('k: ', k) // 3
```

W tym przypadku deklaracja wartości początkowej nastąpiła za pomocą `var`. Zmienna `k` jest zatem dostępna nie tylko w pętli `for`, ale też poza nią. Ponadto, gdy wywołamy kod asynchroniczny, to zobaczymy, że produkuje on tylko wartość `3`. Nie przestrzega więc warunku, że pętla powinna wyświetlać
tylko wartości mniejsze od 3.

Jeden problem to taki, że jest to asynchroniczność i kod ten wykonuje się, gdy zakończy się pętla. Gdy zakończy się pętla, zmienna k, ma wartość 3. Drugi problem to taki, że zmienna`var` nie respektuje zakresu blokowego, jest tutaj zmienną globalną.

Rozwiązaniem jest zawsze użycie `let`:

```js
for (let k = 0; k < 3; k++) {
  setTimeout(() => console.log(k), 0) // 0, 1, 2
}
```

W tym przypadku mamy prawidłowe wyniki. Deklaracja `let` przestrzega zakresu blokowego. Przy każdej iteracji powstaje domknięcie i w ten sposób kolejne iteracje zmiennej `k` dostępne są dla wywołania asynchronicznego.

Pytanie o taką pętlę możecie spotkać na rozmowie o pracę. O asynchroniczności, zakresach i domknięciach będziemy natomiast rozmawiać w kolejnych działach. Natomiast teraz należy pamiętać, że do inicjalizacji w pętli używamy zawsze `let`.

Nie używamy natomiast inicjalizacji za pomocą `const`. Ponieważ inicjalizator w trakcie iteracji przybiera nowe wartości, jak wiemy zmienne zainicjalizowane za pomocą `const` nie mogą zmieniać wartości.

## <span id="co-warto-zapamiętać">Co warto zapamiętać</span>

- pętla `for` znana jest z wielu różnych języków programowania
- pętla `for` jest bardzo elastyczne i nie są wymagane jej wszystkie elementy
- instrukcja `break` przerywa pętlę
- instrukcja `conitnue` przerywa daną iterację pętli

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
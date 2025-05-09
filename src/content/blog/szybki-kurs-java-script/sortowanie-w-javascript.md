---
title: "Sortowanie w JavaScript: Szybki Kurs #43"
description: "Poznaj zasady działania metody sort w JavaScript i naucz się jej używać z komparatorem."
date: 2025-02-08
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Metoda sort](#metoda-sort)
* [Komparator dla metody sort](#komparator-dla-metody-sort)
* [Krótszy zapis komparatorów](#krótszy-zapis-komparatorów)
* [Sortowanie wartości string](#sortowanie-wartości-string)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="metoda-sort">Metoda sort</span>

W obiekcie `Array` mamy do dyspozycji metodę `sort`. Ma ona kilka zasad działania i aby sprawnie się nią posługiwać, warto zaznajomić się dokładnie z jej działaniem.

Na początek po prostu wywołajmy metodę sort:

```js
const arr1 = [2, 4, 5, 1, 3];
arr1.sort();
console.log(arr1); // [ 1, 2, 3, 4, 5 ]
```

Metoda sort wywołana na tablicy bez przekazanej funkcji `callback` sortuje elementy od najmniejszego do największego. Widzimy też, że metoda `sort` zmienia nam oryginalną tablicę. Dlatego, jeżeli nie chcemy modyfikować oryginalnej tablicy, przed sortowaniem należy wykonać kopię na przykład z
operatorem `spread` albo z metodą `slice`.

Jak wspomniałem wcześniej metoda `sort` bez dodatkowej funkcji `callback` sortuje rosnąco:

```js
const arr2 = [2, 100, 30];
arr2.sort();
console.log(arr2); //   [ 100, 2, 30 ]
```

Ten przykład pokazuje jednak coś zupełnie innego i wydaje się, że tym razem tablica została źle posortowana. Wszystko jest jednak w porządku, jeśli chodzi o standardowe działanie metody `sort`. Bez funkcji `callback`, która najczęściej nazywana jest `comparatorem` metoda sort sortuje w sposób
leksykograficzny.

Wszystkie wartości zmieniane są do wartości `string` i porównywane są przez znaki kodowe w standardzie UTF-16. Oznacza to, że liczba `100` zamieniona na stringa, ma mniejszy znak kodowy niż liczba 2 reprezentowana jako string. W naszym odbiorze sortowane wydaje się nieprawidłowe, jednak dla
komputera wykonane jest prawidłowo.

Dlatego, jeżeli chcemy sortować tablice, warto zadbać o zaimplementowanie prawidłowego `comparatora`, którego przekażemy jako funkcję.

## <span id="komparator-dla-metoda-sort">Komparator dla metody sort</span>

Aby uniknąć standardowego sortowania przez porównanie kodów Unicode w systemie UTF-16, możemy stworzyć i przekazać do metody `sort` funkcję `callback`, funkcja ta często jest nazywana `comparator`.

```js
const arr3 = [2, 100, 30];
const comparatorASC = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  }
};
arr3.sort(comparatorASC);
console.log(arr3); // [ 2, 30, 100 ]
```

Stworzyłem funkcję `comparator` z rozbudowaną instrukcją `if`, ale można to wszystko zapisać krócej, co zobaczymy później. Zrobiłem to jednak specjalnie, aby Wam pokazać jakie wartości i kiedy należy zwracać przy porównaniu.

Jest to `comparator` do sortowania rosnącego. Funkcja `comparator` przy każdej iteracji, przyjmuje dwa elementy. Jeżeli element `a` jest mniejszy niż `b` zwracamy wartość mniejszą niż zero, nie musi być to `-1` ale dowolna ujemna wartość. Jeżeli więc z komparatora, zwracamy wartość ujemną przy
porównaniu dwóch elementów, oznacza to, że pierwszy element w sortowaniu powinien być przed elementem drugim. Czyli w tym przypadku `a` powinno być w tablicy zawsze przed `b`. Nie ma żadnych zmian.

Jeżeli zwrócimy wartość większą niż `0` oznacza to, że drugi element, czyli `b` powinien być przed elementem `a`. Elementy zamieniane są miejscami.

Jeżeli zwracamy wartość `0` oznacza to, że oba elementy są równe sobie i nie musi następować zmiana ich pozycji w tablicy.

```js
const comparatorDESC = (a, b) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else if (a === b) {
    return 0;
  }
};
arr3.sort(comparatorDESC);
console.log(arr3); // [ 100, 30, 2
---
title: "Porównanie tablic w JavaScript: Szybki Kurs #46"
description: "Różne metody porównywania tablic w JavaScript: referencje, wartości, obiekty, Lodash."
date: 2025-02-05
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Porównanie referencji tablic](#porownanie-referencji-tablic)
* [Porównanie wartości tablic](#porownanie-wartosci-tablic)
    * [Porównanie z every](#porownanie-z-every)
    * [Porównywanie list z obiektami](#porownywanie-list-z-obiektami)
* [Porównanie tablic za pomocą Lodash](#porownanie-tablic-za-pomoca-lodash)
* [Co warto zapamiętać](#co-warto-zapamietac)

Czasami możemy mieć potrzebę porównania dwóch tablic. Tutaj też pada pytanie, co chcemy porównać. Czy tablice mają mieć tę samą długość i te same wartości, czy może te same referencje. Należy bowiem pamiętać, że tablice to obiekty.

## <span id="porownanie-referencji-tablic">Porównanie referencji tablic</span>

Na początek spróbujmy porównać puste tablice za pomocą podwójnego i potrójnego operatora porównania:

```text
console.log([] === []); // false
console.log([] == []); // false
```

Porównujemy puste tablice i otrzymujemy wartość `false`. Na pierwszy rzut oka wydaje się, że tablice są takie same. JavaScript w tym przypadku porównuje referencje, a nie wartości tablicy. Tutaj każda tablica jest nową tablicą z nową referencją. Są to więc różne tablice.

Używam także podwójnego operatora do porównania wyników, ale pamiętajmy, że tego operatora lepiej nie używać.

Nie zawsze zależy nam na porównaniu referencji, w niektórych przypadkach może nam się jednak przydać:

```text
const a = [];
const b = a;
console.log(a === b); // true
```

W tym kodzie widzimy, że przepisanie referencji z jednej zmiennej do drugiej i porównanie obu zmiennych daje wartość `true`. W niektórych przypadkach, gdy chcemy sprawdzić, czy operujemy na tej samej tablicy, operator potrójnego porównania na pewno się sprawdzi. Pamiętajmy jednak, że działa on tylko
i wyłączenie na podstawie referencji, a nie wartości tablicy.

## <span id="porownanie-wartosci-tablic">Porównanie wartości tablic</span>

Częściej jednak będziemy chcieli sprawdzić, czy tablice mają identyczne wartości. Tutaj rozwiązań może być wiele. Wszystko zależy jakie wartości w tablicy będą porównane i czy tablice są zagnieżdżone.

### <span id="porownanie-z-every">Porównanie z every</span>

Jednym ze sposobów jest stworzenie funkcji, która porówna nam wartości:

```text
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5];

function arrayEquals(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

console.log(arrayEquals(arr1, arr2)); // true
```

Funkcja `arrayEquals` na początku sprawdza, czy tablice mają tę samą długość. To daje odpowiedź czy będziemy dalej sprawdzać wartości w tablicy. Jeżeli tablice mają różną długość, nie ma sensu ich sprawdzać.

Do tego używamy metody `every`, jej zdaniem jest sprawdzenie, czy wszystkie wartości spełniają warunek określony w tej funkcji. Naszym warunkiem jest porównanie wartości z tablicy `a` do wartości z tablicy `b`. Do wartości z tablicy `b`
odwołujemy się przez indeks. Jeżeli natrafimy na różnicę, funkcja `every` od razu kończy pracę i zwraca `false`.

Ta funkcja oczywiście może być rozbudowana o sprawdzenie rekurencyjne, gdy mamy zagnieżdżone listy. To rozwiązanie nie zadziała też przy listach z obiektami. Gdy będziemy mieli listę z obiektami otrzymamy zawsze wartość `false` ponieważ potrójne porównanie sprawdzi tylko referencję. Przy obiektach
warto zadbać o dodatkowy algorytm sprawdzający wartości obiektów.

Również listy przed porównaniem powinny być posortowane. Ten przykład pokazuje działanie na listach posortowanych.

### <span id="porownywanie-list-z-obiektami">Porównywanie list z obiektami</span>

```text
const arr3 = [{ a: 1 }, { a: 2 }];
const arr4 = [{ a: 1 }, { a: 2 }];

console.log(JSON.stringify(arr3) === JSON.stringify(arr4)); // true
```

Gdy mamy bardziej skomplikowane struktury możemy użyć `JSON.stringify`. Za pomocą tej metody struktury konwertowane są do obiektów JSON. W tym przypadku udaje nam się porównać listę z obiektami i jesteśmy pewni, że wszystkie obiekty reprezentują te same wartości. To rozwiązanie działa nawet przy
zagnieżdżonych strukturach.

Niestety to rozwiązanie ma kilka problemów, na przykład wartość `undefined` nie jest reprezentowana w formacie JSON i będzie zamieniona na wartość `null`. Jest to szczegół, ale jeżeli zależy nam na idealnej dokładności, to możemy mieć problem.

Tutaj także należy pamiętać o sortowaniu elementów, zazwyczaj jest ono niezbędne do sprawdzenia identyczności.

## <span id="porownanie-tablic-za-pomoca-lodash">Porównanie tablic za pomocą Lodash</span>

Innym wariantem może być wykorzystanie gotowego rozwiązania. Jak się domyślamy, miliony programistów już miało problem porównania tablic i na pewno powstało gotowe rozwiązanie. Jednym z nich jest metoda `isEqual` z biblioteki Lodash.

https://lodash.com/docs/4.17.15#isEqual

Jak widzicie, są różne podejścia. W Internecie znajdziecie jeszcze mnóstwo innych rozwiązań. Wszystko zależy od potrzeb. To już Waszym zadaniem jest dobranie rozwiązania, które zadziała prawidłowo w Waszym kodzie.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- porównanie tablic za pomocą potrójnego operatora sprawdzi tylko równość referencji
- do porównania musimy stworzyć własną funkcję na przykład z użyciem metody `every`
- do bardziej zagnieżdżonych struktur możemy użyć `JSON.stringify`, to rozwiązanie też ma swoje problemy
- dobrym pomysłem jest użycie zewnętrznej biblioteki jak Lodash

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
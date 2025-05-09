---
title: "Operator spread w JavaScript: Szybki Kurs #38"
description: "Omówienie operatora spread w JavaScript, jego zastosowania do rozpraszania elementów, łączenia tablic i tworzenia kopii."
date: 2025-02-13
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Spread operator - rozproszenie elementów](#spread-operator---rozproszenie-elementow)
* [Spread operator - łączenie tablic](#spread-operator---laczenie-tablic)
* [Kopia tablicy za pomocą spread operatora](#kopia-tablicy-za-pomoca-spread-operatora)
* [Spread operator ze stringami](#spread-operator-ze-stringami)
* [Co warto zapamiętać](#co-warto-zapamietac)

Będąc przy tablicach musimy omówić operator `spread`. Nie dotyczy on tylko i wyłącznie tablic. Jest używany do wszelkich wartości iterowalnych jak `stringi` czy obiekty iterowalne. Obiekty jednak zostawimy na zupełnie inny dział tego kursu.

## <span id="spread-operator---rozproszenie-elementow">Spread operator - rozproszenie elementów</span>

W języku polskim operator ten nazywany jest na przykład rozproszeniem i ta nazwa trafnie określa to co robi operator `spread`:

```text
const arr1 = [1, 2, 3, 4, 5];
console.log(...arr1); // 1 2 3 4 5
```

Używając trzech kropek przed tablicą, powodujemy rozproszenie jej na pojedyncze elementy. Za chwilę pokażę Wam kilka przykładów użycia i zobaczymy, jak przydatny jest ten operator.

Pierwszy przykład to użycie na metody `min` z klasy `Math`:

```text
const result1 = Math.min(1, 2, 3, 4, 5);
console.log(result1); // 1
```

Jeżeli chcemy sprawdzić, która liczba jest najmniejsza, musimy przekazać tam każdą liczbę oddzielnie. Jest to dość kłopotliwe, bo zazwyczaj przy grupie elementów posługujemy się właśnie tablicami.

Na szczęści możemy użyć operatora `spread`:

```text
const result2 = Math.min(...arr1);
console.log(result2); // 1
```

Używając tego operatora, rozbijamy tablicę na pojedyncze elementy. Jest to niezwykle przydatny operator, który w nowoczesnym JavaScript używany jest niezwykle często.

## <span id="spread-operator---laczenie-tablic">Spread operator - łączenie tablic</span>

Za pomocą operatora `spread` możemy w bardzo prosty sposób połączyć tablice:

```text
const arr2 = [1, 2];
const arr3 = [3, 4, 5];

const result3 = [...arr2, ...arr3];
console.log(result3); // [ 1, 2, 3, 4, 5 ]
```

Mamy dwie gotowe tablice. Elementy tych dwóch tablic rozpraszamy do zupełnie nowej tablicy. Jest to bardzo często spotykany kod w JavaScript. Ten zapis świetnie zastępuje nam metodę `concat`.

Możemy robić różne kombinacje łączenia z operatorem `spread`:

```text
const result4 = [1, 2, ...arr3, 6, 7];
console.log(result4); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

W tym przypadku tworzymy tablicę i dodatkowo w środku tej tablicy pobieramy elementy z innej tablicy za pomocą `spread`
operatora. Jest to bardzo krótki, zwięzły i czytelny zapis.

## <span id="kopia-tablicy-za-pomoca-spread-operatora">Kopia tablicy za pomocą spread operatora</span>

Operator `spread` jest używany często do wykonania kopii tablicy:

```text
const arr4 = [1, 2, 3, 4];

const copy1 = [...arr4];
copy1.push(50);
console.log(arr4, copy1); // [ 1, 2, 3, 4 ]  [ 1, 2, 3, 4, 50 ] 
```

W tym przypadku do nowej zmiennej `copy1` kopiujemy wcześniej zadeklarowaną tablicę. Dodanie nowej wartości do `copy1`
nie powoduje zmiany tablicy oryginalnej. Mamy więc stworzoną kopię bez referencji, a zupełnie oddzielną tablice.

To samo można też wykonać za pomocą metody `slice`:

```text
const copy2 = arr4.slice();
copy2.push(50);
console.log(arr4, copy2); // [ 1, 2, 3, 4 ] [ 1, 2, 3, 4, 50 ] 
```

Do metody `slice` nie przekazujemy żadnych parametrów i stworzymy w ten sposób kopię tablicy. Działanie jest takie samo jak przy operatorze `spread`.

Inaczej jednak wygląda sytuacja, gdy tablica przechowuje inne obiekty, a nie typy proste:

```text
const arr5 = [{ a: 1 }, { a: 2 }];
const copy3 = [...arr5];
copy3[0].a = 100;
console.log(copy3); // [ { a: 100 }, { a: 2 } ]
console.log(arr5); // [ { a: 100 }, { a: 2 } ]
```

W tym przypadku mamy tablicę, która przetrzymuje obiekty. Wykonujemy kopię z pomocą `spread` operatora. Na kopi odwołujemy się do pierwszego elementu i modyfikujemy pole `a` w obiekcie.

Wypisując i kopię i oryginalną tablicę, widzimy, że dane zostały zmienione w każdej tablicy. Co prawda wykonaliśmy kopię samej tablicy, ale jest to *shallow* copy, czyli płytka kopia. Ponieważ obiekty referencyjne w środku tablicy nie zostały skopiowane.

W tym przypadku należałoby zrobić deep copy. Niestety nie jest to problem trywialny i ma on mnóstwo różnych rozwiązań w zależności od naszych potrzeb. W JavaScript nie istnieje jedna metoda, która to za nas zrobić.

Niektórzy sugerują użycie zewnętrznej biblioteki jak Lodash i metody `cloneDeep`:

https://lodash.com/docs/4.17.15#cloneDeep

Inni korzystają  `JSON.parse` oraz  `JSON.stringify`, ale i to rozwiązanie ma wiele problemów. Dlatego w takich przypadkach użyjmy gotowej metody z Lodash albo stwórzmy własne rozwiązanie.

## <span id="spread-operator-ze-stringami">Spread operator ze stringami</span>

`Spread ` operator działa nie tylko z tablicami czy obiektami iterowalnymi. Działa także ze stringami:

```text
const str = 'Hello';
const strArray = [...str];
console.log(strArray); //  [ 'H', 'e', 'l', 'l', 'o' ]
```

Możemy rozbić stringa na pojedyncze elementy i stworzyć z jego wartości tablicę elementów. Bardzo prosta i przydatna funkcjonalność.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- `spread` operator rozbija tablice na pojedyncze elementy
- `spread` operator idealnie nadaje się do łączenia tablic
- `spread` operator tworzy shallow copy tablic
- `spread` operator może być też użyty z wartościami string

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
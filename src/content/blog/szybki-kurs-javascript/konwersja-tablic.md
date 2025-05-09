---
title: "Konwersja tablic w JavaScript: Szybki Kurs #45"
description: "Konwersja tablic na string, number, boolean i na odwrót"
date: 2025-02-06
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Konwersja tablica na string](#konwersja-tablica-na-string)
* [Konwersja string na tablicę](#konwersja-string-na-tablice)
* [Konwersja tablica na number](#konwersja-tablica-na-number)
* [Odejmowanie i dodawanie tablic](#odejmowanie-i-dodawanie-tablic)
* [Konwersja number do tablicy](#konwersja-number-do-tablicy)
* [Tablica do boolean](#tablica-do-boolean)
* [Co warto zapamiętać](#co-warto-zapamietac)

Najczęstszą konwersją tablic na typ prymitywny będzie konwersja na string. Lub też na odwrót i będziemy próbowali z wartości `string` zrobić tablicę. Czasami też będziemy chcieli przekonwertować liczbę do tablicy. Przyjrzymy się też niejawnej konwersji i dziwnym przypadkom.

## <span id="konwersja-tablica-na-string">Konwersja tablica na string</span>

Konwersja tablicy na string jest banalnie prosta:

```javascript
const arr1 = [1, 2, 3, 4];
console.log(arr1.toString()); // '1,2,3,4'
```

```javascript
const arr2 = ['foo', 'boo', 'bar'];
console.log(arr2.toString());  // 'foo,boo,bar'
```

Wszystko sprowadza się do wywołania metody `toString()`. Otrzymujemy wartości oddzielone przecinkami w formie jednego stringa. Pamiętajmy, że ta sama metoda `toString()` wywoływana jest przy wszystkich niejawnych konwersjach, o czym przekonamy się później. Jeżeli bardzo nam zależy na innym
zachowaniu metody `toString()`, możemy nadpisać `prototype.toString()`. Nie jest to jednak dobre rozwiązanie i nie zachęcam.

Inną metodą jest metoda `join()`. Poznaliśmy ją we wcześniejszych lekcjach:

```javascript
console.log(arr1.join('')); // 1234
console.log(arr2.join(' / ')); // foo / boo / bar
```

W tej metodzie to my decydujemy, jaki będzie separator między elementami. Możemy też przekazać pustą wartość `string` i skleić ze sobą wszystkie elementy. Zdecydowanie częściej będzie korzystać właśnie z tej metody do wyświetlania elementów tablicy jako `string`.

## <span id="konwersja-string-na-tablice">Konwersja string na tablicę</span>

Niektóre sposoby konwersji wartości string na tablice omawialiśmy i powinny być wam znane. Sposób zależy też od tego, co chcemy osiągnąć. Czy chcemy rozbić jedno słowo na litery czy może podzielić zdanie według jakiegoś separatora, na przykład spacji.

Pierwszy przykład to rozbicie słowa na litery:

```javascript
const str1 = 'hello';
console.log([...str1]);
```

Jest to bardzo prosty i czytelny zapis z operatorem `spread`. Musimy pamiętać o użyciu nawiasów kwadratowych, aby rozproszyć wartość string do tablicy.

Kolejny sposób to użycie metody `split()`:

```javascript
console.log(str1.split(''));
```

Do metody `split()` przekazujemy separator, według którego chcemy rozbić wartość string. Jeżeli rozbijamy słowo na pojedyncze litery, to używamy pustego znaku jako separator.

Metoda `split()` świetnie sprawdzi się przy rozbijaniu zdań na pojedyncze wyrazy:

```javascript
const str2 = 'brown fox jumps over the lazy dog';
console.log(str2.split(' ')); // ["brown", "fox", "jumps", "over", "the", "lazy", "dog"]
```

Tutaj do metody `split()` jako separator podajemy spację. W ten sposób każdy wyraz jest oddzielnym elementem tablicy.

Metoda `split()` ma jeszcze dodatkowy parametr:

```javascript
console.log(str2.split(' ', 3)); // [ 'brown', 'fox', 'jumps' ]
```

Przekazując parametr, możemy określić, ile elementów trafi do tworzonej tablicy. Ten dodatkowy parametr może się przydać w wielu sytuacjach, gdy interesują nas tylko konkretne wartości.

To najpopularniejsze sposoby na konwersję wartości `string` na tablicę. Powinny Wam wystarczyć w każdej sytuacji.

## <span id="konwersja-tablica-na-number">Konwersja tablica na number</span>

Sytuacja gdzie z całej tablicy będziecie musieli zrobić typ `number` raczej w Waszym kodzie się nie wydarzy. Jest tu jednak pewna ciekawostka, na którą warto zwrócić uwagę:

```javascript
const arr3 = [42];
console.log(Number(arr3)); // 42
```

W tym przypadku mamy tablicę z jednym elementem `number`. Gdy tablicę przekażemy do konwersji na typ `number`
otrzymujemy wartość 42.

Co się jednak stanie, gdy w tablicy będziemy mieli więcej elementów:

```javascript
const arr4 = [1, 2, 3];
console.log(Number(arr4)); // NaN
```

Gdy w tablicy znajdzie się więcej elementów i spróbujemy taką tablicę przekazać do funkcji `Number()` w celu konwersji, otrzymamy wartość `NaN`.

Wspominałem w dziale konwersji, że tylko wartości prymitywne mogą być konwertowane na inny typ. Dlatego, zanim JavaScript zacznie konwersję tablicy, musi uzyskać z niej typ prymitywny i robi to za pomocą metody `toString()` sprowadzając wszystko do typu `string`.

Gdy mamy jeden element w tablicy, wywołanie `toString()` zwraca nam `'42'` jako `string` i konwersja takiej wartości z funkcją `Number()` jest możliwa.

W drugim przypadku:

```javascript
console.log(arr4.toString()); // '1,2,3'
```

Zwracana wartość przez metodę `toString()` nie wygląda jak poprawna liczba, która może być konwertowana do typu `number`
.

Stąd mogą pojawiać się wątpliwości, jak to działa, a czasami nawet to pytanie może pojawić się na rozmowie technicznej. Natomiast sama konwersja całej tablicy na typ `number` raczej nie ma większego sensu.

Jeżeli przetrzymujemy w tablicy liczbę tak, że każdy element to pojedyncza cyfra, zawsze możemy użyć omawianej przed chwilą metody `join()` i połączyć elementy w jeden wielki numer.

```javascript
console.log(Number([1, 2, 3].join(''))); // 123
```

Całość musi jeszcze konwertować za pomocą funkcji `Number()`, ponieważ metoda `join()` zwraca typ `string`.

## <span id="odejmowanie-i-dodawanie-tablic">Odejmowanie i dodawanie tablic</span>

Ciekawe przypadki mogą się również pojawić przy działaniach matematycznych na tablicach:

```javascript
console.log([42] - [2]); // 40
```

W tym przypadku próbujemy odejmować dwie tablice. Dzieje się to, co zawsze, tablice jako obiekty przekształcane są na typ prymitywny za pomocą metody `toString()`. Mamy więc dwie wartości `string`. Operator odejmowania wymusza potem konwersję na typ `number` , która kończy się z sukcesem i
prawidłowo może zostać przeprowadzone działanie odejmowania.

Oczywiście, jeśli tablica będzie miała więcej elementów, takie działanie się nie uda.

Inaczej wygląda sytuacja przy dodawaniu:

```javascript
console.log([42] + [2]); // '422'
console.log([1, 2, 3] + [42]); // '1,2,342'
```

W tym przypadku następuje konkatenacja stringów. Z każdej tablicy otrzymamy wartości string przez wywołanie metody `toString()` po czym obie wartości będą ze sobą połączone, jak to się dzieje w przypadku zwykłych stringów.

W JavaScript nie jest więc tak, że możemy na tablicach wykonywać działania matematyczne. Jeżeli mamy taką potrzebę to sami musimy zadbać o odpowiedni algorytm lub poszukać odpowiedniej biblioteki.

## <span id="konwersja-number-do-tablicy">Konwersja number do tablicy</span>

Ten przypadek jest dość rzadki, ale czasami możemy mieć potrzebę konwersji liczby na tablicę, czyli trzymania każdej cyfry jako oddzielny element:

```javascript
const num = 12345;
const numArr = String(num).split('');
console.log(numArr); // [ '1', '2', '3', '4', '5' ]
```

Jeden ze sposobów to zamiana liczby na `string` i użycie metody `split()` czy nawet operatora `spread` . Jeżeli z typu `number` zrobimy typ `string` to sprawa wydaje się już prosta. Jest tylko jeden problem, liczby w tej tablicy są typu `string` nie `number`.

Dodatkowo więc musimy wykonać konwersję na przykład przez metodę `map`:

```javascript
const numArr2 = numArr.map(Number);
console.log(numArr2); // [ 1, 2, 3, 4, 5 ]
```

Używając metody `map` i przekazując funkcję `Number` jako `callback` możemy elementy `string` przerobić na typ `number`. Zauważcie, że nie musiałem rozpisać całej funkcji `calback` w taki sposób:

```javascript
numArr.map((e) => Number(e));
```

Funkcja `Number` przyjmuje jeden parametr, mogę więc przekazać od razu funkcję, bez wywołania i JavaScript dokładnie będzie wiedział jak jej użyć.

Inny krótszy i czytelniejszy sposób to użycie `Array.from`

```javascript
const numArr3 = Array.from(String(num), Number);
console.log(numArr3); // [ 1, 2, 3, 4, 5 ]
```

Do `Array.from` przekazujemy liczbę jako typ `string`, który jest iterowalny i dzięki temu za pomocą `Array.from` możemy zrobić z niego tablicę. Drugi parametr to funkcja `Number`, która otrzyma każdy element ze stworzonej tablicy i przetworzy go na typ `number`. W ten sposób też otrzymamy tablicę z
liczbami.

## <span id="tablica-do-boolean">Tablica do boolean</span>

Zazwyczaj nie będziemy konwertować jawnie tablicy do wartości `boolean`, trudno mi znaleźć taki przypadek kiedy to może się przydać. Zazwyczaj będzie to konwersja niejawna przy wszelkich instrukcjach `if` i innych operatorach pracujących na wartościach `boolean`:

```javascript
console.log(Boolean([])); // true
console.log(Boolean([false])); // true
console.log(Boolean([1, 2, 3])); // true
```

Jak wiemy w tabelce wartości fałszywych [link](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) nie ma tablicy. Dlatego każda tablica nieważne czy pusta, czy wypełniona wartościami `false` zawsze zwróci `true`.

Jest to bardzo ważne, pusta tablica zawsze zwraca `true` dlatego, jeżeli chcemy sprawdzić, czy tablica ma jakieś elementy, nie możemy opierać się na takiej instrukcji `if`:

```javascript
const emptyArr = [];

if (emptyArr) {
  console.log('it works'); //it works
}
```

Ta instrukcja zawsze się wykona, ponieważ każda tablica konwertowana jest do `true` nawet ta pusta.

Jeżeli zależy nam na sprawdzeniu, czy tablica posiada jakieś wartości musimy wykorzystać właściwość `length`:

```javascript
if (emptyArr.length) {
  console.log('it never works');
}
```

Gdy tablica jest pusta `length` zwraca wartość 0, która konwertowana jest do `false`. Jest to jedyny i najlepszy sposób na sprawdzenie, czy tablica posiada elementy i czy możemy ją w jakikolwiek sposób procesować.

Ponieważ typ `boolean` posiada tylko dwie wartości jak `true` lub `false` nie mamy potrzeby stosowania wyszukanych metod do konwersji typu `boolean` na tablicę.

```javascript
console.log([true, false, true]); // [ true, false, true ]
```

Po prostu umieszczamy te wartości w tablicy.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- tablice na string konwertujemy za pomocą metod `toString()` lub `join()`
- string na tablicę konwertujemy za pomocą operatora `spread` lub metody `split()`
- możemy rozbić liczbę na tablicę najlepiej użyć do tego metody `Array.from`
- tablica zawsze konwertuje się na wartość `true`

  [Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
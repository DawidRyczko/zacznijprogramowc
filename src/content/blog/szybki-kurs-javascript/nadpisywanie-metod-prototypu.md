---
title: "Nadpisywanie metod prototypu w JavaScript: Szybki Kurs #58"
description: "Dowiedz się, jak nadpisywać metody odziedziczone oraz modyfikować prototypy w JavaScript, aby zmieniać zachowanie wbudowanych obiektów."
date: 2025-01-23
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Nadpisanie metody odziedziczonej](#nadpisanie-metody-odziedziczonej)
* [Zmiana metod w prototypie](#zmiana-metod-w-prototypie)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="nadpisanie-metody-odziedziczonej">Nadpisanie metody odziedziczonej</span>

Prototypy wbudowanych obiektów JavaScript zapewniają wiele metod i właściwości. Zazwyczaj wykorzystujemy, je tak jak zostały zaprojektowane. Czasami jednak potrzebujemy zmienić zachowanie takiej metody.

`Object.prototype` ma wbudowaną metodę `toString()`. Metoda ta jest bardzo często nadpisywana przez inne obiekty jak `Array`, w `Array.prototype` jest własna implementacja `toString()`:

```text
const arr = [1, 2, 3];
console.log(arr.toString()); // 1, 2, 3
```

Wywołując `toString()` na tablicy, otrzymujemy wartość tablicy w formie tekstu. Każdy element tablicy dodatkowo oddzielony jest przecinkiem.

Gdy stworzymy swój własny obiekt, sytuacja wygląda zupełnie inaczej:

```text
const obj = {
  name: 'John',
  surname: 'Rambo',
};
console.log(obj.toString()); // [object Object]
```

Otrzymujemy dziwny zapis, który tak naprawdę informuje nas o tym, że metoda ta została wywołana z obiektu o typie Object. Możemy to poprawić i dodać własną implementację metody `toString()` do naszego obiektu:

```text
obj.toString = function() {
  return this.name + ' ' + this.surname;
};
console.log(obj.toString()); // John Rambo
```

Dodaję do stworzonego obiektu nową metodę `toString()`. Tym sposobem nadpisuję metodę, która została odziedziczona z `Object.prototype`. Od tego momentu, gdy wywołam `toString()` na moim obiekcie, metoda zwróci dokładnie to co zaimplementowałem. Dokładnie tak samo działa to w przypadku
tablic,  `Array.prototype` nadpisuje metodę `toString`
pochodzącą z `Object.prototype`.

Ten proces nazywamy nadpisaniem lub przysłonięciem metod odziedziczonych. W ten sposób oczywiście możemy nadpisać wszystkie odziedziczone metody w naszym obiekcie. Ważne jest to, że to nadpisanie dotyczy tylko naszego obiektu. Gdy stworzymy nowy obiekt, będziemy musieli w nim znowu nadpisać
metodę `toString()`.

## <span id="zmiana-metod-w-prototypie">Zmiana metod w prototypie</span>

Posłużyłem się wcześnie przykładem tablicy i pokazałem, że tam metoda `toString()` działa zupełnie inaczej niż ta pochodząca z `Object.prototype`, ponieważ została nadpisana. W dodatku działa tak dla każdej stworzonej tablicy. Natomiast moja metoda `toString()`, którą stworzyłem w obiekcie, działa
tylko dla tego obiektu.

Jest jednak możliwość nadpisania metody `toString()` dla każdego obiektu:

```text
const obj2 = {
  name: 'John',
};

Object.prototype.toString = function() {
  return 'foo';
};

const obj3 = {
  name: 'Rambo',
};

console.log(obj2.toString()); // foo
console.log(obj3.toString()); // foo
```

W tym przykładzie odwołuję się do `Object.prototype` i do metody `toString`, którą nadpisuję własną funkcją. Takie nadpisanie metody w `Object.prototype`, powoduje globalną zmianę w całej aplikacji. Nie jest to istotne czy zmiana prototypu nastąpiła po deklaracji jakiegoś obiektu. Każdy obiekt
współdzieli dostęp do tego samego `Object.prototype` i zmiana ta dotyka każdego obiektu.

Teraz wywołując metodę `toString()` na obiektach, wywołuję funkcję, którą przypisałem do `Object.prototype.toString`. Natomiast nasz poprzedni obiekt, w którym została nadpisana metoda `toString()` dalej korzysta ze swojej metody, ponieważ w tamtym obiekcie nastąpiło przysłonięcie metody
z `Object.prototype`.

Do prototypu `Object.prototype` możemy również dodawać nowe własne metody. W ten sposób możemy wszystkim obiektom w aplikacji dopisać całkowicie nową metodę. Modyfikacja prototypów jest potężnym narzędziem. Należy bardzo ostrożnie podchodzić do modyfikowania prototypów albo najlepiej nie robić tego
wcale.

Prototypy globalnych obiektów modyfikowane zazwyczaj są przez skrypty polyfills lub specjalistyczne biblioteki. W naszym kodzie powinniśmy zrobić wszystko, aby uniknąć modyfikacji prototypu. Taka globalna zmiana jest niebezpieczna i można łatwo wpaść w konflikt nazw z innymi bibliotekami, które
wykorzystują wbudowane prototypy.

Możemy również zmieniać prototypy każdego globalnego obiektu jak `String.prototype`, `Array.prototype` i inne. Wtedy zmiany te dotykają konkretnych typów. To właśnie najczęściej skrypty polyfills dodają do konkretnych typów nowe funkcjonalności, które jeszcze nie są wspierane przez przeglądarki, a
znajdują się już w specyfikacji JavaScript.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- metody, które są w prototypach możemy nadpisywać w swoich obiektach
- możemy globalnie zmieniać implementacje metod przez modyfikację w prototypie, na przykład możemy zmienić metodę `Object.prototype.toString`
- zmiana w prototypie wpływa od razu na wszystkie obiekty w aplikacji
- inne globalne obiekty jak `Array`, `String`, `Number` mają swoje prototypy, które często nadpisują funkcjonalności z `Object.prototype`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
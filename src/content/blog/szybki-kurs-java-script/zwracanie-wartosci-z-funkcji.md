---
title: "Funkcja zawsze coś zwraca w JavaScript: Szybki Kurs #31"
description: "W JavaScript funkcje zawsze coś zwracają. Albo jest to wartość zwrócona jawnie przez słowo return, albo jest to wartość domyślna `undefined`."
date: 2025-02-20
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Funkcja zawsze coś zwraca](#funkcja-zawsze-cos-zwraca)
* [Używanie return](#uzywanie-return)
* [Return i arrow functions](#return-i-arrow-functions)
* [Funkcja zwracająca funkcję](#funkcja-zwracajaca-funkcje)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="funkcja-zawsze-cos-zwraca">Funkcja zawsze coś zwraca</span>

W JavaScript funkcje zawsze coś zwracają. Albo jest to wartość zwrócona jawnie przez słowo return, albo jest to wartość domyślna `undefined`.

```javascript
function fun1() {
  console.log('Hello wrolds');
}
```

Na tym przykładzie mamy funkcję bez słowa kluczowego `return`. Jej zadaniem jest wypisanie wartości do konsoli. Nie zwracamy z tej funkcji żadnej wartości.

Spróbujmy jednak pobrać wartość zwracaną z tej funkcji:

```javascript
const value1 = fun1();
console.log(value1); // undefined
```

Funkcja bez jawnie zadeklarowanej instrukcji `return` zwraca wartość `undefined`. Przy tworzeniu kodu musimy być zatem ostrożni, ponieważ kompilator JavaScript nie będzie zgłaszał błędu, nawet gdy chcemy pobrać wartość z funkcji, która nic nie zwraca i otrzymamy po prostu `undefined`.

## <span id="uzywanie-return">Używanie return</span>

Czasami pomimo zastosowania słowa kluczowego return, nasza funkcja dalej może nie zwracać prawidłowych wyników.

Warto spojrzeć na taki przykład:

```javascript
function fun2() {
  return;
  //
  ('The quick brown fox jumps over the lazy dog');
}

console.log(fun2()); // undefined
```

Zwracając długie wyrażenia, możemy się pokusić o złamanie linii po słowie return, tak aby kod czytało się lepiej. W powyższym przykładzie funkcja zwraca `undefined`, zamiast oczekiwanej wartości.

Dzieje się tak, ponieważ po słowie return, w czasie kompilacji kodu JavaScript, pojawi się średnik.

```javascript
function fun2() {
  return;
  //
  ('The quick brown fox jumps over the lazy dog');
}
```

Funkcja zatem wykona return i zignoruje wszystkie linie po tym słowie kluczowym. Jeżeli coś chcemy zwrócić z funkcji za pomocą return, wartość ta musi znaleźć się tuż za słowem return.

Jeżeli po słowie kluczowym chcemy podzielić kod na kilka linii, możemy zastosować taki zapis:

```javascript
function fun3() {
  return (
    'The quick brown fox jumps over the lazy dog' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit' +
    Math.random()
  );
}

console.log(fun3());
```

Po `return` otwieramy nawiasy okrągłe. W nawiasach możemy podzielić wyrażenie nawet na kilka linii. Zapis ze słowem return i nawiasami okrągłymi możecie na przykład bardzo często spotkać we frameworku React do renderowania komponentów.

## <span id="return-i-arrow-functions">Return i arrow functions</span>

W przypadku zwracania wartości z arrow function również musimy zwrócić uwagę na kilka przypadków.

```javascript
const arrow1 = () => {
  a: 'foo';
};
console.log(arrow1()); // undefined
```

Przy tym zapisie mogłoby się wydawać, że funkcja zwraca obiekt z jedną właściwością, ponieważ po strzałce w arrow function następuje zwracanie wartości. Niestety w tym przypadku otrzymujemy wartość `undefined`.

Nawiasy klamrowe w tym przypadku zawsze zaczynają tworzyć ciało funkcji. Jeżeli chcemy w takiej funkcji zwracać obiekt, powinniśmy ten zapis zrobić tak:

```javascript
const arrow2 = () => {
  return { a: 'foo' };
};
```

Dopiero w ciele funkcji tworzymy zapis return i zwracamy obiekt w postaci literalnej.

Zapis ten można jeszcze skrócić za pomocą okrągłych nawiasów:

```javascript
const arrow3 = () => ({ a: 'foo' });
```

Stosując nawiasy okrągłe, możemy od razu zwrócić blok kodu w postaci obiektu. Warto zwrócić na to uwagę, ten przypadek jest dość częstym błędem początkujących programistów JavaScript.

## <span id="funkcja-zwracajaca-funkcje">Funkcja zwracająca funkcję</span>

W JavaScript funkcja nie musi zwracać prymitywnej wartości czy obiektów, może także zwracać inne funkcje:

```javascript
function add(a) {
  return function(b) {
    return a + b;
  };
}

const fun = add(1);
const result = fun(3);

console.log(result); // 4
```

Mamy funkcję `add`, która przyjmuje parametr i zwraca inną funkcję. Wywołanie funkcji `add` przypisujemy do zmiennej `fun`. W tym momencie zmienna `fun` ma przypisaną funkcję zwróconą z funkcji `add`. Możemy zatem wywołać zmienną `fun` i przekazać kolejny parametr. Ostatecznie otrzymujemy wynik w
zmiennej `result`.

Ten zapis można zrobić jeszcze krócej:

```javascript
add(1)(3); // 4
```

Najpierw wywołana jest funkcja `add` i od razu wywoływana jest funkcja zwracana. Pewnie niezbyt często spotkacie się z takim kodem. Czasami jednak możecie być poproszeni o stworzenie takiej funkcji przy rozmowie o pracę.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- jeżeli nie użyjemy return funkcja będzie zwracała `undefined`
- jeżeli chcemy zwracać długie wyrażenie po słowie `return` użyjmy nawiasów okrągłych
- jeżeli chcemy zwracać obiekty z arrow function używamy `return` lub nawiasy okrągłe
- możliwe jest zwracanie funkcji z innej funkcji

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
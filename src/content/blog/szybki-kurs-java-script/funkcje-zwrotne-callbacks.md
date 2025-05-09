---
title: "Funkcje zwrotne - callbacks w JavaScript: Szybki Kurs  #33"
description: "Omówienie funkcji callback w JavaScript. Przykłady użycia, zastosowanie w asynchroniczności, metodach Array, eventach API DOM."
date: 2025-02-18
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Callbacks](#callbacks)
* [Inne przykłady](#inne-przykłady)
* [Przykład](#przykład)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="callbacks">Callbacks</span>

Do tej pory w przykładach przekazywaliśmy do funkcji typy proste. Oczywiście, funkcja w JavaScript przyjmie wszystko, mogą być to obiekty, listy, a także inne funkcje. Funkcje w JavaScript są obiektami, dlatego możemy je także przekazywać jako parametry.

Funkcja przesyłana do innej funkcji nazywana jest callback function i może być wywołana wewnątrz tej funkcji:

```javascript
setTimeout(function() {
    console.log('Hello from callback function');
}, 1000);
```

Funkcja callback jest wykonywana zazwyczaj po zakończeniu działania funkcji, do której została przesłana. Stąd też nazwa `call back`. Jej zadaniem jest dokończenie wykonywanego zadania.

W przykładzie widzicie funkcję `setTimeout`, która przyjmuje dwa parametry. Pierwszym parametrem jest funkcja, drugim czas, po jakim zostanie wykonana ta funkcja.

Mamy tu idealny przykład funkcji `callback`, gdy zakończy się działanie funkcji `setTimeout`, funkcja `callback`
zostanie wywołana.

Funkcja `setTimeout` jest także funkcją asynchroniczną. To właśnie podczas pracy z asynchronicznością, będziecie używać najwięcej funkcji typu `callback`. W takich przypadkach zadaniem funkcji `callback` będzie wykonanie kodu po zakończeniu zadania asynchronicznego i dlatego tutaj znalazły tak duże
zastosowanie. Do asynchroniczności powrócimy jednak w innym dziale.

W pierwszym przykładzie przekazaliśmy funkcję w postaci anonimowej. Możemy jednak przekazywać funkcje w różnej postaci:

```javascript
setTimeout(() => {
    console.log('Hello from callback arrow function');
}, 1000);
```

W tym przypadku zdefiniowaliśmy funkcję jako arrow function. Bardzo często funkcje callback używane są właśnie w ten sposób jako arrow function.

```javascript
const callback = () => console.log('Hello from expression arrow function');
setTimeout(callback, 1000);
```

Możemy również zdefiniować arrow function jako wyrażenie funkcyjne i przekazać taką zmienną do innej funkcji. Zwróćcie uwagę, że przekazana zmienna nie jest wywołana, nie ma na końcu nawiasów okrągłych. Przekazujemy tylko samą postać funkcji, bez wywołania.

```javascript
const callback2 = function() {
    console.log('Hello from expression function');
};
setTimeout(callback2, 1000);
```

Oczywiście możemy także tworzyć wyrażenia w postaci tradycyjnej i przekazać samą nazwę zmiennej.

Czasami ma to znaczenie czy przekazujemy zwykłą anonimową funkcję, czy arrow function. Chodzi tutaj głównie o kontekst `this` . W tym momencie nie będziemy tego omawiać, dla obiektowości i `this` będzie poświęcony oddzielny dział.

## <span id="inne-przykłady">Inne przykłady</span>

Programując w JavaScript, funkcje callback będą dla was codziennością. Zobaczmy kilka dodatkowych przykładów ich użycia:

```javascript
const list = [1, 2, 3].map((e) => e * 2);
console.log(list);
```

Przykład pierwszy to lista, na której wywołana jest metoda `map`. Metoda ta przyjmuje jako parametr funkcję callback. Przekazuję więc funkcję, która jako parametr otrzymuje element z listy i mnoży go przez 2. Niemalże każda metoda wywoływana na listach obsługuje funkcje `callback`.

```javascript
button.addEventListener('click', function() {
    console.log('clicked!');
});
```

Kolejnym przykładem może być przycisk, na który nakładamy listener z funkcją callback. Gdy przycisk zostanie kliknięty, zostanie wywołana funkcja przekazana jako drugi parametr. W ten sposób reagujemy na wszelkie eventy, jakie są wytwarzane przez kliknięcie przycisk, przekazując funkcje callback.

```javascript
const handleResponse = (data) => console.log(data);

function handleError(error) {
    console.log('Some error: ', error);
}

fetch('https://restcountries.eu/rest/v2/alpha/co').then(handleResponse).catch(handleError);
```

Kolejny przykład to wywołanie funkcji `fetch` do wykonania zapytania HTTP. Tutaj mamy stworzone dwie funkcje, które przekażemy jako funkcje `callback`.

Zauważcie, że funkcje callback mogą także przyjmować parametry. Pierwsza funkcja ma zadeklarowany parametr `data`. Ta funkcja będzie więc wywoływana z parametrem.

Druga funkcja ma zadeklarowany parametr `error` i ewentualny otrzymany `error` wypisuje do konsoli.

Oczywiście nazwy parametrów są dowolne i to my ustalamy jak będą się one nazywać w funkcjach callback.

Gdy przekazujemy funkcje do metody `then` oraz `catch` przekazujemy je jako nazwy. Nie wywołujemy funkcji ani nie przekazujemy tam żadnych parametrów.

Definiowane przez nas funkcje callback muszą być także zadeklarowane zgodnie z tym, jak będą wywoływane przez funkcje, do których je przekazujemy. Musimy zatem sprawdzać dokumentację i wiedzieć, że do przekazanych funkcji callback będą przekazywane dane. Wtedy oczywiście musimy zadeklarować
odpowiednią funkcję, która przyjmie określoną ilość parametrów. W innym wypadku nasza aplikacja może nie działać prawidłowo.

Dlatego musimy korzystać z dokumentacji i dokładnie wiedzieć jak pracować z kodem, który wykorzystuje funkcje callback. W zdecydowanej większości przypadków pracując z JavaScript, my będziemy tylko tworzyć funkcje callback i przesyłać je do gotowego kodu, który je wykorzysta. Będzie to albo jakaś
biblioteka, albo natywne rozwiązania JavaScript. Dlatego wcześniej musimy wiedzieć, jakie callback funkcje przygotować.

Z funkcjami callback będziemy mieli do czynienia jeszcze wiele razy w trakcie kursu i zdążymy się z nimi oswoić.

## <span id="przykład">Przykład</span>

Na koniec pokażę Wam jeszcze przykład użycia funkcji callback we własnym kodzie:

```javascript
function calculator(a, b, callback) {
    const result = callback(a, b);
    console.log(result);
}
```

Mamy funkcję `calculator`, która przyjmuje dwa parametry w postaci liczby oraz funkcję callback. Zadaniem funkcji `calculator` jest wykonanie funkcji callback odebranie wyniku i wyświetlenie go. Ta funkcja odpowiedzialna jest więc za egzekucję przekazanej jej funkcji i prezentację wyniku.

Logika poszczególnych działań matematycznych będzie reprezentowana w oddzielnych pojedynczych funkcjach:

```javascript
const add = (a, b) => a + b;

const sub = (a, b) => a - b;
```

Zdefiniowałem dwie dodatkowe funkcje, które zajmują się tylko jednym zadaniem. Wykonaniem odpowiedniego działania matematycznego.

Wywołanie kalkulatora jest bardzo proste:

```javascript
calculator(1, 3, add);
calculator(1, 3, sub);
```

Do funkcji `calculator` przekazujemy dwie liczby oraz odpowiednią funkcję w zależności od tego, jakie zadanie chcemy wykonać. Mamy więc tutaj fajne rozdzielenie na funkcję `calculator`, która zajmuje się zrealizowaniem logiki i wyświetleniem danych, oraz na pojedyncze funkcje odpowiedzialne za jedno
konkretne działanie.

Taki kod jest łatwy w modyfikowaniu, rozszerzaniu i łatwy w testowaniu.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- funkcja callback to funkcja przekazana do innej funkcji
- funkcja callback często wywoływana jest, gdy inna funkcja zakończy działanie
- funkcje callback prawie zawsze używane są w zadaniach asynchronicznych
- funkcje callback używane są też przy metodach Array, eventach API DOM
- funkcje callback również przyjmują parametry
- sprawdźmy dokładnie dokumentację i przygotujmy odpowiednią funkcję callback

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
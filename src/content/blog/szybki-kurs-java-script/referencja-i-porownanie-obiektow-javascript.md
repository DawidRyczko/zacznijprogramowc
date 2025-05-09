---
title: "Referencja i porównanie obiektów w JavaScript: Szybki Kurs #54"
description: "Jak porównywać obiekty w JavaScript, uwzględniając porównywanie referencji i zawartości. Omówienie problemów i gotowych rozwiązań."
date: 2025-01-27
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Porównanie obiektów](#porownanie-obiektow)
* [Metoda Object.is](#metoda-objectis)
* [Porównanie zawartości obiektów](#porownanie-zawartosci-obiektow)
* [Gotowa biblioteka](#gotowa-biblioteka)
* [Co warto zapamiętać](#co-warto-zapamietac)

Obiekty w JavaScript są przetrzymywane i kopiowane przez referencję. Gdy przypiszemy obiekt do zmiennej, to zmienna ta przetrzymuje referencję do obiektu. Z tego powodu musimy inaczej podejść do porównania obiektów niż przy wartościach prymitywnych.

## <span id="porownanie-obiektow">Porównanie obiektów</span>

Na początek zobaczmy, jakie otrzymamy wyniki przy standardowym operatorze porównania. Mamy dwa takie same obiekty i chcemy je porównać:

```text
const obj1 = {
  name: 'Rambo',
};

const obj2 = {
  name: 'Rambo',
};

console.log(obj1 === obj2); // false
console.log(obj1 == obj2); // false
```

Nie ważne, jakiego porównania użyjemy zawsze otrzymamy wynik `false`. Porównanie za pomocą operatora porównania porównuje to, co trzyma zmienna, a jest nią referencja do obiektu. Dwa stworzone obiekty mają różną referencję, nawet jeżeli mają te same wartości.

To porównanie może nam jedynie posłużyć do sprawdzenia, czy zmienne przetrzymują tę samą referencję:

```text
const copy1 = obj1;

console.log(copy1 === obj1); // true
console.log(copy1 == obj1); // true
```

W tym przypadku definiuję nową zmienną i przypisuje jej stworzony wcześniej obiekt. Tak naprawdę przypisuję tą samą referencję. Gdy teraz porównam te dwie zmienne otrzymam wartość `true` ponieważ obie odnoszą się do tego samego obiektu. Gdy chcemy porównać wartości obiektów, musimy być świadomi, że
nie da się dokonać tego za pomocą operatora porównania.

## <span id="metoda-objectis">Metoda Object.is</span>

W JavaScript istnieje jeszcze specjalna metoda `Object.is`. Jest to metoda, do której przekazuje się dwa parametry. Jej zadaniem jest sprawdzenie, czy przekazane parametry mają te same wartości:

```text
console.log(Object.is(0, -0)); // false
console.log(0 === -0); // true

console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false

console.log(Object.is({}, {})); // false
console.log({} === {}); // false
```

Działa ona trochę inaczej niż operator potrójnego porównania. Na przykład widzi różnicę między `0` i `-0`. Również sławną wartość `NaN` potrafi określić jako równą sobie, a wiemy, że każda wartość `NaN` w JavaScript jest unikalna.

Jednak `Objec.is` nie porównuje nam wartości obiektów, tylko nadal referencje. Podobnie jak operator porównania metoda ta przy porównaniu obiektów będzie bazowała na referencji.

Chociaż wydaje się to bezużyteczne to porównanie referencji, jest przydatne. Jednak znacznie częściej chcemy wiedzieć, czy obiekty są naprawdę sobie równe i czy mają te same wartości. W takich wypadkach musimy dokładnie sprawdzać ich zawartość.

## <span id="porownanie-zawartosci-obiektow">Porównanie zawartości obiektów</span>

W JavaScript nie istnieje rozwiązanie na porównanie wartości obiektów. Albo musimy napisać własną implementację, albo skorzystać z gotowego rozwiązania. Jeżeli mamy szczególne wymagania co do porównania obiektów, można napisać własne rozwiązanie. Istnieją też takie rozwiązania, które można
konfigurować i decydować co w obiektach ma być porównane.

```text
const person1 = {
  name: 'Rambo',
};

const person2 = {
  name: 'Rambo',
};

function isEqual(obj1, obj2) {
  return obj1.name === obj2.name;
}

console.log(isEqual(person1, person2)); // true
```

Gdy mamy bardzo proste obiekty, możemy zdecydować się na napisanie prostej funkcji, która porówna wartości obiektów. Takie banalne rozwiązanie sprawdzi się przy bardzo prostych obiektach, ale i tutaj może nas spotkać wiele niespodzianek.

Co, jeśli wartości string zapisane są różną wielkością liter. Co, jeśli w obiekcie pojawiło się inne dodatkowe pole. Co, jeśli w obiekcie nie ma pola o takiej nazwie, a w drugim to pole ma wartość `undefined`.

```text
const p1 = {};

const p2 = {
  name: undefined,
};
console.log(isEqual(p1, p2)); // true
```

W takim wypadku również otrzymamy wartość `true`. Również dwie wartości `NaN` przy takim porównaniu zwrócą nam `false`. Jeszcze gorzej, gdy nasze obiekty zaczną przetrzymywać inne obiekty. Wtedy musimy rozpisać kolejne funkcje do porównania ich wartości. Przypadków brzegowych jest tutaj cała masa.

Możecie też spróbować rozwiązań z użyciem `JSON.stringify`:

```text
console.log(JSON.stringify(person1) === JSON.stringify(person2)); // true
```

Trzeba jednak pamiętać, że w tym rozwiązaniu następuje serializacja obiektów do formatu `JSON`, który również ma swoje ograniczenia, na przykład nie obsługuje wartości `undefined` lub pojawi się problem z kolejnością pól w obiekcie. To rozwiązania tak naprawdę porównuje wartość `string` w której
zapisany jest cały obiekt i oba stringi muszą być identyczne, mieć takie same znaki na takiej samej pozycji.

## <span id="gotowa-biblioteka">Gotowa biblioteka</span>

Porównanie obiektów nigdy nie było sprawą trywialną i dobrze trzeba się nad tym zastanowić, jak to zrobić. Będziemy stawali tutaj przed różnymi problemami, jak _Shallow equality_ czy _Deep equality_.

Jeżeli to możliwe, dobrze jest skorzystać z gotowego rozwiązania czyli ze sprawdzonej biblioteki jak [Lodash](https://lodash.com/docs/4.17.15#isEqual) czy [Underscore](http://underscorejs.org/#isEqual).

Można się także sugerować rozwiązaniami z Internetu, ponieważ z tym problemem mierzył się niemalże każdy programista i na ten temat powstało mnóstwo ciekawych artykułów. Jeżeli do porównania mamy bardziej skomplikowany obiekt, nie obejdzie się też bez dobrych unit testów, które sprawdzą każdy
przypadek.

## <span id="co-warto-zapamietac">Co warto zapamiętać:</span>

- obiekty w zmiennych przetrzymywane są przeze referencje
- operator porównania sprawdza, czy referencje są takie same, nie sprawdza, czy wartości w obiektach są takie same
- napisanie własnego rozwiązania do porównania obiektów nie jest takie proste
- warto skorzystać z gotowych rozwiązań do sprawdzenia, czy obiektu mają te same wartości np. z biblioteki Lodash, czy Underscore

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
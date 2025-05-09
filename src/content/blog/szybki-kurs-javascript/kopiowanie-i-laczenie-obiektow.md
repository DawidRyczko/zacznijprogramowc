---
title: "Kopiowanie i łączenie obiektów w JavaScript: Szybki Kurs #55"
description: "Przegląd metod kopiowania obiektów w JavaScript: spread operator, Object.assign(), JSON.parse i JSON.stringify, oraz biblioteki Lodash."
date: 2025-01-26
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Kopiowanie za pomocą spread operatora](#kopiowanie-za-pomoca-spread-operatora)
* [Kopiowanie z Object.assign()](#kopiowanie-z-objectassign)
* [Łączenie obiektów z Object.assign](#laczenie-obiektow-z-objectassign)
* [Deep copy z JSON.parse i JSON.stringify](#deep-copy-z-jsonparse-i-jsonstringify)
* [Użycie zewnętrznych narzędzi](#uzycie-zewnetrznych-narzedzi)
* [Co warto zapamiętać](#co-warto-zapamietac)

Kopiowanie obiektów w JavaScript może być tak samo problematycznie, jak sprawdzenie, czy obiekty są identyczne. Ponieważ pracujemy na referencji, zazwyczaj kopiujemy referencję obiektu, a nie tworzymy jego duplikat. Przyjrzyjmy się teraz jakie mamy narzędzia w JavaScript do stworzenia duplikatu.

## <span id="kopiowanie-za-pomoca-spread-operatora">Kopiowanie za pomocą spread operatora</span>

Operator `spread` w JavaScript może nam posłużyć do stworzenia kopii obiektu:

```text
const p1 = {
  name: 'John',
  address: {
    country: 'USA',
  },
};

const copy = { ...p1 };
console.log(copy); // { name: 'John', address: { country: 'USA' } }

console.log(p1 === copy); // false
console.log(p1.address === copy.address); // true
```

W przykładzie mamy przygotowany obiekt, który ma także zagnieżdżony inny obiekt. Za pomocą operatora `spread`
wypakowując wszystkie właściwości do innego obiektu, stworzy jego kopię.

Gdy porównujemy referencje, widzimy, że obiekty mają różną referencję. Udało nam się wykonać kopie. Inaczej jest w przypadku obiektu zagnieżdżonego `address`. Porównanie referencji w tych obiektach pokazuje, że wciąż to te same obiekty. Jeżeli dokonalibyśmy zmiany w obiekcie `p1.address` będzie ona
także widoczna w obiekcie `copy.address`.

`Spread` operator dokonuje `shallow copy`. Nie jest stanie stworzyć pełnej kopii, gdy obiekt posiada inne obiekty referencyjne.

## <span id="kopiowanie-z-objectassign">Kopiowanie z Object.assign()</span>

Kolejną metodą, którą możemy użyć do skopiowania obiektu jest `Object.assign`:

```text
const p2 = {
  name: 'John',
  address: {
    country: 'USA',
  },
};

const copy2 = Object.assign({}, p2);

console.log(copy2); // { name: 'John', address: { country: 'USA' } }

console.log(p2 === copy2); // false
console.log(p2.address === copy2.address); // true
```

Tym razem wykorzystujemy metodę `Object.assing`. Jako pierwszy parametr metoda przyjmuje obiekt, do którego będą przekopiowane właściwości z drugiego parametru. Drugim parametrem jest więc obiekt, który chcemy sklonować. Metoda ta zwraca tak naprawdę połączenie tych dwóch obiektów.

Jeżeli kopiujemy obiekty za pomocą tej metody, pierwszym parametrem powinien być pusty obiekt. Wtedy do pustego obiektu zostaną przepisane właściwości z drugiego obiektu.

Tak jak w przypadku `spread` dokonujemy tylko i wyłącznie `shallow copy`. Również ta metoda nie radzi sobie z kopiowaniem obiektów referencyjnych.

## <span id="laczenie-obiektow-z-objectassign">Łączenie obiektów z Object.assign</span>

Metoda `Object.assing`, może nam się przydać do łączenia obiektów:

```text
const obj1 = { a: 'foo' };
const obj2 = { b: 'bar' };
const obj3 = { b: 'boo', c: 'far' };

const merged = Object.assign(obj1, obj2, obj3);
console.log(merged); // { a: 'foo', b: 'boo', c: 'far' }
console.log(obj1); // { a: 'foo', b: 'boo', c: 'far' }
```

W tym przykładzie mamy stworzone trzy obiekty, które przekazane do `Object.assing` tworzą jeden obiekt. W metodzie `Object.assing` pierwszym parametrem jest obiekt, do którego przepisywane są właściwości z pozostałych obiektów. Metoda zwraca obiekt, ale tak naprawdę jest to referencja do obiektu,
który został użyty jako pierwszy parametr.

Nastąpiło więc skopiowanie właściwości z pozostałych obiektów do pierwszego obiektu. Co więcej, jeżeli jakieś pola obiektu powtarzają się, to będzie zachowana wartość z ostatniego obiektu, który ma to samo pole. Łączenie obiektów również działa na zasadzie `shallow copy`.

`Objec.assign` może także kopiować metody obiektu, nie jest jednak w stanie przekopiować akcesorów:

```text
const a = { a: 1 };
const b = {
  b: 1,
  print() {
    console.log(this.b);
  },
  get value() {
    return this.b;
  }
};

const merged2 = Object.assign(a, b);
console.log(merged2); // { a: 1, b: 1, print: [Function: print], value: 1 }
```

W tym przykładzie obiekt `b` posiada zarówno metodę, jak i `getter`. Gdy łączymy obiekt `a` i obiekt `b` w rezultacie otrzymujemy obiekt, który ma dwa pola, metodę i zamiast `gettra` również pole o nazwie `value`. Podczas kopiowania, `getter` traktowany jest jako pole obiektu z przypisaną wartością.
Również w podobny sposób działa operator `spread`. Nie jesteśmy wiec w stanie skopiować akcesorów za pomocą tych technik. Jeżeli nam na tym zależy, musimy sami zaimplementować potrzebny algorytm.

## <span id="deep-copy-z-jsonparse-i-jsonstringify">Deep copy z JSON.parse i JSON.stringify</span>

Jedynym szybkim sposobem na stworzenie *deep copy* w czystym JavaScript jest wykorzystanie `JSON.parse`
oraz `JSON.stringify`:

```text
const o1 = { a: 1, inner: { c: 'foo' } };
const deep = JSON.parse(JSON.stringify(o1));

console.log(deep); // { a: 1, inner: { c: 'foo' } }

console.log(o1 === deep); // false
console.log(o1.inner === deep.inner); // false
```

W tym przykładzie przygotowany obiekt na początku przetwarzamy za pomocą `JSON.stringify` do formatu JSON, a potem za pomocą `JSON.parse` przetwarzamy JSON-a do obiektu JavaScript. Taka serializacja zapewnia nam stworzenie *deep copy*. Widzimy, że porównanie referencji nawet w przypadku
zagnieżdżonego obiektu zwraca `false`.

Tym sposobem możemy wykonać pełny duplikat obiektu, ma to jednak pewne ograniczenia. Musimy pamiętać, że format JSON ma swoje restrykcje i zasady, dlatego nie każdy obiekt uda się w taki sposób sklonować.

## <span id="uzycie-zewnetrznych-narzedzi">Użycie zewnętrznych narzędzi</span>

Oprócz pewnych gotowych rozwiązań zawsze możemy spróbować napisać swój algorytm kopiowania obiektów JavaScript lub użyć gotowego rozwiązania, co zawsze sugeruję.

Jedną z opcji jest użycie biblioteki *Lodash*. Mamy tam metody zarówno do *[shallow copy](https://lodash.com/docs/4.17.15#clone)* jak też metody do *[deep copy](https://lodash.com/docs/4.17.15#cloneDeep)*. Dostępne są także metody, które możemy konfigurować i zdecydować jak powinien być nasz obiekt
kopiowany.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- za pomocą operatora `spread` zrobimy *shallow copy* obiektu
- metoda `Object.assign` może posłużyć do zrobienia *shallow copy* obiektu
- metoda `Object.assing` łączy obiekty do pierwszego przekazanego obiektu jako argument
- *deep copy* możemy wykonać za pomocą parsowania JSON-a ma to jednak swoje ograniczenia
- najlepszym sposobem na klonowanie obiektów jest użycie gotowej biblioteki

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
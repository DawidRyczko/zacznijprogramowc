---
title: "Nie używamy __proto__ w JavaScript: Szybki Kurs #59"
description: "Dlaczego nie należy używać akcesora __proto__ i co ewentualnie używać w zamian."
date: 2025-01-22
tags: [ "szybki-kurs-javascript", "javascript" ]
---

W ostatnich przykładach często wspominałem o wewnętrznej właściwości `[[Prototype]]` oraz o getterze i setterze o nazwie `__proto__`. W tym dziale czas na sprostowanie kilku rzeczy, powiemy sobie, dlaczego nie należy używać akcesora `__proto__` i co ewentualnie używać w zamian.

## Spis treści
* [Nie używamy __proto__](#nie-uzywamy-proto)
* [Metoda Object.getPrototypeOf](#metoda-object-getprototypeof)
* [Metoda Object.setPrototypeOf](#metoda-object-setprototypeof)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="nie-uzywamy-proto">Nie używamy __proto__</span>

Do właściwości obiektu `[[Prototype]]` możemy się dostać przez akcesor `__proto__`. Oznacza to, że możemy zarówno pobierać prototyp, ale też ustawiać go ręcznie. Jest bowiem możliwość przypisania po prostu własnego prototypu:

```text
const a = {
  name: 'John',
};

const b = {
  surname: 'Rambo',
};

b.__proto__ = a;
console.log(b.name, b.surname); // John Rambo
```

W tym przypadku tworzę obiekt `a` oraz obiekt `b`. W obiekcie `b` wykorzystuję właściwość `__proto__` i przypisuję jej obiekt `a`. W ten sposób ustawiam prototyp dla obiektu `b`. Mogę teraz na obiekcie `b` wywołać właściwość `name`, która została odziedziczona po obiekcie `a`.

Działa to niemalże tak samo, jak z `Object.create`. Ustawiliśmy ręcznie prototyp dla obiektu przez właściwość `__proto__`
.

Pomimo tego, że mamy możliwość używania właściwości `__proto__` nie należy tego robić. Właściwość ta kiedyś nie istniała nawet w specyfikacji, ale i tak była zaimplementowana w przeglądarkach. Ponieważ było to trochę kontrowersyjne, to ostatecznie ujednolicono dokumentację i `__proto__` pojawiło się
w ESCMAScript 2015. Jednak metoda ta nie jest zalecana do używania w kodzie. Do pobierania prototypu i jego ustawiania mamy inne metody, które sobie omówimy.

## <span id="metoda-object-getprototypeof">Metoda Object.getPrototypeOf</span>

Pierwszą metodą do operacji na prototypie jest `Object.getPrototypeOf`. Jest to metoda, która zwraca prototyp danego obiektu, czyli właściwość `[[Prototype]]`:

```text
const arr = [1, 2, 3];
const proto = Object.getPrototypeOf(arr);
console.log(proto === Array.prototype); // true
```

W tym kodzie jako obiekt stworzyłem tablice. Za pomocą metody `Object.getPrototypeOf` pobieram obiekt prototypu i przypisuję go do zmiennej `proto`. Obiekt ten porównuję z `Array.prototype` i otrzymuję wartość `true`. Jak widzimy, jest to porównanie referencji, oznacza to, że we
właściwości `[[Prototype]]` naszego obiektu znajduje się referencja do głównego prototypu `Array.prototype`.

Dlatego też każda zmiana w `Array.prototype` dotyczy potem każdej tablicy w naszej aplikacji. Zobaczmy, co się stanie, jeżeli zmodyfikuję pobrany prototyp, który znajduje się w zmiennej `proto`:

```text
proto.foo = 'boo';
console.log(Array.prototype.foo); // boo
```

Do pobranego prototypu dopisałem właściwość `foo` i próbuję ją wypisać przez `Array.prototype.foo`. Widzimy, że ta właściwość jest już tutaj również dostępna. Musimy zatem być świadomi, że nawet modyfikując prototyp w naszym obiekcie, dokonujemy zmiany globalnej, ponieważ operujemy na referencji do
obiektów.

## <span id="metoda-object-setprototypeof">Metoda Object.setPrototypeOf</span>

Kolejną metodą jest `Object.setPrototypeOf`. Jest to metoda, która służy do ustawiania prototypu. Jest ona jednak bardzo wolna i może poważnie zaszkodzić wydajności w naszej aplikacji:

```text
const obj1 = {
  name: 'John',
};

const obj2 = {};

Object.setPrototypeOf(obj2, obj1);

console.log(obj2.name); // 'John'
console.log(obj2);
```

Mamy tutaj dwa obiekty. Pierwszy z nich ma właściwość `name`. Drugi natomiast jest pustym obiektem. Wykorzystuję metodę `Object.setPrototypeOf` i przekazuję dwa parametry. Pierwszy parametr to obiekt, któremu chcę ustawić prototyp, drugi parametr to prototyp dla tego obiektu. Ostatecznie wiec drugi
obiekt będzie dziedziczył z obiektu pierwszego. Po tej operacji widzimy, że mam dostęp do pola `name` w obiekcie `obj2`.

Jeżeli już musimy zmienić prototyp obiektu, możemy tego dokonać w taki właśnie sposób.

Poznaliśmy dwie metody do operowania na prototypie. Nie oznacza to jednak, że powinniśmy operować tymi metodami w naszym codziennym kodzie. Zmiana prototypu jest bardzo powolną operacją. W dodatku jest to operacja globalna, która wpłynie na każde miejsce, gdzie wywoływany jest obiekt. Zazwyczaj nie
będziecie ręcznie modyfikować prototypów. Jeżeli jednak natraficie na taki kod, będziecie mieli większą świadomość tego, co dzieje się w aplikacji.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- właściwość `__proto__` nie powinna być przez nas używana, może nam posłużyć tylko do edukacji
- do pobierania prototypu z obiektu mamy metodę `Object.getPrototypeOf`
- do ustawiania prototypu w obiekcie mamy metodę `Object.setPrototypeOf`
- operacje na prototypie obiektu są bardzo wolne i psują optymalizację aplikacji

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
---
title: "Łańcuch prototypów i własne prototypy w JavaScript: Szybki Kurs #57"
description: "W JavaScript obiekty mogą dziedziczyć po wielu prototypach, tworząc łańcuch prototypów. Zrozumienie tego mechanizmu jest kluczowe do efektywnego programowania."
date: 2025-01-24
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Wywołanie łańcucha prototypów](#wywołanie-łańcucha-prototypów)
* [Stworzenie własnego prototypu](#stworzenie-własnego-prototypu)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="wywołanie-łańcucha-prototypów">Wywołanie łańcucha prototypów</span>

W JavaScript jest możliwość dziedziczenia po wielu prototypach obiektów. Przykładem jest tablica, która otrzymuje prototyp z `Array.prototype`, a sam `Array.prototype` ma prototyp z `Object.prototype`. Dodatkowo można tworzyć własne obiekty, po których można odziedziczyć prototyp. Zobaczmy, z czym to się wiąże.

Gdy tworzymy nowy obiekt, dziedziczymy dla tego obiektu właściwości z `Object.prototype`. Nie są one widoczne bezpośrednio w naszym obiekcie, ale JavaScript potrafi je odnaleźć w odziedziczonym prototypie:

```javascript
const obj = {
  name: 'John',
};

console.log(obj.toString()); // [object Object]
```

Mamy stworzony obiekt, który nie ma zaimplementowanej metody `toString()`. Możemy jednak wywołać na naszym obiekcie metodę `toString()`. Co prawda, nie zwraca ona zbyt ciekawej wartości, ale jednak działa.

Jeżeli wywołujemy jakąś metodę lub odwołujemy się do jakiegoś pola w obiekcie, JavaScript na początku poszukuje tych właściwości w obiekcie, na którym występuje wywołanie. Jeżeli nie znajdzie tych właściwości w tym obiekcie, przeszukuje odziedziczony prototyp. Jeżeli uda się odnaleźć metodę to
zostanie ona użyta dla naszego obiektu. Jeżeli nie, to będzie zwrócona wartość `undefined`.

Widzieliśmy już na przykładzie tablicy, że dziedziczonych prototypów może być więcej:

```javascript
const arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3
console.log(arr.valueOf()); // [1, 2, 3]

// arr -> Array.prototype -> Object.prototype
console.log(arr.__proto__.__proto__); 
```

Gdy stworzymy tablicę w JavaScript to tablica dziedziczy z `Array.prototype`. Z kolei `Array.prototype` dziedziczy z `Object.prototype`. Nasza tablica ma właściwość `__proto__`, która zwraca pierwszy prototyp z  `Array.prototype`. Ten prototyp, także ma właściwość `__proto__` i on zwraca prototyp
z `Object.prototype`. Stworzył się tutaj łańcuch prototypów.

Metoda `toString()` nie istnieje bezpośrednio w naszym obiekcie. JavaScript przeszukuje `__proto__` i szuka metody `toString()` okazuje się, że znalazł ją i jest ona odziedziczona po `Array.prototype`. Wywołuje i kończy przeszukiwanie.

W drugim przypadku metoda `valueOf` nie zostaje znaleziona w pierwszym `[[Prototype]]` czyli tym pochodzącym od `Array.prototype`. JavaScript idzie głębiej i wywołuje drugą właściwość `__proto__`, tam metoda `valueOf()` istnieje i pochodzi z `Object.prototype`. Dopiero z tego prototypu jest
wywoływana.

Tak wygląda proces wywoływania właściwości i ich poszukiwania. Jeżeli nie istnieją one w głównym obiekcie, zawsze następuje proces poszukiwania w odziedziczonych prototypach, aż do ostatniego prototypu pochodzącego z  `Object.prototype`. Takie połączenie nazywamy łańcuchem prototypów.

## <span id="stworzenie-własnego-prototypu">Stworzenie własnego prototypu</span>

Do tej pory pokazywałem przykłady, które wykorzystują gotowe prototypy w JavaScript. W dziale o obiektach pokazywałem natomiast metodę `Object.create`, która pozwala stworzyć obiekt na podstawie innego obiektu:

```javascript
const person = {
  name: 'John',
};

const soldier = Object.create(person, {
  surname: {
    value: 'Rambo',
    writabe: true,
    configurable: true,
    enumerable: true,
  },
});
```

Na początek tworzę zwykły obiekt, który będzie posiadał pole `name`. Potem wykorzystuję metodę `Object.create` do której jako pierwszy parametr podaję stworzony obiekt. To ten obiekt będzie teraz prototypem dla tworzonego obiektu `solider`. Tworzę też nowe pole o nazwie `surname` i przekazuję
konfigurację dla deskryptora. Przy metodzie `Object.create`
konfigurację należy uzupełnić samemu, albo wszystko będzie ustawione na `false`.

Gdy wypiszemy obiekt do konsoli:

```javascript
console.log(soldier);
```

Zobaczymy, że pod właściwością `__proto__` znajduje się obiekt `person`:

```text
__proto__:
name: "John"
print: ƒ print()
__proto__: Object
```

Teraz pierwszym prototypem dla naszego obiektu jest nasz stworzony obiekt. Ma on jednak swoją właściwość `__proto__` i tam jest już prototyp z `Object.prototype`. Utworzył się więc łańcuch prototypów.

W naszym obiekcie `soldier`, nie istnieje pole `name`:

```javascript
console.log(soldier.name); // John
```

Jeżeli odwołam się do pola `name`, to i tak otrzymam wartość. JavaScript sprawdzi, że pole to nie jest dostępne w naszym podstawowym obiekcie i będzie po kolei przeszukiwał kolejne właściwości `[[Prototype]]`, aż natrafi na to pole i zwróci wartość.

Na tym przykładzie widzimy, że prototyp obiektu to ta naprawdę inny obiekt. Możemy sami stworzyć obiekt, który będzie prototypem. Natomiast na końcu łańcucha prototypów i tak zawsze znajduje się `Objec.prototype` jako baza dla każdego obiektu w JavaScript.

Wyjątkiem jest oczywiście sytuacja, gdy do metody `Object.create` przekażemy wartość `null`.

## <span id="co-warto-zapamiętać">Co warto zapamiętać:</span>

- obiekty mogą posiadać łańcuch prototypów
- na końcu łańcucha prototypów jest zawsze `Object.prototype`
- możemy sami stworzyć obiekt, który będzie prototypem dla kolejnych obiektów przez`Object.create`
- wewnętrzna właściwość `[[Prototype]]` zawsze ma przypisany jakiś obiekt lub wartość `null`, nie może przyjąć innej wartości

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
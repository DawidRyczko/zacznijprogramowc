---
title: "Konfiguracja pól obiektu w JavaScript: Szybki Kurs #50"
description: "Konfiguracja pól w obiektach JavaScript: deskryptory, Object.create, defineProperties, pobieranie dziedziczonych właściwości."
date: 2025-02-01
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Pobieranie konfiguracji pól, deskryptor](#pobieranie-konfiguracji-pól-deskryptor)
* [Deskryptor przy Object.create](#deskryptor-przy-objectcreate)
* [Konfiguracja pola w obiekcie przy Object.create](#konfiguracja-pola-w-obiekcie-przy-objectcreate)
* [Konfiguracja pól w obiekcie przez defineProperties](#konfiguracja-pól-w-obiekcie-przez-defineproperties)
* [Pobieranie dziedziczonych właściwości](#pobieranie-dziedziczonych-właściwości)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="pobieranie-konfiguracji-pól-deskryptor">Pobieranie konfiguracji pól, deskryptor</span>

Zdefiniowane pola w obiektach JavaScript, mogą być dodatkowo konfigurowane. Możemy im ustawić kilka właściwości. Nie będzie to zbyt częsta praktyka w Waszym kodzie. Jednak wiedza o tym jest niezbędna, gdy będziemy chcieli zrozumieć głębsze mechanizmy JavaScript.

Z obiektów JavaScript możemy pobrać specjalny obiekt, który nazywa się *deskryptor*. Obiekt ten przetrzymuje różne informacje o konfiguracji pól w danym obiekcie:

```js
const obj1 = {
  name: 'John',
  surname: 'Rambo',
};
const descriptor1 = Object.getOwnPropertyDescriptors(obj1);
console.log(descriptor1);
```

Tworzę sobie obiekt i przekazuję go do metody `Objec.getOwnPropertyDescriptors()`, która zwraca obiekt opisujący każde pole w przekazanym obiekcie.

```text
name: {value: "John", writable: true, enumerable: true, configurable: true}
surname: {value: "Rambo", writable: true, enumerable: true, configurable: true}
```

Widzimy, że kluczem deskryptora są nazwy pól z naszego obiektu, a wartością konfiguracja tego pola. Gdy tworzymy obiekt z polami lub dodajemy do niego pola, za każdym razem JavaScript tworzy standardową konfigurację.

W konfiguracji mamy takie właściwości jak:

- `value` - wartość danego pola
- `writable` - opisuje czy pole może mieć zmienianą wartość
- `enumerable` - opisuje czy pole obiektu będzie widoczne przez pętle i inne metody, które mogą iterować po obiektach
- `configurable` - opisuje czy możemy zmieniać bieżącą konfigurację i usuwać pole z obiektu

Wartości, które teraz widzicie, są standardowo przez JavaScript ustawiane na `true` i nie musicie się nimi specjalnie przejmować.

Dodatkowo istnieje jeszcze jedna metoda, która zwraca deskryptor dokładnie jednego pola z obiektu:

```js
const descriptor2 = Object.getOwnPropertyDescriptor(obj1, 'name');
console.log(descriptor2);
```

Do metody przekazujemy obiekt oraz w postaci stringa nazwę pola, które chcemy zbadać.

```text
{value: "John", writable: true, enumerable: true, configurable: true}
```

Otrzymujemy jeden obiekt, konfiguracyjny.

Konfiguracje możemy także pobierać dla getterów, setterów i metod obiektów, jeżeli mamy takie właściwości zdefiniowane w obiekcie. My będziemy pracowali tylko na polach obiektu.

## <span id="deskryptor-przy-objectcreate">Deskryptor przy Object.create</span>

Gdy pracujemy z obiektami, tworząc je w formie literalnej, nie musimy się specjalnie przejmować konfiguracją pól w obiekcie. Konfiguracja, jaka jest ustawiana przez JavaScript, jest w zupełności wystarczająca i dobra do 99% wykonywanych zadań w kodzie.

Czasami jednak może się zdarzyć, że pola w obiekcie będą miały inną konfigurację niż standardowa:

```js
const obj2 = {
  name: 'John',
  surname: 'Rambo',
};

const obj3 = Object.create(obj2, { age: { value: 33 } });
const descriptor3 = Object.getOwnPropertyDescriptors(obj3);

console.log(descriptor3);
```

W tym kodzie na bazie gotowego obiektu, za pomocą `Object.create` tworzymy zupełnie nowy obiekt. Dodatkowo w definiuję dla nowego obiektu pole `age`. Gdy teraz prześwietlimy nowy obiekt za pomocą `Object.getOwnPropertyDescriptors()`
zobaczymy, że otrzymujemy konfiguracje tylko dla pola, które zdefiniowaliśmy:

```text
age: {value: 33, writable: false, enumerable: false, configurable: false}
```

Ponadto, konfiguracja ta różni się od konfiguracji pól w obiektach tworzonych literalnie. Okazuje się, że stworzone przez nas pole `age` nie jest zapisywalne, nie jest obsługiwane przez pętle i nie jest już konfigurowalne. Dzieje się tak, bo nie przekazaliśmy konfiguracji, a JavaScript nie zrobi
tego za nas.

Na początek jednak wyjaśnijmy, dlaczego w deskryptorze obiektu nie ma informacji o polach, które zostały odziedziczone po oryginalnym obiekcie:

```js
console.log(Object.getOwnPropertyDescriptors(obj3.__proto__));
```

Gdy wywołamy metodę `Object.getOwnPropertyDescriptors` na właściwości `__proto__` otrzymamy konfigurację wcześniej odziedziczonych pól:

```text
name: {value: "John", writable: true, enumerable: true, configurable: true}
surname: {value: "Rambo", writable: true, enumerable: true, configurable: true}
```

Pola, które zostały odziedziczone, nie znajdują się dokładnie w nowo stworzonym obiekcie, ale w odziedziczonym prototypie. Metody, które zaczynają się od `getOwn` zwracają zawsze właściwości danego obiektu. Dlatego, nie udało nam się pobrać konfiguracji odziedziczonych pól z nowo stworzonego
obiektu. Obiekt ten nie jest de facto właścicielem tych pól.

Jest to dość ważne, aby rozpoznać właściwości danego obiektu. Ponieważ niektóre metody pracują tylko i wyłącznie na tak zwanych *own proprety* obiektu, czyli na polach obiektu, które należą dokładnie do niego:

```js
console.log(Object.values(obj3));
```

Przykładem jest `Object.values`. Metoda ta ma pobrać i wyświetlić listę wartości, ze wszystkich pól obiektu. Jednak nie wyświetla nic, ponieważ dwa pola nie należą stricte do tego obiektu, a trzecie pole `age`, które zostało dodane, nie jest `enumerable`, ponieważ pobrana konfiguracja pokazuje
wartość `false` dla tego pola.

```js
for (const key in obj3) {
  const element = obj3[key];
  console.log(element) // 'John', 'Rambo'
}
```

Dla przykładu, gdy użyjemy pętli `for ... in` będziemy mogli pobrać już wszystkie wartości z danego obiektu. Ta pętla rozpoznaje w obiekcie nawet te pola, które do niego nie należą i pochodzą z prototypu innego obiektu. Ale oczywiście dalej nie wyświetli pola `age` ponieważ jest `enumerable` w
konfiguracji pola jest ustawione na `false` co oznacza, że pole to nadal nie jest widoczne dla wszelkich mechanizmów itreujących.

Należy więc uważać, gdy pracujemy z obiektami, które są tworzone na przykład przez `Object.create`. Niektóre działania metod mogą nas zaskoczyć.

## <span id="konfiguracja-pola-w-obiekcie-przy-objectcreate">Konfiguracja pola w obiekcie przy Object.create</span>

Pozostał nam do rozwiązania problem złej konfiguracji pola przy nowo stworzonym obiekcie przez `Object.create`. Przy dodaniu nowego pola przez `Object.create`, gdy nie przekażemy żadnej konfiguracji, przyjmuje ona wartości domyślne, ustawione na `false`.

Możemy to jednak zmienić w prosty sposób:

```js
const obj4 = {
  name: 'John',
  surname: 'Rambo',
};

const obj5 = Object.create(obj4, {
  age: { value: 33, writable: true, enumerable: true, configurable: true },
});
const descriptor4 = Object.getOwnPropertyDescriptors(obj5);
console.log(descriptor4);
```

Gdy używamy `Object.create` i dodajemy nowe pole do tworzonego obiektu, możemy także przekazać konfigurację.

```text
age: {value: 33, writable: true, enumerable: true, configurable: true}
```

W ten sposób unikniemy problemów, jakie mogą się przydarzyć przy braku konfiguracji. Jeżeli chcemy mieć taką samą konfigurację jaką, tworzy JavaScript przy normalnym dodawaniu pól, należy wszędzie ustawić `true`.

## <span id="konfiguracja-pól-w-obiekcie-przez-defineproperties">Konfiguracja pól w obiekcie przez defineProperties</span>

Konfiguracje możemy zmienić także później, ponieważ JavaScript daje nam dwie metody. Pierwsza z nich to `Object.defineProperties`:

```js
const obj6 = {
  property1: 'foo',
};

Object.defineProperties(obj6, {
  property1: {
    value: 42,
    writable: false,
  },
  property2: {
    value: 'boo',
  },
});
console.log(obj6)
```

Metoda ta może nie tylko zmieniać konfiguracje pól w obiekcie, ale także dodawać nowe pola. Służy głównie do modyfikowania lub dodawania wielu właściwości.

W tym przykładzie widzimy, że mamy zdefiniowany obiekt, który konfigurujemy dodatkowo przez  `Object.defineProperties`. W tej konfiguracji zmieniamy wartość pola  `property1` i jego konfigurację. Dodajemy także zupełnie nowe pole `property2`, ale bez żadnej konfiguracji.

```text
property1: {value: 42, writable: false, enumerable: true, configurable: true}
property2: {value: "boo", writable: false, enumerable: false, configurable: false}
```

Jeżeli pominiemy konfigurację przy dodawaniu nowego pola, okaże się, że wszystkie wartości konfiguracyjne będą ustawione na `false`.

Istnieje też metoda do modyfikowania pojedynczych pól:

```js
const obj7 = { a: 'foo' };

Object.defineProperty(obj7, 'a', {
  value: 42,
  writable: false,
});
console.log(obj7); // {a: 42}
```

Do metody `Object.defineProperty()` przekazujemy obiekt, który chcemy zmodyfikować oraz nazwę pola do modyfikacji lub do dodania. W tym przypadku nastąpi modyfikacja pola o nazwie `a`.

Możemy w ten sposób także dodać `getter` czy `setter`:

```js
Object.defineProperty(obj7, 'b', {
  get() {
    return a;
  },
  set(x) {
    a = x;
  }
});
console.log(obj7.a); 
```

Od tego momentu obiekt będzie posiadał zdefiniowane metody `get` i `set` o nazwie `b`.

## <span id="pobieranie-dziedziczonych-właściwości">Pobieranie dziedziczonych właściwości</span>

W obiekcie `Object` istnieje jeszcze specjalna metoda, która pomaga pobierać pola dziedziczone z innego obiektu:

```js
const obj8 = Object.create({ a: 1, b: 2 });
```

Stworzyłem obiekt za pomocą `Object.create` . Jako pierwszy argument do tej metody podałem inny obiekt z dwoma polami, który będzie prototypem nowego obiektu.

```js
console.log(obj8); // {}
```

Gdy wyświetlam stworzony obiekt, nie widzę żadnych właściwości obiektu.

Dopiero użycie metody `Object.getPrototypeOf` zwraca mi wszystkie pola obiektu:

```js
console.log(Object.getPrototypeOf(obj8)); // { a: 1, b: 2 }
```

Prosta metoda, ale może być bardzo przydatna, gdy musimy pracować z tak skomplikowanymi obiektami.

Konfiguracja pól obiektów to nie są popularne techniki, które będzie używać na co dzień. Jednak wiedza o tym wydaje się istotna. Wiemy teraz co to znaczy `own properties` oraz to, że pola w obiekcie mają konfigurację, gdzie ważną konfiguracją jest pole `enumerable`. Jest to istotna wiedza, ponieważ
na tych hasłach często opiera się dokumentacja i działanie wielu metod w obiektach i tablicach JavaScript.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- obiekty posiadają deskryptor, który opisuje konfigurację każdego pola
- przy dodawaniu nowych właściwości do obiektu, konfiguracja tworzona jest automatycznie
- jeżeli dodajemy pola za pomocą specjalnych metod, to warto zadbać o konfigurację, ponieważ domyślnie ustawiana jest na `false`
- właściwości obiektu modyfikujemy przez takie metody jak `Object.defineProperty` lub `Object.defineProperties`
- niektóre metody współpracują tylko z polami, które należą stricte do danego obiektu, nie biorą pod uwagę właściwości dziedziczonych

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
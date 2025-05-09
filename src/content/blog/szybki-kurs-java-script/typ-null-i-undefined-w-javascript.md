---
title: "Typy null i undefined w JavaScript: Szybki Kurs #3"
description: "Omówienie typów null i undefined w JavaScript: kiedy używać, różnice i jak sprawdzać."
date: 2025-03-20
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Wartość null](#wartosc-null)
* [Wartość undefined](#wartosc-undefined)
* [Undefined czy null](#undefined-czy-null)
* [Porównanie null i undefined](#porownanie-null-i-undefined)
* [Sprawdzanie, czy wartość nie jest null lub undefined](#sprawdzanie-czy-wartosc-nie-jest-null-lub-undefined)
* [Co warto zapamiętać](#co-warto-zapamietac)
* [Odnośniki](#odnosniki)

W tym dziale omówimy działanie typów `null` oraz `undefined`. Kiedy co używać i jaka jest między nimi różnica.

## <span id="wartosc-null"></span>Wartość null
W JavaScript w odróżnieniu od innych języków mamy dwa typy, które mogą oznaczać brak wartości lub jej nieprzypisanie. W wielu językach zazwyczaj spotykamy się z jednym typem określającym brak wartości.

Typ `null` i `undefined` nie są typami reprezentującymi to samo i teraz to omówmy.

Weźmy taki przykład:

```javascript
const empty = null;
console.log(typeof empty); //object
```

Gdy przypiszemy wartość `null` do zmiennej oznacza to, że zerujemy tą zmienną. Nie chcemy, aby posiadała ona jakąkolwiek wartość lub referencję do czegokolwiek. Zmienna `empty` reprezentuje zamierzony brak wartości.

Pomimo tego, że operator `typeof` zwraca nam typ `object`, zmienna z wartością `null` nic nie reprezentuje. Jak już wspominałem wcześniej, to, że `null` zwraca typ `object` jest błędem z czasów powstawania języka JavaScript.

Używamy wartości `null` do tego, aby jawnie wyzerować zmienną. Możemy także zwracać `null` bezpośrednio z funkcji jako pusta wartość.

Jeżeli chcemy sprawdzić, czy wartość ma dokładnie typ `null` możemy posłużyć się zapisem

```javascript
if (empty === null) {
  console.log('this variable is null');
}
```

Co prawda nie omawialiśmy jeszcze konstrukcji warunkowych, ale ten prosty `if` nie powinien nikogo dziwić, bo instrukcja `if` występuje w prawie każdym języku świata.

W nawiasach okrągłych wstawiamy warunek, trzy znaki równości sprawdzają, czy `empty` jest równe `null`. O porównywaniu wartości, także będziemy jeszcze mówić, ale ogólna zasada mówi, że wartości w JavaScript porównujemy za pomocą trzech znaków równości.

W tym wypadku warunek jest `true` i zobaczymy napis w przeglądarce:

```powershell
this variable is null
```

## <span id="wartosc-undefined"></span>Wartość undefined

Gdy `null` pojawia się tylko wtedy, gdy programista przypisze taką wartość do zmiennej, `undefined` może pojawić się, gdy nie inicjalizujemy zmiennej, spróbujemy odczytać wartość z funkcji, która nic nie zwraca, odwołamy się do właściwości obiektu, który nie istnieje.

```javascript
let nothing;

function test() {
  return;
}

const obj = {};

console.log(nothing); //undefined
console.log(test()); //undefined
console.log(obj.a); //undefined
```

Te trzy przypadki pokazują, kiedy otrzymamy wartość `undefined`. Typ `undefined` jest wartością niezdefiniowaną, standardowo zwracaną w powyższych przypadkach przez JavaScript. Widzimy, że wartość `undefined` nie została przez nas przypisana. Jest to najczęściej wartość przypisana przez JavaScript.

Jeżeli chcemy sprawdzić, czy wartość ma typ `undefined` możemy posłużyć się podobnym zapisem jak w przypadku sprawdzania wartość `null`:

```javascript
if (nothing === undefined) {
  console.log('this variable is undefined');
}
```

Wtedy jesteśmy pewni, że zmienna ma wartość `undefined`.

## <span id="undefined-czy-null"></span>Undefined czy null
Pracując z JavaScript warto wprowadzić sobie zasadę nieprzypisywania jawnie wartości `undefined` do zmiennej. Jeżeli chcemy wyzerować zmienną lub też zwracać pustą wartość z funkcji, zwracajmy `null`.

```javascript
const name = undefined;
const surname = null; // better option
```

Łatwiej będzie nam pracować z kodem i znaleźć problem, gdy nie będziemy posługiwać się wartością `undefined`. Gdy trafimy na błąd związany z `undefined` w konsoli przeglądarki będziemy wiedzieć, że o czymś zapomnieliśmy, odwołujemy się do czegoś, co nie istnieje. Zawęzimy opcję szukania problemu,
gdy nie będziemy się dodatkowo posługiwać `undefined`, a zostawimy go dla JavaScript.

Moja zasad jest taka, że nie używam `undefined`, a zamiast tego posługuję się `null`.

## <span id="porownanie-null-i-undefined"></span>Porównanie `null` i `undefined`

Wartość `null` i `undefined` reprezentują puste, nieokreślone wartości. Jeżeli porównamy oba typy przez potrójny znak równości i wypiszemy do konsoli, zobaczymy wartość `false`:

```javascript
console.log(null === undefined); //false
```

W tym przypadku JavaScript porównuje nie tylko wartości, ale także typy. Przez to te wartości nie są sobie równe.

Natomiast jeśli porównamy przez dwa znaki równości:

```javascript
console.log(null == undefined); //true
```

otrzymamy wartość `true`. Jest to określone w specyfikacji ECMAScript 5 przez ten zapis:

> Jeżeli x jest null i y jest undefined, return true
>
> Jeżeli x jest undefined i y jest null, return true

Nie oznacza to jednak, że to porównanie pokazuje, że wartość `null` i `undefined` są sobie równe. Przy operatorze `==` podwójnego porównania zachodzi niejawna konwersja typów jednego do drugiego. Dlatego ostatecznie otrzymujemy wartość `true` po niejawnej konwersji. Teraz może wydawać się to zawiłe, ale operatory porównania szczegółowo zostaną omówione w osobnym dziale i wszystko okaże się jasne.

## <span id="sprawdzanie-czy-wartosc-nie-jest-null-lub-undefined"></span>Sprawdzanie, czy wartość nie jest null lub undefined

Na koniec jedna z ważniejszych rzeczy. Jak sobie poradzić z prostym i szybkim sprawdzaniem, czy wartość nie jest `null` i nie jest `undefined`. Będziemy to w JavaScript robić bardzo często.

Przychodzące do nas wartości z HTTP, wartości wpisywane przez użytkownika, otrzymane wartości z innych funkcji. Często w tych przypadkach możemy trafić na `null` lub `undefined`. Przed dalszą pracą z danymi, często będziemy musieli sprawdzić, czy nie otrzymaliśmy właśnie wartości `null`
lub `undefined`. Są na to różne metody.

### Dokładna metoda

Jednym ze sposobów na sprawdzenie jest taki zapis:

```javascript
const resposne = null; // or undefinded
if (resposne !== null && resposne !== undefined) {
  console.log('Value is not null/undefined');
}
```

Mamy tutaj zmienną `response` ma przypisaną wartość `null`. Możesz dla eksperymentów także zmienić jej wartość na `undefined` aby sprawdzić poprawność kodu.

Kod w bloku `if` wykona się tylko wtedy gdy wartość będzie różna od `null` i różna od `undefined`. Ważne jest to, aby użyć potrójnego operatora `!==`.

### Z konwersją na typ `false`

Można to zrobić jeszcze w bardzo krótkiej formie:

```javascript
if (resposne) {
  console.log("Value 'resposne' is not falsy");
}
```

Jednak ten zapis nie sprawdza, czy wartość jest `null` lub `undefined`, zapis ten sprawdza, czy wartość jest `false` lub `true`. Wartość `null` i `undefined` jest wartością fałszywą, zachodzi tutaj niejawna konwersja do typu `boolean`, ponieważ próbujemy sprawdzić wartość za pomocą instrukcji `if`, a ona pracuje tylko na wartościach z typem `boolean`.

Dlatego zmienna `response` zostanie niejawnie przekonwertowana na typ `boolean`. A ponieważ jest to wartość `null`
lub `undefined` to stanie się wartością `false`.

To jakie wartości stają się fałszywe, gdy są konwertowane na typ `boolean` zawarte jest w specyfikacji ECMAScript:

[https://developer.mozilla.org/en-US/docs/Glossary/Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

```javascript
// Those values converted to boolean are false
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

Wszystkie te wartości, konwertowane do typu `boolean` dają wartość `false`, jest tutaj też wartość `null` i `undefined`. Do tej rozpiski o wartościach fałszywych jeszcze powrócimy wielokrotnie w kolejnych rozdziałach i omówimy ją dokładniej. Warto jednak już teraz starać się zapamiętać, co jest
konwertowane do wartości fałszywych w JavaScript.

W wielu przypadkach ten zapis, który stworzyliśmy, sprawdzi się, fałszywa wartość nie wykona tego w bloku `if`. Jednak musimy pamiętać, że sprawdzając tym sposobem, sprawdzamy także inne wartości, które konwertowane są na wartość `false`.

Jeżeli więc oczekujemy pustego stringa lub wartość zero, to musimy pamiętać, że także zablokujemy taką wartość w tej konstrukcji `if` i kod się nie wykona. Jednak bardzo często też, nie chcemy pracować na takich wartościach jak pusty string czy zero.

Dodatkowo też, robiąc takie sprawdzanie, zazwyczaj oczekujemy konkretnego typu jak tablica, obiekt czy funkcja. Jeżeli nie wiemy, jaki przyjdzie typ, instrukcja ta wymaga dodatkowo sprawdzenie konkretnego typu, jaki oczekujemy.

### Metoda dwóch znaków równości

Ostatnią metodą jest sprawdzenie przez użycie dwóch znaków równości. Tym razem z zapisem `if` będziemy się upewniać czy zmienna na pewno jest `null` lub `undefined` i wtedy chcemy wyświetlić napis.

```javascript
if (resposne == null) {
  console.log('Value is null or undefined');
}
```

Jest to bardzo krótki i zwięzły zapis, który już znamy. Sprawdzający dokładnie, czy mamy do czynienia z `null`lub `undefined` pod zmienną `response`. Jego problemem jest użycie tylko podwójnych znaków równości, a dzisiaj dobre zasady i lintery forsują używanie potrójnych znaków równości do
porównania dwóch wartości i ich typów, i mają oczywiście rację. Obecnie w JavaScript używamy potrójnych znaków porównania.

Ogólnie należy unikać porównania za pomocą podwójnych znaków, ale o tym będziemy jeszcze rozmawiać. Jednak w przypadku `null` i `undefinde` warto wiedzieć o tym zapisie, bo pomimo dobrej praktyki z potrójnymi znakami równości, możecie ten zapis znaleźć w nowym kodzie.

Jeżeli koniecznie chcecie używać takiego porównania, można wprowadzić do lintera tę pojedynczą regułę i namówić team do stosowania tego zapisu.

Sam od zawsze używam, krótkiego sprawdzania, czy wartość jest fałszywa, czy nie:

```javascript
if (resposne) {
  console.log('It works!');
}
```

i ten zapis w większości przypadków Wam wystarczy.

## <span id="co-warto-zapamietac"></span>Co warto zapamiętać:

* wartość `null` używamy, gdy chcemy sami przypisać pustą wartość
* wartość `undefined` jest używana dla niezainicjalizowanych, niezdefiniowanych i nieistniejących wartości przez JavaScript
* staramy się nie używać `undefined` w kodzie
* sprawdzenie, czy coś nie jest `null` lub `undefined` może być _tricky_
* sprawdzenie `null==undefined` jest przestarzałe, ale wciąż używane przez wielu developerów, bo jest bardzo bezpiecznym i krótkim zapisem.
* `null` i `undefined` to wartości fałszywe przy konwersji do `boolean` zwracają `false`

* wartość `null` i `undefined` nie oznaczają tego samego

## <span id="odnosniki"></span>Odnośniki:

[https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1)

[https://developer.mozilla.org/en-US/docs/Glossary/Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

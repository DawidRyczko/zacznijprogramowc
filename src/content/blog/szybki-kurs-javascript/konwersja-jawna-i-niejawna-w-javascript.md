---
title: "Konwersja typów w JavaScript: Szybki Kurs #10"
description: "Omówienie konwersji jawnej i niejawnej w JavaScript. Zasady konwersji, problemy z operatorem ==, porównywanie null i undefined."
date: 2025-03-13
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Konwersja typów](#konwersja-typów)
* [Konwersja jawna](#konwersja-jawna)
* [Konwersja niejawna](#konwersja-niejawna)
* [Operator `==` i problemy](#operator--i-problemy)
* [Porównanie null za pomocą ==](#porównanie-null-za-pomocą--)
* [Co warto zapamiętać:](#co-warto-zapamiętać)

## <span id="konwersja-typów">Konwersja typów</span>

W JavaScript będziemy mieć bardzo często do czynienia z konwersją typów. Z konwersją będziemy spotykać się przy porównywaniu wartości, wykonywaniu działań matematycznych, konkatenacji ciągów znakowych czy nawet przy serializacji do formatu JSON.

Wielokrotnie sami będziemy decydowali o konwersji danych, będzie to wtedy konwersja jawna. Znacznie częściej jednak będzie odbywała się konwersja niejawna. Konwersja niejawna rządzi się wieloma regułami i zasadami. Zrozumienie ich może nam ułatwić pracę z JavaScript.

Nie ważne, która z nich występuje, każda konwersja w JavaScript to konwersja tylko do typu prymitywnego. W wyniku konwersji otrzymamy zawsze wartość typu  `boolean`, `string` albo `number`.

```js
// boolean, string, number
```

Dodatkowo konwersja dla typów prymitywnych i obiektowych różnią się. W tym dziale zajmiemy się typami prymitywnymi. Gdy będziemy omawiać obiekty, wrócimy jeszcze do konwersji i tego jak one zachowują się gdy musi nastąpić ich konwersja do typu prymitywnego.

## <span id="konwersja-jawna">Konwersja jawna</span>

Jeśli chodzi o konwersję jawną to dzieje się wtedy, kiedy w kodzie zastosujemy konkretną instrukcję. Dobrym przykładem jest wykorzystanie funkcji `Boolean(), String() i Number()`.

```js
console.log(Boolean('false')); // true
console.log(String(42)); // '42'
console.log(Number('42.12')); // 42.12
```

Ten zapis mówi nam dokładnie o tym, że wartości zostaną przekonwertowane na odpowiednie typy.

Jeżeli podamy do tych funkcji poprawne formy danych, otrzymamy spodziewany wynik. Każdą z tych funkcji omówimy jeszcze dokładnie w dalszej części działu.

## <span id="konwersja-niejawna">Konwersja niejawna</span>

W JavaScript częściej będziemy mieli jednak do czynienia z niejawną konwersją, która często zaskakuje programistów swoimi wynikami. Niejawna konwersja bardzo często stosowana jest przy wszelkich porównaniach, instrukcjach warunkowych. Często wynikiem niejawnej konwersji jest typ `boolean`.

Jeden z popularniejszych przypadków w kodzie to sprawdzenie, czy zmienna ma jakąś wartość:

```js
const a = 'false';
if (a) {
    console.log(Boolean(a))
}
```

W tym przypadku zmienna `a` reprezentuje typ `string`. Ten łańcuch znaków nie jest pusty, a niepusty `string`
konwertowany jest na wartość `true`. Ostatecznie więc zmienna `a` na potrzeby instrukcji warunkowej `if` zostaje niejawnie skonwertowana do typu `boolean` o wartości `true`.

Zobaczmy kolejny przypadek:

```js
const b = ' ';
if (b) {
  console.log(Boolean(b)) // true
}
```

Tutaj również sprawdzamy, czy zmienna `b` ma jakąś wartość. Na pierwszy rzut oka wydaje nam się, że nie. Jednak spacja to także wartość w JavaScript i choć mogłoby się wydawać, że nic tam nie ma, nastąpi niejawna konwersja do typu `boolean` i będzie ona miała wartość `true`.

Kolejnym przypadkiem niejawnej konwersji jest dodanie pustego stringa:

```js
const c = 42 + "";
console.log(c) // '42'
```

Tak naprawdę jest to operacja dodawania. Jednak gdy jedna ze stron reprezentuje typ `string` następuje konwersja drugiej strony do typu `string`. Dlatego też ostatecznie otrzymujemy liczbę zapisaną jako `string`.

## <span id="operator--i-problemy">Operator `==` i problemy</span>

Szczególnie dużo niejawnych konwersji zachodzi przy operatorach porównania, arytmetycznych i logicznych. Cały system konwersji w JavaScript jest bardzo rozbudowany i ma swoje konkretne zasady.

Szczególny problem powoduje operator podwójnego porównania `==` . Zapamiętanie wszystkich możliwych wyników, jakie daje ten operator, nie jest możliwe.

Dlatego tak często operator ten zaskakuje programistów, a używanie go dzisiaj to proszenie się o problemy. Jednak nadal operator ten istnieje w JavaScript, jest też częstym elementem dyskusji na rozmowie o pracę i warto o nim wiedzieć coś więcej.

Rozważmy taki przypadek, z którego otrzymujemy wartość `false`:

```js
console.log(true == 'true'); // false
```

Porównujemy wartość `true` z napisem `'true'`. Moglibyśmy wydedukować, że jeżeli po lewej jest wartość `boolean` to wartość po prawej stronie będzie przekonwertowana do wartości `true` w typie boolean.

Niestety, przy porównaniach, działają zupełnie inne zasady i możemy je przejrzeć w specyfikacji ECMAScript https://www.ecma-international.org/ecma-262/5.1/#sec-11.9

Gdy przeanalizujemy nasze porównanie zgodnie z tym, co jest w specyfikacji, zobaczymy zapis, że:

> If Type(*x*) is Boolean, return the result of the comparison ToNumber(*x*) == *y*.

Jeżeli pierwszą wartością jest `boolean` to następuje niejawna konwersja `boolean` na `number`.

Po pierwszej niejawnej konwersji porównanie zmienia się na taką postać:

```js
Number(true) // 1
console.log(1 == 'true') // false
```

w specyfikacji czytamy dalej:

> If Type(*x*) is Number and Type(*y*) is String,
> return the result of the comparison *x* == ToNumber(*y*).

Jeżeli teraz pierwszą wartością jest `number` a drugą wartością `string` to należy przekonwertować drugą wartość na `number`. Nasze porównanie więc znowu zmienia postać taką:

```js
Number('true'); // NaN
console.log(1 == NaN)
```

Wszystko zostało sprowadzone do typu `number` i na końcu sprawdzane jest, czy liczba jeden równa się `NaN`. Pamiętajmy, że w JavaScript `NaN` to `number`, są to więc dwie różne liczby. Otrzymujemy więc wartość `false`, pomimo, że mogliśmy się spodziewać wartości `true`. Przeszliśmy przez szereg
niejawnych konwersji, a wynik dla nas nie był oczywisty.

Spamiętanie tego jest bardzo trudne. W Internecie znajdziecie świetną stronę, autorstwa użytkownika *Dorey* która pokazuje przypadki konwersji przy porównaniu, a także konwersję przy instrukcji `if` https://dorey.github.io/JavaScript-Equality-Table/

![table1](https://zacznijprogramowac.net/content/images/wordpress/2021/02/table1.png)

Tabela prezentujące możliwe wyniki przy operatorze podwójnego porównania jest trudna do zapamiętania i nawet nie należy próbować jej zapamiętać.

Wniosek z tych wszystkich materiałów jest zawsze taki, że najlepiej używać potrójnego operatora porównania. Który nie dokonuje konwersji. Prezentuje to już druga tabelka:

![table2](https://zacznijprogramowac.net/content/images/wordpress/2021/02/table2.png)

Zadaniem potrójnego operatora jest sprawdzenie, czy wartości są takie same i mają ten sam typ. Nie zachodzą żadne niejawne konwersje, a tabelka w odczytaniu jest już bardzo prosta. Otrzymujemy `true` tylko tam, gdzie w porównaniu mamy dokładnie ten sam typ i tę samą wartość.

Wróćmy jeszcze na chwilę do naszego przykładu.

Może nam bardzo zależeć na porównaniu takich wartościach jak `boolean` i `string`, Jeżeli chcemy to koniecznie zrobić najlepiej zastosować jawną konwersję do typu `boolean`:

```js
console.log(true === Boolean('true')); // true
```

Dokonując konwersji jawnej i stosując potrójny operatora porównania, kod mamy pod większą kontrolą i nie jesteśmy zdani na wynik niejawnej konwersji, który jest trudny do przewidzenia. Tym sposobem unikniemy wielu problemów.

## <span id="porównanie-null-za-pomocą--">Porównanie null za pomocą ==</span>

Czasami możecie jednak zobaczyć w użyciu podwójne porównanie. Jedynym przypadkiem, w którym podwójny operator sprawdza się to porównanie do wartości `null`:

```js
const x = undefined;
const y = null;
const z = 'test';
console.log(x == null) // true
console.log(y == null) // true
console.log(z == null) // false
```

Ten zwięzły zapis pozwala sprawdzić, czy wartość nie jest `null` lub `undefined`.

Nie wiem jednak, czy robienie w kodzie wyjątku na takie podwójne porównanie przyniesie Wam wiele korzyści. Osobiście z podwójnego operatora porównania zrezygnowałbym całkowicie. Choćby dla ujednolicenia zasad w kodzie.

Dalszymi przypadkami konwersji zajmiemy się w kolejnych filmach, gdzie poznamy operatory porównania, operatory logicznego porównania i różne sposoby jawnej i niejawnej konwersji.

## <span id="co-warto-zapamiętać">Co warto zapamiętać:</span>

- w JavaScript mamy konwersję jawną i niejawną
- każda konwersja to sprowadzanie do wartości prymitywnej
- operatory często stosują niejawną konwersję, operator podwójnego porównania jest szczególnie trudny do rozszyfrowania
- w Internecie mamy dostęp do tabel, które pokazują konkretne przypadki porównania
- jeżeli używamy operatora porównania to tylko potrójnego
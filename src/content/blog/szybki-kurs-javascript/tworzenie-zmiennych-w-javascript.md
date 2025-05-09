---
title: "Tworzenie zmiennych w JavaScript: Szybki Kurs #1"
description: "Omówienie deklaracji zmiennych w JavaScript: `var`, `let` i `const`. Poznaj pierwsze pułapki i dowiedz się, kiedy używać poszczególnych deklaracji."
date: 2025-03-22
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści

* [Deklaracja zmiennych](#deklaracja-zmiennych)
* [Różnice między var, const i let](#roznice-miedzy-var-const-i-let)
* [Kiedy używać var, const, let](#kiedy-uzywac-var-const-i-let)
* [Co warto zapamiętać](#co-warto-zapamietac)

W tej części omówimy sobie deklarację zmiennych w JavaScript. Zapoznamy się z pierwszymi pułapkami i dowiemy się, kiedy
używać `var`, `let`, a kiedy `const`.

## Deklaracja zmiennych <span id="deklaracja-zmiennych"></span>

W JavaScript możemy deklarować zmienne za pomocą trzech słów kluczowych jak:

```
var
const
let
```

Od zawsze był `var`, natomiast `const` i `let` pojawiały się w JavaScript wraz ze standardem ECMAScript 6, czyli
ogromnym rozszerzeniem języka, które unowocześniło JavaScript i pozwoliło na jeszcze szybszy rozwój.

Tak jak w wielu innych językach programowania, nazwy zmiennych mają swoje ograniczenia, nie możemy używać słów
kluczowych specyficznych dla języka JavaScript. Najlepiej używać znaków alfanumerycznych ze standardu ASCII, mogą to być
małe litery i wielkie litery. Możemy też użyć znaku $ oraz \_, a także dodać cyfry.

```
a-z, A-Z, $, _ , 0-9,
```

Zadeklarujemy teraz trzy zmienne za pomocą `var, const i let`.

```js
var bird = 'a bird';
const cat = 'a cat';
let myDog = 'my dog';
```

Po słowach kluczowych podaję nazwy i za pomocą znaku równości przypisuję wartość, w tym przypadku tekst. W JavaScript
nie określamy typu zmiennej, ale o typach porozmawiamy później. Możecie też się spotkać z deklaracją wielu zmiennych za
pomocą jednej instrukcji:

```js
const a1 = '1',
    a2 = '2',
    a3 = '3';
```

lub z tym samym zapisem ale w wielu liniach:

```js
const b1 = 1,
    b2 = 2,
    b3 = 3;
```

Do tworzenia zmiennych najczęściej używa się zapisu _camelCase_ i przykładem jest tutaj nazwa `myDog`.

```js
let myDog = 'my dog';
```

Jednak to od Was i waszego teamu zależy, jak będą wyglądały zapisywane zmienne. JavaScript nie narzuca tutaj żadnych
reguł. Do tego są wszelkiego rodzaju lintery i edytory kodu, które sprawdzają stylistykę kodu według naszych ustaleń.

Jeżeli teraz chcemy teraz wypisać zadeklarowane zmienne do konsoli, używamy polecenia:

```js
console.log();
```

i wypisujemy wszystkie zmienne do konsoli:

```js
console.log(bird);
console.log(cat);
console.log(dog);
```

po uruchomieniu skryptu za pomocą Node.js, przeglądarki czy też edytora online, zobaczycie wartości zmiennych w konsoli.
Śmiało, można powiedzieć, że `console.log` to jedno z ważniejszych poleceń w języku JavaScript i będziemy z niego
nieustannie korzystać. Przydaje się do logowania zdarzeń, debugowania kodu i oczywiście nauki.

### Deklaracja bez wartości

Na koniec warto jeszcze się dowiedzieć, co przetrzymuje zmienna bez zadeklarowanej wartości.

```js
// let: not initialized
let salary;
console.log(salary); //undefined
```

Za pomocą `let` możemy zadeklarować zmienną i nie przypisywać jej wartości. Wtedy taka zmienna przechowuje wartość
`undefined`. W wielu językach programowania można się spodziewać `null`. Tutaj jednak oznacza to zupełnie coś innego niż
`null`. Zostawmy to jednak teraz, temat o `null` i `undefined` jeszcze będziemy omawiać.

## Różnice między var, const i let <span id="roznice-miedzy-var-const-i-let"></span>

Porozmawiajmy teraz o różnicach między `var, let i const`.

### Zmienne var

Słowo kluczowe VAR od standardu ES6 jest przestarzałe i w ogóle nie powinniśmy go używać. Korzystanie z niego dzisiaj
uważa się za błąd. Podam kilka przykładów, jakie są problemy przy używaniu `var`:

#### Redeklaracja zmiennej

Pierwszy z nich to możliwość zadeklarowania dwóch zmiennych o tej samej nazwie.

```js
var hello = 'hi';
var hello = 'hey';
console.log(hello);
```

Jest to jak najbardziej poprawny kod JavaScript, a gdy uruchomimy kod na ekranie zobaczymy wartość `hey` czyli tę
wartość, która była przypisana do ostatniej zmiennej o tej samej nazwie. W przypadku ` let` i `const` nie jest to
możliwe.

#### Zakres `var`

`Var` ma zakres globalny lub funkcyjny. Jeżeli zadeklarujemy zmienną `var` poza jakąś funkcją będziemy mieli do niej
dostęp z każdej części kodu. Zmienna ta dopisuje się do globalnego obiektu `window` (w przypadku przeglądarek), o czym
będziemy jeszcze rozmawiać w innym dziale.

Jeżeli zadeklarujemy zmienną `var` w funkcji, dostęp mamy tylko w tej funkcji.

O ile zakres funkcyjny wydaje się ok, to ten globalny zakres jest zbyt duży. Gdy zadeklarujemy zmienną `var` w zwykłym
bloku kodu między klamrami, lub w pętli for czy w bloku `if` nadal będziemy mieli do niej dostęp spoza tego bloku.
Zobaczmy taki przykład gdzie mamy blok kodu z instrukcją `if`:

```js
if (true) {
    var name = 'My name is Neo';
    const name2 = 'My name is James Bond';
}
console.log(name);
console.log(name2); // error
```

Nadal możemy wypisać zmienną `name`, pomimo tego, że zadeklarowana jest w oddzielnym bloku kodu. W przypadku zmiennej
zadeklarowanej za pomocą `const` lub `let` nie mamy do niej dostępu poza blokiem kodu. I zostanie zgłoszony błąd.

#### Przypisanie wartości przed deklaracją zmiennej

Dla wielu osób, które znają inny język programowania, ten przykład może być najdziwniejszy. Okazuje się, że można
najpierw przypisać wartość do zmiennej, a dopiero potem zmienną zadeklarować za pomocą `var`.

```js
day = 'Monday';
var day;
console.log(day);
```

W tym przypadku zobaczymy w konsoli wartość Monday bez żadnego błędu. Dzieje się tak, ponieważ deklaracja zmiennych w JS
jest przenoszona zawsze na początek kodu lub początek funkcji. Tak naprawdę w czasie interpretowania kodu, zmienna `day`
zostanie najpierw stworzona za pomocą `var`, a dopiero potem zainicjalizowania wartością Monday.

Jest to mechanizm nazywany hoisting. W przypadku zmiennych oznacza to, że deklaracje zawsze robione są, zanim zacznie
się wykonywanie kodu albo funkcji. Dotyczy to także `const` i `let` jednak taki zapis jak w przypadku `var` nie jest
możliwy. Nie chce głębiej wchodzić w hoisting, bo jest to temat na zupełnie nowy odcinek. Jednak w hoistingu `const` i
`let` nie jest od razu deklarowany jak `var` , tu znowu jest ta różnica. Dlatego taki kod dla `const` i `let` będzie
niepoprawny i JavaScript zgłosi nam błąd.

Głównie z tych powodów nie używamy dzisiaj `var`, mamy jednak świadomość, że istnieje, a wraz z nim istnieją problemy,
które rozwiązują `const` i `let`.

W kolejnych działach będę jeszcze powracał do deklaracji zmiennych za pomocą `var` i dokładnie poznamy specyfikę
działania takich zmiennych.

### Zmienne const

`Const` używamy do deklaracji zmiennych, które się nie zmienią. Możemy wtedy taką zmienną nazwać stałą lub zmienną o
stałej wartości. Dla uproszczenia ja nadal `const` będę nazywał zmienną.

Prosty przykład to przypisanie wartości liczby PI. Możemy do jej przechowania użyć zmiennej `const`:

```js
// const: can't change assigned value
const pi = 3.14;
```

Jednak jeżeli stwierdzimy potem w naszej aplikacji, że PI ma mieć inną wartość, to nie będziemy mogli do
zmiennej `const` przypisać nowej wartości. Taki zapis jest błędem:

```js
pi = 3.17;
```

Druga ważna rzecz to przy `const` musimy od razu przypisać wartość, nie możemy tylko zadeklarować zmiennej:

```js
 // const: you have to assigned value with declaration
const city; // error
```

Nie możemy po prostu stworzyć nazwy zmiennej z myślą o późniejsze deklaracji. Przy takiej potrzebie powinno używać się
`let`.

Powiedziałem, że zmienna `const` nie może zmienić wartości, którą ma przypisaną. Zwrócę jeszcze uwagę na typy obiektowe.
Jeżeli do zmiennej zadeklarowanej za pomocą `const` przypiszemy obiekt to również, nie możemy potem przypisać innego
obiektu:

```js
const settings = {};
```

Jednak sama zawartość obiektu możemy zmieniać:

```js
settings.host = 'localhost';
```

To jest to nadal poprawne. Ponieważ zmienna `settings` zadeklarowana za pomocą `const` przetrzymuje referencje do
obiektu, a ja dodając nową właściwość, nie zmieniam referencji do obiektu. W tym przypadku nie mógłbym przypisać do
zmiennej `settings` nowego obiektu, jak próbuję to zrobić teraz:

```js
settings = {}; // error
```

Taki zapis jest już błędem, ponieważ próbuję do zmiennej `const` o nazwie `settings` przypisać zupełnie nowy obiekt, a
to jest już nowa wartość dla `const`. I znowu otrzymamy błąd.

Oczywiście o obiektach w JavaScript jeszcze będziemy mówić. Tak jak w wielu językach programowania, tak w JavaScript są
typy proste jak `number` czy `string` oraz typy obiektowe, do których odnosimy się przez referencję. W przypadku
deklarowania zmiennej `const` i przypisania typu obiektowego, nie możemy zmienić tej referencji do obiektu, ale możemy
zmieniać to, co przechowuje obiekt.

### Zmienne let

Jeżeli chodzi o deklarację zmiennych za pomocą `let` to jest to najbardziej intuicyjna forma tworzenia zmiennych. Możemy
tworzyć zmienne bez inicjalizacji, nadpisywać wartości, a także podobnie jak `const`, `let` działa w swoim bloku kodu:

```js
let color;
color = 'red';
```

Do stworzonej zmiennej mogę później przypisać wartość i jest to poprawne.

Zmianę wartości zmiennej:

```js
let number = 41;
number = 42;
```

Mogę zmieniać wartości przypisane do zmiennych stworzonych za pomocą let.

Na koniec zmienne `let` i `const` nie są dostępne poza blokiem kodu, co wydaje się bardzo logiczne:

```js
// const i let: no access outside the code block
{
    const one = 1;
    let two = 2;
}
// console.log(one, two); // error
```

Jeżeli próbujemy się odwołać do zmiennej `one` i `two` poza blokiem kodu, otrzymamy błąd i program przestanie się daje
wykonywać.

## Kiedy używać var, const, let <span id="kiedy-uzywac-var-const-i-let"></span>

Pozostaje pytanie kiedy używać `var, const, let`.

```js
// var
// const
// let
```

`Var`, w ogóle nie używamy w naszych aplikacjach. Jak dla mnie jest to zawsze błąd i nigdy nie powinien być użyty w
kodzie produkcyjnym. W wielu tutorialach napisanych dawniej, znajdziecie `var`, dzisiaj jednak nikt go już nie używa.

`Const` używamy tak często, jak to możliwe. Jeżeli wiemy, że zmienna nie będzie się zmieniać, używamy `const` lub jeżeli
nie chcemy, aby się zmieniła. Jeżeli chcemy, aby obiekt przypisany do zmiennej nie został nadpisany, także używamy
`const`. Zmienne `const` dają nam o wiele więcej informacji o tym, jak zmienne są używane i czy mogły się zmienić.

Wszelkie obiekty konfiguracyjne, przechowujące ważne ustawienia i inicjalizujące się na starcie aplikacji, także powinny
być zadeklarowane za pomocą `const`.

Jeśli chodzi o formę zapisu czy `const` zapisujemy tylko z DUŻYCH liter czy za pomocą camelCase to już zależy od Waszych
preferencji. W JavaScript nie ma jednoznacznie przyjętej zasady.

Wszędzie tam, gdzie nie można użyć `const`, używamy `let`. Czasami musimy zadeklarować zmienną, do której dopiero potem
coś przypiszemy, lub na przykład używamy `let` w pętli for. Dla `let` również znajdziemy wiele zastosować w czasie
pisania kodu.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- do deklaracji zmiennych używamy `const` i `let`
- deklaracja za pomocą `var` jest przestarzała i może powodować nieoczekiwane działanie kodu
- `const` używamy tak często jak to możliwe. W innych przypadkach używamy `let`.
- `const` używamy do deklarowania stałych wartości
- hoisting to mechanizm, który deklaruje zmienne przed wykonywaniem kodu. Można to sobie wyobrazić jako przeniesienie
  deklaracji zmiennych na sam początek kodu lub funkcji
- niezainicjalizowana zmienna ma wartość `undefined`

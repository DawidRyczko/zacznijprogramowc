---
title: "Wartość i typ string w JavaScript: Szybki Kurs #6"
description: "Omówienie typu string w JavaScript, deklaracja, template literals, obiekt String oraz znaki ucieczki."
date: 2025-03-17
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Wartość i typ string](#wartość-i-typ-string)
* [Deklaracja wartości typu `string`](#deklaracja-wartości-typu-string)
* [Template literals](#template-literals)
* [Obiekt String](#obiekt-string)
* [Co warto zapamiętać:](#co-warto-zapamiętać)

## <span id="wartość-i-typ-string">Wartość i typ string</span>

Z wartościami tekstowymi w JavaScript pracuje się bardzo często. Wartości tekstowe reprezentowane są jako typ prymitywny `string`. W JavaScript jest kilka sposobów na zadeklarowanie takiej wartości, dodatkowo mamy też *template literals*, które pomagają formatować tekst. Pierwsza część o tym, jak
tworzyć stringi w JavaScript i jak formatować dłuższe teksty.

## <span id="deklaracja-wartości-typu-string">Deklaracja wartości typu `string`</span>

Zobaczmy jak może wyglądać literał typu `string` w języku JavaScript:

```js
const single = 'abc';
const double = "abc";
```

Wartości tekstowe możecie zapisywać w pojedynczych lub podwójnych cudzysłowach, zależy to tylko od waszych upodobań.

Mamy także znak ucieczki, czyli *backslash*, który pozwala na użycie znaków, które występując więcej razy w literale, mogą stanowić problem. Przykładem są właśnie cudzysłowy, które dodatkowo użyte w stringu bez znaku ucieczki mogą stanowić problem dla JavaScript w zrozumieniu gdzie kończy, a gdzie
zaczyna się wartość.

```js
const hello = "I say \"hello!\"";
console.log(hello);
 
const hero = 'D\'Artagnan'
console.log(hero);
```

Dodatkowo możemy w wartości string wprowadzać nową linię za pomocą znaku  `\n`. Tym sposobem tekst zostanie wyświetlony w trzech liniach.

```js
const text = 'I \n am \n computer';
console.log(text);
```

Znaków ucieczki jest więcej i nie będę ich omawiał wszystkich, można je natomiast odnaleźć w dokumentacji na stronie MDN.

Jeżeli chcemy zapisać bardzo długiego stringa w edytorze kodu, możemy to zrobić w taki sposób:

```js
const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam';
```

Kolejne zdania zapisujemy w nowej linii i łączymy je za pomocą znaku plus. Czyli tak naprawdę wykonujemy konkatenację stringów. Zauważ, że każdy string zapisany jest we własnym cudzysłowie i połączony znakiem plus. Są to trzy oddzielne wartości, które łączą się w jedną wartość pod
zmienną `longString.`

Inną metodą jest umieszczenie znaku *backslash* w miejscu, gdzie chcemy złamać linie kodu w edytorze:

```js
const longString2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
Ut enim ad minim veniam';
```

W tym przypadku cały napis znajduje się w jednym cudzysłowie, a znak *backslash* dodajemy w miejscu, gdzie chcemy mieć złamaną linię. W tym zapisie musimy zwrócić uwagę na to, aby po znaku *backslash* nie było żadnego odstępu, ani spacji, ani tabulatora.

Pamiętajmy, że te dwie metody pokazują łamanie linii kodu w edytorze dla lepszej czytelności. W konsoli tekst wyświetla się jako ciągłe zdanie.

Zahaczyliśmy już o dodawanie stringów za pomocą znaku `+` . Możemy go oczywiście używać do łączenia stringów:

```js
const hello = "Hello";
const world = "world";
const helloWorld = hello + " " + world + "!"; // Hello world!
```

Zmienną hello łączymy na początku ze spacją, potem dołączamy kolejną zmienną i na końcu dodajemy wykrzyknik. W ten sposób budujemy całe zdanie. Czasami taki zapis staje się mało czytelny, na szczęście jest lepszy sposób na łączenie wartości.

## <span id="template-literals">Template literals</span>

Od ECMAScript 6, mamy jeszcze dostęp do template literals, czasami nazywane też template strings, które zapisuje się za pomocą znaku *backtick* lub po polsku odwróconego apostrofu. Znak ten znajduje się na klawiaturach Windows pod klawiszem Escape.

Za pomocą znaków *backtick* możemy tworzyć także zmienne:

```js
const name = `James`;
const surname = `Bonds`;
```

Jednak najczęściej template literals używa się nie do inicjalizowania zmiennych, a do wykonywania wyrażeń. Zobaczmy taki przykład:

```js
const myName = `My name is ${surname}, ${name} ${surname}!`
console.log(myName); // My name is Bond, James Bond!
```

Używając odwróconego apostrofu, możemy budować bardziej złożone wartości string, które składają się ze zmiennych czy nawet funkcji. Oczywiście to samo możemy otrzymać przy konkatenacji stringów za pomocą znaku `+` jednak w tym przypadku czytelność wygrywa.

Wszystko, co znajduje się pomiędzy znakami *backticks* zostanie zinterpretowane jako string. Pod zmienne zostaną podstawione wartości, a ewentualne funkcje zostaną wykonane.

```js
function upperCase(value) {
  return value.toUpperCase();
}
 
const myName2 = `My name is ${surname}, ${name} ${upperCase(surname)}!`
//  My name is Bond, James BOND!
```

Widzimy bardziej skomplikowany zapis, gdzie odwołuję się nie tylko do zmiennych, ale także do funkcji, do której przekazuję dodatkowo zmienną, a ona zwraca mi wartość tej zmiennej, zamieniając wszystkie znaki na duże liter. Używając *template literals* jesteśmy w stanie zapisać to w ładnej i
przejrzystej formie.

Odwrócony apostrof może nam się także przydać do łamania linii w edytorze kodu:

```js
const longString3 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam`;
```

Nie musieliśmy używać żadnych dodatkowych znaków, aby tak zapisać długą wartość string w czytelny sposób. Należy jednak pamiętać, że napis ten zostanie wyświetlony dokładnie tak, jak został zapisany. Jest to spora różnica w porównaniu do poprzednich sposobów.

W tamtych przypadkach chcieliśmy jedynie zachować czytelność w edytorze, a tekst był wyświetlany jako ciągły. Tutaj wpływamy nie tylko na czytelność w edytorze, ale także na formatowanie samego tekstu przy jego wyświetlaniu.

Jeżeli deklarujemy wartości `string` róbmy to za pomocą pojedynczego lub podwójnych cudzysłowów. Jeżeli natomiast chcemy budować wyrażenie, w którym podstawimy zmienne, a może nawet wykonamy kod jakieś funkcji, używajmy *template literals*
czyli zapis z odwróconym apostrofem.

## <span id="obiekt-string">Obiekt String</span>

Również prymitywny typ `string` ma reprezentację w postaci obiektu `String` zapisanego wielką literą. Podobnie jak przy `Boolean` czy `Number` możemy tworzyć obiekty z wartością `string` przez wywołanie konstruktora tego obiektu:

``` js
const obj = new String('Lorem ipsum');
console.log(obj); // [String: 'Lorem ipsum']
console.log(obj.valueOf()); // Lorem ipsum
```

Jak już wiemy inicjalizacja ze słowem `new` powoduje powstanie obiektu, który opakowuje wartość tekstową. Jeżeli chcemy dostać się do prymitywnej wartości musimy wywołać na obiekcie metodę `valueOf()`. Korzystanie więc z tego obiektu nie ma większego sensu i jest zbędne w codziennej pracy
programisty JavaScript.

Dużego obiektu najlepiej używać w formie funkcji `String()` do konwersji innych typów na `string`, ale o tym będziemy jeszcze rozmawiać przy okazji konwersji.

## <span id="co-warto-zapamiętać">Co warto zapamiętać:</span>

- literały typu `string ` zapisujemy za pomocą pojedynczego lub podwójnego cudzysłowu
- znak odwróconego apostrofu używamy do stworzenia *template literals*
- znakiem plus możemy łączyć wartości do typu `string`
- możemy użyć różnych znaków ucieczki, aby lepiej sformatować nasz tekst np. `\n`
- template literals pozwalają nam na czytelne łączenie stringów lub nawet wykonanie funkcji. Dzięki temu możemy zbudować skomplikowane, ale czytelne wyrażenia.
- prymitywny typ `string`, także posiada wrapper w postaci obiektu `String`.
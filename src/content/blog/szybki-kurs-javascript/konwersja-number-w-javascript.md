---
title: "Konwersja number w JavaScript: Szybki Kurs #12"
description: "Omówienie konwersji na typ number w JavaScript."
date: 2025-03-11
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Konwersja number](#konwersja-number)
* [Konwersja do typu `number`](#konwersja-do-typu-number)
* [Number()](#number)
* [parseInt()](#parseint)
* [parseInt() z parametrem](#parseint-z-parametrem)
* [parseFloat()](#parsefloat)
* [Jak poradzić sobie z liczbami z przecinkiem](#jak-poradzic-sobie-z-liczbami-z-przecinkiem)
* [Konwersja przez operator `+` oraz `-`](#konwersja-przez-operator--oraz--)
* [Konwersja przez inne operatory arytmetyczne](#konwersja-przez-inne-operatory-arytmetyczne)
* [Number na string](#number-na-string)
* [Number na boolean](#number-na-boolean)
* [Co warto zapamiętać](#co-warto-zapamietac)

## <span id="konwersja-number">Konwersja number</span>

W tym dziale omówimy sobie konwersje na typ `number`, a także konwersje do typu `number`, a więc wszystko, co dotyczy konwersji wartości liczbowych.

## <span id="konwersja-do-typu-number">Konwersja do typu `number`</span>

Funkcja `Number()` jest podstawową funkcją do konwersji na typ `number`. Możemy tam przekazać każdą wartość, zobaczmy jakie wyniki daje przy przekazaniu wartości prymitywnych:

```js
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
```

Po konwersji wartości `true` i `false` otrzymujemy kolejno wartość `1` i wartość `0`. Wiemy to już z działu o konwersji typów `boolean`.

Wartość `null` konwertowana jest do wartości `0`. Natomiast wartość `undefined` jest konwertowana do wartości `NaN`. Tak po prostu wynika ze specyfikacji ECMAScript.

Zdecydowanie więcej możliwości jest, gdy będziemy konwertować liczby zapisane jako `string`.

### <span id="number">Number()</span>

Pierwszym sposobem konwersji liczb zapisanych jako string jest użycie funkcji `Number()`:

```js
console.log(Number('42')); // 42
console.log(Number('42.5')); // 42.5
console.log(Number('42,5')); // NaN
console.log(Number('42xyz')); // NaN
console.log(Number('xyz42')); // NaN
```

Przy konwersji za pomocą `Number()` otrzymujemy tylko dwie poprawne wartości. Liczba całkowita `42` nie jest tutaj żadnym problemem, tak samo liczba dziesiętna `42.5`. Jest poprawna, ponieważ jest zapisana z kropką `.`, a nie z przecinkiem `,`.

Wniosek jest z tego taki, że funkcja `Number()` dokonuje konwersji z typu `string` na typ `number` wtedy i tylko wtedy gdy wartości zapisane w typie `string` naprawdę prezentują liczbę. Użyjemy więc funkcji `Number()` tylko wtedy gdy mamy pewność, że prezentowane wartości typu `string` dokładnie
reprezentują wartości liczbowe. Musi więc być zachowany poprawny format i nie może być żadnych innych znaków.

Oczywiście możemy też konwertować stringi, które reprezentują inne formaty liczb:

```js
console.log(Number('0o52')); // 42
console.log(Number('0x2A')); // 42
console.log(Number('0b00101010')); // 42
console.log(Number('1e42')); // 1e+42
```

W tym przypadku za pomocą funkcji `Number()` kolejno konwertujemy liczbę szesnastkową, ósemkową, binarną oraz zapisaną wykładniczo.

### <span id="parseint">parseInt()</span>

Do konwersji możemy też użyć globalnej funkcji `parseInt`:

```js
console.log(parseInt('42')); // 42
console.log(parseInt('42.5')); // 42
console.log(parseInt('42,5')); // 42
console.log(parseInt('42xyz')); // 42
console.log(parseInt('xyz42')); // NaN
```

Widzimy, że funkcja `parseInt` oprócz wartości `'xyz42'` zdołała przekonwertować wszystko do typu `number`. W tej sytuacji funkcja `parseInt` analizuje każdy znak od lewej do prawej. Jeżeli napotka znak, który nie może zostać przekształcony na liczbę, kończy konwersję i zwraca to, co udało jej się
skonwertować.

Dlatego udało się przekonwertować wartość `42xyz` do liczby `42`, ale konwersja wartości `xyz42` od razu się kończy po wykryciu pierwszego znaku, który nie jest liczbą i zwracana jest wartość `NaN`.

Funkcja `parseInt` konwertuje tylko do liczb całkowitych, dlatego nie widzimy w wynikach części ułamkowych. Również możemy przekazać jej tylko wartość `string`. Przekazywanie do tej funkcji innych wartości skończy się niespodziewanymi wynikami.

### <span id="parseint-z-parametrem">parseInt() z parametrem</span>

Dodatkowo metoda `parseInt` przyjmuje jeszcze jeden parametr, który określa podstawę do konwersji. Domyślnym parametrem jest `10` czyli system dziesiętny. Nie musimy tego parametru przekazywać. Zwrócę jednak uwagę, że jeszcze przed ECMAScript 5, wskazanie bazy liczbowej było obowiązkowe.

Możemy zatem za pomocą `parseInt` konwertować liczby z systemu szesnastkowego, ósemkowego i dwójkowego:

```js
console.log(parseInt('42', 10)); // 42
console.log(parseInt('2A', 16)); // 42
console.log(parseInt('52', 8)); // 42
console.log(parseInt('00101010', 2)); // 42
```

Widzimy przykłady przekonwertowanych liczb z różnych systemów z określeniem dodatkowego parametru, którym jest baza liczby.

### <span id="parsefloat">parseFloat()</span>

Kolejną funkcją, do której możemy przekazać jedynie wartość `string`  jest funkcja `parseFloat`. Działa bardzo podobnie, oprócz tego, że przekonwertuje liczby zapisane w postaci całkowitej, to także przekonwertuje liczby zapisane w postaci dziesiętnej:

```js
console.log(parseFloat('42')); // 42
console.log(parseFloat('42.5')); // 42.5
console.log(parseFloat('42,5')); // 42
console.log(parseFloat('42xyz')); // 42
console.log(parseFloat('xyz42')); // NaN
```

W tym przypadku udaje nam się przekonwertować stringa `'42.5'` do liczby `42.5`. Natomiast nie udaje się przekonwertować `'42,5'` do liczby dziesiętnej. Jest to oczywiście prawidłowe zachowanie. Znak przecinka nie zostaje rozpoznany jako składowa liczby, dlatego konwersja kończy się przed
przecinkiem.

Oznacza to, że liczby zawsze muszą być zapisane z kropką, nawet w typie `string`, inaczej nie uda nam ich prawidłowo przekonwertować.

Metody do konwersji liczb zapisanych w typie `string` działają bardzo dobrze, dopóki nie zaczniemy przekazywać tam innych typów. Upewnijmy się więc, że pracujemy z typem `string`, który w jakiś sposób reprezentuje liczbę.

Jeśli pytacie, którą metodę najlepiej użyć do konwersji wszystko zależy od kontekstu. Jeżeli zależy nam na wartościach tylko liczbowych to używamy funkcji `Number` i będzie to Wasze najczęstsze użycie. Jeśli natomiast interesują nas liczby zapisane w różny dziwny sposób możecie użyć `parseInt`
lub `parseFloat`.

W typie `Number` istnieje także metoda statyczna `parseInt` i `parseFloat`, którą możemy wywołać przez `Number.parseInt`
i `Number.parseFloat`:

```js
console.log(Number.parseInt('42')); // 42
console.log(Number.parseFloat('42.5')); // 42.5
```

Działają one dokładnie tak samo, jak omówione metody `parseInt` i `parseFloat`.

### <span id="jak-poradzic-sobie-z-liczbami-z-przecinkiem">Jak poradzić sobie z liczbami z przecinkiem</span>

Na pewno wielokrotnie będziecie mierzyć się z liczbą zapisaną jako `string` z przecinkiem. Niestety nie możemy jej poprawnie konwertować za pomocą wymienionych metod. Bardzo często użytkownicy wpisują liczby w taki sposób i musimy nauczyć się jak je konwertować:

Najlepszym sposobem jest zamiana przecinka na kropkę:

```js
const value = '42,5';
const value2 = value.replace(',', '.');
console.log(parseFloat(value2)); // 42
```

Możemy użyć funkcji `replace` i zamienić przecinek na kropkę. Funkcja ta jest bezpieczna. Jeżeli wartość `string` nie będzie posiadała przecinka, nic się nie wydarzy. Po tej zamianie możemy przekonwertować stringa na prawidłową wartość liczbową.

## <span id="konwersja-przez-operator--oraz--">Konwersja przez operator `+` oraz `-`</span>

Innym sposobem na zastąpienie funkcji `Number()` jest użycie jedno argumentowanego operatora `+`.

Zobaczmy, jak to wygląda w kodzie:

```js
console.log(+null); // 0
console.log(+true); // 1
console.log(+false); // 0
console.log(+'42'); // 42
console.log(+'42.5'); // 42.5
console.log(+'42xyz'); // NaN
console.log(+'foo'); // NaN
```

Działa on tak samo, jak funkcja `Number()`, wyniki konwersji są oczywiście te same. Należy jednak pamiętać, że jest to operator jednoargumentowy. Jeżeli dołożymy drugi argument, to dokonamy działania matematycznego lub konkatenacji.

Wystarczy przed wartością, którą chcemy przekonwertować, postawić znak plus:

```js
const a1 = +'42';
console.log(a1); // 42
```

Jeżeli jednak chcemy dokonać konwersji i jeszcze potem wykonać jakieś działanie na przykład dodawanie:

```js
const a2 = 2 + +'40';
console.log(a2); // 42
```

wtedy wyrażenie to możemy zapisać tak, że znaki `+` rozdzielamy spacją. Najpierw nastąpi konwersja stringa `'40'` do liczby, a potem nastąpi suma dwóch liczb i otrzymamy wynik `42` oczywiście w postaci typu `number`. Takie zapisy nie do końca są czytelne i być może lepiej do konwersji użyć
funkcji `Number()` co zapewni czytelność tego wyrażenia.

Również istnieje operator jednoargumentowy ze znakiem `-`:

```js
console.log(-null); // -0
console.log(-true); // -1
console.log(-false); // -0
console.log(-'42'); // -42
console.log(-'42.5'); // -42.5
console.log(-'42xyz'); // NaN
console.log(-'foo'); // NaN
```

W tym przypadku jeżeli to możliwe następuje konwersja na typ `number` i odwrócenie znaku liczby. Jeżeli zatem chcemy przekonwertować jakaś wartość od razu do liczby ujemnej, jest to bardzo wygodny zapis.

Zasada tych operatorów jest bardzo prosta, a skrócony zapis preferuje wielu developerów. Co ciekawe, jednoargumentowe operatory są najszybsze w swoim działaniu. Jeżeli zależy Wam na wydajności, jest to najlepszy sposób na konwersję do typu `number`.

## <span id="konwersja-przez-inne-operatory-arytmetyczne">Konwersja przez inne operatory arytmetyczne</span>

Działania arytmetyczne jak dodawanie, odejmowanie i mnożenie w języku JavaScript, realizowane są tylko na liczbach. Dlatego wykonując takie działanie również możemy od razu dokonać konwersji na typ `number`:

```js
console.log(true + 0) // 1
console.log(null + 0) // 0
console.log('43' - 1) // 42
console.log('42' * 1) // 42
console.log('84' / 2) // 42
```

Jak się domyślamy, najpierw dokonywana jest konwersja na typ `number`, a potem odpowiednie działanie matematyczne.

Jeżeli chcemy dokonać tylko konwersji, musimy zastosować takie działanie, które nie zmieni nam wyniku. Nic jednak nie stoi na przeszkodzie, aby od razu dokonać działania matematycznego a przy tym konwertując wszystko do typu `number`. W ostatnim przykładzie dokonuję dzielenia na literale stringowym
i otrzymuję wynik w postaci liczby.

Musimy oczywiście uważać z operatorem `+` jeżeli przy operatorze plus znajdzie się typ `string`:

```js
console.log('foo' + 1) // 'foo1'
```

To w tym przypadku nastąpi konwersja do typu string i połączenie dwóch stringów.

### <span id="number-na-string">Number na string</span>

Jeśli chodzi o konwersje `number` na string to możemy wywołać metodę `toString()` lub też posłużyć się funkcją `String()`:

```js
const val = 42;
console.log(val.toString()); // '42'
console.log(String(value)); // '42'
```

Wywoływanie funkcji `toString()` może się nie udać, gdy natrafimy na wartość `null` lub `undefined`. Wtedy JavaScript zgłosi nam błąd. Dlatego bezpiecznie jest zawsze użycie funkcji `String()`, do której możemy przekazać każdą wartość.

Inne wartości liczbowe jak `NaN` , `Infinity` czy `-Infinity` też konwertowane są na `string`:

```js
console.log(String(NaN)); // 'NaN'
console.log(String(-Infinity)); // '-Infity'
console.log(String(Infinity)); // 'Infity'
```

Można powiedzieć, że następuje dosłowna konwersja i wartości te zmieniają się na literał typu string.

Bardzo duże liczby po konwersji do typu `string` będą zaprezentowane w sposób wykładniczy:

```js
console.log(String(Number.MAX_VALUE)); // '1.7976931348623157e+308'
console.log(String(Number.MAX_VALUE * -1)); // '-1.7976931348623157e+308'
```

Jeżeli bardzo zależy Wam na zwróceniu tej liczby w normalnej notacji, możecie użyć metody `toLocaleString()`:

```js
console.log(Number.MAX_VALUE.toLocaleString());
```

Metoda ta zwraca stringi dostosowane do lokalizacji. Posiada ona dodatkowe parametry i warto przejrzeć dokumentację, aby w pełni się z nią zapoznać.

Metoda `toString()` wywołana na typie `number` ma jeszcze jedną dodatkową właściwość:

```js
const num = 42;
console.log(num.toString(2)); // 101010
console.log(num.toString(8)); // 52
console.log(num.toString(16)); // 2a
console.log(num.toString(36)); // 1a
```

Możemy do metody `toString` jako parametr przekazać radix, czyli podstawę systemu liczbowego. W JavaScript możemy konwertować liczby aż do trzydziesto szóstkowego systemu liczbowego. Do metody `toString()` wystarczy przekazać odpowiednią liczbę, która będzie reprezentować system liczbowy.

Ponadto oprócz metod `toString()` i funkcji `String()` mamy metody `toExponential()`, `toPrecision()`, `toFixed()`, które także zwracają liczby w postaci stringa:

```js
const num2 = 42.1234
console.log(num2.toExponential()); // 4.21234e+1
console.log(num2.toFixed(2)); // 42.12
console.log(num2.toPrecision(2)); // 42
```

Bardziej służą one jednak do formatowania liczb niż tylko do konwersji na typ string. Należy pamiętać, że wiele metod, które wywołujemy na typie `number` zwraca nam już typ `string` a nie typ `number`. Jeżeli nadal potrzebujemy dokonywać działań na typie `number` znowu musimy dokonać konwersji na
typ `number`.

## <span id="number-na-boolean">Number na boolean</span>

Przy konwersji `number` na `boolean`, sprawa wydaje się prosta i była już omawiana przy typie `boolean`:

```js
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(NaN)); // false
```

Otrzymamy wartość `false` gdy dokonamy konwersji wartości takich jak `0`, `-0` oraz wartość `NaN`. Wszystkie pozostałe liczby będą wartościami `true`:

```js
console.log(Boolean(1)); // true
console.log(Boolean(-1)); // true
console.log(Boolean(100)); // true
console.log(Boolean(834838)); // true
```

Zazwyczaj uważa się, że tylko liczba `1` to wartość `true` po konwersji do `boolean`. Jak wiemy z tabelki wartości fałszywych, tylko wartość `0` , `-0` oraz `NaN` konwertuje się do typu `false`, wszystkie inne liczby konwertują się na `true`.

```js
console.log(Boolean(Infinity)); // true
console.log(Boolean(-Infinity)); // true
```

Nawet tak dziwne wartości `number` jak `Infinity` oraz `-Inifinity` zwrócą nam wartość `true`.

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- funkcja `Number()` może przekonwertować nam każdą wartość do typu `number`
- do funkcji `parseInt()` lub `parseFloat()` możemy przekazać tylko typ `string`
- do `parseInt()` możemy przekazać dodatkowy parametr, którym jest baza liczby
- do konwersji na `number` możemy użyć jednoargumentowych operatorów `+` oraz `-`
- operacje arytmetyczne także dokonują niejawnej konwersji na typ `number`, należy jednak uważać ze znakiem `+` i konkatenacją stringów
- konwertując `number` na `string` używamy funkcji `String()` lub metody `toString()`
- metody dla typu `number` które służą do formatowania liczb jak `toFixed()` zwracają typ `string`
- tylko liczby `-0, 0 oraz NaN` konwertują się na `false`, reszta liczb zawsze konwertuje się na `true` w tym `Infinity`
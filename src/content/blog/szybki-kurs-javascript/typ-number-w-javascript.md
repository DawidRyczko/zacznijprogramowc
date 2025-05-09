---
title: "Wartości i typ number w JavaScript: Szybki Kurs #5"
description: "Omówienie typu number w JavaScript, format zapisu liczb, dokładność liczb dziesiętnych."
date: 2025-03-18
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [Wartości i typ number](#wartości-i-typ-number)
* [Zapis wartości liczbowych](#zapis-wartości-liczbowych)
* [Format zapisu](#format-zapisu)
* [Dokładność liczb dziesiętnych](#dokładność-liczb-dziesiętnych)
* [Metody `toFixed()`, `isInteger()`](#metody-tofixed-isinteger)
    * [Metoda `toFixed()`](#metoda-tofixed)
    * [Metoda `isInteger()`](#metoda-isinteger)
    * [Uwaga na wywołanie metod](#uwaga-na-wywołanie-metod)
* [Największe najmniejsze](#największe-najmniejsze)
* [Obiekt Number](#obiekt-number)
* [Co warto zapamiętać](#co-warto-zapamiętać)

## <span id="wartości-i-typ-number">Wartości i typ number</span>

Liczby w JavaScript reprezentowane są przez jeden typ `number`. Dodatkowo typ ten ma takie wartości jak `Infinity` , `-Infinity` oraz `NaN`. Czasami praca z tymi wartościami może być kłopotliwa. W tym odcinku zaczniemy omawiać typ `number` i to jak z nim pracować.

## <span id="zapis-wartości-liczbowych">Zapis wartości liczbowych</span>

W JavaScript do reprezentacji liczb posiadamy tylko jeden typ i jest to znany nam już typ `number`. Nie jest to istotne czy liczba jest całkowita, dziesiętna czy może binarna. Wszystko jest typem `number`.

Zobaczmy przykłady liczb, które są reprezentowane przez ten typ:

```js
const num1 = 42; // integer
const num2 = -42; // negative integer
const num3 = 42.5; // float
const num4 = 0x2A; // hexadecimal
const num5 = 0o52; // octal
const num6 = 0b00101010; // binary
const num7 = 1e42; // exponential
const num8 = 1_000_000_000_000; // separator _
```

W wielu językach programowania zaprezentowane liczby posiadałyby swój typ. Tymczasem w JavaScript każda liczba, bez względu, w jakim formacie jest zapisana jest typem `number`. Mamy tutaj więc liczby całkowite, liczby ujemne, dziesiętne, liczby szesnastkowe, ósemkowe i w końcu binarne.

Mamy też zapis wykładniczy, który może się przydać do zapisania dużych liczb. Dodatkowo zapis ten możecie czasami zobaczyć w konsoli, ponieważ JavaScript bardzo duże liczby zwraca właśnie w takiej formie.

Na końcu pokazuję także, że możliwe jest użycie separatora do zapisu bardzo dużych albo może długich liczb. Przyda się do poprawienia czytelności.

## <span id="format-zapisu">Format zapisu</span>

Format zapisu liczby w JavaScript pozwala nam na bardzo dużą swobodę, mogę zapisać liczbę całkowitą *42* na wiele sposobów:

```js
const a = 42;
const b = 42.0;
const c = 42.;
console.log(a, b, c) // 42, 42, 42
```

Każdy z tych zapisów to wartość całkowita liczby 42.

Podobnie wygląda zapis liczb dziesiętnych:

```js
const a1 = 0.42;
const b1 = .42;
const c1 = 0.4200000000000
console.log(a1, b1, c1) // 0.42, 0.42, 0.42
```

Ewentualne niepotrzebne zera są obcinane, zarówno z liczby całkowitej, jak i dziesiętnej. Warto unikać zapisu tylko z kropką na końcu liczby lub też wstawiać samą kropkę bez zera dla liczby dziesiętnej.

Poprawny zapis prezentuje zmienna `a` dla liczby całkowitej i zmienna `a1` dla liczby dziesiętnej.

Ponieważ w JavaScript możemy zapisać liczbę z kropką na końcu, zobaczymy potem, że ma to pewne komplikacje, gdy będziemy korzystać z liczb jako literały, a nie jako zmienne.

## <span id="dokładność-liczb-dziesiętnych">Dokładność liczb dziesiętnych</span>

Poruszmy jeszcze temat dokładności liczb dziesiętnych. W Internecie na pewno spotkacie się z tym przykładem lub zostaniecie o to zapytani na rozmowie o pracę:

```js
console.log(0.1 + 0.2 === 0.3) // false
```

Jeżeli matematyka nie kłamie to dodanie `0.1` do `0.2` powinno zwrócić wartość `0.3`. Jednak w tym przypadku porównanie do `0.3` daje nam wartość `fasle`. I nie jest to związane z żadną niejawną konwersją w JavaScript lub innymi błędami tego języka.

Wypiszmy ten wynik do konsoli:

```js
console.log(0.1 + 0.2) // 0.30000000000000004
```

Okazuje się, że jest to wartość zbliżona do `0.3` ale nią nie jest. To znany od dawna problem zapisu liczb dziesiętnych w formacie binarnym. Na pocieszenie mogę tylko dodać, że nie tylko JavaScript ma ten problem, ale także inne języki. Zaciekawionych odsyłam na
stronę: http://0.30000000000000004.com/ gdzie znajdziecie wszelkie informacje na temat tego problemu.

Przy z pracy z takimi liczbami musimy być ostrożni i sami sobie radzić z tym problemem. Najbezpieczniej jest zawsze pracować na liczbach całkowitych. W Internecie znajdziecie wiele pomysłów jak radzić sobie z tym problemem.

Pokażę Wam teraz dwa popularne sposoby przy pracy z takimi liczbami:

Możemy użyć metody `toFixed()`:

```js
const result = 0.1 + 0.2;
console.log(result.toFixed(2))
```

Metoda ta dokonuje zaokrąglenia do określonego miejsca po przecinku. Za chwilę opowiem o niej więcej.

Możemy też sprowadzać liczby dziesiętne do liczb całkowitych i potem z powrotem do liczb dziesiętnych, dzięki temu nie tracimy dokładności:

```js
const result2 = (0.1 * 10) + (0.2 * 10)
console.log(result2.toFixed(2) / 10) // 0.3
```

Najpierw mnożę liczby przez `10`, potem dokonuję sumy i na końcu wynik dzielę przez `10`. Otrzymuję prawidłową wartość.

Jeszcze lepszym sposobem może być użycie gotowej biblioteki jak Math.js lub currency.js, która ułatwia pracę z walutami. Wybór sposobu rozwiązania tego problemu pozostawiam wam, ponieważ w tej sytuacji wszystko zależy od kontekstu użycia.

## <span id="metody-tofixed-isinteger">Metody `toFixed()`, `isInteger()`</span>

### <span id="metoda-tofixed">Metoda `toFixed()`</span>

Na typie `number` możemy wywoływać metody, które wbudowane są w obiekt `Number`. Jest to trochę dziwne, że na typie prymitywnym jakim jest `number` możemy wywołać metody pochodzące z typu obiektowego `Number`. O tym jednak powstanie oddzielny odcinek, dlaczego to tak działa.

Widzieliśmy metodę `toFixed()` której zadaniem jest zaokrąglenie liczby dziesiętnej. W nawiasach podajemy ile miejsc po przecinku, nas interesuje:

```js
const someNumber = 42.123;
console.log(someNumber.toFixed()); // '42'
console.log(someNumber.toFixed(1)); // '42.1'
console.log(someNumber.toFixed(2)); // '42.12'
console.log(someNumber.toFixed(3)); // '42.123'
console.log(someNumber.toFixed(4)); // '42.1230'
```

Jeżeli nie podamy żadnej wartości, otrzymamy liczbę całkowitą. Gdy podamy za dużą dokładność, miejsca zostaną uzupełnione zerami.

Szczególną uwagę należy zwrócić na to, że metoda `toFiexd()` zwraca nam typ `string` nie `number`. Nie próbujmy więc wykonywać na wyniku działań matematycznych. Wynik należy jeszcze przekonwertować na typ `number`.

### <span id="metoda-isinteger">Metoda `isInteger()`</span>

Inną przydatną metodą może być metoda statyczna `Number.isInteger()`. Może nam posłużyć do sprawdzenia, czy liczba jest całkowita. Przekażmy kilka wartości do tej metody:

```js
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(42.5)); // false
console.log(Number.isInteger('42')); // false
console.log(Number.isInteger(null)); // false
console.log(Number.isInteger(NaN)); // false
```

Do jej poprawnego działania musimy przekazać wartość o typie `number`. Widzimy, że poprawną wartość otrzymamy tylko w przypadku liczby całkowitej `42`. Nie zachodzą tutaj więc żadne konwersje.

### <span id="uwaga-na-wywołanie-metod">Uwaga na wywołanie metod</span>

Chciałbym jeszcze zwrócić uwagę na wywołanie metod, gdy do czynienia mamy z literałem, a nie ze zmienną. Raczej nikt takich zapisów nie stosuje, ale trzeba uważać, jeśli chcemy od razu na wartości liczbowej wywołać metodę, taki zapis jest niepoprawny:

```s
100.toFixed() //error
```

dopiera te wersje są poprawne:

```js
100..toFixed()
(100).toFixed()
```

Jak pamiętamy zapis liczby w postaci `100.` jest poprawny, dlatego jest potrzebna jeszcze jedna kropka do wywołania metody `toFixed()` lub ujęcie liczby w nawiasy. Jest to mały szczegół, który warto odnotować, gdy spotkacie się z takim dziwnym zapisem w kodzie, ale nie powinno się to zdarzyć.

## <span id="największe-najmniejsze">Największe najmniejsze</span>

Obiekt `Number` posiada także pewne stałe wartości:

```js
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
```

`Number.MAX_VALUE` oraz `NUMBER.MIN_VALUE` reprezentują największą i najmniejszą możliwą wartość reprezentowaną przez JavaScript. Niestety przy pracy z tak dużymi i małymi wartościami możemy tracić na dokładności. Nie są to wartości bezpieczne do operacji.

Dlatego mamy jeszcze określone dwie wartości:

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

`Number.MAX_SAFE_INTEGER` i `Number.MIN_SAFE_INTEGER` to dwie wartości całkowite, które są bezpieczne w używaniu. Wszystkie operacje wychodzące poza te dwie liczby będą traciły dokładność, przykładem jest to działanie:

``` js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true
```

Widzimy, że porównanie dwóch liczb daje wartość `true` a przecież jedna z nich została zwiększona o 2.

Jeżeli musimy pracować na większych wartościach niż reprezentuje `Number.MAX_SAFE_INTEGER` wtedy używamy wspomnianego już typu `bigint`.

```js
const big1 = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
const big2 = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
console.log(big1 === big2); // false
console.log(big1, big2); // 9007199254740992n 9007199254740993n
```

W tym przypadku inicjalizujemy dwie zmienne używając `MAX_SAFE_INTEGER`. Do jednej z nich dodajemy wartość 1 do drugiej wartość 2. Wynikiem porównania jest tym razem `false`.

Zauważ, że `MAX_SAFE_INTEGER` musiałem przekonwertować za pomocą funkcji `BigInt()` do typu `bigint`, a dodając wartość 1 i 2 do poszczególnych zmiennych umieściłem `n` na końcu każdej wartości.

Pamiętajmy, że wartości typu `bigint` są reprezentowane przez znak `n` na końcu każdej liczby. Mało tego nie można dokonywać matematycznych działań między typem `number` a typem `bigint`, potrzebna jest konwersja.

## <span id="obiekt-number">Obiekt Number</span>

Jak zauważyliście, typ `number` także posiada obiekt `Number` i możemy za jego pomocą stworzyć obiekt `Number`, który będzie przechowywał wartość liczbową. Podobnie jak przy typie `Boolean` nie warto tego robić.

Obiektu `Number` najlepiej używać jako funkcji `Number()` do konwertowania innych typów jak `string` czy `bigint`. Oraz do korzystania ze stałych i funkcji, które ma dostępne w sobie.

```js
console.log(new Number(42)) // Number {42}
console.log(Number('42')) // 42
```

## <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- typ `number` reprezentuje różne liczby: całkowite, dziesiętne, szesnastkowe, ósemkowe czy binarne
- zapis liczb w JavaScript jest bardzo dowolny, starajmy się utrzymać czytelność zapisu liczb. Dla przykładu zapisujemy `0.5` zamiast `.5`.
- JavaScript jak wiele innych języków ma problem z dokładnością liczb dziesiętnych
- metoda `toFixed` może nam pomóc w pracy z dokładnością liczb dziesiętnych
- przy naprawdę dużych liczbach, używamy typu `bigint`
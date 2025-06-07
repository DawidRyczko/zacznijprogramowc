---
title: "Co to jest runtime dla JavaScript"
description: "Co to jest środowisko uruchomieniowe (runtime) JavaScript? Jakie są jego rodzaje, jak działa i czym się różnią poszczególne implementacje."
date: 2025-06-07
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Runtime to środowisko, w którym uruchamiamy kod JavaScript. Kod napisany w JavaScript nie może się uruchomić sam w
sobie.
Potrzebny jest interpreter, silnik, środowisko uruchomieniowe, w którym ten kod zostanie wykonany. Dlatego powstały
różne runtime do interpretowania i uruchamiania JavaScript.

Naturalnym środowiskiem dla JavaScript jest przeglądarka internetowa. Silniki JavaScript jak V8 (Chrome), SpiderMonkey
(Firefox) i JavaScriptCore (Safari) interpretują i uruchamiają kod JavaScript.

JavaScript może być także uruchamiany na serwerze i tutaj jest potrzebny inny runtime niż
przeglądarka. [Node.js](https://nodejs.org/en), [Deno](https://deno.com/) czy [Bun](https://bun.sh/) to środowiska
używane do uruchamiania kodu poza przeglądarką. Może się to dziać na serwerze lub na naszym lokalnym komputerze.

## JavaScript runtime w dalszych szczegółach

JavaScript to tak naprawdę implementacja standardu ECMAScript (ES), czyli specyfikacji języka, która ustalana jest przez
organizację Ecma International. Standard ECMAScript tworzony jest przez specjalny komitet - **TC39 (Technical Committee
39**. Komitet ten składa się z ekspertów różnych firm oraz niezależnych programistów. To oni decydują o tym, jak będzie
wyglądała specyfikacja ECMAScript. Należy jednak wspomnieć, że proces ten jest otwarty i transparentny dla każdej
zainteresowanej osoby.

Na podstawie specyfikacji ECMAScript tworzona jest implementacja JavaScript. Można powiedzieć, że nie ma jednej, 
uniwersalnej implementacji JavaScript. Zachowanie kodu JavaScript zależy od konkretnego środowiska uruchomieniowego 
(runtime) – czy to przeglądarki, czy środowiska serwerowego – które interpretuje i wykonuje kod.

JavaScript tak naprawdę definiowany jest przez środowiska uruchomieniowe (runtime). Jeżeli dzisiaj piszesz kod, który
będziesz uruchamiał w Chrome, a jutro będziesz chciał go uruchomić w Safari, może się zdarzyć, że coś nie zadziała.
Ponieważ JavaScript to implementacja specyfikacji ECMAScript, środowiska uruchomieniowe (runtime) mogą interpretować 
tę specyfikację różnie. I może się zdarzyć, że tutaj coś działa, a na innym silniku już nie działa.

Takie sytuacje są jednak dzisiaj rzadkie albo bardzo subtelne. Specyfikacja ECMAScript precyzyjnie określa, jak kod 
JavaScript powinien działać, a twórcy środowisk uruchomieniowych starają się wiernie implementować te wytyczne.


## Różnice w runtime JavaScript

JavaScript interpretowany jest przez różne runtime jak przeglądarkowe czy serwerowe. Ich głównym zadaniem jest
implementacja ECMAScript i zapewnienie, że takie standardowe mechanizmy jak pętle, funkcje, obiekty, tablice działają
tak samo.

Różnice pojawiają się w dodatkowych zaimplementowanych API, dzięki którym JavaScript może rozszerzyć swoje funkcje.
Różne runtime mogą oferować różne API:

**API w przeglądarkach internetowych:**

- DOM API - pozwala na manipulowanie strukturą HTML
- Fetch API - umożliwia wysyłanie żądań HTTP
- Web Storage API - pozwala na przechowywanie danych w przeglądarce

**API w Node.js**

- File System Module - pozwala na dostęp do plików komputera
- HTTP Module - pozwala na tworzenie serwerów HTTP
- OS Module - pozwala na dostęp do informacji o systemie

Jeżeli mamy się spodziewać różnic w runtime JavaScript to właśnie w oferowanych API.Warto pamiętać, że istnieją również 
narzędzia i techniki umożliwiające pisanie kodu działającego zarówno w przeglądarce, jak i w Node.js."


## Podsumowanie

- runtime w JavaScript to środowisko uruchomieniowe, które interpretuje i uruchamia kod JavaScript
- mamy różne runtime dla JavaScript jak przeglądarkowe czy serwerowe
- JavaScript to implementacja specyfikacji ECMAScript, działanie JavaScript zależy od tego, jak działa runtime
- środowiska uruchomieniowe (runtime) tworzone są przez różne firmy, czasami JavaScript może zadziałać inaczej
- środowiska uruchomieniowe (runtime) udostępniają różnorodne API, które możemy używać za pomocą JavaScript

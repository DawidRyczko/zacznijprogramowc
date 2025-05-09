---
title: "Co to jest Observable?"
description: "Observable jest obiektem pochodzącym z biblioteki RxJS. Observable możemy tworzyć sami lub może być nam dostarczony."
date: 2020-02-28
tags: [ "angular", "rxjs", "angular-pytania" ]
---

Observable jest obiektem pochodzącym z biblioteki RxJS. Observable możemy tworzyć sami lub może być nam dostarczony.
Często Observable porównywany jest do Promise, jednak nie jest to prawda.

Observable to nie jest Promise.

Observable należy wyobrazić sobie jako funkcję. Wywołany Observable za pomocą metody `subscribe` może nam zwrócić jakąś
wartość i zakończyć działanie, lub też zwrócić wiele wartości w czasie działania.

Observable działa jak funkcja.

Promise może zwracać jedną wartość, Observable wiele. Druga różnica to taka, że Observable inicjalizuje się w chwili
wywołania na nim metody `subscribe`, a Promise inicjalizowany jest w chwili wywołania kodu.

Observable może zwrócić jedną lub wiele wartości.

Często Observable porównuje się do kanału informacji, do którego podłączamy się i oczekujemy na pojawiające się tam
dane. Dodatkowo dane które przepływają przez Observable możemy modyfikować za pomocą operatorów.

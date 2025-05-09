---
title: "Co to jest i jak działa Subject RxJS / Angular?"
description: "Subject to specjalny typ Observable, który pozwala na propagowanie tych samych danych do wielu subskrybentów w tym samym czasie."
date: 2020-05-07
tags: [ "angular", "rxjs", "angular-pytania" ]
---

Subject to specjalny typ Observable, który pozwala na propagowanie tych samych danych do wielu subskrybentów w tym samym czasie. Observable pochodzący z Subject jest jeden i może go subskrybować wielu obserwatorów.
angular-pytania
Natomiast przy zwykłym Observable np. stworzonym z funkcji `interval` przy każdej subskrypcji Observer dostaje nowe własne Observable. Dopiero w czasie subskrypcji dane zaczną być przekazywane.

Jeżeli byśmy wytwarzali dane przez Subject tak samo jak funkcja `interval`, to podpięty subskrybent, który dołączy w trakcie wytwarzania danych utraci część danych. Przy zwykłym Observable, podpięty subskrybent dostaje nowe Observable i każdy subskrybent zawsze dostaje tą samą partię danych. Dane nie przepadają, jak to jest możliwe w Subject.

Podsumowanie:

*   Subject nadaje dane, nawet gdy nikt nie subskrybuje
*   dzieli te same dane między wielu subskrybentów
*   jeżeli Observer nie subskrybuje to może stracić dane, które wpadają do Subjecta
*   Alternatywą jest BehaviorSubject, ReplaySubject i AsyncSubject

Przykład:

```typescript
const subject = new Subject();
subject.subscribe(x => console.log('Recived: ', x));// Recived:  Hello
subject.next('Hello');
```

W tym przypadku dane nie zostaną odebrane:

```typescript
const subject = new Subject();
subject.next('Hello');
subject.subscribe(x => console.log('Recived: ', x));
```
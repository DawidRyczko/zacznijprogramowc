---
title: "Wyrażenia lambda #8"
description: "Wprowadzenie do wyrażeń lambda w Javie 8. Omówienie interfejsów Supplier i BooleanSupplier."
date: 2017-04-01
tags: [ "kurs-java-8" ]
---

Omówienie interfejsów Supplier oraz BooleanSupplier #8

Dzisiaj zajmiemy się dwoma ciekawymi interfejsami funkcjonalnymi: `Supplier` oraz `BooleanSupplier`. Każdy z tych
interfejsów posiada jedną metodę abstrakcyjną. Zaczynajmy!

## Supplier

`Supplier`, czyli dostawca. Posiada abstrakcyjną metodę `get()`, która po wywołaniu zwróci nam obiekt, który
zdefiniowaliśmy w naszej lambdzie. Na początek przyjrzyjmy się, jak wygląda dokładnie ten interfejs:

```java
@FunctionalInterface
public interface Supplier<T> {

  /**
   * Dostarcza określony wynik
   */
  T get();
}
```

Jak widzimy, cały interfejs jest bardzo prosty. Zobaczmy, jak można go użyć w praktyce:

```java
List<Book> list = new ArrayList<>();

Supplier<Book> supplier = Book::new;

for (int i = 0; i < 100; i++) {
  list.add(supplier.get());
}

list.forEach(e -> System.out.println(e));
```

Na początek tworzymy pustą listę elementów `Book`. Definiujemy nasze wyrażenie lambda w oparciu o `Supplier`, którego
zadaniem jest tworzenie nowego obiektu `Book`. W pętli, która wykonuje się 100 razy, dodajemy do naszej listy kolejne
książki za pomocą naszego dostawcy. Wywołanie metody `get()` realizuje stworzenie nowego elementu. Dla udowodnienia
działania wypisujemy wszystkie elementy.

Wynik:
`Book{title='null', price=0.0, cover='null'} Book{title='null', price=0.0, cover='null'} Book{title='null', price=0.0, cover='null'} ...(pominięto dla zwięzłości)...`

## BooleanSupplier

`BooleanSupplier` ma jedno zadanie, które realizuje za pomocą abstrakcyjnej metody `getAsBoolean()`.

```java
@FunctionalInterface
public interface BooleanSupplier {

  /**
   * Dostarcza wynik w postaci boolean
   */
  boolean getAsBoolean();
}
```

Zobaczmy, jak możemy go użyć. Tworzę obiekt `ksiazka`, a zaraz potem wyrażenie lambda oparte na `BooleanSupplier`. W tym
wyrażeniu zwracam losowo `true` lub `false`. Ostatecznie `booleanSupplier.getAsBoolean()` służy mi do wypełnienia pola
`isPromotion` w klasie `Book`.

```java
Book book = new Book(19.99, "Czysty kod", "twarda");

BooleanSupplier booleanSupplier = () -> {
  Random random = new Random();
  return random.nextBoolean();
};

book.setPromotion(booleanSupplier.getAsBoolean());
```

Wynik (przykładowy): `false`

To tyle, jeśli chodzi o te interfejsy funkcjonalne. Pamiętajcie, że kod z przykładami jest oczywiście na GitHubie.

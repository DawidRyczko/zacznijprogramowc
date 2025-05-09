---
title: "Omówienie interfejsu BiPredicate #6"
description: "Omówienie interfejsu funkcjonalnego BiPredicate w Javie 8."
date: 2017-03-22
tags: ["kurs-java-8"]
---

Interfejs `BiPredicate` realizuje te same zadania co `Predicate` opisany w poprzedniej części. Różnica jest taka, że tym razem możemy przekazać do niego 2 argumenty i wykonać na nich operację logiczną. Zobaczmy, jak wygląda zatem `BiPredicate<T,U>`, zaskoczenia nie będzie, ale warto poćwiczyć.

```java
@FunctionalInterface
interface BiPredicate<T, U> {

    /**
     * Testuje argumenty i zwraca wartość boolean
     */
    boolean test(T t, U u);

    /**
     * Sprawdza warunki wyrażeniem logicznym AND
     */
    default java.util.function.BiPredicate<T, U> and(java.util.function.BiPredicate<? super T, ? super U> other) {
        Objects.requireNonNull(other);
        return (T t, U u) -> test(t, u) && other.test(t, u);
    }

    /**
     * Sprawdza warunek i zwraca jego zaprzeczenie
     */
    default java.util.function.BiPredicate<T, U> negate() {
        return (T t, U u) -> !test(t, u);
    }

    /**
     * Sprawdza warunki wyrażeniem logicznym OR
     */
    default java.util.function.BiPredicate<T, U> or(java.util.function.BiPredicate<? super T, ? super U> other) {
        Objects.requireNonNull(other);
        return (T t, U u) -> test(t, u) || other.test(t, u);
    }
}
```

Powołuję dwa obiekty `Book` i tworzę wyrażenie lambda, które będzie sprawdzać czy cena pierwszej książki jest większa niż drugiej.

```java
Book book1 = new Book(39.99, "twarda");
Book book2 = new Book(29.99, "twarda");

BiPredicate<Book, Book> isMoreExpensive = (bookFirst, bookSecond) -> bookFirst.price > bookSecond.price;

if (isMoreExpensive.test(book1, book2)) {
    System.out.println("Tak! Pierwsza książka jest droższa.");
}
```

Wynik: `Tak! Pierwsza książka jest droższa.`

Do przykładu metody `and` potrzebujemy jeszcze jednego wyrażenia lambda, które sprawdza czy okładki są takie same. Metoda `and` najpierw sprawdzi czy są takie same okładki i potem sprawdzi czy pierwsza książka jest droższa.

```java
BiPredicate<Book, Book> sameCover = (bookFirst, bookSecond) -> bookFirst.cover.equals(bookSecond.cover);

if (sameCover.and(isMoreExpensive).test(book1, book2)) {
    System.out.println("Takie same okładki i książka pierwsza jest droższa");
}
```

Wynik: `Takie same okładki i książka pierwsza jest droższa`

Kolejna metodą jest `negate`, która odwraca zwrócony wynik:

```java
boolean i = isMoreExpensive.negate().test(book1, book2);
System.out.println("Czy druga jest tańsza? " + i);
```

Wynik tego działania: `Czy druga jest tańsza? false`

Ostatnią metodą jest `or`. Sprawdzimy tutaj czy nasza książka ma takie same okładki lub czy pierwsza jest droższa.

```java
boolean or = sameCover.or(isMoreExpensive).test(book1, book2);
System.out.println("Jest droższa lub ta sama okładka? " + or);
```

Wynik: `Jest droższa lub ta sama okładka? true`

---
title: "Omówienie interfejsu Predicate #5"
description: "Omówienie interfejsu funkcjonalnego Predicate w Javie 8."
date: 2017-03-21
tags: [ "kurs-java-8" ]
---

W tym wpisie zajmiemy się interfejsem funkcjonalnym `Predicate`, który sam w sobie posiada dodatkowo kilka domyślnych
metod. `Predicate` jest bardzo prosty i nie kryje w sobie żadnej większej tajemnicy. Jego zadaniem jest wykonywanie
operacji logicznych.

Tak wygląda `Predicate`:

```java
@FunctionalInterface
interface Predicate<T> {

    /**
     * Testuje podany argument i zwraca wartość boolean
     */
    boolean test(T t);

    /**
     * Sprawdza warunki wyrażeniem logicznym AND
     */
    default java.util.function.Predicate<T> and(java.util.function.Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    /**
     * Sprawdza warunek i zwraca jego zaprzeczenie
     */
    default java.util.function.Predicate<T> negate() {
        return (t) -> !test(t);
    }

    /**
     * Sprawdza warunki wyrażeniem logicznym OR
     */
    default java.util.function.Predicate<T> or(java.util.function.Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    /**
     * Wykonuje equal na przesłanym obiekcie
     */
    static <T> java.util.function.Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

Przykład metody `test`. Tworzymy sobie obiekt `book`, który zawiera takie pola jak cena i rodzaj okładki. Tworzymy
wyrażenie lambda, której zadaniem jest sprawdzenie czy cena jest wyższa niż 29.99.

```java
Book book = new Book(39.99, "twarda");
Predicate<Book> checkPrice = book1 -> book1.price > 29.99;

if (checkPrice.test(book)) {
    System.out.println("Drogo!");
}
```

Wynik: Drogo!

W tym przykładzie metody `and` dokładamy kolejne wyrażenie lambda, sprawdzające rodzaj okładki. Metodą `and` sprawdzamy
obiekt `book` za pomocą obu wyrażeń lambda.

```java
Predicate<Book> checkCover = book2 -> book2.cover.equals("twarda");

if (checkCover.and(checkPrice).test(book)) {
    System.out.println("Tanio!");
}
```

Wynik: Tanio!

Metoda `or` działa podobnie jak `and` ale tym razem na wyrażeniu OR.

```java
if (checkCover.or(checkPrice).test(book)) {
    System.out.println("Tanio lub drogo!");
}
```

Wynik: Tanio lub drogo!

Metoda `negate` wykonuje negację zwracanego wyniku naszej lambdy `checkPrice`.

```java
if (!checkPrice.negate().test(book)) {
    System.out.println("A jednak tanio!");
}
```

Wynik: A jednak tanio!

Ostatnią metodą jest statyczna metoda `isEqual` sprawdzająca czy obiekty są takie same:

```java
Predicate<Book> i = Predicate.isEqual(new Book(39.99, "twarda"));
System.out.println("Czy ta sama książka? " + i.test(book));
```

Wynik: Czy ta sama książka? true

I to tyle, dalej eksperymentujcie sami 🙂


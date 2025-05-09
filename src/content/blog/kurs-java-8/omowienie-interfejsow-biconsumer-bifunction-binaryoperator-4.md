---
title: "Omówienie interfejsów BiConsumer, BiFunction, BinaryOperator #4"
description: "Omówienie interfejsów BiConsumer, BiFunction i BinaryOperator w Java 8."
date: 2017-03-20
tags: [ "kurs-java-8" ]
---

## Spis treści

*   [BiConsumer](#biconsumer)
*   [BiFunction](#bifunction)
*   [BinaryOperator](#binaryoperator)

W Java 8 istnieje pokaźna grupa interfejsów funkcjonalnych, które pokrótce będziemy omawiać. Warto zapoznać się ze wszystkimi i wiedzieć, że takie istnieją. Okazuje się, że odpowiadają one na niemalże wszystkie potrzeby programistów i tworzenie swoich interfejsów może być zbędne.

Zacznijmy więc, bo długa droga przed nami 😉 Dzisiaj pierwsza część serii artykułów opisująca interfejsy: BiConsumer, BiFunction, BinaryOperator

## BiConsumer <a id="biconsumer"></a>

Na początek zajmiemy się tym interfejsem, który posiada także metodę default:

```java
@FunctionalInterface
interface BiConsumer<T, U> {

    //Przyjmuje dwa argumenty. Nie zwraca wartości
    void accept(T t, U u);

    // Wykonuje operację jedna po drugiej na przekazanych BiConsumer
    default java.util.function.BiConsumer<T, U> andThen(java.util.function.BiConsumer<? super T, ? super U> after) {
        Objects.requireNonNull(after);

        return (l, r) -> {
            accept(l, r);
            after.accept(l, r);
        };
    }
}
```

Metoda `accept` nic nie zwraca, ale przyjmuje dwa argumenty, na których możemy wykonać operacje. Obiektem oczywiście może być cokolwiek, w naszym przypadku będzie to `Double`:

```java
BiConsumer<Double, Double> biConsumer = (x, y) -> {
    System.out.println("Dodawanie: " + (x + y));
};

biConsumer.accept(1.0, 2.0);
```

Wynik:

Dodawanie: 3.0

Metoda `andThen` służy do wykonania operacji na kilku obiektach typu `BiConsumer`. Może to wyglądać tak:

```java
BiConsumer<Double, Double> biConsumer = (x, y) -> {
    System.out.println("Dodawanie: " + (x + y));
};

BiConsumer<Double, Double> biConsumer1 = (x, y) -> {
    System.out.println("Mnożenie: " + (x * y));
};

BiConsumer<Double, Double> biConsumer2 = (x, y) -> {
    System.out.println("Dzielenie: " + (x / y));
};

biConsumer.andThen(biConsumer1).andThen(biConsumer2).accept(3.0, 2.0);
```

Wynik:

Dodawanie: 5.0 Mnożenie: 6.0 Dzielenie: 1.5

## BiFunction <a id="bifunction"></a>

```java
@FunctionalInterface
interface BiFunction<T, U, R> {

    //Przyjmuje dwa argumenty. Zwraca wynik.
    R apply(T t, U u);

    // Wykonuje BiFunction a potem przetwarza wynik w Function
    default <V> BiFunction<T, U, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t, U u) -> after.apply(apply(t, u));
    }
}
```

Różnica z poprzednim interfejsem jest taka, że tym razem otrzymujemy zwrócony wynik:

```java
BiFunction<Double, Double, Double> biFunction = (x, y) -> {
    return x + y;
};
System.out.println(biFunction.apply(1.0, 1.0));
```

Wynik:

2.0

W metodzie `andThen` możemy przekazać obiekt typu `Function`, który dodatkowo przetwarza nam wynik naszej lambdy z interfejsu `BiFunction`. Liczby zostaną dodane za pomocą naszej lambdy, którą zdefiniowaliśmy wyżej, a potem jeszcze zostanie dodana do ich liczba PI.

```java
Function<Double,Double> function = x -> x + Math.PI;
System.out.println(biFunction.andThen(function).apply(1.0,1.0));
```

Wynik:

5.141592653589793

## BinaryOperator <a id="binaryoperator"></a>

```java
/**
 * Przyjmuje dwa argumenty tego samego typu i
 * zwraca wynik tego samego typu
 */
@FunctionalInterface
interface BinaryOperator<T> extends BiFunction<T, T, T> {

    //Zwraca mniejszy element zgodnie z przekazanym Comparatorem
    public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) <= 0 ? a : b;
    }

    //Zwraca większy element zgodnie z przekazanym Comparatorem
    public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) >= 0 ? a : b;
    }
}
```

`BinaryOperator` rozszerza interfejs `BiFunction`, który jest przedstawiony wyżej. Działanie tych interfejsów jest prawie takie same, z małą różnicą. `BinaryOperator` działa tylko na jednym i takim samym typie. `BinaryOperator` dodatkowo posiada dwie metody `static`: `minBy` oraz `maxBy`.

Na początek metoda `apply`:

```java
BinaryOperator<Integer> binaryOperator = (x, y) -> x + y;
System.out.println(binaryOperator.apply(4,5));
```

Wynik:

9

Jeżeli chcemy użyć metody `minBy` musimy zdefiniować `Comparator`. W tym przypadku użyjemy `Comparator`, który kryje się w klasie `Integer`.

```java
BinaryOperator<Integer> biByMin = BinaryOperator.minBy(Integer::compareTo);
System.out.println(biByMin.apply(5, 7));
```

Wynik:

5

Podobna sytuacja z `maxBy`:

```java
BinaryOperator<Integer> biByMax = BinaryOperator.maxBy(Integer::compareTo);
System.out.println(biByMax.apply(123123, 897797789));
```

Wynik:

897797789


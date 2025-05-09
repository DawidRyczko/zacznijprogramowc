---
title: "Pozostałe interfejsy funkcjonalne #9"
description: "Omówienie pozostałych interfejsów funkcjonalnych w Java8"
date: 2017-04-04
tags: [ "kurs-java-8"]
---

## Pozostałe interfejsy funkcjonalne #9

Przed nami ostatnia partia interfejsów funkcjonalnych, jakie znalazły się w Javie 8. Są to wyspecjalizowane wersje interfejsów, które już omówiliśmy w poprzednich odcinkach. Zdefiniowane są na konkretnych typach i głównie tym się różnią od generycznych interfejsów, które omówiliśmy.

**ObjDoubleConsumer** – akceptuje dowolny obiekt i wartość `double`, nie zwraca wyniku. Jest to wyspecjalizowany interfejs, patrz: `BiConsumer`.

```java
ObjDoubleConsumer objDoubleConsumer = (s,d) -> System.out.println(s+d);
objDoubleConsumer.accept("PI równa się: ", 3.14 );
```

Wynik: `PI równa się: 3.14`

**ObjIntConsumer** – akceptuje dowolny obiekt i wartość `integer`, nie zwraca wyniku. Jest to wyspecjalizowany interfejs, patrz: `BiConsumer`.

```java
ObjIntConsumer<Double> doubleObjIntConsumer  = (d,i)->System.out.println("I tak jestem PI: " + (i+d));
doubleObjIntConsumer.accept(0.14,3);
```

Wynik: `I tak jestem PI: 3.14`

**ObjLongConsumer** – akceptuje dowolny obiekt i wartość `long`, nie zwraca wyniku. Jest to wyspecjalizowany interfejs, patrz: `BiConsumer`.

```java
ObjLongConsumer<String> stringObjLongConsumer  = (s,d)->System.out.println(s+d);
stringObjLongConsumer.accept("Jestem najdłuższą liczbą świata!: ",Long.MAX_VALUE);
```

Wynik: `Jestem najdłuższą liczbą świata!: 9223372036854775807`

**ToDoubleBiFunction** – akceptuje dwa argumenty i zwraca wynik w postaci `double`. Jest to wyspecjalizowany interfejs, patrz: `BiFunction`.

```java
ToDoubleBiFunction<Integer, Integer> toDoubleBiFunction = (x, y) -> (x + y) / 3.14;
System.out.println(toDoubleBiFunction.applyAsDouble(2,3));
```

Wynik: `1.592356687898089`

**ToDoubleFunction** – akceptuje dowolny obiekt i zwraca wynik w postaci `double`. Jest to wyspecjalizowany interfejs, patrz: `BiFunction`.

```java
ToDoubleFunction<String> toDoubleFunction = (x) -> Double.valueOf(x);
System.out.println(toDoubleFunction.applyAsDouble("3.14"));
```

Wynik: `3.14`

**DoubleBinaryOperator** – akceptuje dwa argumenty w postaci `double` i zwraca wynik `double`. Jest to wyspecjalizowany interfejs, patrz: `BinaryOperator`.

```java
DoubleBinaryOperator doubleBinaryOperator = (x, y) -> x + y;
System.out.println(doubleBinaryOperator.applyAsDouble(3.0, 0.14));
```

Wynik: `3.14`

**DoubleConsumer** – akceptuje argument w postaci `double`, nie zwraca wyniku. Jest to wyspecjalizowany interfejs, patrz: `Consumer`.

```java
DoubleConsumer doubleConsumer = x -> System.out.println(x + 3.0);
doubleConsumer.accept(0.14);
```

Wynik: `3.14`

**DoubleFunction** – akceptuje argument w postaci `double` i zwraca wynik jako dowolny obiekt. Jest to wyspecjalizowany interfejs, patrz: `Function`.

```java
DoubleFunction doubleFunction = x -> "Jestem stringiem PI: " +x;
System.out.println(doubleFunction.apply(3.14));
```

Wynik: `Jestem stringiem PI: 3.14`

**DoublePredicate** – akceptuje argument `double` i zwraca wynik w postaci `boolean`. Jest to wyspecjalizowany interfejs, patrz: `Predicate`.

```java
DoublePredicate doublePredicate = x -> x > 3.14;
System.out.println("Czy jestem większa od PI? " + doublePredicate.test(2.14));
```

Wynik: `Czy jestem większa od PI? false`

**DoubleSupplier** – dostarcza obiekty typu `double`. Jest to wyspecjalizowany interfejs, patrz: `Supplier`.

```java
DoubleSupplier doubleSupplier = () -> 3.14;
System.out.println("Dostarczam PI: " + doubleSupplier.getAsDouble());
```

Wynik: `Dostarczam PI: 3.14`

**DoubleToIntFunction** – akceptuje argument `double`, zwraca wartość `integer`. Jest to wyspecjalizowany interfejs, patrz: `Function`.

```java
DoubleToIntFunction doubleToIntFunction = x -> (int) Math.round(x);
System.out.println("Jestem okrągłe PI: " + doubleToIntFunction.applyAsInt(3.14));
```

Wynik: `Jestem okrągłe PI: 3`

**DoubleToLongFunction** – akceptuje argument `double`, zwraca wartość `long`. Jest to wyspecjalizowany interfejs, patrz: `Function`.

```java
DoubleToLongFunction doubleToLongFunction = x -> Math.round(x);
System.out.println("Jestem okrągłe PI jako long: " + doubleToLongFunction.applyAsLong(3.14));
```

Wynik: `Jestem okrągłe PI jako long: 3`

**DoubleUnaryOperator** – akceptuje argument `double`, zwraca wartość `double`. Jest to wyspecjalizowany interfejs, patrz: `UnaryOperator`.

```java
DoubleUnaryOperator doubleUnaryOperator = x -> x*2;
System.out.println("Jestem podwojone PI: " + doubleUnaryOperator.applyAsDouble(3.14));
```

Wynik: `Jestem podwojone PI: 6.28`

Omówione wyżej interfejsy mają także swoje wersje, które operują na `Long`ach czy `Integer`ach:

*   `LongBinaryOperator`, `LongConsumer`, `LongFunction`, `LongPredicate`, `LongSupplier`, `LongToDoubleFunction`, `LongToIntFunction`, `LongUnaryOperator`, `ToLongBiFunction`, `ToLongFunction`
*   `IntBinaryOperator`, `IntConsumer`, `IntFunction`, `IntPredicate`, `IntSupplier`, `IntToDoubleFunction`, `IntToLongFunction`, `IntUnaryOperator`, `ToIntBiFunction`, `ToIntFunction`

Nie będziemy jednak ich omawiać, bo zasada działania jest taka sama. Ważne jest abyśmy wiedzieli, że mamy do dyspozycji gotowe interfejsy, które operują na konkretnych typach i nie musimy korzystać z wersji generycznych.

Cały kod znajdziecie także na githubie.

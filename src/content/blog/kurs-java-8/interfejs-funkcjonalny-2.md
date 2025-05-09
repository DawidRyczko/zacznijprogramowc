---
title: "Interfejs Funkcjonalny #2"
description: "Czym jest interfejs funkcjonalny w Javie 8."
date: 2017-03-12
tags: [ "kurs-java-8" ]
---

Nie możemy powołać do życia wyrażenia lambda bez interfejsu funkcjonalnego. Dlatego dzisiaj zajmiemy się omówieniem,
czym jest taki interfejs.

Pomińmy zbędne encyklopedyczne definicje. Zasada jest jedna i bardzo prosta:

Interfejs funkcjonalny może zawierać tylko jedną metodę abstrakcyjną i tyle.

Przyjrzyjmy się jeszcze raz takiemu interfejsowi:

```java
@FunctionalInterface
interface InterfaceCalculation {

    int calculation(int a, int b);
}
```

Interfejs posiada jedną metodę abstrakcyjną. Dodatkowo jest opatrzony adnotacją:

```java
@FunctionalInterface
```

Adnotacja ta nie jest obowiązkowa. W przypadku gdy w naszym interfejsie znajdzie się jeszcze jedna metoda abstrakcyjna,
kompilator zgłosi błąd. Warto użyć powyższej adnotacji i jasno podkreślać czym jest nasz interfejs.

To teraz czas na małą zagadkę! Czy taki interfejs jest poprawny:

```java
@FunctionalInterface
interface InterfaceCalculation {

    int calculation(int a, int b);

    default public void off(){
        System.out.println("Wyłączenie urządzenia");
    }
}
```

Jak najbardziej tak, bo spełnia reguły naszej definicji. Posiada tylko jedną metodę abstrakcyjną. To, że w tym
interfejsie zawarliśmy metodę `default`, która jest także nowością w Java 8 nie ma żadnego znaczenia. Najważniejsza jest
tylko jedna zasada: jedna metoda abstrakcyjna.

Jak widzimy, interfejs funkcjonalny nie skrywa żadnej tajemnicy. Możemy go wykorzystać tak samo jak to było przed Java
8, ale najlepiej użyć go z wyrażeniami lambda, jak w lekcji pierwszej. W java 8 znajdziemy spore API z gotowymi
interfejsami: https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html

Zazwyczaj wystarczy nam to do bardzo wielu operacji, ale oczywiście nic nie stoi na przeszkodzie, aby samemu tworzyć
takie interfejsy.

Wiemy już co to wyrażenia lambda, wiemy co to interfejsy funkcjonalne. Teraz zajmiemy się ćwiczeniami praktycznymi i
zrobimy kilka przykładów użycia lambdy zarówno na standardowych interfejsach jak i własnych.

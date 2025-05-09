---
title: "Wyrażenia lambda #1"
description: "Wprowadzenie do wyrażeń lambda w Javie 8."
date: 2017-03-05
tags: [ "kurs-java-8"]
---

W wersji Java 8 pojawiła się charakterystyczna i tajemnicza strzałka „->”. Nie oznacza ona bynajmniej kierunku pisania
kodu w Javie Strzałka ta jest symbolem wyrażeń lambda.

W prostych słowach wyrażenia lambda to funkcje anonimowe. Nie określałbym ich metodami, bo lambda wcale nie przynależy
do konkretnej klasy jak metody w języku Java. Wyrażenie lambdy nie posiada także nazwy, nie muszą być zdefiniowane typy
parametrów, nie muszą być nawet przekazane parametry, posiada ciało i może zwracać konkretny typ lub nie. Ciekawostką
jest to, że lambda może być przesłana do metody jako parametr lub przypisana do zmiennej. Jak widać lambda pozwala na
dużą ekspresję.

W skrócie wyrażenie lambda to:

* funkcja bez nazwy np:
  `(int a, int b) -> a + b;`
* nie musi posiadać typów parametrów:
  `(a, b) -> a + b;`
* nie musi posiadać parametrów:
  `() -> 1 + 1;`
* nie musi posiadać czegokolwiek
  `() -> {};`
* może coś zwracać:
  `() -> {return 1 + 1;};`
* może coś zwracać nawet bez return:
  `() -> 1+1;`
* może nic nie zwracać:
  `() -> System.out.println("Lambda");`
* można ją przypisać do zmiennej:
  `Runnable runnable = () -> {};`
* zmienną można przekazać do metody:
  `runTask(runnable);`

Zapewne te przykłady jeszcze niczego konkretnego nie mówią, ale postaram się wyjaśnić to w dalszej części. Na początku
omówmy jeszcze jak wygląda powołanie do życia lambdy:

```java
InterfaceCalculation add = (a, b) -> a + b;
```

Po lewej stronie mamy nazwę interfejsu funkcjonalnego, który wygląda tak:

```java
@FunctionalInterface
interface InterfaceCalculation {

    int calculation(int a, int b);
}
```

Jest on niezbędny, żeby mogła powstać nasza funkcja anonimowa (lambda). O interfejsach funkcyjnych będę jeszcze pisał.
Tak więc do zmiennej *add* przypisałem wyrażenie lambda. Parametry *(a,b)* to parametry jakie będą przesłane do tego
wyrażenia. Mogą one wyglądać również tak *(int a, int b)* jak w tradycyjnej metodzie, ale nie muszą. Zauważcie, że
lambda ma dokładnie tyle samo parametrów co zdefiniowana metoda w interfejsie.

Po strzałce, która tak czy siak wskazuje kierunek pisania, mamy ciało naszej funkcji, w której możemy wykonać pewne
działania. Tutaj po prostu dodaję dwie przesłane liczby. Jeżeli będziemy chcieli umieścić więcej linii kodu, całe ciało
musimy otoczyć nawiasami klamrowymi np:

```java
InterfaceCalculation add = (a, b) -> {
    if (a < 0) {
        a=3;
    }
    return a + b;
};
```

Czyli mamy interfejs, a w nim zdefiniowaną metodę. Jak to w interfejsie. Za pomocą lambdy możemy przypisać do zmiennej
`add`, która jest typem tego interfejsu, implementację jego metody wyrażeniem lambda. W tym przypadku jest to
implementacja metody `calculation(int a, int b)`. Możemy teraz wywołać metodę *calculation* z naszego interfejsu, która
przekaże parametry do naszej lambdy i zrealizuje ją. Po prostu wywołujemy metodę `calculation` na obiekcie `add`, który
jest typem naszego interfejsu.

```java
//realizuję wyrażenie lambda które "siedzi" w add, lambda zwraca wynik do zmiennej result
int result = add.calculation(-1, 3);
//wypisuję wynik
System.out.println("Wynik to: " + result);
```

Wynik to: 6

Oczywiście, metodę tego interfejsu można zaimplementować przez klasę anonimową:

```java
// Klasa anonimowa -stary brzydki sposób
InterfaceCalculation interfaceCalculation = new InterfaceCalculation() {
    @Override 
    public int calculation(int a, int b) {
        return a + b;
    }
};

// To samo ale lambda
InterfaceCalculation add = (a, b) -> a + b;
```

Jednak sami widzicie jak wiele zbędnego kodu trzeba stworzyć. Jest on mało czytelny i słabo testowalny. Nie polecam.

Mam nadzieje, że wstęp do lambd wydaje się jasny, jeżeli coś nie jest jasne, piszcie w komentarzach. Na bieżąco będę
starał się wyjaśniać. W następnym wpisie opiszę interfejs funkcjonalny bo jest on nierozłącznie związany z wyrażeniami
lambda. A po tym zrobimy konkretny praktyczny odcinek z przykładami.

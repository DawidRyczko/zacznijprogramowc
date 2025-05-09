---
title: "Praktyczny przykład – kalkulator – lambda i interfejs funkcjonalny #3"
description: "Prosty przykład zastosowania lambd i interfejsu funkcjonalnego do implementacji kalkulatora."
date: 2017-03-19
tags: [ "kurs-java-8" ]
---

W tym odcinku niezwykle prosty przykład zastosowania lambd i interfejsu funkcjonalnego bez fajerwerków. Oczywiście sam
przykład jest na wyrost i można go uprościć pomijając nasz interfejs, ponieważ w pakiecie Java 8 mamy gotowy interfejs,
który moglibyśmy wykorzystać. Ale o tym jeszcze będzie.

Zacznijmy od naszego interfejsu, który nie jest niespodzianką:

```java
public interface CalculationInterface {
 
  double calculate(double a, double b);
 
}
```

Metoda abstrakcyjna przyjmuje dwa parametry oraz zwraca typ double.

W naszym kalkulatorze potrzebujemy mapę:

```java
private static final Map<String, CalculationInterface> calculationMap = new HashMap<>();
```

Kluczem jest typ String, który będzie przechowywał dla nas symbol operatora, wartością będzie coś co reprezentuje nasz
interfejs czyli wyrażenie lambda w oparciu o ten interfejs.

Posiadamy już mapę, czas na jej wypełnienie:

```java
 private static void fillMap() {
    calculationMap.put("+", (a, b) -> a + b);
    calculationMap.put("-", (a, b) -> a - b);
    calculationMap.put("/", (a, b) -> a / b);
    calculationMap.put("*", (a, b) -> a * b);
  }
```

Do mapy dodaję kolejno działania, jakie chcę wykonywać oraż wyrażenie lambda, które ma to działanie realizować. W
dłuższej i może dla początkujących w bardziej czytelnej formie, wyglądałoby to tak:

```java
CalculationInterface add = (a, b) -> a + b;
calculationMap.put("+", add);
```

Ostatnią metodą jest:

```java
  private static void result(String operator, double a, double b) {
    double result = calculationMap.get(operator).calculate(a, b);
    System.out.println(result);
  }
```

Z mapy pobieramy obiekt za pomocą klucza, który kryje się pod zmienną operator. Wiemy, że za nim kryje się nasza lambda
zaimplementowana w oparciu o `CalculationInterface`. Pozostaje wywołać na niej metodę `calculate` i przekazać parametry
do obliczeń.

Wywołanie naszego kalkulatora wygląda tak:

```java
  public static void main(String[] args) {
    fillMap();
    result("+", 1, 2);
    result("-", 2, 2);
    result("/", 4, 4);
    result("*", 5, 2);
  }
```

Proste, działa i pokazuje jak można wykorzystać lambdę. Jak zauważyliście udało się uniknąć ifów, switchów i innych
okropnych rzeczy, które często przy implementacjach kalkulatora mają miejsce. Wykorzystując Java 8 użyliśmy jednej
metody, która oblicza dla nas różne działania.

Projekt ten znajdziecie na
GitHubie: [https://github.com/ZacznijProgramowac/KursJava8](https://github.com/ZacznijProgramowac/KursJava8)

Dla przejrzystości pokazuję cały kod:

```java
import java.util.HashMap;
import java.util.Map;

public class CalculatorMain {
 
  /**
   * Tworzymy mapę która przechowywać będzie lambdy i symbol kalkulacji
   * Parametrami jest String oraz nasz interfejs funkcjonalny
   */
  private static final Map<String, CalculationInterface> calculationMap = new HashMap<>();
 
 
  public static void main(String[] args) {
    fillMap();
    result("+", 1, 2);
    result("-", 2, 2);
    result("/", 4, 4);
    result("*", 5, 2);
  }
 
  /**
   * Wypełniamy mapę symbolem kalkulacji i lambdami
   */
  private static void fillMap() {
    calculationMap.put("+", (a, b) -> a + b);
    calculationMap.put("-", (a, b) -> a - b);
    calculationMap.put("/", (a, b) -> a / b);
    calculationMap.put("*", (a, b) -> a * b);
  }
 
  /**
   * Ta metoda zwraca nam gotowy wynik po wybraniu operatorem odpowiedniej lambdy i wykonaniu metody calculate
   *
   * @param operator
   * @param a
   * @param b
   */
  private static void result(String operator, double a, double b) {
    double result = calculationMap.get(operator).calculate(a, b);
    System.out.println(result);
  }
}
```

Wynik:
3.0

0.0

1.0

10.0

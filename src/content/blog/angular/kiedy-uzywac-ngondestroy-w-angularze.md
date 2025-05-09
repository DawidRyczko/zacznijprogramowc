---
title: "Kiedy używać ngOnDestroy - Angular i ngOnDestroy"
description: "Metoda `ngOnDestroy()` pochodzi z interfejsu `OnDestroy` i może być użyta w komponencie, dyrektywnie, pipe oraz serwisie. W tym artykule przyjrzymy się kiedy warto ją używać i sprawdzimy kiedy dokładnie zostaje wywołana."
date: 2019-12-11
tags: [ "angular", "frontend" ]
---

Metoda `ngOnDestroy()` pochodzi z interfejsu `OnDestroy` i może być użyta w komponencie, dyrektywnie, pipe oraz
serwisie. W tym artykule przyjrzymy się, kiedy warto ją używać i sprawdzimy, kiedy dokładnie zostaje wywołana.

## Kiedy używać `ngOnDestroy()`

Metoda `ngOnDestroy()` jest jedną z metod *Lifecycle Hooks* przygotowanych przez Angulara do kontrolowania tego co się
dzieje w komponentach, dyrektywach, pipe czy serwisach. Już sama nazwa nam mówi, że `ngOnDestroy()` jest wywołana w
chwili niszczenia instancji danego elementu.

Niszczenie instancji jest dobrym momentem do posprzątania tego co nie zostanie usunięte przez przeglądarkę lub Angulara
automatycznie. Jeżeli zatem używaliśmy w aplikacji Observables z RXJS, DOM events, metody `setInterval()` lub
`setTimeout()` jest to idealne miejsce, aby usunąć z pamięci przeglądarki te mechanizmy.

Dlatego w `ngOnDestroy()` usuwamy subskrypcje z Observables, usuwamy wszelkie listenery, wywołujemy funkcje
`clearTimeout()` czy `clearInterval()`.

Jeżeli mamy inną logikę do wykonania, która powinna się wydarzyć w chwili usuwania komponentu czy serwisu, także powinna
ona zostać wywołana w tym momencie.

## Jak działa `ngOnDestroy()`

Najprostsze użycie `ngOnDestroy()` w komponencie może wyglądać tak:

```typescript

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnDestroy {
    ngOnDestroy(): void {
        console.log('Component destroyed')
    }
}
```

Komponent implementuje interfejs `OnDestroy` i jest zobowiązany do implementacji metody `ngOnDestroy()`, która będzie
wywołana zaraz przed zniszczeniem komponentu przez Angulara. Jeżeli nasz komponent będzie zagnieżdżony w innym
komponencie:

```html

<app-child *ngIf="close"></app-child>
```

na przykład z użyciem `*ngIf` to za każdym razem gdy komponent będzie chowany, metoda `ngOnDestroy` będzie wywoływana.
To samo stanie się gdy komponent będzie renderowany przez routing.

## Wywołanie `ngOnDestroy()` gdy niszczony jest serwis

Metodę `ngOnDestroy()` możemy także wywołać w serwisie, w momencie gdy jego instancja będzie usuwana. Najczęściej będzie
się tak działo, gdy komponent samodzielnie będzie tworzył instancję serwisu dla własnych potrzeb i nie będzie korzystał
z globalnej instancji serwisu.

Globalna instancja to taka, gdy serwis znajduje się w tablicy `providers` w `AppModule` lub też posiada adnotację
`@Injectable({providedIn: 'root'})`. Jeżeli komponent użyje serwisu przez wstrzyknięcie do konstruktora, to będzie
posiadał globalną instancję. Jeżeli zaś komponent we własnym dekoratorze użyje tablicy `providers` to stworzy sobie
własną instancję.

W naszym przykładzie komponent posiada tablicę `providers` i tworzy sobie instancję na własne potrzeby:

```typescript

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css'],
    providers: [DataService],
})
export class ChildComponent implements OnDestroy {
    constructor(private dataService: DataService) {
    }

    ngOnDestroy(): void {
        console.log('Component destroyed')
    }
}
```

Nasz serwis, inicjalizowany jest wraz ze startem aplikacji i jedna jego instancja powstanie na potrzeby całej aplikacji.
Nie przeszkadza to jednak, aby komponent `ChildComponent` stworzył sobie własną instancję.

```typescript

@Injectable({providedIn: 'root'})
export class DataService implements OnDestroy {
    ngOnDestroy(): void {
        console.log('Service Destroyed')
    }
}
```

Gdy `ChildComponetn` będzie usuwany, również instancja jego serwisu `DataService` zostanie usunięta. Na początku wywoła
się metoda `ngOnDestroy()` z serwisu, a potem z komponentu.

```aiignore
Service destroyed 
Component destroyed
```

W tym czasie możemy posprzątać po naszym komponencie i serwisie.

## Czego nie robi `ngOnDestroy()`

Niektórzy spodziewają się, że metoda `ngOnDestroy()`, zostanie wywołana również, gdy zamkniemy okno przeglądarki wraz z
całą aplikacją. Tak się jednak nie dzieje, metoda jest wywoływana tylko przy niszczeniu komponentu, dyrektywy, pipe czy
serwisu przez mechanizmy Angulara. Dlatego `ngOnDestroy()` nie zadziała gdy:

* zamykasz przeglądarkę / zakładkę
* odświeżasz stronę
* przechodzisz na inny adres URL

Jeżeli chcemy kontrolować takie zdarzenia, możemy użyć dodatkowego
mechanizmu [HostListener](https://angular.io/api/core/HostListener) pochodzącego z Angulara.

```typescript
@HostListener('window:beforeunload')
ngOnDestroy(): void {
    console.log('Tab is closed');
}
```

W tym przypadku, będziemy kontrolować niszczenie komponentu przez Angulara, ale także zamknięcie okna przeglądarki. Sam
`HostListener` oferuje znacznie więcej mechanizmów, ale to już temat na inny wpis.

## Podsumowanie `ngOnDestroy()` w Angularze

* metoda `ngOnDestroy()` pochodzi z interfejsu `OnDestroy`
* `ngOnDestroy()` wywołuje się gdy Angular niszczy komponent, dyrektywę, pipe czy serwis
* `ngOnDestroy()` jest idealnym miejscem do czyszczenia pamięci ze zbędnych mechanizmów jak subskrypcje, DOM events,
  listenery
* metoda nie wywołuje się przy zamknięciu okna przeglądarki, odświeżania strony etc.
* dodatkowo możemy użyć `@HostListener` aby nadzorować więcej zdarzeń np. zamykanie okna przeglądarki
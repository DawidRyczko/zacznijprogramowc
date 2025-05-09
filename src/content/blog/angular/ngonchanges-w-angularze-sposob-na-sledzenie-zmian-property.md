---
title: "Sposób na śledzenie zmian property @Input - ngOnChanges i Angular"
description: "Szczegółowe omówienie metody ngOnChanges w Angularze, służącej do śledzenia zmian w polach @Input. Alternatywne metody, pułapki i przykłady użycia."
date: 2020-06-30
tags: ["angular", "frontend"]
---

## Spis treści
* [Ogólne działanie `ngOnChanges`](#ogólne-działanie-ngonchanges)
* [Śledzenie zmian `@Input` za pomocą getters/setters`](#śledzenie-zmian-input-za-pomocą-getterssetters)
* [Kiedy `ngOnChanges` nie odnotuje zmiany`](#kiedy-ngonchanges-nie-odnotuje-zmiany)
* [NgOnChanges i referencje](#ngonchanges-i-referencje)
* [Podsumowanie `ngOnChanges`](#podsumowanie-ngonchanges)
* [Przydatne linki](#przydatne-linki)

Metoda `ngOnChanges` bardzo często przydaje się do nadsłuchiwania zmian w polach `@Input`. Jeżeli chcemy się dowiedzieć kiedy zmienia się wartość takiego property, *lifecycle hook* `ngOnChanges` może się do tego przydać.

## Ogólne działanie `ngOnChanges`

Zacznijmy jednak od początku. Metoda `ngOnChanges` pochodzi z interfejsu `OnChanges`. Jest to metoda, która w cyklu życia komponentu wywoływana jest jako pierwsza, zaraz po konstruktorze. Wywoływana jest także za każdym razem, gdy property `@Input` zmieni się przez przekazanie nowej wartości z komponentu położonego wyżej.

Metoda `ngOnChages` wygląda tak:

```typescript
 ngOnChanges(changes: SimpleChanges): void {}
```

Jako parametr przyjmuje obiekt `SimpleChanges`, który jest tablicą asocjacyjną wszystkich property znajdujących się w naszym komponencie. Za pomocą klucza typu string możemy z obiektu `changes` wyciągnąć obiekt `SimpleChange`, który reprezentuje dokładnie property `@Input` w naszym komponencie. Jeżeli w komponencie mamy property `@Input name`, to możemy je z obiektu SimpleChanges wyciągnąć w taki sposób:

```typescript
let prop: SimpleChange = changes['name']
```

Obiekt reprezentujący zmianę property `@Input` wygląda tak:

```typescript
class SimpleChange {
    constructor(previousValue: any, currentValue: any, firstChange: boolean)
    previousValue: any
    currentValue: any
    firstChange: boolean
    isFirstChange(): boolean
}
```

Mamy więc w tym miejscu dostęp do poprzedniej i obecnej wartości, a także dodatkowe informacje o pierwszej zmianie obiektu.

Możemy też użyć prostej pętli i sprawdzić wszystkie obiekty:

```typescript
 ngOnChanges(changes: SimpleChanges) {
    for (const prop of Object.keys(changes)) {
        console.log(changes[prop]);
    }
}
```

Rozważmy prosty komponent, który posiada jedno property `@Input name`.

```typescript
export class ChildComponent implements OnChanges {
    @Input() name

    ngOnChanges(changes: SimpleChanges) {
        for (const prop of Object.keys(changes)) {
            console.log(changes[prop])
        }
    }
}
```

Jeżeli zainicjalizujemy property z komponentu położonego wyżej:

```html
<app-child name="Angular"></app-child>
```

W konsoli otrzymujemy informację o tym, że nastąpiła zmiana wartości:

```text
previousValue: undefined
currentValue: "Angular"
firstChange: true
```

Właśnie w taki sposób, możemy śledzić zmianę wartości pól `@Input` w klasie komponentu. Jeżeli w naszym komponencie będziemy mieli inne property `@Input` ale nie będzie zainicjalizowane, to `SimpleChanges` nie będzie posiadał o nim żadnej informacji. Ponieważ `SimpleChanges` posiada informacje tylko o tych property, które się zmieniają i o zmianach, które potrafi wykryć.

Jeżeli chcemy śledzić tylko konkretne property to musimy się posłużyć na przykład takim zapisem:

```typescript
ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
        console.log('Nowa wartość "@name": ', changes.name.currentValue);
    }
}
```

To jest jeden ze sposobów śledzenia zmian w property `@Input` w Angularze, ale nie jedyny.

## Śledzenie zmian `@Input` za pomocą getters/setters

Innym sposobem śledzenia zmian w polach`@Input` jest użycie czystego TypeScript oraz `set` i `get`.

```typescript
 private _company;

@Input()
set company(value: string) {
    this._company = value;
    console.log(`title is changed to ${value}`);
}

get company(): string {
    return this._company;
}
```

Przy takim sposobie, musimy stworzyć prywatne pole w klasie komponentu i odpowiednio akcesor `set` i `get` dla tego pola klasy. Za każdym razem gdy komponent wyższego rzędu, będzie chciał użyć tego pola musi użyć nazwy akcesora:

```html
<app-child company="Google"></app-child>
```

Będziemy mogli odnotować zmianę przy każdej zmianie property. Oczywiście ma to swoje plusy i minus. Musimy dopisać większą ilość kodu i posługiwać się dodatkowym polem prywatnym, które i tak nie jest prywatne bo stworzyliśmy dla niego `set` i `get` :-D.

Jednak ten sposób ma jedną ważną zaletę, możemy wyśledzić zmianę nawet jeżeli metoda `ngOnChanges` nie odnotuje zmiany. Może się tak wydarzyć, gdy zmienimy pole `@Input` wewnątrz klasy komponentu lub też będziemy pracować na obiekcie.

## Kiedy `ngOnChanges` nie odnotuje zmiany

Może się tak zdarzyć, że metoda `ngOnChanges` nie odnotuje zmiany w polu `@Input`. Dzieje się tak gdy postanowimy nadpisać property np. w metodzie `ngOnInit`, rozważmy taki przykład:

```typescript
 ngOnInit() {
    this.name = 'React';
}
```

W tym przypadku podmieniam wartość `@Input name` na inną w `ngOnInit`. Pole `@Input name` cały czas jest inicjalizowane z komponentu położonego wyżej i `ngOnChanges` widzi inicjalizacyjną zmianę property, ale nie odnotowuje nadpisania w metodzie `ngOnInit`. Oczywiście w widoku HTML widnieje napis *React* i strona renderuje prawidłową wartość, jednak `ngOnChanges` jest w tym przypadku głuchy.

```text
SimpleChange {previousValue: undefined, currentValue: "Angular", firstChange: true}
```

Property `@Input color` zmieniła wartość, ale nie zostało to odnotowane przez metodę `ngOnChanges`, tylko wartość inicjalizacyjna została odnotowana. Metoda ta uruchamia się tylko wtedy, gdy zmiana pól `@Input` przychodzi przez bindowanie w widoku HTML.

Dlatego użycie akcesora `set` może się przydać jeżeli chcemy sprawdzać zmieniające się wartości gdy modyfikujemy property `@Input` inaczej niż przez bindowanie w widoku HTML.

## NgOnChanges i referencje

Inną sytuacją kiedy `ngOnChanges` nie powiadomi nas o zmianach są obiekty referencyjne. Gdy zmienia się tylko zawartość obiektu lub listy, Angular nie uruchomi metody `ngOnChanges`. Dodaję do przykładu nowy `@Input`:

```typescript
 @Input() frameworks: Array<string>;
```

Nadrzędny komponent wygląda tak:

```typescript
@Component({
    selector: 'app-root',
    template: `
    <app-child name="Angular" [frameworks]="others"></app-child>
    <button (click)="add()">Dodaj</button>
  `,
})
export class AppComponent {
    others = ['Vue', 'React']

    add() {
        this.others.push('Svelte')
        // Należy odkomentować, aby Angular wykrył zmianę
        // i odnotowałę w ngOnChanges
        // this.others = [...this.others];
    }
}
```

Lista `others` zbindowana jest do `@Input() frameworks`. Na początku wszystko inicjalizuje się poprawnie i `ngOnChanges` odnotowuje zmianę:

```text
SimpleChange {previousValue: undefined, currentValue: Array(2), firstChange: true}
previousValue: undefined
currentValue: (2) ["Vue", "React"]
firstChange: true
```

Gdy za pomocą przycisku dodamy kolejną wartość do listy, `ngOnChanges` nie wykrywa takiej zmiany. Zmiany oczywiście renderowane są w widoku HTML ponieważ Change Detection w Angularze działa, ale `ngOnChanges` milczy.

W przypadku obiektów `ngOnChanges` potrafi wykryć tylko zmieniającą się referencję. Nie jest w stanie sprawdzić czy coś mogło się zmienić w samym obiekcie.

Sposobem na to jest przekazanie nowej referencji. W ten sposób metoda `ngOnChanges` odnotuje zmianę w property `@Input`:

```typescript
 add() {
    this.others.push('Svelte');
    this.others = [...this.others];
}
```

## Podsumowanie `ngOnChanges`

*   `ngOnChanges` uruchamia się zaraz po konstruktorze i przed `ngOnInit`
*   `ngOnChanges` może się przydać do śledzenia zmian w property `@Input`
*   alternatywnym rozwiązaniem śledzenia zmian jest użycie `set` / `get` dla property `@Iput`
*   `ngOnChanges` uruchamia się za każdym razem, gdy property `@Input` zmieni wartość w widoku HTML gdzie jest bindowana
*   `ngOnChanges` nie uruchamia się gdy zmieniają się pola obiektów lub zawartość listy (nie obsługuje zmian w obiektach referencyjnych)
*   aby `ngOnChanges` odnotował zmiany przy obiektach, musimy przekazać je jako nową referencję
*   `ngOnChanges` nie uruchomi się gdy zmienimy wartość property `@Input` przez bezpośrednie odniesienie np. `this.color = 'red'`

## Przydatne linki

Mój przykład na StackBlitz: [https://stackblitz.com/edit/przyklad-ng-on-changes](https://stackblitz.com/edit/przyklad-ng-on-changes)

[https://angular.io/guide/lifecycle-hooks#onchanges](https://angular.io/guide/lifecycle-hooks#onchanges)

[https://angular.io/api/core/SimpleChange](https://angular.io/api/core/SimpleChange)

[https://medium.com/angular-in-depth/creatively-decouple-ngonchanges-fab95395cc6e](https://medium.com/angular-in-depth/creatively-decouple-ngonchanges-fab95395cc6e)

[https://www.angular.love/2017/01/23/angular-2-lifecycle-hooks-ngonchanges-ngoncheck/](https://www.angular.love/2017/01/23/angular-2-lifecycle-hooks-ngonchanges-ngoncheck/)
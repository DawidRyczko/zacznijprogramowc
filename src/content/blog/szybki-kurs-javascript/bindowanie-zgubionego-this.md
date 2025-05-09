---
title: "Bindowanie zgubionego this w JavaScript: Szybki Kurs #69"
description: "Przykłady radzenia sobie ze zgubionym kontekstem `this` w JavaScript."
date: 2025-01-12
tags: [ "szybki-kurs-javascript", "javascript" ]
---

## Spis treści
* [This w eventach obiektów DOM](#this-w-eventach-obiektow-dom)
* [Przechwycenie this](#przechwycenie-this)
* [Bindowanie this](#bindowanie-this)
* [Użycie arrow function](#uzycie-arrow-function)
* [Co warto zapamiętać](#co-warto-zapamietac)

Wiemy już trochę o wskaźniku `this` w JavaScript. Wiemy, że służy on przede wszystkim dla kontekstu funkcji, na którym funkcja będzie pracować. Wiemy też, że w przypadku zwykłych funkcji, `this` bierze się ze sposobu wywołania, w przypadku arrow function, `this` zapożyczone jest z kontekstu
otaczającego.

Jednym z problemów `this` w aplikacjach JavaScript, jest zgubienie `this`. Przed nami kilka przykładów, jak sobie z tym poradzić.

### <span id="this-w-eventach-obiektow-dom">This w eventach obiektów DOM</span>

Ten przykład, który teraz sobie przeanalizujemy jest jednym z najbardziej znanych przykładów zgubionego `this`:

```js
const button = document.getElementById('btn');

const clicker = {
  text: 'Hello',
  initClick: function() {
    button.addEventListener('click', function() {
      console.log(this.text); // undefined
      console.dir(this); // button
    });
  },
};
clicker.initClick();
```

W pliku HTML mam zamieszczony przycisk, który pobieram za pomocą metody `getElementById`. Zmienna `button`
reprezentująca przycisk jest zwykłym obiektem JavaScript. Mam także stworzony obiekt, który posiada pole `text` z informacją do wyświetlenia. Jest także metoda `initClick`, której zadaniem jest na obiekcie `button` wywołać metodę `addEventlistener`. Jest to specjalna metoda z obiektu button, która
pozwoli nam nadsłuchiwać określonego zdarzenia.

Do metody `addEventListener` musimy przekazać nazwę eventu, na jaki chcemy nadsłuchiwać, oraz funkcję `callback`. W funkcji tej tworzymy kod, który ma się wykonać w chwili kliknięcia. Z naszego kodu wynika, że chcemy wypisać pole `text`
z obiektu, a także wypisać aktualne `this`.

Po inicjalizacji naszego *clickera* możemy klikać w przycisk i zobaczymy, że taki kod nie zadziała. Zamiast tekstu otrzymujemy wartość `undefined` oraz obiekt `button`.

```text
undefined
button#btn
```

Kontekst `this` do którego próbujemy się odwołać w naszej funkcji `callback` nie jest naszym obiektem, a obiektem `button`. W obiekcie `button` nie ma takiego pola jak `text`.

Funkcja `callback`, którą przekazaliśmy, nie działa na kontekście naszego obiektu, a działa na kontekście elementu `button`. Następuje tutaj dynamiczne dowiązanie `this` do naszej funkcji. W takich eventach jak ten, `this`
zawsze nawiązuje do obiektu, który wytworzył ten event. Oczywiście możemy to zmienić i jest na to kilka sposobów.

### <span id="przechwycenie-this">Przechwycenie this</span>

Jednym ze sposobów poradzenia sobie ze zgubionym `this` jest przechwycenie `this` do zmiennej:

```js
const button2 = document.getElementById('btn2');

const clicker2 = {
  text: 'Hello',
  initClick: function() {
    const self = this;
    button2.addEventListener('click', function() {
      console.log(self.text);
      console.dir(this);
    });
  },
};

clicker2.initClick();
```

Jest to ten sam kod, który przed chwilą analizowaliśmy, ale w wersji drugiej. W tej wersji w metodzie `initClick` tworzę zmienną `self`, której zadaniem jest przypisanie `this`. Metoda `initClick` będzie wywoływana na obiekcie `clicker2`. Więc `this` w tej metodzie będzie tym obiektem.

```text
Hello
button#btn2
```

W funkcji `callback`, mogę się teraz odwołać do zmiennej  `self`, a potem do pola `text`. Nie posługuję się już kontekstem `this`, który wciąż jest obiektem `button2`. Korzystamy tutaj z tego, że funkcje zagnieżdżone mają dostęp do zewnętrznych zakresów funkcji, które je otaczają, czyli tak zwanych
domknięć. Możemy więc przypisać `this` do zmiennej i wykorzystać właśnie w taki sposób.

To rozwiązanie jest o tyle ciekawe, że wewnątrz naszej funkcji `callback` mamy dostęp do naszego obiektu przez zmienną `self` jak też dostęp do obiektu `button2` przez `this`.

### <span id="bindowanie-this">Bindowanie this</span>

Bidnowanie do funkcji, to kolejny sposób na zgubiony `this`:

```js
const button3 = document.getElementById('btn3');

const clicker3 = {
  text: 'Hello',
  initClick: function() {
    button3.addEventListener('click', (function() {
      console.log(this.text); // Hello
      console.dir(this); // clicker3
    }).bind(this));
  },
};

clicker3.initClick();
```

W tej wersji funkcję `callback` otoczyliśmy dodatkowo nawiasami okrągłymi i wywołaliśmy na tej funkcji metodę `bind` do której przekazaliśmy `this`. Ten `this`, który przekazujemy w taki dziwny sposób pochodzi z funkcji `initClick`, a że została ona wywołana na obiekcie `clicker3` to od teraz nasza
funkcja `callback` będzie pracowała na tym właśnie obiekcie.

```text
Hello
{text: "Hello", initClick: ƒ}
```

Zamiast `bind(this)` możemy też wpisać `bind(clicker3)` i odwołać się przez nazwę obiektu. Odwoływanie się przez nazwę nie jest jednak tak elastyczne. Warto jeszcze zwrócić uwagę, że funkcja `callback` od teraz pracuje tylko na `this`
naszego obiektu.

Wcześniej `this` w tej funkcji wciąż odnosił się do obiektu `button`. Zmieniliśmy więc zupełnie kontekst tej funkcji, i jeśli przez `this` chcieliśmy się dodatkowo odnosić do obiektu `button` to już nie możemy. Ewentualnie możemy po prostu użyć zmiennej `button3`.

Metoda `bind` nie bierze się znikąd. W `Function.prototype` istnieją takie metody jak `bidn`, `call`, `applay`, do których jeszcze wrócimy. Metodę `bind` wywołaną na końcu funkcji możecie dość często spotkać w kodzie JavaScript.

### <span id="uzycie-arrow-function">Użycie arrow function</span>

Ostatni sposób, jaki zobaczymy to dzisiaj najczęściej wykorzystywany sposób na problem zgubionego `this`:

```js
const button4 = document.getElementById('btn4');

const clicker4 = {
  text: 'Hello',
  initClick: function() {
    button4.addEventListener('click', () => {
      console.log(this.text);
      console.dir(this);
    });
  },
};

clicker4.initClick();
```

W tej czwartej wersji implementacji, zamiast zwykłej funkcji jako `callback` przekazujemy funkcję strzałkową i od razu wszystko działa, jak zaplanowaliśmy. Dzięki temu, że *arrow function* nie ma swojego `this`, jest on dziedziczony z funkcji nadrzędnej, a tą funkcją jest `initClick`.
Ponieważ `initClick` jest wywołany na obiekcie `clicker4` to jest to `this` tego obiektu. Działanie jest identyczne, jak użycie `bind`.

```js
Hello
{
  text: "Hello", initClick
:
  ƒ
}
```

Tutaj także musimy zwrócić uwagę, że `this` w funkcji strzałkowej nie jest już obiektem `button`. Jeżeli więc chcemy odnieść się jakoś do obiektu `button` wewnątrz tej funkcji, musimy użyć zmiennej `button4`.

Przy tego typu implementacjach to właśnie funkcje strzałkowe wydają się najlepszym rozwiązaniem. Ich zapis jest zwięzły i zazwyczaj dziedziczą ten kontekst `this`, który oczekujemy. Dlatego we współczesnym kodzie JavaScript wszędzie tam gdzie trzeba obsługiwać jakiś event i przekazać
funkcję `callback`, *arrow function* są najczęściej spotykane.

### <span id="co-warto-zapamietac">Co warto zapamiętać</span>

- w eventach obiektów DOM `this` jest obiektem, który wytworzył dany event
- jednym ze sposobów na zagubiony `this` jest przypisanie go do zmiennej
- metoda `bind` binduje funkcję do konkretnego obiektu, który staje się kontekstem `this`
- dzisiaj *arrow function* to najnowocześniejsze podejście do opanowania sytuacji ze zgubionym `this`

[Główny spis treści.](https://zacznijprogramowac.net/szybki-kurs-javascript/spis-tresci/)
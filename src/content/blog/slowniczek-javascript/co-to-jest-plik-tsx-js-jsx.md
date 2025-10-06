---
title: "Co to jest i jakie są różnice między plikami JS, JSX, TS, TSX"
description: "Krótkie przedstawienie często pojawiających się rozszerzeń plików przy tworzeniu aplikacji webowych.Ermit"
date: 2025-10-06
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

Plik z rozszerzeniem `js` to standardowy plik dla kodu napisanego w języku JavaScript. Pliki z rozszerzeniem `jsx` to
pliki, które rozszerzają możliwości JavaScript o składnię przypominającą HTML (nazywaną JSX).

Analogicznie jest z plikiem `ts` który jest standardowym plikiem dla kodu pisanego w TypeScript. Natomiast rozszerzenie
`tsx` na pisanie kodu w TypeScript z wykorzystaniem składni JSX (podobnej do HTML)

## JS, JSX, TS, TSX w dalszych szczegółach

Pliki `js` to naturalny wybór, jeżeli piszemy kod w JavaScript. Te pliki są bez problemu interpretowane przez
przeglądarkę czy inne środowiska uruchomieniowe dla JavaScript. Do ich uruchomienia nie jest potrzebny żaden transpiler
kodu, po prostu możemy go wczytać w przeglądarce i uruchomić. Wystarczy otworzyć zwykły notatnik, napisać kod
JavaScript, zapisać z rozszerzeniem `js` i już mamy gotowy do uruchomienia kod JavaScript. Przewaga `js` leży w jego
prostocie i natychmiastowym działaniu. To idealny wybór dla małych projektów, szybkich skryptów i nauki.

Pewną odmianą pliku `js` jest plik z rozszerzeniem `jsx`. W takich plikach można pisać kod w JavaScript, przeplatając
go składnią JSX, która wygląda niemal identycznie jak HTML. Jest on znany i najbardziej kojarzony z frameworkiem
React. Przykładowy kod wygląda tak:

```jsx
const name = "Użytkownik";
const element = <h1>Witaj, {name}!</h1>; // Wyświetli "Witaj, Użytkownik!"
```

Pliki te nie są natomiast interpretowane przez przeglądarkę bez wcześniejszego przetworzenia. Muszą być transpilowane
przez takie narzędzie jak Babel.

Kolejnym rozszerzeniem jest plik `ts`. Jest to plik używany do pisania w języku TypeScript. Główna różnica w stosunku
do JavaScript jest taka, że TypeScript dodaje typy do składni. Ponieważ TypeScript jest jakby nakładką na JavaScript,
w tych plikach możesz też pisać czysty kod JavaScript, który bez problemu zadziała.

Kod JavaScript:

```js
function greet(user) {
  console.log(`Witaj, ${user.name}!`);
}
```

Kod TypeScript:

```ts
interface User {
  name: string;
  id: number;
}

function greet(user: User): void {
  console.log(`Witaj, ${user.name}!`);
}
```

Nie możemy jednak uruchomić plików `ts` bezpośrednio w przeglądarce. Podobnie jak przy rozszerzeniach `jsx` wymagana
jest kompilacja kodu. TypeScript jednak jest dzisiaj standardem w budowaniu aplikacji. Statyczne typowanie pozwala na
unikanie błędów i większą kontrolę nad projektem.

Ostatnim plikiem jest rozszerzenie `tsx`. To nic innego jak połączenie TypeScript i JSX. Pliki te najczęściej używane
są we frameworku React. Pozwala nam to na łączenie kodu TypeScript ze składnią JSX, co ma wiele zalet.

```tsx
// Definiujemy, że komponent oczekuje propsów 'name' (string) i 'age' (number).
interface UserProfileProps {
  name: string;
  age: number;
}

// Używamy tego interfejsu w komponencie.
// Plik musi mieć rozszerzenie .tsx z powodu użycia składni JSX (<>).
const UserProfile = (props: UserProfileProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Wiek: {props.age}</p>
    </div>
  );
};
```

Podobnie jak pliki `jsx`, `ts` oraz `ts`, pliki `tsx` także muszą byc transpilowane, ponieważ przeglądarka nie potrafi
ich odczytać.

Pomimo tego, że pliki `jsx`, `ts`, `tsx` wymagają dodatkowych narzędzi, nie musimy ich smi konfigurować. Możemy
skorzystać z narzędzi developerskich jak Vite czy Next.js.

Ważną korzyścią przy plikach `ts` czy `tsx` jest bardzo dobre wspracie edytorów kodu. Dzięki typom otrzymujemy o
wiele lepsze autouzupełnianie, natychmiastowe wykrywanie błędów i łatwiejszą nawigację po projekcie. To jedna z
największych zalet praktycznych.

## Podsumowanie

- pliki `js` używamy do pisania w JavaScript
- pliki `jsx` używamy we frameworkach jak React do pisania czytelnego kodu JavaScript i HTML
- pliki `ts` używamy do pisania kodu TypeScript, ale można też w nich pisać zwykły JavaScript
- pliki `tsx` używamy do łączenia TypeScript i HTML, to dzisiaj standard w wielu frameworkach
- `tsx` to dzisiaj standard w ekosystemie Reacta oraz w wielu innych nowoczesnych frameworkach, które wykorzystują JSX.
- pliki `ts` i `tsx` mają bardzo dobre wsparcie edytorów kodu i praca z nimi jest łatwiejsza


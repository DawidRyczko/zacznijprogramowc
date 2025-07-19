---
title: "Co to jest CSP - Content Security Policy"
description: "Jak Content Security Policy chroni aplikację przed atakami XSS."
date: 2025-07-19
tags: [ "javascript", "slowniczek-java-script" ]
---

## Szybka odpowiedź

**CSP - Content Security Policy** - jest jednym z mechanizmów bezpieczeństwa, którego zadaniem jest chronienie strony
przed atakami XSS (Cross-Site Scripting) i wstrzykiwaniem nieautoryzowanego kodu. CSP jest konfigurowany przez nagłówek
HTTP `Content-Security-Policy`, który wysyłany jest z serwera strony do przeglądarki. Za włączenie bądź wyłączenie
CSP odpowiada serwer, na którym hostowana jest nasza strona.

Zadaniem CSP jest wskazanie przeglądarce, z jakich zasobów korzysta strona internetowa i pozwolenie na ich załadowanie.
Mogą być to odnośniki do zasobów umieszczonych na zewnętrznych serwerach jak obrazki, skrypty JavaScript czy arkusze
stylów np. link do stylów Bootstrap. CSP blokuje także ładowanie wewnętrznych zasobów jak style inline, skrypty inline
czy eventy inline.

Aby odpowiednio skonfigurować CSP w nagłówku `Content-Security-Policy` musimy przesłać odpowiednie dyrektywy.

## CSP w dalszych szczegółach

Jeżeli nasz serwer ma włączone CSP, nagłówek `Content-Security-Policy` najczęściej jest konfigurowany po stronie serwera.
Można to również zrobić w pliku `index.html`, ale nie jest to zalecana praktyka. Do konfiguracji możemy wykorzystać,
wiele zdefiniowanych dyrektyw, a to tylko przykładowe:

- `default-src` - pozwala na ładowanie zasobów tylko z własnej domeny
- `script-src` - ładowanie skryptów JavaScript
- `style-src` - ładowanie arkuszy stylów
- `img-src` - ładowanie obrazków
- `font-src` - ładowanie czcionek
- `frame-src` - ładowanie ramek `iframe`

Dla lepszego zrozumienia, jak skonfigurować CSP i jak to działa, rozpatrzmy taki scenariusz:

Nasza strona działa na serwerze z włączonym CSP i chce skorzystać z Bootstrapa. Popularny sposób to załadowanie z linków
CDN w pliku `index.html`:

```html

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

Przyjrzyjmy się przykładowej konfiguracji nagłówka CSP dla takiej strony:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline';
  img-src 'self' data:;
```

Powyższy nagłówek posiada 4 różne dyrektywy, na przykład `default-src`. Po nazwie dyrektywy podawane są wartości,
które informują przeglądarkę, jakie źródła są dozwolone, na przykład `'self'`. Wartości oddzielane są spacją, a
konfiguracja dyrektywy zakończona jest średnikiem `;`. Po nim następuje konfiguracja kolejnej dyrektywy.

Zauważ, że niektóre wartości jak `'self'` są w pojedynczym cudzysłowie, natomiast adresy URL już nie. Jest to
informacja, które wartości są specjalnymi instrukcjami dla przeglądarki, a które adresami URL. Mamy więc kilka słów
kluczowych specjalnie zarezerwowanych dla przeglądarki jak `'self'`, `'none'`, `'unsafe-inline'` i inne.

Wyjątkiem jest wartość `data:`, która wydaje się specjalnym poleceniem, ale nie jest. Wartość `data:` podobnie jak
`http:`jest standardem webowym pozwalającym na osadzenie treści bezpośrednio w adresie URL. Przeczytasz o tym
więcej [tutaj](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data).

Wracając do naszej konfiguracji CPS, wytłumaczmy krok po kroku, jak działa każda dyrektywa:

- `default-src 'self';` - default-src jest to podstawowa dyrektywa, którą zaleca się umieszczać zawsze i najlepiej na
  początku naszej konfiguracji. Mówi ona, że przeglądarka może domyślnie załadować wszystkie zasoby jak obrazki,
  skrypty,
  style, czcionki i mogą być one ładowane tylko z naszej domeny. Konfiguracja ta jest dosyć restrykcyjna, ale kolejnymi
  dyrektywami możemy zezwolić na wyjątki i nadpisywać tę regułę blokowania innych źródeł.

- `script-src 'self' https://cdn.jsdelivr.net;` - dyrektywa pozwalająca na wykonywanie skryptów z naszej domeny oraz
  domeny `https://cdn.jsdelivr.net` na której hostowany jest Bootstrap.

- `style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline';` - dyrektywa pozwala na ładowanie arkuszy stylów z naszej
  domeny oraz domeny `https://cdn.jsdelivr.net`. Dodatkowo dyrektywa ta posiada specjalną instrukcję `'unsafe-inline'`,
  która pozwala na dodawanie stylów inline w elemencie html `style="..."`, z których czasami korzysta Bootstrap.

- `img-src 'self' data:;` - dyrektywa zezwala na obrazki z naszej domeny. Dodatkowo zezwalamy na używanie `data: URI`,
  z którego czasami korzysta Bootstrap.

## Jak Konfigurować CSP

Powyżej użyliśmy przykładowej konfiguracji CSP dla Bootstrapa. Możesz się teraz zastanawiać, skąd wiadomo, które
dyrektywy użyć i jak je skonfigurować? Niestety jest to najbardziej frustrująca część konfiguracji CSP. Nie da się
odgadnąć idealnej konfiguracji.

Jednym ze sposobów jest ustawienie podstawowej konfiguracji `Content-Security-Policy: default-src 'self';`, wgranie
strony na serwer i obserwowanie konsoli w przeglądarce, jeżeli zaobserwujemy podobny błąd:

```text
Refused to load the script '`https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js`' because it 
violates the following Content Security Policy directive: "script-src 'self'".
```

Oznacza to, że musimy skonfigurować dyrektywę `script-src`. Niestety, przeglądarka nie zawsze wyrzuci nam wszystkie
złamania polityki CSP. Gdy skonfigurujemy już nasze CSP w oparciu, o znalezione w konsoli błędy, po wgraniu na serwer
może się okazać, że pojawiają się kolejne błędy CSP.

Na przykład pozwolimy na ładowanie styli Bootstrapa przez dyrektywę `style-src 'self' https://cdn.jsdelivr.net;`. Błąd
dotyczący blokowania adresu URL zniknie, ale pojawi się nowy, związany z dodawaniem styli inline. Będziemy musieli znowu
skonfigurować dyrektywę przez dodanie `'unsafe-inline'` i ponownie wgrać stronę na serwer. Czasami ten proces wymaga
długiego debugowania i jest dość żmudny.

Innym sposobem jest wykorzystanie nagłówka `Content-Security-Policy-Report-Only`. Przeglądarka nie będzie blokowała
zasobów, a jedynie wysyłała raport pod zdefiniowany adres URL w nagłówku. Dzięki temu strona będzie działała prawidłowo
i ładowała wszystkie zasoby, nie będzie blokowana przez przeglądarkę, a ty będziesz miał możliwość zebrania wszystkich
danych i stworzenia polityki CSP.

Pamiętajmy, że jest to rozwiązanie tymczasowe na czas konfiguracji CSP w bezpieczny sposób, który nie blokuje strony.

## Korzyści z CSP

- ochrona przed atakami XSS
- kontrola nad ładowanymi zasobami
- wymuszanie z korzystania HTTPS, ponieważ CSP akceptuje tylko zasoby HTTPS
- ochrona przed Clickjackingiem

## Wady CSP

- skomplikowana i mało czytelna konfiguracja
- żmudny proces debugowania
- włączenie CSP na działającej stronie produkcyjnej może ją zablokować
- trudności w utrzymaniu i zarządzaniu zdefiniowanymi wartościami

## Kiedy warto użyć CSP?

Pomimo trudności w konfiguracji i utrzymaniu, Content Security Policy warto używać zawsze. W mojej opinii powinien być
to standard na każdej nowoczesnej stronie, a w miarę możliwości wdrażane na starszych stronach, które nie posiadają
włączonego CSP.

## Podsumowanie

- CSP to dodatkowa ochrona dla naszej strony internetowej
- CSP konfiguruje się po stronie serwera, można to robić w pliku `index.html` ale nie jest to zalecane
- CSP to dzisiaj standard bezpieczeństwa
- CSP działa jak biała lista dla przeglądarki "whitelist" informując ją, które zasoby może pobierać
- CSP wdrażamy iteracyjnie przez debugowanie lub analizę raportu wysłanego przez nagłówek
  `Content-Security-Policy-Report-Only`

Więcej przeczytasz w dokumentacji [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only)

















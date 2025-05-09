---
title: "Co to jest NPM?"
description: "Wyjaśnienie, czym jest NPM (Node Package Manager) i jakie pełni funkcje."
date: 2020-10-08
tags: [ "javascript", "slowniczek-java-script" ]
---

Rozwinięciem skrótu NPM jest Node Package Manager. NPM pełni dwie funkcje. Pierwszą z nich to repozytorium otwartych i
darmowych bibliotek, frameworków, narzędzi i wszelkiego rodzaju projektów, które są uruchamiane za pomocą Node.js.
Repozytorium znajdziecie pod adresem http://npmjs.org/.

Jeżeli chcemy zainstalować jakąś paczkę z repozytorium NPM, musimy użyć konsoli systemowej. I to jest właśnie druga
funkcja NPM, jest to narzędzie linii komend. Za pomocą prostej komendy `npm install nazwa_paczki` możemy pobrać dowolną
paczkę kodu i użyć jej w naszej aplikacji.

Spójrzmy na taki przykład. Jeżeli piszesz aplikację w JavaScript i chciałbyś generować unikalne id dla swojej aplikacji,
nie musisz pisać skomplikowanego algorytmu, ktoś na pewno zrobił to już za Ciebie. Wystarczy wykonać polecenie
`npm install uuid` i zainstalować bibliotekę UUID, która dostarczy Ci wszystkiego co potrzebujesz, a nawet więcej.

NPM jest ogromnym zasobem kodu open source. Codziennie pojawia się tam setki nowych paczek kodu. Jeżeli czegoś
potrzebujesz, na pewno to istnieje dzięki NPM. NPM instalowany jest wraz z Node.js.

Alternatywą dla NPM-a jest narzędzie YARN, które działa bardzo podobnie. Yarn należy doinstalować samodzielnie.

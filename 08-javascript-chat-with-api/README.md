# Javascript chat with API

1. Stworz projekt chatu oparty na LS
  Wymagania:
  - Stworz strone glowna, zawierajaca liste wiadomosci. Kazda wiadomosc ma zawierac pole message i author.
  - Stworz podstrone add, zawierajaca formularz pozwalacy na dodanie wiadomosci
  - Zrob nawigacje na obu stronach, zebysmy mogli przechodzic pomiedzy stronami index i add
  - Zrob wyswietlanie listy i dodawanie za pomoca localStorage

Po zrobionym zadaniu 1, edytujemy go, zeby zrobic zadanie 2.

2. Stworz wlasny serwer (mozesz w zasadzie przekopiowac wszystko co bylo poprzednio)
  Wymagania
  - Zrob obsluge endpointu GET /messages (stworz json z baza danych)
  - Zrob obsluge endpoint POST /messages (aby dodawal do json z baza danych)

--------------------------------------------------------

3*. Przy kazdej wiadomosci, dodaj ikonke olowka, ktora przekieruje uzytkownika na podstrone edit.html. Wiadomosc, ktora jest edytowana zapisz do LS, a nastepnie odczytaj na podstronie edit.html. Nastepnie zrob obsluge endpointa PUT /messages/ID, ktory bedzie edytowal konkretna wiadomosc.
# Javascript filmweb (podstawy ok. 10-15h, rozszerzony 20h)

Stwórz projekt filmweb, który będzie zawierał poszczególne funkcjonalności

1. Strona głowna z filmami
2. Strona konkretnego filmu
3. Strona dodawania filmu

Funkcjonalnosci:

- Po dodaniu filmu, wroc do listy i wyswietl wszystkie filmy z bazy
- Na liscie filmow, po kliknieciu w dany film, przejsc do podstrony z filmem
- Na podstronie z filmem wyswietl wszystkie informacje o tym filmie
  - Wersja prosta: skorzystaj z LS
  - Wersja docelowa: przekaz przez LS tylko id filmu ktory zostal klikniety, a na podstronie filmu zrob zapytanie HTTP GET z parametrem ID
- Postaraj sie ostylowac zadanie :)

Baza danych:

- Dowolność, preferowany wlasny serwer nad json-server

Przykladowy JSON

{
  "movies": [
    {
      "title": "Avatar",
      "category": "fantasy",
      "description": "Lorem ipsum dolot sit amet.",
      "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKttPEnfiRIL_WkPrFFrfwHKdsnQXVGS1GYQ&usqp=CAU",
      "year": 2000,
      "rate": 7.8
    }
  ]
}

----------------------------------------------------------------

Dla osob, ktore chca pocwiczyc bardziej, oto zestaw kata

Dodatkowe funkcjonalnosci:

- Nad lista filmow, zrob select i zrob mozliwosc filtrowania po kategoriach
- w headerze strony zrob search, za pomoca ktorego bedziesz mogl filtrowac po title
- Zrob mozliwosc edycji i usuwania filmow (przyciski powinny byc dostepne na stronie danego filmu). Skorzytaj z wlasnego serwera

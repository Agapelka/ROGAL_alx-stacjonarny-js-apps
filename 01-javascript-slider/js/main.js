// Napisz slider

// 1. Stworz tablice, zawierajaca zrodla do 5 roznych obrazkow
// 2. Na start strony, dodaj do obrazka atrybut src z pierwszego elementu tablicy
// 3. Stworz zmienna typu number, ktora bedzie trzymala informacje, ktory jest aktualnie aktywny slajd (uzyj do tego indeksu)
// 4. Po wcisnieciu przycisku next, zmien wartosc licznika, a nastepnie zamien wartosc atrybutu src w obrazku (na nastepny)
// 5. Po wcisnieciu przycisku prev, zmien wartosc licznika, a nastepnie zamien wartosc atrybutu src w obrazku (na poprzedni)
// 6*. Zrob obsluge karuzeli tzn. jak jestesmy na ostatnim obrazku i wcisniemy next, to pokaz pierwszy obrazek, a jak jestesmy na pierwszym obrazku i wcisniemy prev, to pokaz ostatni obrazek. Uzyj do tego zmiennej z licznikiem.

const images = [
  'https://www.karmimypsiaki.pl/blog/wp-content/uploads/2020/02/shutterstock_346080257.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/The_Puppy.jpg/220px-The_Puppy.jpg',
  'https://sites.google.com/site/psiakilol/_/rsrc/1329297963183/home/Psiaki%20w%20kube%C5%82ku.jpg',
  'https://static.wikia.nocookie.net/psiaki/images/a/a8/Boo_4.jpeg/revision/latest?cb=20140203130811&path-prefix=pl',
  'https://img.joemonster.org/i/upload/2019/11/psiaki_01.jpg'
]

const sliderImage = document.querySelector('#sliderImage');
const sliderPrev = document.querySelector('#sliderPrev');
const sliderNext = document.querySelector('#sliderNext');

let counter = 0;

sliderImage.src = images[counter];

const handleClickNext = () => {
  counter++;

  if(counter === images.length) {
    counter = 0;
  }

  sliderImage.src = images[counter];

  // sliderImage.setAttribute('src', 'wartosc')
  // sliderImage.src = 'wartosc'
}

const handleClickPrev = () => {
  counter--;

  if(counter === -1) {
   counter = images.length - 1;
  }

  sliderImage.src = images[counter];
}

sliderNext.addEventListener('click', handleClickNext);
sliderPrev.addEventListener('click', handleClickPrev);
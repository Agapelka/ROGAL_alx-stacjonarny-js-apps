import { DATABASE_URL } from '../utils/urls';

const trainsList = document.querySelector('#trainsList');
const searchTrainForm = document.querySelector('#searchTrainForm')
const searchTrainInput = document.querySelector('#searchTrainInput');

let trains = [];

const renderTrains = (trains) => {
  trainsList.innerHTML = '';

  trains.forEach(train => {
    trainsList.innerHTML += `
      <li>
        <p>Pociag z ${train.from} do ${train.to}</p>
        <p>Data: ${train.date}</p>
      </li>
    `
  })
}

const fetchTrains = () => {
  // w ES6 mozna skracac funkcje strzalkowe
  // moza usunac klamry i slowo return
  // jak funckja strzalkowa ma tylko jeden argument, mozna usunac () przy parametrze
  fetch(DATABASE_URL)
    .then(res => res.json())
    .then(data => {
      // potrzebujemy zapisac dane z serwera do globalnej zmiennej, zebysmy po niej mogli filtrowac
      trains = data;
      renderTrains(data);
    })
}

const handleSearch = (event) => {
  event.preventDefault();

  // Musimy odfiltrowac wszystkie wyniki, ktore maja slowo klucze w kluczu "from" lub kluczu "to"
  const filteredTrains = trains.filter(train => {
    return train.from.toLowerCase().includes(searchTrainInput.value.toLowerCase())
      || train.to.toLowerCase().includes(searchTrainInput.value.toLowerCase());
  })

  renderTrains(filteredTrains);
}

fetchTrains();
searchTrainForm.addEventListener('submit', handleSearch)

// w Node.JS mamy 2 sposoby importowania modulow

// 1. import
// 2. require

// require dziala tak jak import bez klamer
const fs = require('fs');
const fsp = fs.promises;

// Ta sytuacja powoduje ze mamy 2 operacje uruchomione w tym samym czasie

// Operacja odczytu z pliku
// fsp.readFile('./kurs.txt', 'utf8')
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   })

// Operacja zapisu
// const newContent = 'Kurs ALX jest fajny i duzo sie ucze';

// fsp.writeFile('./kurs.txt', newContent, 'utf8')
//   .then(() => {
//     console.log('Udalo sie!');
//   })



// Jak ulozyc promisy jeden po drugim
// Potrzebujemy zrobic funkcje, ktora zwraca promise

const saveToFile = () => {
  const newContentToKurs2 = 'Podmiana tekstu';

  // Musimy pamietac, zeby zwrocic ten promise
  return fsp.writeFile('./kurs2.txt', newContentToKurs2, 'utf8')
    .then(() => console.log('Udalo sie!'));
}

const readFromFile = () => {
  // Musimy pamietac, zeby zwrocic ten promise
  return fsp.readFile('./kurs2.txt', 'utf8')
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Promise'y tez moga uzywac slowa then, zeby ustalic kolejnosc miedzy soba
readFromFile()
  .then(() => {
    saveToFile();
  })



// Rzeczy dodatkowe/zaawansowane

// 1. Jesli funkcja callback nie ma parametru i funckja ktora sie wykonuje od razu po niej tez nie ma parametru, to moge usunac () w obu miejscach
// readFromFile()
//   .then(saveToFile)

// 2. Zastosowanie tzw sugar syntax na then/catch

// const readFromFile2 = () => {
//   // Musimy pamietac, zeby zwrocic ten promise
//   return fsp.readFile('./kurs2.txt', 'utf8')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }

// // ES7 async/await
// const readFromFileUsingAsyncAwait = async () => {
//   try {
//     const data = await fsp.readFile('./kurs2.txt', 'utf8')
//     console.log(data);
//     return data;
//   } catch(error) {
//     console.log(error)
//   }
// }


// 1. Stworz plik o nazwie data.json i wypelnij go danymi z zadaniami z chatu (ten plik z json-server). Nastepnie za pomoca node, odczytaj zawartosc pliku json i go sparsuj. Nastepnie za pomoca metody forEach, wyswietl pojedyncze obiekty w konsoli

// fsp.readFile('./data.json', 'utf8')
//   .then(data => {
//     // Potrzebujemy sparsowac wyniki
//     const parsedData = JSON.parse(data);

//     parsedData.messages.forEach((message) => {
//       console.log(message);
//     })
//   })

// 2*. Stworz logike zeby zapisac nowa wiadomosc do pliku JSON


const readFromJSON = () => {
  return fsp.readFile('./data.json', 'utf8');
}

const writeToJSON = (newEntry) => {
  return readFromJSON()
    .then(data => {
      const parsedJSON = JSON.parse(data);
      // Potrzebuje do odczytanego JSON dodac nowy obiekt a nastepnie go zapisac
      parsedJSON.messages.push(newEntry);

      fsp.writeFile('./data.json', JSON.stringify(parsedJSON), 'utf8');
    })
}

const newMessage = {
  author: 'Marcin',
  message: 'Kurs jest fajny'
}

const newMessage2 = {
  author: "Paweł",
  message: "Lubie chodzic do biura"
}

writeToJSON(newMessage)
writeToJSON(newMessage2)

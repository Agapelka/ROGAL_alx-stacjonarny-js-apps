import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
  getMessages,
  getMessage,
  saveMessages,
  deleteMessage,
  editMessage
} from './controllers/messages.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "*"
}))

app.get('/messages', (req, res) => {
  getMessages()
    .then(data => {
      res.status(200).send(data);
    });
})

app.get('/messages/:id', (req, res) => {
  getMessage(req.params.id)
    .then(data => {
      res.status(200).send(data)
    })
})

app.post('/messages', (req, res) => {
  if(!req.body.id) {
    return res.status(400).send('Lack of ID!');
  }

  saveMessages(req.body)
    .then(() => {
      res.status(200).send('OK!');
    })
})

// /:id w ten sposob mowimy ze oczekujemy id w parametrze.
// to bedzie dostepne w req.params

app.delete('/messages/:id', (req, res) => {
  // console.log(req.params.id); // Odczytanie ID z FE

  deleteMessage(req.params.id)
    .then(() => {
      res.status(200).send('OK!');
    })
})

app.put('/messages/:id', (req, res) => {
  // potrzebujemy przekazac ktory element edytujemy oraz jaka jest nowa zawartosc
  editMessage(req.params.id, req.body)
    .then(() => {
      res.status(200).send('OK!');
    })

})

app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
})
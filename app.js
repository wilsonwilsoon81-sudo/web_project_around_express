const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;

const usersPath = path.join(__dirname, 'data', 'users.json');
const cardsPath = path.join(__dirname, 'data', 'cards.json');

app.get('/users', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer los datos' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.get('/cards', (req, res) => {
  fs.readFile(cardsPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer los datos' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.get('/users/:_id', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer los datos' });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params._id);

    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
      return;
    }

    res.send(user);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer los datos' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.get('/:_id', (req, res) => {
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

module.exports = router;

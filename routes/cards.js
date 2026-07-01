const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', (req, res) => {
  fs.readFile(cardsPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error al leer los datos' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

module.exports = router;

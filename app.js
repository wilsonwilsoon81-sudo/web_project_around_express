const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('✅ Conectado a la base de datos: aroundb');
  })
  .catch((err) => {
    console.log('❌ Error al conectar a MongoDB:', err);
  });

app.use((req, res, next) => {
  req.user = { _id: '6a6149b75e6e30c570b606a9' };
  next();
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

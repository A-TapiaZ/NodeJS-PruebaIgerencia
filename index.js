require('dotenv').config()
const express = require ('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crea el servidor 
const app = express();
app.use(cors());

// Lectura y Parseo dle body
app.use(express.json());

// base de datos
dbConnection();

// Routes
app.use('/api/palobj', require('./routes/palobj.routes'));


app.listen(process.env.PORT, ()=>{
  console.log(`servidor en linea en el puerto: ${process.env.PORT}`)
});

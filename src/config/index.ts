'use strict';

// Configurando variables, "mongoose" para la base de datos, "app" para asignar el archivo de rutas en la web
// y "port" para el puerto. En este caso, por ser visual studio, asignara el puerto automatico, sino lo asignase usaria el puerto 3977.
import { Mongoose, connect } from "mongoose";

import { app } from './app';

var Promise = require("bluebird");

const port = process.env.port || 3977

const options = {useMongoClient:true};
const host = process.env.mongohost || 'locahost';
const dbPort: any = process.env.mongoport ||27017;
const db = process.env.dbname || 'default';


// conectando a base de datos, donde si no conecta expulsa el mensaje de error en consola.
connect(`mongodb://${host}:${dbPort}/${db}`, options, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('La base de datos esta corriendo correctamente...');
  }

  // introducimos dentro del callback el inicio del servidor web que esta en app.ts
  app.listen(port, () => {
    console.log(`Servidor del api rest escuchando en http://localhost:${port}`);
  });
});

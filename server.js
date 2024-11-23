/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from 'dotenv';

const environments = {
  development: 'Desarrollo',
  production: 'Producción',
};

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Apagando el servidor...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

import { connect } from 'mongoose';
import { ServerCredentials } from '@grpc/grpc-js';
import server from './app.js';

export default server;

if (
  !process.env.DATABASE ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_USER
) {
  throw new Error(
    'Missing environment variables: DATABASE, DATABASE_PASSWORD, or DATABASE_USER.',
  );
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
).replace('<USER>', process.env.DATABASE_USER);

connect(DB).then(() => console.log('✓ Conexión a base de datos exitosa'));

server.bindAsync(
  `${process.env.SERVER_URL}:${process.env.PORT || 3000}`,
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error('Server failed to bind:', error);
    } else {
      console.log(
        `- Entorno:      ${environments[process.env.NODE_ENV || 'development']}`,
      );
      console.log(`- Puerto:       ${port}`);
      console.log(
        `- URL:          ${process.env.SERVER_URL || 'localhost'}:${port}`,
      );
    }
  },
);

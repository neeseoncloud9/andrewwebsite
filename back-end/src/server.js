import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import routes from './routes';
import { db } from './database';
import * as admin from 'firebase-admin';
import credentials from '../credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

let server;

const start = async () => {
    server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
    });

    await server.register(inert);

    routes.forEach(route => server.route(route));

    server.route({
        method: 'POST',
        path: '/hello',
        handler: (req, h) => {
            const payload = req.payload;
            const name    = payload.name;
            return `Hello ${name}!`;
        }
    })

    db.connect();
    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.stop({ timeout: 1000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
});

start();
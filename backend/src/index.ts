import express from 'express';
import cors from 'cors';
import { router } from './router';
import { swaggerSetup } from './swagger';

export const server = express();

swaggerSetup(server);

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(3000, ()=> console.log('🟢 Server actved'));

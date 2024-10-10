import express from 'express';
import cors from 'cors';
import { router } from './router';

export const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(8080, ()=> console.log('🟢 Server actved'));

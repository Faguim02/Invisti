import express from 'express';
import cors from 'cors';

export const server = express();

server.use(express.json());
server.use(cors());

server.listen(8080, ()=> console.log('- Server actved'));

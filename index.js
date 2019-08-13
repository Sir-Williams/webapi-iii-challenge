const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const serverRouter = require('./server');


server.use(express.json());

server.use('/', serverRouter)
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.listen(3000, () => console.log(`\nAPI RUNNING on port http://localhost:${port} \n`));
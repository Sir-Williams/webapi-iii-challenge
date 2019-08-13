const express = 'express';
const router = require('./users/userRouter')
const server = express()

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} to ${req.url} from ${req.get('Origin',)}`)
  
  next();
};

server.use(express.json())
server.use(logger)
server.use('/users', router)

module.exports = server;

const express = require('express');
const server = express();
const commandRouter = require('./data/posts-router.js')
server.use(express.json());
server.use('/api/posts', commandRouter);
server.get('/', (req,res) =>{
  res.status(200).json({message: 'hi'})
})


module.exports = server;

const express = require("express");
const {chats} = require('./data/data');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port= process.env.port||3000;

app.get('/',(req,res)=>{
    return res.send('API is running');
})

app.get('/api/chats',(req,res)=>{
    res.send(chats);
})
app.get('/api/chats/:id',(req,res)=>{
    const id = req.params.id;
    const SingleChat = chats.find((c)=>c._id ===id ) ;
    return res.send(SingleChat);
})

app.listen(port,()=>{
    console.log('server started on port' , port);
})
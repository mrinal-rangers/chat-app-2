const express = require("express");
const {chats} = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')

const app = express();
dotenv.config();
connectDB();
const port= process.env.PORT|| 9000;

app.use(express.json());

app.get('/',(req,res)=>{
    return res.send('API is running');
})

app.use('/api/user',userRoutes);



app.listen(port,console.log('server started on port',port))


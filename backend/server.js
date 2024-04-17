const express = require("express");
const {chats} = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const {notFound,errorHandler} = require('./middlewares/errorMiddleware')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express();
dotenv.config();
const port= process.env.PORT|| 9000;
connectDB();


app.use(express.json());

app.get('/',(req,res)=>{
    return res.send('API is running');
})
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use("/api/message", messageRoutes);



app.use(notFound);
app.use(errorHandler);



const server = app.listen(port,console.log('server started on port',port))

const io = require('socket.io')(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on('connection',(socket)=>{
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        socket.emit('connected')
    })
    socket.on('join chat',(room)=>{
        socket.join(room);
    })
    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.users not defined');
        chat.users.forEach((user)=>{
            if(user._id === newMessageRecieved.sender._id) return;
            else{
                socket.in(user._id).emit('message recieved',newMessageRecieved);
            }
            
        })
    })

})




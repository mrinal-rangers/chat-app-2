import React, { useEffect } from 'react'
import { ChatState } from 'src/context/ChatProvider'
import {Box,FormControl,Input,Spinner,Text, useToast} from '@chakra-ui/react'
import {IconButton} from '@chakra-ui/react'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { useState } from 'react';
import axios from 'axios';
import './styles.css'
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
import Lottie from 'react-lottie';
import animationData from "../animations/typing.json";

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    
  const {user,selectedChat,setSelectedChat, notification,setNotification } = ChatState();
  const [messages,setMessages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newMessage,setNewMessage] = useState('');
  const [socketConnected,setSocketConnected] =useState(false);
  const [typing,setTyping] = useState(false);
  const [isTyping,setIsTyping] = useState(false);
  const toast= useToast();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  var ENDPOINT = 'http://localhost:7001';
  const [socket,setSocket]= useState(null);
  let selectedChatCompare ;

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    newSocket.emit('setup', user);
    newSocket.on('connection', () => {
      setSocketConnected(true);
    });
    newSocket.on('typing',()=>setIsTyping(true))
    newSocket.on('stop typing',()=>setIsTyping(false))
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('message recieved', (newMessageRecieved) => {
        if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
          if(!notification.includes(newMessageRecieved)){
            setNotification([newMessageRecieved,...notification]);
            setFetchAgain(!fetchAgain);
          }

        } 
        setMessages([...messages, newMessageRecieved]);
        
      });
    }
  },);
  
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);

      if (socket) {
        socket.emit('join chat', selectedChat._id);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);



  const sendMessage = async(event)=>{
    if(event.key === 'Enter' && newMessage){
      try{  
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const {data} = await axios.post('/api/message',{
          content:newMessage ,
          chatId:selectedChat._id
        },config);
        setMessages([...messages,data]);
        setLoading(false);
        socket.emit('new message',data);
      }catch(error){
        setLoading(false);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  }

  const typingHandler = (e)=>{
    setNewMessage(e.target.value);
    if(!socketConnected)return;
    if(!typing){
      setTyping(true);
      socket.emit('typing',selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  }

  return (
    <div>
        {
        selectedChat ? (<> 
            <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            { !selectedChat.isGroupChat ? (<>
                
                <Box mr={2} ml={2}>{getSender(user,selectedChat.users)}</Box>
                <Box >
                <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </Box>
            </>) :(<>
                <Box mr={2} ml={2}>{selectedChat.chatName.toUpperCase()}</Box>
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
            </>)
            }
          </Text>

          <Box 
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            width={{base:"85vw",md:"64vw"}}
            height="75vh"
            borderRadius="lg"
            overflowY="hidden"
          >
            {
              loading ?(<Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />) :(
              <div className='messages'>
              <ScrollableChat messages={messages}/>
              </div>)
            }
            <FormControl onKeyDown={sendMessage} isRequired mt={3} >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
              
            </FormControl>

          </Box>
        
        </>):(
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
            </Box>)
        }
    </div>
  )
}

export default SingleChat
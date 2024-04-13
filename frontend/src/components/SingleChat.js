import React from 'react'
import { ChatState } from 'src/context/ChatProvider'
import {Box,Text} from '@chakra-ui/react'
import {IconButton} from '@chakra-ui/react'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    
  const {user,selectedChat,setSelectedChat} = ChatState();

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
                {getSender(user,selectedChat.users)}
                <Box >
                <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </Box>
            </>) :(<>
                {selectedChat.chatName.toUpperCase()}
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
            {/* Messages here */}
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
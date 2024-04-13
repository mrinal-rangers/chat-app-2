import React from 'react'
import { ChatState } from 'src/context/ChatProvider'
import {Box,Text} from '@chakra-ui/react'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    
  const {user,selectedChat,setSelectedChat} = ChatState();

  return (
    <div>
        {
            selectedChat ? (<> Select A </>):(<Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>)
        }
    </div>
  )
}

export default SingleChat
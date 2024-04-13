import React, { useState } from 'react'
import { 
    useDisclosure,
    Button
 } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    Input,
    Box
  } from '@chakra-ui/react'
import { ChatState } from 'src/context/ChatProvider';
import axios from 'axios';
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import UserListItem from '../UserAvatar/UserListItem';


const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search , setSearch] = useState("");
    const [searchResults,setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);

    const toast= useToast();

    const {user,chats,setChats} = ChatState();

    const handleSearch = async(query)=>{
        setSearch(query);
        if(!query) {
          setSearchResults([]);
          return;}
        try{
            setLoading(true);
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${encodeURIComponent(search)}`, config);
            setSearchResults(data);
            setLoading(false);
        }catch(error){
            toast({
                title: "Error Occurred!",
                description: "Failed to Load the chat results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    }

    const handleSubmit = async()=>{
      if(!groupChatName || !selectedUsers){
        toast({
          title: "Please fill all the feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      try{
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.post('/api/chat/group',{
          name:groupChatName,
          users: JSON.stringify(selectedUsers.map((u)=>u._id))
        },config)
        setChats([data,...chats]);
        setSearchResults([]);
        setGroupChatName('');
        setSearch('');
        setSelectedUsers('');
        onClose();
      }catch(error){
        toast({
          title: "Failed to create group chat",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    }

    const handleGroup = (userToAdd)=>{
      if (selectedUsers.includes(userToAdd)) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      setSelectedUsers([...selectedUsers, userToAdd]);
  
    }

    const handleDelete = (user)=>{
      setSelectedUsers(selectedUsers.filter((u)=> u._id!== user._id))
    }


  return (
    <div>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{base:'80vw'}}>
        <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
                <div>loading</div>
            ):( 
              searchResults?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
                
            )}

            </ModalBody>

            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Create Chat
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>

    </div>
  )
}

export default GroupChatModal
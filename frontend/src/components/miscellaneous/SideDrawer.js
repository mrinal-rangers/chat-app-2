import React, { useState } from 'react'
import {
   Box,
   Text,
   Menu,
   Tooltip,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
   useDisclosure,
   } from '@chakra-ui/react'
    
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import {BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from 'src/context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';


const SideDrawer = () => {
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const toast = useToast();
  const { user } = ChatState();

  const logoutHandler = ()=>{
      localStorage.removeItem('userInfo');
      history.push('/');
  }
  
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${encodeURIComponent(search)}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat =(userId)=>{
      try{
        setLoadingChat(true);
        const config = {
          headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

      }catch(error){

      }
  }
  
  return (
    <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
    >
      <Tooltip label ="search user to chat" hasArrow placement="bottom-end" >
          <Button variant="ghost" onClick={onOpen} >
            <i className="fas fa-search"></i>
            <Text display={{base:"none",md:"flex"}}  px='4'>
            Search User
            </Text>
          </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
      </Text>

      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize='2xl' m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
        </MenuButton>
        <MenuList>
            
              <MenuItem>
                <ProfileModal user={user} >
                </ProfileModal>
                My Profile
              </MenuItem>
            
            <MenuDivider/>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
        </Menu>
      </div>

    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px' >Search Users</DrawerHeader>
        <DrawerBody>
        <Box display='flex' pb='2'>
          <Input
            placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
        {loading ? (
          <ChatLoading/>
        ):(
          searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
        )}


      </DrawerBody>
      </DrawerContent>   
    </Drawer>

    </>
  )
}

export default SideDrawer
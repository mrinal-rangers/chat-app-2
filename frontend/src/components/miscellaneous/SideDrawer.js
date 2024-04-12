import React, { useState } from 'react'
import {Box, Text,Menu, Tooltip,MenuButton } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import {BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";


const SideDrawer = () => {
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState(false);

  

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
          <Button variant="ghost" >
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
                // name={user.name}
                // src={user.pic}
              />
            </MenuButton>
        </Menu>
      </div>

    </Box>
    </>
  )
}

export default SideDrawer
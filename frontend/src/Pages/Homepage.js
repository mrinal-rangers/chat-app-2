import React from 'react'
import {Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
const Homepage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        p="0 0 0 15%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" > CHAT - APP - MRINAL </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" >
        <Tabs variant='soft-rounded' >
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%" >Sign Up</Tab>
          </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
        </Tabs>
      </Box>


    </Container>
  )
}

export default Homepage
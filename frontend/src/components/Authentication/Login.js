
import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import { Input , InputGroup,InputRightElement } from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import { useState } from 'react'

const Login = () => {
  const [show,setShow] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleClick = ()=>{
    if(show) setShow(false);
    else setShow(true);
  }
  const postDetails =(pics)=>{

  }
  const submitHandler =()=>{

  }

  return (
    <VStack  spacing='5px' color= "black" >
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input  placeholder='enter your Email' 
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Login as Guest
      </Button>

    </VStack> 
  )
}

export default Login
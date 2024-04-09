import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import { Input , InputGroup,InputRightElement } from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import { useState } from 'react'

const Signup = () => {
  const [show,setShow] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [password,setPassword] = useState("");
  const [pic,setPic] = useState();

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
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input  placeholder='enter your name' 
          onChange={(e)=>{setName(e.target.value)}}
        />
      </FormControl>
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic' isRequired>
        <FormLabel>Upload your picture</FormLabel>
        <Input 
          type='file' 
          accept='image/*'
          p='1.5'
          onChange={(e)=>{postDetails(e.target.files[0])}}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>

    </VStack> 
  )
}

export default Signup

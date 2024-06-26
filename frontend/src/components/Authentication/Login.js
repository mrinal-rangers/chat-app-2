
import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import { Input , InputGroup,InputRightElement } from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import { useState } from 'react'
import {useToast} from '@chakra-ui/react'
import { useHistory} from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [show,setShow] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState();
  const toast = useToast();
  const history = useHistory();


  const handleClick = ()=>{
    if(show) setShow(false);
    else setShow(true);
  }

  const submitHandler = async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login",{ email, password },config);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  return (
    <VStack  spacing='5px' color= "black" >
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input  placeholder='enter your Email' 
          value ={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            value ={password}
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
        isLoading={loading}
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
        isLoading={loading}
      >
        Login as Guest
      </Button>

    </VStack> 
  )
}

export default Login
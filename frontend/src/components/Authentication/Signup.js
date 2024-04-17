import {VStack} from '@chakra-ui/layout'
import {FormControl,FormLabel} from '@chakra-ui/form-control'
import { Input , InputGroup,InputRightElement } from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import {useToast} from '@chakra-ui/react'
import { useState } from 'react'
import { useHistory} from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [show,setShow] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [password,setPassword] = useState("");
  const [pic,setPic] = useState();
  const [loading,setLoading] = useState();
  const toast = useToast();
  const history = useHistory();

  const handleClick = ()=>{
    if(show) setShow(false);
    else setShow(true);
  }
  const postDetails =(pics)=>{
    setLoading(true);
    if(pics=== undefined){
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === 'image/png'){
      const data= new FormData();
      data.append('file',pics);
      data.append('upload_preset','chat-app');
      data.append('cloud_name','dci0flbev');
      fetch("https://api.cloudinary.com/v1_1/dci0flbev/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    }else{
      toast({
        title: "Image should be either jpeg or png",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

  }
  const submitHandler =async()=>{
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try{
      const config= {
        headers :{
          "content-type": "application/json"
        }
      };
      const {data} = await axios.post('/api/user',{name,email,password,pic},config);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    }catch(error){
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
        isLoading ={loading}
      >
        Sign Up
      </Button>

    </VStack> 
  )
}

export default Signup

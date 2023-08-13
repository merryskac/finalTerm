'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { register } from '../login/loginAPI'

export default function Register() {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [alert, setAlert] = useState({
    isLoading: false, 
    message: null
  })

  if(localStorage.getItem('access_token')){
    window.location.href = '/content'
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const input = {
      username: username,
      pass: pass,
      checkPass: checkPass
    }

    setAlert({
      isLoading: true
    })

    if(pass!= checkPass){
      setAlert({
        message: "Password and re-enter password doesn't match",
        isLoading: false
      })
      return
    }
    if(pass.length<7){
      setAlert({
        message:'Password should longer than 6 characters',
        isLoading: false
      })
      return
    }
    const pattern = new RegExp("^[a-zA-Z0-9_.]*$")
    const checkUsername = pattern.test(input.username)
    if(!checkUsername){
      setAlert({
        message: 'Some character not valid',
        isLoading: false
      })
      return
    }

    register(input.username, input.pass)
    .then(data=>{
      if(data.message){
        setAlert({
          message: data.message,
          isLoading: false
        })
        return
      }
      window.location.href = '/login'
    })

  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color='green.400'>Sign up your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all discounts
          </Text>

          {alert.isLoading&&<Text fontSize={'small'} >...Loading</Text>}
          {alert.message&&<Text fontSize={'small'} color={'red'}>{alert.message}</Text>}

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
            <FormControl id="username" onSubmit={(e)=>{handleSubmit(e)}}>
              <FormLabel>Username </FormLabel>
              <Input type="text" value={username} name='username' onChange={(e)=>{setUsername(e.target.value)}} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' onChange={(e)=>{setPass(e.target.value)}}/>
            </FormControl>
            <FormControl id="passwordCheck">
              <FormLabel>Re-enter password</FormLabel>
              <Input type="password" name='passwordCheck' onChange={(e)=>{setCheckPass(e.target.value)}}/>
            </FormControl>
              <Stack spacing={10}>
              <Button type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                mt='15px'
                >
                Sign up
              </Button>

              <Text>Don't have account? <Link href='/register' fontWeight={'bold'}  color='green.400'>Register</Link></Text> 
              
              </Stack>
            
            
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
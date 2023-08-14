'use client'
import Cookies from 'universal-cookie'
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
import { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../config/User'
import { login } from './loginAPI'

export default function Login() {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [alert, setAlert] = useState({
    isLoading: false, 
    message: null
  })
  const {user, setUser} = useContext(UserContext)

  if(localStorage.getItem('access_token') && user){
    window.location.href = '/content'
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const input = {
      email: username,
      pass: pass
    }

    setAlert({
      isLoading: true
    })

    login(input.email, input.pass).then(data=>{
      if(!data.access_token){
        setAlert({
          message: data.message,
          isLoading: false
        })
        return
      }
      setUsername(data.username)
      window.localStorage.setItem('access_token', data.access_token)
      console.log(data)
      console.log(localStorage.getItem('access_token'))
      
      const cookie = new Cookies()
      cookie.set('refreshToken',data.refreshToken,{
        path:'/'
      })

      setAlert({
        message: null, 
        isLoading: false
      })
      window.location.href = '/content'
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
          <Heading fontSize={'4xl'} color='green.400'>Sign in to your account</Heading>
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
              <Stack spacing={10}>

              <Button type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                mt='15px'
                >
                Sign in
                
              </Button>

              <Text>Don't have account? <Link href='/register' fontWeight={'bold'}  color='green.400'>Register</Link></Text> 
              
            </Stack>
            
            </FormControl>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
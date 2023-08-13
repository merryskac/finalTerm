'use client'

import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Link,
} from '@chakra-ui/react'
import {IoPersonCircle, } from "react-icons/io5";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { UserContext } from '../config/User'


const Links = ['Content']

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user, setUser] = useContext(UserContext)
  return (
    <div style={{
      position: 'fixed',
      top:0,
      zIndex:10,
      width:'100%'
    }}>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text 
              as={Heading}
              color={'green.400'}
            
            >
              <Link href='/content' textDecoration={'none'}
              _hover={{textDecoration: 'none'}}
              >Play</Link>
              </Text>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>

                <Link href='/content'>Home</Link>
              
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                  <Text fontSize={'30px'} color='green.400'>
                  <IoPersonCircle></IoPersonCircle></Text>
              </MenuButton>
              <MenuList>
                <MenuItem >
                  <Text textAlign={'center'}><Text as='b'>Hello, </Text>{user}</Text>
                </MenuItem>
                <MenuDivider />

                <MenuItem>
                <a href="/logout" style={{width:'100%'}}>
                <Button width={'100%'}>
                  Logout
                </Button>
                </a>
                </MenuItem>

              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link href={`/${link}`} key={link}>Home</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </div>
  )
}
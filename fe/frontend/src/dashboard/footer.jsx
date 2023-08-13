'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')
      }
      width={'100%'}
      >
      <Box
        borderTopWidth={1}
        as={Stack}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        direction='row'
        pt='25px'
        pb='25px'
        >
        <Container
          as={Stack}
          direction='row'
        >
            
          <Text as="b" fontSize={'12px'}>GG3FSUP0124</Text>
          <Text fontSize={'12px'} color={'grey'}>Merryska Christy Mait</Text>
          
        </Container>
        <Container>
        <Text fontSize={'12px'} color={'grey'} textAlign='right'>© 2022 Chakra Templates. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  )
}
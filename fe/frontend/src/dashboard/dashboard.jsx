'use client'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react'
import Footer from './footer'

export default function Dashboard() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
        justify='center'
        height='700px'
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>

            Welcome to <br />
            <Text as={'span'} color={'green.400'}>
              Tokopedia Play
            </Text>

          </Heading>


          <Text color={'gray.500'} >
            Get discount up to <Text color={'green.400'} as={'b'} fontSize='xl' >70%</Text> from seller&apos;s live content only at
            <Text as={'b'} color={'green.400'} fontSize='xl'> Tokopedia Play</Text>
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
              <a href="/login">
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              >
              Get Started
            </Button>
            </a>
            
          </Stack>
        </Stack>
      </Container>
      <Footer/>
    </>
  )
}


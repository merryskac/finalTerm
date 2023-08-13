'use client'

import {
  Box,
  Image,
  Badge,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react'
import { checkPropTypes } from 'prop-types'
import { useState } from 'react'

function ContentCard({img, title, url}) {
  const [showTitle, setShowTitle] = useState(false)
  const [showClick, setShowClick] = useState(false)
  const [shadow, setShadow] = useState(false)
  const urlContent = "/content/" + String(url)

  return (
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        width="180px"
        height='320px'
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        margin='auto'
        >
        <Link href={urlContent}
        onMouseOver={()=>{
          setShowClick(true)
          setShowTitle(true)
          setShadow(true)
        }}
        onMouseLeave={()=>{
          setShowClick(false)
          setShowTitle(false)
          setShadow(false)
        }}
        >
          {shadow && <Box backgroundColor={'black'}
          position='absolute'
          height={'100%'}
          width={'100%'}
          rounded={'lg'}
          opacity={'30%'}
          >
          </Box>}
          <Box position={'absolute'}
          padding={'15px'}
          >
            {showClick && <Badge rounded={'full'} px={'2'} fontSize='0.8em' colorScheme={'green'} right='0%' 
            onMouseOver={()=>{setShadow(true)}}
            onMouseLeave={()=>{
              setShadow(false)
            }}
            >
                Click to Play
              </Badge>}
          </Box>
          <Box position={'absolute'} 
          color={'white'}
          padding={'15px'}
          height={'fit-content'}
          width={'180px'}
          bottom='0%'
          >
            {showTitle && <Text as={'b'} onMouseOver={()=>{setShadow(true)}}
            onMouseLeave={()=>{
              setShadow(false)
            }}
            >{title}</Text>}
          </Box>

          <Image boxSize={'320px'} src={img} objectFit='cover' alt={`Picture of ${img}`} rounded="lg" 
          />
        </Link>
      </Box>
    
  )
}

ContentCard.propTypes={
  img: checkPropTypes.String,
  title: checkPropTypes.String,
  url: checkPropTypes.String
}

export default ContentCard
import { Box, Flex, Image, Stack, Text, } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "./productAPI";


const SideBar = () => {
  const id = useParams('id').id
  const [product, setProducts] = useState(null)
  useEffect(()=>{
    getProducts(id).then(data=>setProducts(data.products))
  }, [])

  return ( 
    <Box
      as="nav"
      pos={{sm:'fixed', base:'fixed'}}
      top={{sm:'64px'}}
      bottom={{base:'0'}}
      left='0'
      zIndex={'1'}
      h={{sm:'full', base:'220px'}}
      marginBottom={{sm:'1000px'}}
      width={{md:'150px',sm:'130px', 'base':'full'}}
      bg='green.100'
      borderRight={"1px solid lightgreen"}
      overflowY={{sm:'auto', base:'hidden'}}
      overflowX={{base:'auto'}}
      css={{
        '&::-webkit-scrollbar':{
          width: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'grey',
          borderRadius: '24px',
        },
      }}
      
    >
      <Flex justify={{sm:'center'}}>
        <Text as={'b'}
          padding={'10px'}
        >Products</Text>
      </Flex>

      {product && <Box
      marginBottom={'100px'}
      >
        <Stack direction={{sm:'column',base:'row'}} margin={{sm:'0', base:'1px 20px'}}>
          {product.map(data=>
            // eslint-disable-next-line react/jsx-key
            <a href={data.link_product} target='_blank' rel="noreferrer">
            <Box
            width={{md:'130px',base:'100px'}}
            height={{sm:'fit-content',base: '140px'}}
              backgroundColor={'green.400'}
              _hover={{
                backgroundColor:'green.500'
              }}
              _active={{
                backgroundColor:'green.600',
                color: 'white',
              }}
              padding='10px'
              margin={{sm:'10px', base:'1px'}}
              rounded='lg'
              paddingBottom={'10px'}
            >
              <Image
                margin={'auto'}
                src={data.img ? data.img : 'https://static.thenounproject.com/png/1034957-200.png'}
                height={{sm:'100px', base:'80px'}}
                width={'100px'}
                rounded='lg'
                fit={'cover'}
              />
              <Box>
              <Box as="div" overflow={{sm:'unset',base:'hidden'}} whiteSpace={{sm:'normal',base:'nowrap'}}
                textOverflow={{sm:'unset',base:'ellipsis'}} lineHeight='1'>
                <Text textAlign={'center'} 
                as='b' fontSize={'xs'}
                >{data.title}</Text><br />
              </Box>
                <Text textAlign={'left'} fontSize='xs'mt={'1'}>Rp {data.price}</Text>
                </Box>
            </Box>
            </a>
            )}
        </Stack>
      </Box>}

    </Box>
   );
}
 
export default SideBar;
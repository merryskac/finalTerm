import { Box, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../dashboard/footer";
import { useFetch } from "../hooks/useFetch";
import ContentCard from "./contentCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";


const Content = () => {
  const {response, pending, error} = useFetch('https://final-term-j16omguj5-merryskac.vercel.app/play/thumbnails')

  const [search, setSearch] = useState(null)
  const [searchData, setSearchData] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(()=>{
    const responses = search && response && response.thumbnails.filter(data=>data.title.toLowerCase().indexOf(search)!==-1)
    setSearchData(responses)
    
    if(search && responses.length === 0){
      setResult('No data found')
    }else{
      setResult(null)
    }
  }, [search])
    
  return ( 
    <div>
      <Navbar/> 
      
      <Flex
        margin={'80px 60px 30px 60px'}
        border={'1px solid grey'}
        rounded='lg'
      >
      <Text 
        marginTop={'auto'} 
        marginBottom={'auto'} 
        marginLeft='20px' 
        marginRight={'5px'} 
        fontSize='20px'
      >  
        <AiOutlineSearch/>
      </Text> 
      
      <Text 
        as={'span'} 
        fontSize='22px' 
        color={'gray.500'}
      >
        |
      </Text>

      <Input 
        backgroundColor={'gray.100'} placeholder='Cari barang'
        width={'100%'}
        border='none'
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
      />

      </Flex>
      {pending && <p>...Loading</p>}
      {error && <p>{error}</p>}
      {result && <Text textAlign={'center'}>{result}</Text>}

      <Box minHeight={'530px'}>
        
      <SimpleGrid minChildWidth={'180px'}
      spacing='10px'
        padding=' 1px 30px'
        margin="auto"
      >
      {!search && response && response.thumbnails.map(data =>
        <ContentCard key={data._id} img={data.thumbnail_img} title={data.title} url={data._id}/>
      )}

      {search && response && searchData &&searchData.map(data =>
        <ContentCard key={data._id} img={data.thumbnail_img} title={data.title} url={data._id}/>
      )}

      </SimpleGrid>
      </Box>
      <Footer/>
    </div>
  );
}
 
export default Content;
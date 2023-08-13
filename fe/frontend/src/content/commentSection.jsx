import { Box, Button, Text, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../config/User";
import Footer from "../dashboard/footer";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";

const CommentSection = () => {
  const [userComment, setComment] = useState(null)
  const id = useParams('id').id
  const {response: comment, pending, error} = useFetch('http://localhost:3000/play/comments/'+id)

  const [user, setUser] = useContext(UserContext)
  const url = 'http://localhost:3000/play/comments/'+id
  const [err, postData]=usePost()
  const [trackcomment, setTrackComment] = useState('null')
  
  const handleInput = (e)=>{
    const comment = e.target.value
    setComment(comment)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()

    userComment && postData(url, {
      comment: userComment,
      username: user
    },
    createData
    )
    setComment('')
  }
  const createData = (data)=>{
    data.then((d)=>{

      if(d.message === 'Comment successfully added'){
        setTrackComment('true')
      }
    })
  }

  useEffect(()=>{
    if(trackcomment===true) setTrackComment(false)
  }, [trackcomment, comment])

  return ( 
    <div>
      <Box 
        mt={'15px'}
        height={'480px'}
        rounded='lg'
        border={'1px solid lightgrey'}
        padding={'10px 15px'}
        mb={{base:'200px', sm:'40px'}}
      >
        <Text as={'b'}>Comment</Text>
        <hr style={{color: 'lightgray'}}/>
        <Box
          backgroundColor={'green.100'}
          marginTop={'5px'}
          height={'270px'}
          overflowY='auto'
          rounded={'lg'}
        >
          {error && <div>{error}</div>}
          {err && <div>{err}</div>}
          {pending && <div>{pending}</div>}
          
          {comment && comment.comments.map(data=>
            
            <Box key={data._id}
              backgroundColor={'lightgreen'}
              padding='5px 10px'
              mb='5px'
              rounded={'lg'}
            >
                <Text as={'b'} fontSize='xs'>{data.username}</Text><br />
                <Text>{data.comment}</Text>
            </Box>
            )}
            {comment && comment.comments.length === 0 && <Text textAlign={'center'}>no comment found</Text>}
        </Box>
        <form action=""
        style={{marginTop: '20px' }}
        onSubmit={(e)=>{handleSubmit(e)}}
        >
          <Textarea autoComplete="off" name="comment" type="text" 
          placeholder={"comment as "+user} 
          value={userComment} 
          style={{
            padding: '5px',
            width:'100%',
            backgroundColor:'#dfdfdf',
            border: '1px solid #cbcbcb',
            borderRadius:'5px',
            height:'100px'
          }}
          onChange={(e)=>{handleInput(e)}}
          ></Textarea>
          <Button size={'sm'} mt='4px' width={'100%'} type='submit' background={'green.400'} color={'white'}
          _hover={{
            backgroundColor:'#23996c'
          }}
          _active={{
            backgroundColor:'#1c7050'
          }}
          >Submit</Button>
        </form>
      </Box>
      <Footer/>
    </div>
   );
}
 
export default CommentSection;
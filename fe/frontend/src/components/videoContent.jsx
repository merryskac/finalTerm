import { Box, Text } from "@chakra-ui/react";
import { checkPropTypes } from "prop-types";
import CommentSection from "../content/commentSection";

const VideoContent = ({title, url}) => {
  return ( 
    <Box backgroundColor={'white'}
    width='full' pl={{md:'150px',sm: '130px'}}
    mb='px'
    >
      {/* <video controls style={{
        margin:'auto',
        width:'100%',
        height:'100%'
      }}>
      </video> */}

        <iframe id="ytplayer" type="text/html" width="100%" height="100%"
        src={url}
        style={{
          marginBottom:'15px'
        }}
        ></iframe>

        <Text as={'b'} fontSize='xl' pt='15px'>
          {title}
        </Text>
        <CommentSection/>
    </Box>

   );
}

VideoContent.propTypes = {
  title: checkPropTypes.string,
  url: checkPropTypes.string
}
 
export default VideoContent;
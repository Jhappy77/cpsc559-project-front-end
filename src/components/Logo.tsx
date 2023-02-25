import { Box, Text } from '@chakra-ui/react'

export default function Logo(props: {size: string[]}){
    return (
        <Box textAlign='center'>
            <Text fontFamily={`'Comfortaa', sans-serif`} fontSize={props.size}>
                Bahoot!
            </Text>
        </Box>
    );
}
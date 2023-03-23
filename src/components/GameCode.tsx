import { Box, Text } from "@chakra-ui/react";

export default function GameCode(props: { id: string | undefined; }) {
  return (
   <Box p={2} maxW='lg' maxH='lg' bg='white' display='flex' alignItems='baseline' borderRadius='md'>
        <Box >
        <Text fontFamily={`'Comfortaa', sans-serif`} fontSize='l' color="black">
            Game Code:
        </Text>
        </Box>
        <Box color='black' fontWeight='bold' letterSpacing='wide' fontSize='xl'>
             <p>&nbsp;{props.id}</p>
        </Box>
    </Box>
  );
}

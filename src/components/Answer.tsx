import { Button } from '@chakra-ui/react';

export default function Answer(props: {background: string, text: string}){
    return (
        <Button background={props.background} color='white' width="100%" justifyContent="flex-start" padding={6} fontSize={["sm", 'md']} >
            {props.text}
        </Button>
    );
}
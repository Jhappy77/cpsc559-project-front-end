import { Button } from '@chakra-ui/react';

export default function Answer(props: {id: string, background: string, text: string}){
    return (
        <Button background={props.background} color='white' width="100%" justifyContent="flex-start" padding={6} fontSize={["md", "lg"]} >
            {props.text}
        </Button>
    );
}
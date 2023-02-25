import { Card, CardHeader, Heading, CardBody, Text } from '@chakra-ui/react'

export default function Question(props: {title: string, text: string}){
    return (
        <Card textAlign='center'>
            <CardHeader>
                <Heading>{props.title}</Heading>
            </CardHeader>
            <CardBody textAlign='left'>
                <Text fontSize={['sm', 'md']}>
                    {props.text}
                </Text>
            </CardBody>
        </Card>
    );
}
import { Card, CardBody, Text } from "@chakra-ui/react";

// component to display the game code on the host page
export default function GameCode(props: { id: string | undefined; }) {
  return (
    <Card size='sm'>
        <CardBody textAlign='center' fontSize='lg'>
            <Text>Game Code: <b>{props.id}</b></Text>
        </CardBody>
    </Card>
  );
}

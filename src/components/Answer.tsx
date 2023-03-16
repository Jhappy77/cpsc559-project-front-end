import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function Answer(props: { id: string; background: string; text: string | undefined, setAnswer: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <Button onClick={props.setAnswer}
      background={props.background}
      color="white"
      width="100%"
      justifyContent="flex-start"
      padding={6}
      fontSize={["md", "lg"]}
    >
      {props.text}
    </Button>
  );
}

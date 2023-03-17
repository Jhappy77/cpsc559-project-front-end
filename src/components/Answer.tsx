import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function Answer(props: { id: string; background: string; text: string | undefined, setAnswer: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <Button onClick={props.setAnswer}
      _focus={{ background: "lightgrey", color: "black" }}
      background={props.background}
      id={props.id}
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

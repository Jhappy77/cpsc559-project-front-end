import { Button } from "@chakra-ui/react";

// Answer used to display the answer options for each question
// this component is used to give the functionality for the questions to
// be dynamic and to have their selection submitted
export default function Answer(props: { id: string; background: string; selected: boolean, text: string | undefined, disabled: boolean, setAnswer: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <Button onClick={props.setAnswer}
      background={props.background}
      id={props.id}
      isDisabled={props.disabled}
      border={props.selected ? "4px": "0px"}
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

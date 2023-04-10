import { Tr, Td } from "@chakra-ui/react";

// displays the player score
export default function PlayerScore(props: { name: string | undefined; score: string | undefined }) {
  return (
    <Tr>
      <Td>{props.name}</Td>
      <Td textAlign="end" justifyContent="flex-end">
        {props.score}
      </Td>
    </Tr>
  );
}

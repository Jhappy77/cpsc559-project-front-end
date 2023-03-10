import { Tr, Td } from "@chakra-ui/react";

export default function PlayerScore(props: { name: string; score: string }) {
  return (
    <Tr>
      <Td>{props.name}</Td>
      <Td textAlign="end" justifyContent="flex-end">
        {props.score}
      </Td>
    </Tr>
  );
}

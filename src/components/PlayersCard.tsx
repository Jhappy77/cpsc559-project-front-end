import { useAppSelector } from "../state/reduxHooks";
import { Card, Text, Wrap, WrapItem, Center, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const scrollBarCSS = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "6px",
    background: "black",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "grey",
    borderRadius: "24px",
  },
};

// displayers the players that joined the game on the start page
const PlayersCard = () => {
  const { players } = useAppSelector(state => state.game);

  const createWrapItem = (player: string) => {
    return (
      <WrapItem key={player}>
        <Text fontSize={["lg", "xl"]}>{player}</Text>
      </WrapItem>
    );
  };

  const displayPlayers = (players: Array<string>) => {
    return players.map(createWrapItem);
  };

  return (
    <Box height="calc(35vh)" width="100%" overflowY="hidden">
      <Card justifyContent="center" textAlign="center" bg="white" color="black" padding={4} margin={4}>
        {players.length !== 1 ? (
          <Text fontSize={["lg", "xl"]} fontWeight="bold">
            {players.length} players have joined!
          </Text>
        ) : (
          <Text fontSize={["lg", "xl"]} fontWeight="bold">
            {players.length} player has joined!
          </Text>
        )}

        <Center>
          <Wrap
            justify="center"
            height="calc(25vh)"
            maxWidth="100%"
            justifySelf="center"
            spacingX={9}
            margin={2}
            padding={2}
            overflowY="auto"
            __css={scrollBarCSS}
          >
            {displayPlayers(players)}
          </Wrap>
        </Center>
      </Card>
    </Box>
  );
};

export default PlayersCard;

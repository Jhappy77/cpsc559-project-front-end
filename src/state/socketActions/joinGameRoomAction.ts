export function joinGameRoomAction(gameCode: string, playerName: string) {
  return {
    socketEvent: "join-game-room",
    emit: true,
    emitPayload: { gameCode, playerName },
    type: "SOCKET_MIDDLEWARE_ACTION",
  };
}

export function joinGameRoomAsHostAction(gameCode: string) {
  return {
    socketEvent: "join-game-room-as-host",
    emit: true,
    emitPayload: { gameCode },
    type: "SOCKET_MIDDLEWARE_ACTION",
  };
}
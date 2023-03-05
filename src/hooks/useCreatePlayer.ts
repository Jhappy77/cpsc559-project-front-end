import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setPlayerName } from "../state/playerSlice";
import { joinGameRoomAsHostAction } from "../state/socketActions/joinGameRoomAction";

export function useCreatePlayer() {
    const { name } = useAppSelector(state => state.player);
    const { code } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!name || !code) return;
        axios
            .post(`${API_URL}/players`,
                {
                    "name": name,
                    "joinCode": code
                })
            .then(response => {
                // Not sure what we should do with the response
                console.log(response.status);
            })
            .catch(reason => {
                // TODO: Handle errors better
                console.error("Unhandled error in useCreatePlayer");
                console.error(reason);
            });
    }, [name, dispatch]);
}
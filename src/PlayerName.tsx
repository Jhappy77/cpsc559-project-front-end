import { Button, Input, Text, Box } from '@chakra-ui/react';
import { setPlayerName } from './state/playerSlice'
import { useAppDispatch, useAppSelector } from './state/reduxHooks';
import React, {useState} from 'react';

export function PlayerName(){
    // useAppSelector: for getting values
    const {name} = useAppSelector(state => state.player)
    // useAppDispatch: get dispatch, which can be used with actions to set values in store
    const dispatch = useAppDispatch();

    // In this example, value is just a local value that stores the user's input, and then when
    // they save it it goes to store. Doesn't necessarily need to work this way 
    // (EX: you can have the store contain the UI state too)
    const [value, setValue] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    };

    return <Box>
        <Text>
        Welcome, {name}!
    </Text>
    <form onSubmit={(e)=>{
        e.preventDefault();
        dispatch(setPlayerName(value))}}>
    <Input value={value} onChange={handleChange}/>
<Button type='submit'>Submit new name</Button>
    </form>
    </Box>
}
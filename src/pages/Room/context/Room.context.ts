import { createContext } from 'react';
import { IRoomContext } from '../Room.types';

export const RoomContext = createContext<IRoomContext>({
    socket: null,
    users: [],
    room: null,
});

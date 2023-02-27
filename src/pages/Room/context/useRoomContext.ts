import { useContext } from 'react';
import { RoomContext } from './Room.context';

export const useRoomContext = () => {
    return useContext(RoomContext);
};

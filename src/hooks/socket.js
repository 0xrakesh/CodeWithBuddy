import { io } from 'socket.io-client'

let URL =  `http://${process.env.REACT_APP_SOCKET_URL}`;

export const socket = io(URL,{
    autoConnect:false
})

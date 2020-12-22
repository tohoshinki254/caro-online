import socketIOClient from "socket.io-client";
import { API_URL } from "./constants";

const socket = socketIOClient(API_URL, { transports: ['websocket'] });

export default socket;

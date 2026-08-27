import { io } from 'socket.io-client';

// Your backend's server.js runs on port 5000 (from backend/.env)
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});
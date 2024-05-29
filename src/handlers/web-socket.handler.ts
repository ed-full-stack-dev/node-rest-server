import { Server as HTTPServer } from 'http';
import { Server as WebSocketServer } from 'ws';

class WebSocketHandler {
    private wss: WebSocketServer;

    constructor(server: HTTPServer) {
        this.wss = new WebSocketServer({ server });
        this.initializeWebSocketServer();
    }

    private initializeWebSocketServer() {
        this.wss.on('connection', (ws) => {
            ws.on('message', (message: string) => {
                ws.send(`Hello, you sent to the ws -> ${message}`);
            });
        });
    }
}

export default WebSocketHandler;
import { Server as HTTPServer, IncomingMessage } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import verifyToken from '../utils/verify-token';
import User from '../interfaces/user.interace';

interface RequestWithUser extends IncomingMessage {
    user?: Partial<User>
}

class WebSocketHandler {
    private wss: WebSocketServer;
    private clientManager: WebsocketClientManager;
    private authenticator: WebSocketAuthenticator;

    constructor(server: HTTPServer) {
        this.clientManager = new WebsocketClientManager();
        this.authenticator = new WebSocketAuthenticator();
        this.wss = new WebSocketServer({ server, verifyClient: this.verifyClient.bind(this) });
        this.initializeWebSocketServer();

    }

    private async verifyClient(info: { req: RequestWithUser }, callback: (res: boolean, code: number, message: string) => void): Promise<void> {
        const { headers } = info.req;
        const token = headers['authorization'];
        const protocols = headers['sec-websocket-protocol'];
        const isAuthorized = await this.authenticator.verify(token, protocols);
        if (isAuthorized) {
            info.req.user = isAuthorized as Partial<User>;
            callback(true, 200, 'Authorized');
        }
        else {
            callback(false, 401, 'Unauthorized');
        }
    }

    private initializeWebSocketServer(): void {
        this.wss.on('connection', (ws, req) => this.handleConnection(ws, req as RequestWithUser));
    }
    private handleConnection(ws: WebSocket, req: RequestWithUser): void {
        const user = req.user;
        if (!user || !ws || ws.readyState !== WebSocket.OPEN) {
            ws.close();
            return;
        }
        this.clientManager.addClient(ws, user);
        ws.send(`Welcome ${user.name}!`);
        this.clientManager.broadcastMessage(`${user.name} has joined the chat`, ws);
        ws.on('message', (message: string) => {
            ws.send(`Hello, you sent to the ws -> ${message}!`);
        });
        ws.on('close', () => {
            this.clientManager.removeClient(ws);
            console.log('Client disconnected');
        });
    }

}

export default WebSocketHandler;

class WebsocketClientManager {
    private clients: Map<WebSocket, Partial<User>>;
    constructor() {
        this.clients = new Map();
    }

    addClient(ws: WebSocket, user: Partial<User>): void {
        ws && user && this.clients.set(ws, user);
    }
    removeClient(ws: WebSocket): void {
        this.clients.delete(ws);
    }
    getClient(ws: WebSocket) {
        return this.clients.get(ws);
    }
    broadcastMessage(message: string, exclude: WebSocket): void {
        for (const [client, user] of this.clients.entries()) {
            if (client !== exclude && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    }
}

class WebSocketAuthenticator {
    private acceptanceProtocol = 'wdn-v1';

    async verify(token: string | undefined, protocols: string | undefined): Promise<Partial<User> | null> {
        if (!token) return null;
        if (!protocols || !this.isProtocolAccepted(protocols)) return null;
        try {
            const user = await verifyToken(token);
            return user ? user.toJSON() as Partial<User> : null;
        } catch (error) {
            console.error('Token verification failed:', error);
        }
        return null;
    }
    private isProtocolAccepted(protocols: string): boolean {
        const protocolList = protocols.split(',').map((p) => p.trim());
        return protocolList.includes(this.acceptanceProtocol);
    }
}
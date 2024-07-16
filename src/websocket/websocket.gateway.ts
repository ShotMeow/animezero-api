import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Настройте CORS в зависимости от вашей конфигурации
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private activeUsers: Set<string> = new Set();

  afterInit() {
    console.log('WebSocket сервер запущен');
    this.server.setMaxListeners(Number(process.env.SOCKET_MAX_LISTENERS) || 10);

    this.server.emit('activeUsers', this.activeUsers.size);
  }

  handleConnection(socket: Socket) {
    console.log('Клиент подключен:', socket.id);
    this.activeUsers.add(socket.id);
    this.server.emit('activeUsers', this.activeUsers.size);

    socket.on('getActiveUsers', () => {
      socket.emit('activeUsers', this.activeUsers.size);
    });
  }

  handleDisconnect(socket: Socket) {
    console.log('Клиент отключен:', socket.id);
    this.activeUsers.delete(socket.id);
    this.server.emit('activeUsers', this.activeUsers.size);
  }
}

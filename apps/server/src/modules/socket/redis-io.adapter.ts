import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { INestApplication } from '@nestjs/common';
import { SocketService } from './socket.service';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(
    app: INestApplication,
    private readonly socketIoService: SocketService
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD,
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server: Server = super.createIOServer(port, options);
    const middleware = async (socket, next) => {
      try {
        await this.socketIoService.authenticate(socket);
      } catch (e) {
        console.log(e);
        return next(e);
      }
      next();
    };
    server.of(/^\/\d+$/).use(middleware);
    server.use(middleware);
    server.adapter(this.adapterConstructor);
    return server;
  }
}

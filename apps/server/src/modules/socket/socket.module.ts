import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SocketService } from './socket.service';
import { Module } from '@nestjs/common';
import { User } from '@libs/entities/entities/User';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [],
  providers: [SocketService],
})
export class SocketModule {}

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { Role } from '@libs/entities/entities/Role';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { User } from '@libs/entities/entities/User';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AbilityModule } from '../auth/ability/ability.module';

@Module({
  imports: [MikroOrmModule.forFeature([User, Role, StoredFile]), AbilityModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

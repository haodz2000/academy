import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AbilitiesGuard } from '@server/modules/auth/ability/abilities.guard';
import { User } from '@libs/entities/entities/User';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [AbilityFactory, AbilitiesGuard],
  exports: [AbilityFactory, AbilitiesGuard],
})
export class AbilityModule {}

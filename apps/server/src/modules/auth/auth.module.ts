import { JwtStrategy } from './jwt.strategy';
import { GoogleController } from './google/google.controller';
import { UserService } from './../users/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from '@libs/entities/entities/Role';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { User } from '@libs/entities/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { GoogleService } from './google/google.service';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { AbilityModule } from './ability/ability.module';
import { Wallet } from '@libs/entities/entities/Wallet';
import { AwsUploadModule } from '../upload/aws/aws-upload.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Role, StoredFile, Wallet]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '100d' },
    }),
    HttpModule,
    PassportModule,
    AbilityModule,
    AwsUploadModule,
  ],
  controllers: [AuthController, GoogleController],
  providers: [AuthService, UserService, GoogleService, JwtStrategy],
  exports: [GoogleService, AuthService],
})
export class AuthModule {}

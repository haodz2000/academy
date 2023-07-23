import { GoogleLoginResponse } from './responses/google-login.response';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '@libs/entities/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '@libs/entities/entities/Role';
import { TokenPayload } from 'google-auth-library';
import { RoleType } from '@libs/constants/entities/Role';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/postgresql';
import { Wallet } from '@libs/entities/entities/Wallet';
import { TypeWallet } from '@libs/constants/entities/Wallet';
import { AwsUploadService } from '@server/modules/upload/aws/aws-upload.service';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    @InjectRepository(Wallet)
    private readonly walletRepository: EntityRepository<Wallet>,
    private jwtService: JwtService,
    private awsUploadService: AwsUploadService,
    private em: EntityManager
  ) {}

  async login(payload: TokenPayload): Promise<GoogleLoginResponse> {
    let user = await this.userRepository.findOne({
      email: payload['email'],
    });
    const userRole = await this.roleRepository.findOneOrFail({
      type: RoleType.User,
    });
    await this.em.begin();
    try {
      if (!user) {
        const storedFile = await this.awsUploadService.uploadAvatar(
          payload['picture']
        );
        user = new User();
        user.name = payload['name'];
        user.email = payload['email'];
        user.google_id = payload['sub'];
        user.avatar_id = storedFile.id;
        user.role_id = userRole.id;
        await this.em.persistAndFlush(user);
        const wallet = this.walletRepository.create({
          user_id: user.id,
          balance: 0,
          type: TypeWallet.Personal,
        });
        await this.walletRepository.persistAndFlush(wallet);
      } else {
        user.google_id = payload['sub'];
        if (!user.avatar_id) {
          const storedFile = await this.awsUploadService.uploadAvatar(
            payload['picture']
          );
          user.avatar_id = storedFile.id;
        }
      }
      await this.em.commit();
    } catch (e) {
      await this.em.rollback();
      throw new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({ id: user.id });
    return { token };
  }
}

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';
import { decode } from 'jsonwebtoken';
import { JwtCookieToken } from '@libs/constants/auth';
import { EntityManager } from '@mikro-orm/postgresql';
import { JwtPayload } from '../auth/interfaces';
import { User } from '@libs/entities/entities/User';

@Injectable()
export class SocketService {
  constructor(private readonly em: EntityManager) {}

  async authenticate(socket: Socket) {
    const entityManager = this.em.fork();
    const cookies = cookie.parse(socket.handshake.headers.cookie)[
      JwtCookieToken
    ];
    if (!cookies) {
      throw new Error('Unauthenticated.');
    }
    try {
      const decoded: JwtPayload = decode(cookies.toString()) as JwtPayload;
      if (!decoded.id) {
        throw new Error('Invalid credentials.');
      }
      const account = await entityManager.findOneOrFail(User, {
        id: decoded.id,
      });
      const namespace = socket.nsp.name.substring(1);
      if (Number.isInteger(namespace)) {
        const accountId = Number(namespace);
        if (accountId !== account.id) {
          throw new Error('Invalid credentials.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppSwaggerModule } from './modules/app-swagger/app-swagger.module';
import { AppModule } from './modules/app/app.module';
import { useContainer } from 'class-validator';
import { SocketService } from './modules/socket/socket.service';
import { ValidationException } from './exceptions';
import { RedisIoAdapter } from '@server/modules/socket/redis-io.adapter';
import { MikroORM, RequestContext } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        throw new ValidationException(errors);
      },
      whitelist: true,
    })
  );
  const socketIoService = await app.resolve(SocketService);
  const redisIoAdapter = new RedisIoAdapter(app, socketIoService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });
  AppSwaggerModule.setup(app);
  const port = process.env.PORT || 3333;
  app.enableShutdownHooks();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

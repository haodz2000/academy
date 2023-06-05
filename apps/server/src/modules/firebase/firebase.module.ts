import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { FirebaseService } from '@server/modules/firebase/firebase.service';
import { initializeApp } from 'firebase-admin/app';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit {
  private readonly logger = new Logger(FirebaseModule.name);

  async onModuleInit() {
    this.logger.log('Starting Firebase...');
    initializeApp();
    this.logger.log('Firebase is working.');
  }
}

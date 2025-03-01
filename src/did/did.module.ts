import { Module } from '@nestjs/common';
import { DIDController } from './controllers/did.controller';
import { DIDService } from './services/did.service';

@Module({
  controllers: [DIDController],
  providers: [DIDService],
  exports: [DIDService],
})
export class DIDModule {}

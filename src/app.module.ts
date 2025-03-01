import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DIDModule } from './did/did.module';

@Module({
  imports: [AuthModule, DIDModule],
})
export class AppModule {}

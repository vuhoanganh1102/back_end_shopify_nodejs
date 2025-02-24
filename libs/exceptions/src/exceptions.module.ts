import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { AuthException } from './auth-exception.service';

@Module({
  providers: [AuthException, ExceptionsService],
  exports: [ExceptionsService],
})
export class ExceptionsModule {}

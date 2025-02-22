import { Module } from '@nestjs/common';
import { UntilsService } from './untils.service';

@Module({
  providers: [UntilsService],
  exports: [UntilsService],
})
export class UntilsModule {}

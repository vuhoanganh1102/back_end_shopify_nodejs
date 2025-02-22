import { Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/xipat')],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}

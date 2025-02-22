import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HelperModule } from '@app/helper';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MongoDbModule } from '@app/mongo-db';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../', '.env'),
      isGlobal: true,
    }),
    ShopifyModule,
    HelperModule,
    WebhooksModule,
    MongoDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

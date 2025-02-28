import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HelperModule } from '@app/helper';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MongoDbModule } from '@app/mongo-db';
import { UntilsModule } from '@app/untils';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { FacebookModule } from '@app/untils/facebook/facebook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../', '.env'),
      isGlobal: true,
    }),
    AuthModule,
    ShopifyModule,
    HelperModule,
    WebhooksModule,
    MongoDbModule,
    UntilsModule,
    ProductsModule,
    AuthModule,
    FacebookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

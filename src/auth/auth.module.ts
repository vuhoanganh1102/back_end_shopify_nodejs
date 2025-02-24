import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HelperModule } from '@app/helper/helper.module';
import { UntilsModule } from '@app/untils';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionShopify,
  SessionShopifySchema,
} from '@app/mongo-db/session.schema';

@Module({
  imports: [
    HelperModule,
    UntilsModule,
    ShopifyModule,
    MongooseModule.forFeature([
      { name: SessionShopify.name, schema: SessionShopifySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

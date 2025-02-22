import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { AuthRedirect } from './auth-redirect.service';
import { SessionService } from './session.service';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionShopify,
  SessionShopifySchema,
} from '@app/mongo-db/session.schema';

@Module({
  imports: [
    ShopifyModule,
    MongooseModule.forFeature([
      { name: SessionShopify.name, schema: SessionShopifySchema },
    ]),
  ],
  providers: [HelperService, AuthRedirect, SessionService],
  exports: [HelperService, AuthRedirect, SessionService],
})
export class HelperModule {}

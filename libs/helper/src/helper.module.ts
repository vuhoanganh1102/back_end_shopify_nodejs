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
import {
  ShopifySessions,
  ShopifySessionsSchema,
} from '@app/mongo-db/shopifySessions.schema';

@Module({
  imports: [
    ShopifyModule,
    MongooseModule.forFeature([
      { name: SessionShopify.name, schema: SessionShopifySchema },
      { name: ShopifySessions.name, schema: ShopifySessionsSchema },
    ]),
  ],
  providers: [HelperService, AuthRedirect, SessionService],
  exports: [HelperService, AuthRedirect, SessionService],
})
export class HelperModule {}

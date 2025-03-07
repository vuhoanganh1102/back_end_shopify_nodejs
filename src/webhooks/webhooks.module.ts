import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionShopify,
  SessionShopifySchema,
} from '@app/mongo-db/session.schema';
import { SessionService } from '@app/helper/session.service';
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
  controllers: [WebhooksController],
  providers: [WebhooksService, SessionService],
})
export class WebhooksModule {}

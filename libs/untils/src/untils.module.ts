import { Module } from '@nestjs/common';
import { UntilsService } from './untils.service';
import { ShopifyModule } from './shopify/shopify.module';
import { ClientProvider } from './client-provider.service';
import { SessionService } from '@app/helper/session.service';
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
  providers: [ClientProvider, UntilsService, SessionService],
  exports: [ClientProvider, UntilsService, SessionService],
})
export class UntilsModule {}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ShopifyModule } from '@app/untils/shopify/shopify.module';
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
  controllers: [ProductsController],
  providers: [ProductsService, SessionService],
})
export class ProductsModule {}

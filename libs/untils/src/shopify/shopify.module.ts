import { Module } from '@nestjs/common';

/* Services */
import { ShopifyService } from './shopify.service';
import { ShopifyController } from './shopify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionShopify,
  SessionShopifySchema,
} from '@app/mongo-db/session.schema';
import {
  ShopifySessions,
  ShopifySessionsSchema,
} from '@app/mongo-db/shopifySessions.schema';
import { SessionService } from '@app/helper/session.service';
// import { PrismaService } from '@/utils/prisma.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SessionShopify.name, schema: SessionShopifySchema },
      { name: ShopifySessions.name, schema: ShopifySessionsSchema },
    ]),
  ],
  controllers: [ShopifyController],
  providers: [ShopifyService, SessionService],
  exports: [ShopifyService],
})
export class ShopifyModule {}

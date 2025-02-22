import { Module } from '@nestjs/common';

/* Services */
import { ShopifyService } from './shopify.service';
// import { PrismaService } from '@/utils/prisma.service';

@Module({
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}

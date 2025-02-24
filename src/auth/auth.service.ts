import { Injectable, UseFilters } from '@nestjs/common';

/* Services */
import { AuthException } from '@app/exceptions/auth-exception.service';
import { SessionService } from '@app/helper/session.service';
// import { PrismaService } from '@/utils/prisma.service';
import { ShopifyService } from '@app/untils/shopify/shopify.service';
import { InjectModel } from '@nestjs/mongoose';
import { SessionShopify } from '@app/mongo-db/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private shopifyService: ShopifyService,
    // private prisma: PrismaService,
    private session: SessionService,
    @InjectModel(SessionShopify.name)
    private SessionShopifyModel: Model<SessionShopify>,
  ) {}

  @UseFilters(AuthException)
  async storeOfflineToken(req: any, res: any) {
    const shopifyApiInstance = this.shopifyService.shopifyApi;

    const callbackResponse = await shopifyApiInstance.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    await this.session.storeSession(session);

    this.shopifyService.shopifyWebhooks;

    const webhookRegisterResponse = await shopifyApiInstance.webhooks.register({
      session,
    });

    console.dir(webhookRegisterResponse, { depth: null });

    return await shopifyApiInstance.auth.begin({
      shop: session.shop,
      callbackPath: `/auth/online`,
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
  }

  @UseFilters(AuthException)
  async storeOnlineToken(req, res) {
    const shopifyApiInstance = this.shopifyService.shopifyApi;

    const callbackResponse = await shopifyApiInstance.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    await this.session.storeSession(session);

    const { shop } = session;

    await this.SessionShopifyModel.updateOne(
      { shop: shop },
      { $set: { isActive: true, shop: shop, updateAt: new Date() } },
      {
        upsert: true,
        new: true,
      },
    );
    return shop;
  }
}

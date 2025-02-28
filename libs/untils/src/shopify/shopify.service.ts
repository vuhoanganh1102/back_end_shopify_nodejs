import '@shopify/shopify-api/adapters/node';
import { Injectable, Module } from '@nestjs/common';
import {
  shopifyApi,
  LogSeverity,
  LATEST_API_VERSION,
} from '@shopify/shopify-api';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeliveryMethod } from '@shopify/shopify-api';
import * as crypto from 'crypto';
import axios from 'axios';
import { Request, Response } from 'express';
import * as qs from 'querystring';
import * as cookie from 'cookie';
import { InjectModel } from '@nestjs/mongoose';
import { SessionShopify } from '@app/mongo-db/session.schema';
import { Model } from 'mongoose';
import { SessionService } from '@app/helper/session.service';

@Injectable()
@Module({
  imports: [ConfigModule],
})
export class ShopifyService {
  constructor(
    private configService: ConfigService,
    @InjectModel(SessionShopify.name)
    private SessionShopifyModel: Model<SessionShopify>,
    private readonly sessionService: SessionService,
  ) {}

  private readonly appUrl = this.configService.get<string>('SHOPIFY_APP_URL');
  private readonly shopifyApiPublicKey =
    this.configService.get<string>('SHOPIFY_API_KEY');
  private readonly shopifyApiSecretKey =
    this.configService.get<string>('SHOPIFY_API_SECRET');
  private readonly scopes =
    this.configService.get<string>('SHOPIFY_API_SCOPES');
  private readonly shopifyApiInstance = shopifyApi({
    apiKey: this.shopifyApiPublicKey,
    apiSecretKey: this.shopifyApiSecretKey,
    scopes: this.scopes.split(','),
    hostName: this.appUrl.replace(/https:\/\//, ''),
    hostScheme: 'https',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    logger: {
      level: LogSeverity.Debug,
    },
  });

  get shopifyApi() {
    return this.shopifyApiInstance;
  }

  private readonly shopifyWebhookRegister =
    this.shopifyApiInstance.webhooks.addHandlers({
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks/app_uninstalled',
      },
      SHOP_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks/shop_update',
      },
      PRODUCTS_CREATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks/products_create',
      },
      PRODUCTS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/webhooks/products_update',
      },
    });

  get shopifyWebhooks() {
    return this.shopifyWebhookRegister;
  }

  buildRedirectUri() {
    return `${this.appUrl}/shopify/auth/callback`;
  }
  buildRedirectUriAuth() {
    return `${this.appUrl}/shopify/auth`;
  }
  buildInstallUrl(shop, state, redirectUri) {
    return `https://${shop}/admin/oauth/authorize?client_id=${this.shopifyApiPublicKey}&scope=${this.scopes}&state=${state}&redirect_uri=${redirectUri}`;
  }
  buildAccessTokenRequestUrl(shop) {
    return `https://${shop}/admin/oauth/access_token`;
  }
  buildShopDataRequestUrl(shop) {
    return `https://${shop}/admin/shop.json`;
  }
  generateEncryptedHash(params: any) {
    return crypto
      .createHmac('sha256', this.shopifyApiSecretKey)
      .update(params)
      .digest('hex');
  }
  async fetchAccessToken(shop: any, data: any) {
    return await axios(this.buildAccessTokenRequestUrl(shop), {
      method: 'POST',
      data,
    });
  }
  async fetchShopData(shop: any, accessToken: any) {
    return await axios(this.buildShopDataRequestUrl(shop), {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });
  }

  async checkAuth(req: Request, res: Response) {
    const { shop, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
    console.log('test1', stateCookie);
    console.log('test2', state);
    // if (state !== stateCookie) {
    //   return res.status(403).send('Cannot be verified');
    // }

    const { hmac, ...params } = req.query;
    const queryParams = qs.stringify(params as any);
    const hash = this.generateEncryptedHash(queryParams);
    console.log('test3', hash);
    console.log('test4', hmac);
    // if (hash !== hmac) {
    //   return res.status(400).send('HMAC validation failed');
    // }
    // const session = await this.shopifyApi.auth.callback();
    try {
      const data = {
        client_id: this.shopifyApiPublicKey,
        client_secret: this.shopifyApiSecretKey,
        code,
      };

      const tokenResponse = await this.fetchAccessToken(shop, data);
      console.log(tokenResponse);
      const { access_token, scope } = tokenResponse.data;
      // data: {
      //   access_token: 'shpua_4eeb17db2b348bbf305e5fcb333ade5b',
      //   scope: 'write_products'
      // }
      const shopData = await this.fetchShopData(shop, access_token);
      // console.log(shopData);
      // await this.SessionShopifyModel.insertOne({
      //   access_token,
      //   scope,
      // });
      res.send(shopData.data);
    } catch (err) {
      console.log(err);
      res.status(500).send('something went wrong');
    }
  }

  async test() {
    // Lấy session từ Shopify Auth (đừng tạo thủ công)
    const session = await this.sessionService.loadSession(
      'offline1_initalstore.myshopify.com',
    );
    console.log('check', session);
    const client = new this.shopifyApi.clients.Graphql({ session });
    return;
  }
}

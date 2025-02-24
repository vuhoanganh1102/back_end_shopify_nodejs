import { Injectable, Req, Res } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
// import { SessionService } from '@app/helper/session.service';
import { ShopifyService } from '@app/untils/shopify/shopify.service';
import { SessionService } from '@app/helper/session.service';
import { InjectModel } from '@nestjs/mongoose';
import { SessionShopify } from '@app/mongo-db/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebhooksService {
  private TEST_QUERY = `
  {
    shop {
      name
    }
  }`;
  constructor(
    @InjectModel(SessionShopify.name)
    private SessionShopifyModel: Model<SessionShopify>,
    // private readonly sessionService: SessionService,
    private readonly shopifyService: ShopifyService,
    private sessionService: SessionService,
  ) {}
  create(createWebhookDto: CreateWebhookDto) {
    return 'This action adds a new webhook';
  }

  findAll() {
    return `This action returns all webhooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhook`;
  }

  update(id: number, updateWebhookDto: UpdateWebhookDto) {
    return `This action updates a #${id} webhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhook`;
  }
  async appUninstall(@Req() req, @Res() res) {
    const shop = req.headers['x-shopify-shop-domain'];
    const fetchedStore = await this.findStore(shop);
    const tokenExpiration = await this.isTokenExpired(req, res);
    if (fetchedStore && fetchedStore['isActive'] && tokenExpiration) {
      console.log('--> Session expired');
      await this.updateActiveStoreStatus(shop);
    } else {
      console.log("--> Session not expired, couldn't able to uninstall app.");
    }
  }
  async shopUpdate(@Req() req, @Res() res) {
    console.log(req.body);
  }

  async findStore(shop: string) {
    return await this.SessionShopifyModel.findOne({
      shop,
    });
  }
  async productCreate(@Req() req, @Res() res) {
    console.log('');
  }
  async productUpdate(@Req() req, @Res() res) {
    console.log('');
  }
  async updateActiveStoreStatus(shop: string) {
    await this.SessionShopifyModel.updateOne({
      where: { shop: shop },
      data: {
        isActive: false,
      },
    });
    await this.SessionShopifyModel.deleteMany({
      where: { shop: shop },
    });
  }
  async isTokenExpired(@Req() req, @Res() res) {
    try {
      const shopify = this.shopifyService.shopifyApi;
      const session = await this.sessionService.loadSessionByShop(
        req.headers['x-shopify-shop-domain'],
      );
      if (new Date(session?.expires) > new Date()) {
        const client = new shopify.clients.Graphql({ session });
        await client.query({ data: this.TEST_QUERY });
      }
      return false;
    } catch (err) {
      return true;
    }
  }
}

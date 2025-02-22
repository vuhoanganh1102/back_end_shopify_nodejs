import { Injectable, Req, Res } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
// import { SessionService } from '@app/helper/session.service';
import { ShopifyService } from '@app/untils/shopify/shopify.service';

@Injectable()
export class WebhooksService {
  constructor(
    // private readonly sessionService: SessionService,
    private readonly shopifyService: ShopifyService,
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
    // const fetchedStore = await this.findStore(shop);
    // const tokenExpiration = await this.isTokenExpired(req, res);
    // if (fetchedStore && fetchedStore?.isActive && tokenExpiration) {
    //   console.log('--> Session expired');
    //   await this.updateActiveStoreStatus(shop);
    // } else {
    //   console.log("--> Session not expired, couldn't able to uninstall app.");
    // }
  }
  async productCreate(@Req() req, @Res() res) {
    console.log('');
  }
}

import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as nonce from 'nonce';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}
  @Get()
  async CheckInstallShop(@Req() req: Request, @Res() res: Response) {
    const shop = req.query.shop;

    if (!shop) {
      return res.status(400).send('no shop');
    }

    const state = nonce();

    const installShopUrl = this.shopifyService.buildInstallUrl(
      shop,
      state,
      this.shopifyService.buildRedirectUri(),
    );

    res.cookie('state', state); // should be encrypted in production
    res.redirect(installShopUrl);
    // res.status(200).json({
    //   shop,
    //   state,
    //   uri: this.shopifyService.buildRedirectUri(),
    // });
  }

  @Get('/auth/callback')
  async CheckAuth(@Req() req: Request, @Res() res: Response) {
    // const check = await this.shopifyService.shopifyApi.auth.callback({
    //   rawRequest: req, // Cast to `any` to avoid type issues
    //   rawResponse: res,
    // });

    // console.log(check);
    return await this.shopifyService.checkAuth(req, res);
  }
  @Post('/test')
  async test() {
    // const check = await this.shopifyService.shopifyApi.auth.callback({
    //   rawRequest: req, // Cast to `any` to avoid type issues
    //   rawResponse: res,
    // });

    // console.log(check);
    return await this.shopifyService.test();
  }
}

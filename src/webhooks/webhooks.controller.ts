import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Shopify } from '@shopify/shopify-api';
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}
  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.create(createWebhookDto);
  }

  @Get()
  async findAll(session: any, cursor?: string) {
    // Tạo Shopify GraphQL Client
    // const client = new Shopify.clients.Graphql({ session });
    // return this.webhooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhooksService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhooksService.remove(+id);
  }
  @Post('/app_uninstalled')
  async AppUninstallHandler(@Req() req, @Res() res) {
    return this.webhooksService.appUninstall(req, res);
  }

  @Post('/product_update')
  async ShopUpdateHandler(@Req() req, @Res() res) {
    return this.webhooksService.productUpdate;
  }
  @Post('/api/webhooks/test-22-12/products/create')
  async ShopCreateHandler(@Req() req, @Res() res) {
    return this.webhooksService.productCreate;
  }
}

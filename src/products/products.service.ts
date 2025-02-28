import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopifyService } from '@app/untils/shopify/shopify.service';
import { SessionService } from '@app/helper/session.service';

@Injectable()
export class ProductsService {
  constructor(
    private shopifyService: ShopifyService,
    private readonly sessionService: SessionService,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getProductsFromGQL(req: Request, res: Response) {
    console.log('check');
    // Lấy session từ Shopify Auth (đừng tạo thủ công)
    const session = await this.sessionService.loadSession(
      'offline1_initalstore.myshopify.com',
    );
    console.log('check', session);
    // await this.shopifyService.shopifyApi.auth.begin({
    //   shop: 'initalstore.myshopify.com',
    //   callbackPath: '/auth/offline',
    //   isOnline: false,
    //   rawRequest: req,
    //   rawResponse: res,
    // });
    // console.log(
    //   'check1',
    //   await this.shopifyService.shopifyApi.auth.begin({
    //     shop: 'initalstore.myshopify.com',
    //     callbackPath: '/auth/offline',
    //     isOnline: false,
    //     rawRequest: undefined,
    //   }),
    // );
    const client = new this.shopifyService.shopifyApi.clients.Graphql({
      /**
       * Paste one or more documents here
       */
      session: session,
    });
    console.log('check2', client);
    const data = await client.query({
      data: `query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
            }
            cursor
          }
          pageInfo {
            hasNextPage
          }
        }
      }`,
    });
    return data;
  }
}

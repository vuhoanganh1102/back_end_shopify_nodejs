import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopifyService } from '@app/untils/shopify/shopify.service';
import { SessionService } from '@app/helper/session.service';

@Injectable()
export class ProductsService {
  private shopify = null;
  constructor(
    private shopifyService: ShopifyService,
    private readonly sessionService: SessionService,
  ) {
    this.shopify = shopifyService.shopifyApi;
  }
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
      'offline_initalstore.myshopify.com',
    );
    console.log('check1');
    const client = new this.shopify.clients.Graphql({
      /**
       * Paste one or more documents here
       */
      session,
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
    return data.data;
  }
}

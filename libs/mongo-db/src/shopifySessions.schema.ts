import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShopifySessionsDocument = HydratedDocument<ShopifySessions>;

@Schema()
export class ShopifySessions {
  //   @Prop()
  //   name: string;
  //   @Prop()
  //   age: number;
  //   @Prop()
  //   breed: string;
}

export const ShopifySessionsSchema =
  SchemaFactory.createForClass(ShopifySessions);

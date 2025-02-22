import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionShopifyDocument = HydratedDocument<SessionShopify>;

@Schema()
export class SessionShopify {
  //   @Prop()
  //   name: string;
  //   @Prop()
  //   age: number;
  //   @Prop()
  //   breed: string;
}

export const SessionShopifySchema =
  SchemaFactory.createForClass(SessionShopify);

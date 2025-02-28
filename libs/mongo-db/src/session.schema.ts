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
  @Prop()
  access_token: string;
  @Prop()
  scope: string;
}

export const SessionShopifySchema =
  SchemaFactory.createForClass(SessionShopify);

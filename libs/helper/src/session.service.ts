import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '@shopify/shopify-api';
import { Model } from 'mongoose';
import {
  SessionShopify,
  SessionShopifySchema,
} from '@app/mongo-db/session.schema';
import { ShopifySessions } from '@app/mongo-db/shopifySessions.schema';
/* Services */
// import { PrismaService } from '@/utils/prisma.service';
// import { CryptionService } from '@/utils/cryption.service';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionShopify.name)
    private SessionShopifyModel: Model<SessionShopify>,
  ) {} // private readonly cryptionService: CryptionService, // private readonly prismaService: PrismaService,

  async storeSession(session: Session): Promise<boolean> {
    // const encryptedContent = this.cryptionService.encrypt(
    //   JSON.stringify(session),
    // );

    const checkSession = await this.SessionShopifyModel.findOne({
      id: session.id,
    });

    const result = await this.SessionShopifyModel.updateOne(
      { id: session.id },
      { $set: { updateAt: new Date() } },
      {
        upsert: true,
        new: true,
      },
    );
    return true;
    //
    // upsert({
    //   where: { id: session.id },
    //   update: {
    //     content: encryptedContent,
    //     shop: session.shop,
    //   },
    //   create: {
    //     id: session.id,
    //     content: encryptedContent,
    //     shop: session.shop,
    //   },
    // });

    // return true;
  }

  async loadSession(id: string): Promise<any | undefined> {
    const sessionResult = await this.SessionShopifyModel.findOne({
      id,
    });
    console.log(sessionResult);
    if (!sessionResult) {
      return undefined;
    }

    // if (sessionResult.content.length > 0) {
    //   const decryptedContent = this.cryptionService.decrypt(
    //     sessionResult.content,
    //   );
    // const sessionObj = JSON.parse(decryptedContent);
    return sessionResult;

    // return undefined;
  }

  async loadSessionByShop(id: string): Promise<Session | undefined> {
    const sessionResult = await this.SessionShopifyModel.find({
      where: { shop: id },
    });

    if (!sessionResult) {
      return undefined;
    }

    const filteredSessions = sessionResult.filter(
      (session) => !session.id.includes('offline'),
    );

    if (filteredSessions.length > 0) {
      // const decryptedContent = this.cryptionService.decrypt(
      //   filteredSessions[0]['content'],
      // );
      // const sessionObj = JSON.parse(decryptedContent);
      // return new Session(sessionObj);
      return filteredSessions[0]['content'];
    }

    return undefined;
  }

  async deleteSession(id: string): Promise<boolean> {
    await this.SessionShopifyModel.deleteMany({ where: { id } });
    return true;
  }
}

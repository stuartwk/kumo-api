import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms/rooms.controller';
import { RoomAuthMiddleware } from '../_middleware/room-auth.middleware';

import { ConfigModule } from '../config/config.module';

/** ENTITIES */
import { RoomEntity } from '../_entities/room.entity';
import { InvoiceEntity } from '../_entities/invoice.entity';
import { ChainInvoiceEntity } from '../_entities/chain-invoice.entity';
import { LightningInvoiceEntity } from '../_entities/lightning-invoice.entity';

/** SERVICES */
import { ChainInvoiceService } from '../_services/chain-invoice.service';
import { InvoiceService } from '../_services/invoice.service';
import { LightningInvoiceService } from '../_services/lightning-invoice.service';
import { OpenNodeService } from '../_services/opennode.service';
import { RoomService } from '../_services/room.service';

@Module({
  providers: [RoomService, InvoiceService, ChainInvoiceService, LightningInvoiceService, OpenNodeService],
  controllers: [RoomsController],
  imports: [ConfigModule, TypeOrmModule.forFeature([RoomEntity, InvoiceEntity, ChainInvoiceEntity, LightningInvoiceEntity])],
})
export class RoomsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoomAuthMiddleware)
      .forRoutes({ path: '*/login', method: RequestMethod.POST });
  }
}

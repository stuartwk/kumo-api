import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/** MODULES */
import { ConfigModule } from './config/config.module';
import { RoomsModule } from './rooms/rooms.module';

/** TYPEORM */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { WebhooksModule } from './webhooks/webhooks.module';

/** GATEWAYS */
import { RoomGateway } from './_gateways/room.gateway';

/** SERVICES */
import { RoomService } from './_services/room.service';

/** ENTITY */
import { RoomEntity } from './_entities/room.entity';
import { InvoiceEntity } from './_entities/invoice.entity';
import { ChainInvoiceEntity } from './_entities/chain-invoice.entity';
import { LightningInvoiceEntity } from './_entities/lightning-invoice.entity';
import { InvoiceService } from './_services/invoice.service';
import { LightningInvoiceService } from './_services/lightning-invoice.service';
import { ChainInvoiceService } from './_services/chain-invoice.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ScheduleService } from './_services/schedule.service';

@Module({
  imports: [
    RoomsModule,
    WebhooksModule,
    InvoicesModule,
    ConfigModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([RoomEntity, InvoiceEntity, ChainInvoiceEntity, LightningInvoiceEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, RoomGateway, RoomService, InvoiceService, LightningInvoiceService, ChainInvoiceService, ScheduleService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

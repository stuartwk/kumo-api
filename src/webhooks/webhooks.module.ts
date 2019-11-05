import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpennodeController } from './opennode/opennode.controller';
import { OpenNodeService } from '../_services/opennode.service';
import { ChargeGateway } from '../_gateways/charge.gateway';

/** MODULES */
import { ConfigModule } from '../config/config.module';

/** ENTITIES */
import { InvoiceEntity } from '../_entities/invoice.entity';

/** SERVICES */
import { InvoiceService } from '../_services/invoice.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([InvoiceEntity])],
  controllers: [OpennodeController],
  providers: [OpenNodeService, ChargeGateway, InvoiceService],
})
export class WebhooksModule {}

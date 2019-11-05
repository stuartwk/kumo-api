import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** CONTROLLERS */
import { InvoicesController } from './invoices.controller';

/** SERVICES */
import { InvoiceService } from '../_services/invoice.service';

/** ENTITIES */
import { InvoiceEntity } from '../_entities/invoice.entity';

@Module({
  controllers: [InvoicesController],
  providers: [InvoiceService],
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
})
export class InvoicesModule {}

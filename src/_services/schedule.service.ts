import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, getConnection } from 'typeorm';
import { Cron, NestSchedule } from 'nest-schedule';

/** ENTITIES */
import { InvoiceEntity } from '../_entities/invoice.entity';
import { RoomEntity } from '../_entities/room.entity';
import { LightningInvoiceEntity } from '../_entities/lightning-invoice.entity';
import { ChainInvoiceEntity } from '../_entities/chain-invoice.entity';

@Injectable()
export class ScheduleService extends NestSchedule {

    private logger: Logger = new Logger('ScheduleService');

    constructor(
        @InjectRepository(InvoiceEntity)
        private invoiceRepository: Repository<InvoiceEntity>,
        @InjectRepository(LightningInvoiceEntity)
        private lightningInvoiceRepository: Repository<LightningInvoiceEntity>,
        @InjectRepository(ChainInvoiceEntity)
        private chainInvoiceRepository: Repository<ChainInvoiceEntity>,
    ) {
            super();
    }

    @Cron('0 0 * ? * *') // once an hour
    async clearRooms() {

        // clear rooms
        const clear_room_date = new Date();
        clear_room_date.setDate(clear_room_date.getDate() - 1);

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(RoomEntity)
            .where('createdAt < :date', {date: clear_room_date})
            .execute();

    }

    @Cron('0 0 12 * * SUN') // every sunday at noon
    async clearUnpaidInvoices() {
        // TODO: implement onDelete CASCADE when typeorm has it ready for one-to-one relationships

        // get unpaid charges
        const clear_invoice_date = new Date();
        clear_invoice_date.setDate(clear_invoice_date.getDate() - 7);

        const unpaid_invoices = await this.invoiceRepository.find(
            {
                where: {status: 'unpaid', created_at: LessThan(clear_invoice_date.getTime() / 1000)},
                relations: ['lightning_invoice', 'chain_invoice'],
            },
        );

        // clear unpaid parent invoice
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(InvoiceEntity)
            .where('status = :status', {status: 'unpaid'})
            .andWhere('created_at < :date', {date: clear_invoice_date.getTime() / 1000})
            .execute();

        // clear lightning invoices
        const lightning_invoice_ids = unpaid_invoices.map( (invoice) => {
            return invoice.lightning_invoice.id;
        });

        if (lightning_invoice_ids.length > 0) {
            await this.lightningInvoiceRepository.delete(lightning_invoice_ids);
        }

        // clear chain invoices
        const chain_invoice_ids = unpaid_invoices.map( (invoice) => {
            return invoice.chain_invoice.id;
        });

        if (chain_invoice_ids.length > 0) {
            await this.chainInvoiceRepository.delete(chain_invoice_ids);
        }
    }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/** ENTITIES */
import { ChainInvoiceEntity } from '../_entities/chain-invoice.entity';
import { InvoiceEntity } from '../_entities/invoice.entity';
import { LightningInvoiceEntity } from '../_entities/lightning-invoice.entity';

/** DTOs */
import { OpenNodeInvoiceDto } from '../_dto/open-node-invoice.dto';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(InvoiceEntity)
        private invoiceRepository: Repository<InvoiceEntity>,
    ) { }

    async findOne(where): Promise<InvoiceEntity> {
        return await this.invoiceRepository.findOne({where, relations: ['chain_invoice', 'lightning_invoice']});
    }

    async create(data: {invoice: OpenNodeInvoiceDto, lightning_invoice: LightningInvoiceEntity, chain_invoice: ChainInvoiceEntity}) {
        const lightning_invoice = new InvoiceEntity();

        lightning_invoice.address =             data.invoice.address;
        lightning_invoice.amount =              data.invoice.amount;
        lightning_invoice.callback_url =        data.invoice.callback_url;
        lightning_invoice.chain_invoice =       data.chain_invoice;
        lightning_invoice.created_at =          data.invoice.created_at;
        lightning_invoice.currency =            data.invoice.currency;
        lightning_invoice.description =         data.invoice.description;
        lightning_invoice.fiat_value =          data.invoice.fiat_value;
        lightning_invoice.auto_settle =         data.invoice.auto_settle;
        lightning_invoice.id =                  data.invoice.id;
        lightning_invoice.lightning_invoice =   data.lightning_invoice;
        lightning_invoice.name =                data.invoice.name;
        lightning_invoice.notes =               data.invoice.notes;
        lightning_invoice.notif_email =         data.invoice.notif_email;
        lightning_invoice.order_id =            data.invoice.order_id;
        lightning_invoice.source_fiat_value =   data.invoice.source_fiat_value;
        lightning_invoice.status =              data.invoice.status;
        lightning_invoice.success_url =         data.invoice.success_url;
        lightning_invoice.uri =                 data.invoice.uri;

        return await this.invoiceRepository.save(lightning_invoice);
    }

    async update(invoice: InvoiceEntity) {
        await this.invoiceRepository.save(invoice);
    }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LightningInvoiceEntity } from '../_entities/lightning-invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LightningInvoiceService {

    constructor(
        @InjectRepository(LightningInvoiceEntity)
        private lightningInvoiceRepository: Repository<LightningInvoiceEntity>,
    ) { }

    async create(data: {payreq: string, expires_at: number}) {
        const lightning_invoice = new LightningInvoiceEntity();
        lightning_invoice.payreq = data.payreq;
        lightning_invoice.expires_at = data.expires_at;
        return await this.lightningInvoiceRepository.save(lightning_invoice);
    }

}


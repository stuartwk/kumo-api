import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChainInvoiceEntity } from '../_entities/chain-invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChainInvoiceService {

    constructor(
        @InjectRepository(ChainInvoiceEntity)
        private chainInvoiceRepository: Repository<ChainInvoiceEntity>,
    ) { }

    async create(address: string) {
        const chain_invoice = new ChainInvoiceEntity();
        chain_invoice.address = address;
        return await this.chainInvoiceRepository.save(chain_invoice);
    }

}

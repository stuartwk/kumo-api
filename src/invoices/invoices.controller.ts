import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { InvoiceService } from '../_services/invoice.service';

import { InvoiceRO } from './invoice.interface';

@Controller('invoices')
export class InvoicesController {

    constructor(private invoiceService: InvoiceService) { }

    @Get(':id')
    async findOne(@Param('id') id): Promise<InvoiceRO> {
      const invoice = await this.invoiceService.findOne({id});

      const errors = {User: ' not found'};
      if (!invoice) {
        throw new HttpException({errors}, 401);
      }

      return {invoice};

    }

}

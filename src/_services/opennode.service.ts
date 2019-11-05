import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { OpenNodeInvoiceDto } from '../_dto/open-node-invoice.dto';
import { ConfigService } from '../config/config.service';

import opennode = require('opennode');

@Injectable()
export class OpenNodeService {

    constructor(private configService: ConfigService) {
        const invoice_key = this.configService.get('OPEN_NODE_INVOICES_KEY');
        opennode.setCredentials(invoice_key, (this.configService.get('NODE_ENV') ? 'live' : 'dev'));
    }

    private logger: Logger = new Logger('OpenNodeService');

    async createCharge(): Promise<OpenNodeInvoiceDto> {

        try {

            const callback_url = this.configService.get('OPEN_NODE_CALLBACK_URL');
            const charge = await opennode.createCharge({
                amount: 10,
                callback_url,
                auto_settle: false,
            });

            return charge;
        } catch (error) {
            this.logger.error(error);
            return error;
        }

    }

}

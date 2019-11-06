import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { OpenNodeInvoiceDto } from '../_dto/open-node-invoice.dto';
import { ConfigService } from '../config/config.service';

import opennode = require('opennode');

@Injectable()
export class OpenNodeService {

    private logger: Logger = new Logger('OpenNodeService');

    constructor(private configService: ConfigService) {
        const invoice_key = this.configService.get('OPEN_NODE_INVOICES_KEY');
        const env = this.configService.get('NODE_ENV');

        if (env) {
            opennode.setCredentials(invoice_key);
        } else {
            opennode.setCredentials(invoice_key, 'dev');
        }

        this.logger.log((env) ? env : 'development');

    }

    async createCharge(): Promise<OpenNodeInvoiceDto> {

        try {
            const amount = this.configService.get('OPEN_NODE_CHARGE');
            const callback_url = this.configService.get('OPEN_NODE_CALLBACK_URL');
            const charge = await opennode.createCharge({
                amount,
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

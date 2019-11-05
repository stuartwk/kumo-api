import { Controller, Post, Body } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ChargeGateway } from '../../_gateways/charge.gateway';
import { OpenNodeInvoiceDto } from '../../_dto/open-node-invoice.dto';
import { InvoiceService } from '../../_services/invoice.service';

@Controller('opennode')
export class OpennodeController {

    private logger: Logger = new Logger('OpennodeController Webhooks');

    constructor(private readonly chargeGateway: ChargeGateway, private invoiceService: InvoiceService) { }

    @Post()
    async updateInvoiceStatus(@Body() charge: OpenNodeInvoiceDto) {

        const invoice = await this.invoiceService.findOne({id: charge.id});
        invoice.status = charge.status;

        await this.invoiceService.update(invoice);

        this.chargeGateway.namespace.to(charge.id).emit('paymentReceived', {charge});

        return;

    }

}

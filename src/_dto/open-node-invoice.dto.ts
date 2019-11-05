import { Currency } from '../_enums/currency.enum';
import { InvoiceStatus } from '../_enums/invoice-status.enum';

export interface OpenNodeInvoiceDto {
    id: string;
    address: string;
    amount: number;
    auto_settle: boolean;
    callback_url: string;
    chain_invoice: {
        address: string;
    };
    created_at: number;
    currency: Currency;
    description: string;
    fiat_value: number;
    lightning_invoice: {
        expires_at: number;
        payreq: string;
    };
    name?: string;
    notes: string;
    notif_email?: string;
    order_id: string;
    source_fiat_value: number;
    status: InvoiceStatus;
    success_url: string;
    uri: string;
}

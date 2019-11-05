
import { Transaction } from './transaction';

export class OpenNodeChargeDTO {
    id: string;
    callback_url: string;
    success_url: string;
    status: 'underpaid' | 'refunded' | 'processing' | 'paid';
    order_id: string;
    description: string;
    price: number;
    fee: number;
    auto_settle: boolean;
    address: string;
    missing_amt?: number;
    transactions: Transaction[];
    hashed_order: string;
}

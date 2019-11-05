import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ChainInvoiceEntity } from './chain-invoice.entity';
import { LightningInvoiceEntity } from './lightning-invoice.entity';

import { Currency } from '../_enums/currency.enum';
import { InvoiceStatus } from '../_enums/invoice-status.enum';

@Entity('invoice')
export class InvoiceEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    address: string;

    @Column()
    amount: number;

    @Column()
    auto_settle: boolean;

    @Column()
    callback_url: string;

    @Column()
    created_at: number; // unix timestamp

    @Column({
        type: 'enum',
        enum: Currency,
        default: Currency.BTC,
    })
    currency: Currency;

    @Column()
    description: string;

    @Column({type: 'double'})
    fiat_value: number;

    @Column({nullable: true})
    name: string;

    @Column()
    notes: string;

    @Column({nullable: true})
    notif_email: string;

    @Column()
    order_id: string;

    @Column()
    source_fiat_value: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatus,
        default: InvoiceStatus.UNPAID,
    })
    status: InvoiceStatus;

    @Column()
    success_url: string;

    @Column({type: 'text'})
    uri: string;

    @OneToOne(type => LightningInvoiceEntity)
    @JoinColumn()
    lightning_invoice: LightningInvoiceEntity;

    @OneToOne(type => ChainInvoiceEntity)
    @JoinColumn()
    chain_invoice: ChainInvoiceEntity;

}

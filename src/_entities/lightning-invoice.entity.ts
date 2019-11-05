import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('lightning_invoice')
export class LightningInvoiceEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    expires_at: number; // unix timestamp

    @Column()
    payreq: string;

    // @OneToOne(type => InvoiceEntity, invoice => invoice.lightning_invoice, { cascade: true, onDelete: "CASCADE" })
    // @JoinColumn()
    // invoice: InvoiceEntity;

}

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('chain_invoice')
export class ChainInvoiceEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    address: string;

    // @OneToOne(type => InvoiceEntity, invoice => invoice.chain_invoice, { cascade: true, onDelete: "CASCADE" })
    // @JoinColumn()
    // invoice: InvoiceEntity;

}

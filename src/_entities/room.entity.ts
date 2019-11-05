import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { InvoiceEntity } from './invoice.entity';

@Entity('room')
export class RoomEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => InvoiceEntity)
    @JoinColumn()
    invoice: InvoiceEntity;

    @Column({nullable: true})
    password: string;

    @Column()
    name: string;

    @Column({default: true})
    isPrivate: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    hashpassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

}

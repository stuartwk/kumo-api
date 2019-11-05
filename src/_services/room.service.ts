import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Repository } from 'typeorm';

/** SERVICES */
import { ConfigService } from '../config/config.service';

/** ENTITIES */
import { RoomEntity } from '../_entities/room.entity';
import { InvoiceEntity } from '../_entities/invoice.entity';
import { CreateRoomDto } from '../rooms/rooms/dto/create-room.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RoomService {

    // private logger: Logger = new Logger('RoomService');

    constructor(
        @InjectRepository(RoomEntity)
        private roomRepository: Repository<RoomEntity>,
        private configService: ConfigService,
    ) { }

    async findOne(where): Promise<RoomEntity> {
        return await this.roomRepository.findOne({where, relations: ['invoice']});
    }

    async create(data: {roomDto: CreateRoomDto, invoice: InvoiceEntity}): Promise<RoomEntity> {

        const room = new RoomEntity();

        room.name = data.roomDto.name;
        room.password = data.roomDto.password;
        room.isPrivate = true;
        room.invoice = data.invoice;

        return await this.roomRepository.save(room);

    }

    async update(id: string, setupDto: CreateRoomDto): Promise<RoomEntity> {

        const room = await this.roomRepository.findOne({id});

        if (room.createdAt.getTime() === room.updatedAt.getTime()) {
            room.name = setupDto.name;
            room.isPrivate = setupDto.is_private;
            room.password = setupDto.password;

            return await this.roomRepository.save(room);
        } else {
            throw new Error('name and pass have already been set');
        }

    }

    async createRoomUser(data: {username: string, room_id: string, room_password: string}) {

        const today = new Date();
        const exp = new Date(today);
        const secret = this.configService.get('JWT_SECRET');
        exp.setDate(today.getDate() + 1);

        const id = randomStringGenerator();

        const token = jwt.sign({
          user: {
              id,
              username: data.username,
          },
          room: {
              id: data.room_id,
              password: data.room_password,
          },
          exp: exp.getTime() / 1000,
        }, secret);

        return {
            user: {
                id,
                username: data.username,
            },
            token,
        };
    }

}

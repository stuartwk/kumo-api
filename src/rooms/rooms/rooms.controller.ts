import { Controller, Get, Post, Put, Body, Param, BadRequestException, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { RoomService } from '../../_services/room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { LoginRoomDto } from './dto';

import { RoomRO } from './room.interface';

/** SERVICES */
import { ChainInvoiceService } from '../../_services/chain-invoice.service';
import { InvoiceService } from '../../_services/invoice.service';
import { LightningInvoiceService } from '../../_services/lightning-invoice.service';
import { OpenNodeService } from '../../_services/opennode.service';

@Controller('rooms')
export class RoomsController {

    private logger: Logger = new Logger('RoomsController');

    constructor(
      private roomService: RoomService,
      private invoiceService: InvoiceService,
      private openNodeService: OpenNodeService,
      private chainInvoiceService: ChainInvoiceService,
      private lightningInvoiceService: LightningInvoiceService,
    ) { }

    @Post(':id/login')
    async login(@Param('id') id: string, @Body() loginRoomDto: LoginRoomDto) {
      return await this.roomService.createRoomUser({username: loginRoomDto.username, room_id: id, room_password: loginRoomDto.password});
    }

    @Post()
    async create(@Body() createRoomDto: CreateRoomDto): Promise<RoomRO> {

      const charge = await this.openNodeService.createCharge();
      const chain_invoice = await this.chainInvoiceService.create(charge.chain_invoice.address);
      const lightning_invoice = await this.lightningInvoiceService.create(charge.lightning_invoice);
      const invoice = await this.invoiceService.create({chain_invoice, lightning_invoice, invoice: charge});
      const _room = await this.roomService.create({roomDto: createRoomDto, invoice});

      const room = {
        id: _room.id,
        name: _room.name,
        isPrivate: _room.isPrivate,
        invoiceId: _room.invoice.id,
        createdAt: _room.createdAt,
      };

      return {room};

    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<RoomRO> {

      const _room = await this.roomService.findOne({id});

      const errors = {User: ' not found'};
      if (!_room) {
        throw new HttpException({errors}, 404);
      }

      // if cron job still hasn't cleared out the room, double check it is still valid
      const _now = new Date();
      const _created_at = new Date(_room.createdAt);
      const _expiration_date = new Date(_created_at.setDate(_created_at.getDate() + 1));

      if (_now.getTime() > _expiration_date.getTime()) {
        throw new HttpException({errors}, 404);
      }

      const room = {
        id: _room.id,
        name: _room.name,
        isPrivate: _room.isPrivate,
        createdAt: _room.createdAt,
        invoiceId: _room.invoice.id,
      };

      return {room};

    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() setupRoomDto: CreateRoomDto) {

      try {
        const update = await this.roomService.update(id, setupRoomDto);
        return {update};
      } catch (e) {
        throw new BadRequestException(e.message);
      }

    }

}

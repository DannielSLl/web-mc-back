import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalDto } from './dto/local.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('local')
@Controller('local')
export class LocalController {
    constructor(
        private readonly localService: LocalService,
    ) {}

    @Get()
    async getAll() {
        return this.localService.getAll();
    }

    @Post()
    async createLocal(@Body() dto: LocalDto){
        return this.localService.create(dto);
    }

    @Delete(':id')
    async deleteLocal(id: number){
        return this.localService.delete(id);
    }

}


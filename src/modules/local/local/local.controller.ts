import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalDto } from './dto/local.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';


@ApiTags('local')
@Controller('local')
@UseGuards(RolesGuard)
export class LocalController {
    
    constructor(
        private readonly localService: LocalService,
    ) {}

    @Get()
    async getAll() {
        return this.localService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return this.localService.findById(id);
    }

    @Roles('admin')
    @Post()
    async createLocal(@Body() dto: LocalDto){
        return this.localService.create(dto);
    }

    @Delete(':id')
    @Roles('admin')
    async deleteLocal(@Param('id', ParseIntPipe) id: number){
        return this.localService.delete(id);
    }

}


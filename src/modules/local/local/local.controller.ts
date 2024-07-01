import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalDto } from './dto/local.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';

@ApiBearerAuth()
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

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return this.localService.findById(id);
    }

    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    async createLocal(@Body() dto: LocalDto){
        return this.localService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async deleteLocal(id: number){
        return this.localService.delete(id);
    }

}


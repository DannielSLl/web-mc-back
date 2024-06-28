import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
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
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    async createLocal(@Body() dto: LocalDto){
        return this.localService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteLocal(id: number){
        return this.localService.delete(id);
    }

}


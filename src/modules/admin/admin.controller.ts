import { Controller, Get, Post, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { AdminEntity } from './admin.entity';
import { AdminDTO } from './dto/adminDTO';
import { PostAdminResponse } from './dto/postAdminResponse';
import { AdminService } from './admin.service';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';


@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los administradores' })
    @ApiResponse({ status: 200, description: 'Lista de todos los administradores', type: [AdminEntity] })
    async getAdmins(): Promise<AdminEntity[]> {
        return await this.adminService.getAllAdmins();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un administrador por su ID' })
    @ApiParam({ name: 'id', description: 'ID del administrador', type: 'integer' })
    @ApiResponse({ status: 200, description: 'Administrador encontrado', type: AdminEntity })
    @ApiResponse({ status: 404, description: 'No se encontró ningún administrador con el ID proporcionado' })
    async getAdmin(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
        return await this.adminService.getAdmin(id);
    }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo administrador' })
    @ApiResponse({ status: 201, description: 'Administrador registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: AdminDTO })
    async postCliente(@Body() request: AdminDTO): Promise<PostAdminResponse> {
        const hashedPassword = await bcrypt.hash(request.password, 10);

        const newAdmin: AdminEntity = {
            name: request.name,
            lastname: request.lastname,
            email: request.email,
            password: hashedPassword,
            activo: true,
        } as AdminEntity;

        await this.adminService.create(newAdmin);

        return {
            data: null,
            statusCode: 201,
            statusDescripcion: 'Administrador creado exitosamente',
            error: null
        };
    }
}

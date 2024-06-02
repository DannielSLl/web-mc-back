import { Controller, Get, Post, Param, Body, Put, Res, Delete, ParseIntPipe } from '@nestjs/common';
//entidades
import { AdminEntity } from './admin.entity';
//dto
import { AdminDTO } from './dto/adminDTO';
import { PostAdminResponse } from './dto/postAdminResponse';
//servicios
import { AdminService } from './admin.service';
//otros
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
@ApiTags('admin')
@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){}


    @Get()
    public async getAdmins(){
        return await this.adminService.getAllAdmins();
    }

    @Get(':id')
    public async getAdmin(@Param('id', ParseIntPipe) id: number){
        return await this.adminService.getAdmin(id);
    }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo administrador al sistema' })
    @ApiResponse({ status: 201, description: 'Administrador registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: AdminDTO })
    async postCliente(@Body() request: AdminDTO): Promise<PostAdminResponse> {
        const response: PostAdminResponse = {
            data: null,
            statusCode: 200,
            statusDescripcion: 'Admin creado',
            error: null
        };

        if (request) {
            //Encriptar contraseña
            const hashedPassword = await bcrypt.hash(request.password, 10);

            //Crear nuevo admin
            const newAdmin: AdminEntity = {
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                password: hashedPassword,
                activo: true,
            } as AdminEntity;

            await this.adminService.create(newAdmin);

            return response;
        }
    }
}

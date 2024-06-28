import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, Req, HttpException } from '@nestjs/common';
import { IGetEmployeeResponse } from './dto/IGetEmployeeResponse';
import { IPostEmployeeResponse } from './dto/IPostEmployeeResponse';
import { EmployeesService } from './employees.service';
import { UpdateResult } from 'typeorm';
import { EmployeesDTO } from './dto/employees.dto';
import { EmployeesEntity } from './employees.entity';
import { EmployeesUpdateDTO } from './dto/EmployeesUpdateDTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { AuthenticatedUser } from '../auth/user.interface';

@ApiTags('empleados')
@Controller('empleados')
export class EmployeesController {
    private employees: IGetEmployeeResponse[] = [];

    constructor(private readonly employeeService: EmployeesService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los empleados' }) 
    @ApiResponse({ status: 200, description: 'Empleados encontrados.', type: EmployeesEntity, isArray: true })
    public async getEmployees() {
        return await this.employeeService.getAllEmployees();
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un empleado por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del empleado' }) 
    @ApiResponse({ status: 200, description: 'Empleado encontrado.', type: EmployeesEntity })
    public async getEmployee(@Param('id') id: number) {
        return await this.employeeService.getEmployeeId(id);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Crear un nuevo empleado' }) 
    @ApiBody({ type: EmployeesDTO }) 
    @ApiResponse({ status: 200, description: 'Empleado agregado correctamente.', type: EmployeesDTO })
    async postEmployee(@Body() request: EmployeesDTO): Promise<IPostEmployeeResponse> {
        const response: IPostEmployeeResponse = {
            data: null,
            statusCode: 200,
            statusDescription: 'Empleado Agregado',
            erros: null
        };

        if (request) {
            const hashedPassword = await bcrypt.hash(request.password, 10)
            const newEmployee: EmployeesEntity = {
                id: this.employees.length,
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                password: hashedPassword,
                role: request.role,
            } as EmployeesEntity;
            
            await this.employeeService.create(newEmployee);

            return response;
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'empleado')
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un empleado existente por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del empleado' }) 
    @ApiBody({ type: EmployeesUpdateDTO })
    @ApiResponse({ status: 200, description: 'Empleado actualizado correctamente.', type: UpdateResult }) 
    async putEmployee(
        @Param('id') id: number,
        @Body() request: EmployeesUpdateDTO,
        @Req() req: Request,
    ): Promise<UpdateResult> {
        const user = req.user as AuthenticatedUser
        if ((user.userType == 'admin') || (user.userType == 'empleado' && user.id == id)) {
            return await this.employeeService.update(id, request);
        }else{
            throw new HttpException("Not_Authorized", 403);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un empleado por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del empleado' }) 
    @ApiResponse({ status: 200, description: 'Empleado eliminado correctamente.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.employeeService.delete(id);
    }
}

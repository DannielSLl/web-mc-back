import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { IGetEmployeeResponse } from './dto/IGetEmployeeResponse';
import { IPostEmployeeResponse } from './dto/IPostEmployeeResponse';
import { EmployeesService } from './employees.service';
import { UpdateResult } from 'typeorm';
import { EmployeesDTO } from './dto/employees.dto';
import { EmployeesEntity } from './employees.entity';
import { EmployeesUpdateDTO } from './dto/EmployeesUpdateDTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'; 

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
            const newEmployee: EmployeesEntity = {
                id: this.employees.length,
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                password: request.password,
                role: request.role,
            } as EmployeesEntity;
            
            await this.employeeService.create(newEmployee);

            return response;
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un empleado existente por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del empleado' }) 
    @ApiBody({ type: EmployeesUpdateDTO })
    @ApiResponse({ status: 200, description: 'Empleado actualizado correctamente.', type: UpdateResult }) 
    async putEmployee(
        @Param('id') id: number,
        @Body() request: EmployeesUpdateDTO,
    ): Promise<UpdateResult> {

        return await this.employeeService.update(id, request);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un empleado por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del empleado' }) 
    @ApiResponse({ status: 200, description: 'Empleado eliminado correctamente.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.employeeService.delete(id);
    }
}

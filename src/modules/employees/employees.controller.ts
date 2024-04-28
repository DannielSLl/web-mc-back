import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { IGetEmployeeResponse } from './dto/IGetEmployeeResponse';
import { IPostEmployeeResponse } from './dto/IPostEmployeeResponse';
import { EmployeesService } from './employees.service';
import { UpdateResult } from 'typeorm';
import { EmployeesDTO } from './dto/employees.dto';
import { EmployeesEntity } from './employees.entity';
import { EmployeesUpdateDTO } from './dto/EmployeesUpdateDTO';

@Controller('empleados')
export class EmployeesController {
    private employees: IGetEmployeeResponse[] = [];

    constructor(private readonly employeeService: EmployeesService) {}

    @Get()
    public async getEmployees() {
        return await this.employeeService.getAllEmployees();
    }
    
    @Get(':id')
    public async getEmployee(@Param('id') id: number) {
        return await this.employeeService.getEmployeeId(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
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
    async putEmployee(
        @Param('id') id: number,
        @Body() request: EmployeesUpdateDTO,
    ): Promise<UpdateResult> {

        return await this.employeeService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.employeeService.delete(id);
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeesEntity } from './employees.entity';
import { EmployeesDTO } from './dto/employees.dto';
import { EmployeesUpdateDTO } from './dto/EmployeesUpdateDTO';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeesEntity)
    private readonly employeesRepository: Repository<EmployeesEntity>,
  ) {}

  public async getAllEmployees(): Promise<EmployeesEntity[]> {
    const employees = await this.employeesRepository.find();
    if (!employees.length) {
      throw new NotFoundException('No se encontraron empleados.');
    }
    return employees;
  }

  public async getEmployeeId(id: number): Promise<EmployeesEntity> {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`No se encontró ningún empleado con el ID ${id}`);
    }
    return employee;
  }

  public async getEmployeeName(name: string): Promise<EmployeesEntity> {
    const employee = await this.employeesRepository.findOne({ where: { name: name } });
    return employee;
  }

  public async create(dto: EmployeesDTO): Promise<any> {
    const exists = await this.getEmployeeName(dto.name);
    if (exists) throw new BadRequestException({message: 'Ese nombre ya existe.'});
    const employee = this.employeesRepository.create(dto);
    await this.employeesRepository.save(employee);
    return {message: `Empleado creado con éxito.`};
  }  

  public async update(id: number, dto: EmployeesUpdateDTO): Promise<any> {
    const employee = await this.getEmployeeId(id);
    if (!employee)
        throw new NotFoundException({message: 'El empleado no existe.'});
    const exists = await this.getEmployeeName(dto.name);
    if (exists && exists.id !== id) throw new BadRequestException({message: 'Ese empleado ya existe.'});
    dto.name 
        ? (employee.name = dto.name)
        : (employee.name = employee.name);

    dto.lastname 
        ? (employee.lastname = dto.lastname) 
        : (employee.lastname = employee.lastname);

    dto.email 
        ? (employee.email = dto.email)
        : (employee.email = employee.email);
   
    await this.employeesRepository.save(employee);
    return {message: `Empleado actualizado.`}
  }

  public async delete(id: number): Promise<any> {
    const employee = await this.getEmployeeId(id);
    await this.employeesRepository.delete(employee);
    return {message: `Empleado eliminado.`}
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository, UpdateResult } from 'typeorm';
//Entity
import { AdminEntity } from './admin.entity';
//dto
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>
    ){}

    public async getAllAdmins(): Promise<AdminEntity[]> {
        const result = this.adminRepository.find();
        
        return result;
    }

    public async getAdmin(id: number): Promise<AdminEntity> {
        try {
            const result = await this.adminRepository.createQueryBuilder('admin').where(
                'admin.id = :id', {id}
            ).getOne()

            return result;
        }
        catch(error: any) {
            throw new Error(error);
        }
    }

    public async create(admin: AdminEntity): Promise<AdminEntity> {
        const result = this.adminRepository.create(admin);

        return await this.adminRepository.save(result);
    }

    public async findOneByEmail(email: string): Promise <AdminEntity> {
        try {
            return await this.adminRepository.createQueryBuilder('admin').where(
                'admin.email = :email', {email}
            ).getOne()
        }
        catch(error: any) {
            throw new Error("Error al buscar al admin por su correo electrónico");
        }
    }
}

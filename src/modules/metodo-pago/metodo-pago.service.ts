import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPagoEntity } from '../metodo-pago/metodo-pago.entity';
import { MetodoPagoDTO } from './dto/metodo-pago.dto';
import * as cardValidator from 'card-validator';

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPagoEntity)
    private metodoPagoRepository: Repository<MetodoPagoEntity>,
  ) {}

  findAll(): Promise<MetodoPagoEntity[]> {
    return this.metodoPagoRepository.find();
  }

  findOne(id: number): Promise<MetodoPagoEntity> {
    return this.metodoPagoRepository.findOneBy({ id });
  }

  async create(metodoPagoDto: MetodoPagoDTO): Promise<MetodoPagoEntity> {
    const cardNumberValidation = cardValidator.number(metodoPagoDto.numeroTarjeta.toString());
    if (!cardNumberValidation.isValid) {
      throw new BadRequestException('Número de tarjeta no válido');
    }

    const expirationDateValidation = cardValidator.expirationDate(metodoPagoDto.fechaExpiracion);
    if (!expirationDateValidation.isValid) {
      throw new BadRequestException('Fecha de expiración de tarjeta no válida');
    }

    const cvvValidation = cardValidator.cvv(metodoPagoDto.cvv.toString());
    if (!cvvValidation.isValid) {
      throw new BadRequestException('CVV no válido');
    }

    const cardType = cardNumberValidation.card && cardNumberValidation.card.type;
    metodoPagoDto.tipoTarjeta = cardType || 'desconocido'; 

    const { cvv, ...metodoPagoData } = metodoPagoDto;

    const metodoPago = this.metodoPagoRepository.create(metodoPagoData);
    return this.metodoPagoRepository.save(metodoPago);
  }

  async update(id: number, updateData: Partial<MetodoPagoDTO>): Promise<void> {
    await this.metodoPagoRepository.update(id, updateData);
  }

  async remove(id: number): Promise<void> {
    await this.metodoPagoRepository.delete(id);
  }
}

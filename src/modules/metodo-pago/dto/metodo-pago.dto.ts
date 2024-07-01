import { IsDateString, IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MetodoPagoDTO {
  @ApiProperty({
    description: 'Número de tarjeta',
    example: 4111111111111111,
  })
  @IsNotEmpty()
  @IsNumber()
  numeroTarjeta: number;

  @ApiProperty({
    description: 'Fecha de expiración en formato ISO 8601',
    example: '2025-12',
  })
  @IsNotEmpty()
  @IsDateString()
  fechaExpiracion: string;

  @ApiProperty({
    description: 'CVV de la tarjeta',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  cvv: number;

  @ApiProperty({
    description: 'Tipo de tarjeta',
    example: 'credito', 
  })
  @IsOptional()
  @IsString()
  tipoTarjeta?: string;  
}

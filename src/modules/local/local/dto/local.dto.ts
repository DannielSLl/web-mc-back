import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalDto {
  @ApiProperty({ 
    description: 'Nombre del local',
    example: 'Restaurante El Buen Sabor' 
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Ciudad donde se encuentra el local',
    example: 'Madrid' 
  })
  @IsNotEmpty()
  ciudad: string;

  @ApiProperty({ 
    description: 'Dirección del local',
    example: 'Calle Gran Vía, 123' 
  })
  @IsNotEmpty()
  direccion: string;
}

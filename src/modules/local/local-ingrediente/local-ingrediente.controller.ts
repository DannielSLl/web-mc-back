import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalIngredienteService } from './local-ingrediente.service';
import { LocalIngredienteDto } from './dto/local-ingrediente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('local-ingrediente')
@Controller('local-ingrediente')
export class LocalIngredienteController {
  constructor(
    private readonly localIngredienteService: LocalIngredienteService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createLocalIngrediente(
    @Body() localIngredienteDto: LocalIngredienteDto,
  ) {
    return await this.localIngredienteService.create(localIngredienteDto);
  }
}

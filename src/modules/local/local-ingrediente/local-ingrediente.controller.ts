import { Body, Controller, Post } from '@nestjs/common';
import { LocalIngredienteService } from './local-ingrediente.service';
import { LocalIngredienteDto } from './dto/local-ingrediente.dto';

@Controller('local-ingrediente')
export class LocalIngredienteController {
  constructor(
    private readonly localIngredienteService: LocalIngredienteService,
  ) {}

  @Post()
  async createLocalIngrediente(
    @Body() localIngredienteDto: LocalIngredienteDto,
  ) {
    return await this.localIngredienteService.create(localIngredienteDto);
  }
}

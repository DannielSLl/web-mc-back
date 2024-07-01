import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalIngredienteService } from './local-ingrediente.service';
import { LocalIngredienteDto } from './dto/local-ingrediente.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';

@ApiBearerAuth()
@ApiTags('local-ingrediente')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
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

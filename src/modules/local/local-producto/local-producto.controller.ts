import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalProductoService } from './local-producto.service';
import { LocalProductoDto } from './dto/local-producto.dto';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';

@ApiBearerAuth()
@ApiTags('local-producto')
@Controller('local-producto')
export class LocalProductoController {
  constructor(private readonly localProductoService: LocalProductoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createLocalIngrediente(@Body() dto: LocalProductoDto) {
    return await this.localProductoService.create(dto);
  }
}

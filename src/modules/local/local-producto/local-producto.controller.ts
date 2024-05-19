import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalProductoService } from './local-producto.service';
import { LocalProductoDto } from './dto/local-producto.dto';

@ApiTags('local-producto')
@Controller('local-producto')
export class LocalProductoController {
  constructor(private readonly localProductoService: LocalProductoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createLocalIngrediente(@Body() dto: LocalProductoDto) {
    return await this.localProductoService.create(dto);
  }
}

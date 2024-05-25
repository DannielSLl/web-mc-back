import { Test, TestingModule } from '@nestjs/testing';
import { PedidoDetallesController } from './pedido-detalles.controller';

describe('PedidoDetallesController', () => {
  let controller: PedidoDetallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoDetallesController],
    }).compile();

    controller = module.get<PedidoDetallesController>(PedidoDetallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { PedidoDTO } from './dto/pedido.dto';
import { Request } from 'express';
import { AuthenticatedUser } from 'src/modules/auth/user.interface';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';

describe('PedidoController', () => {
  let controller: PedidoController;
  let service: PedidoService;

  const mockPedidoService = {
    getPedidosPedientes: jest.fn().mockResolvedValue([] as PedidoPendienteDTO[]),
    getPedidos: jest.fn().mockResolvedValue([] as PedidoPendienteDTO[]),
    createPedido: jest.fn().mockResolvedValue({} as any),
    markToComplete: jest.fn().mockResolvedValue({ affected: 1 } as any),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
      providers: [
        {
          provide: PedidoService,
          useValue: mockPedidoService,
        },
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .compile();

    controller = module.get<PedidoController>(PedidoController);
    service = module.get<PedidoService>(PedidoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get pending orders', async () => {
    const result = [] as PedidoPendienteDTO[];
    jest.spyOn(service, 'getPedidosPedientes').mockResolvedValue(result);

    expect(await controller.getPedidoPendiente()).toBe(result);
  });

  it('should get all orders', async () => {
    const result = [] as PedidoPendienteDTO[];
    jest.spyOn(service, 'getPedidos').mockResolvedValue(result);

    expect(await controller.getPedidos()).toBe(result);
  });

  it('should create an order', async () => {
    const pedidoDto: PedidoDTO = {
      precioTotal: 100,
      fecha: new Date(),
      fechaEntrega: new Date(),
      estado: false,
      metodoPago: 'card',
      detalles: [],
      localId: 1,
      clienteId: 1,
    };
    const req = { user: { id: 1 } } as Request & { user: AuthenticatedUser };
    const result = {} as any;
    jest.spyOn(service, 'createPedido').mockResolvedValue(result);

    expect(await controller.createPedido(pedidoDto, req)).toBe(result);
  });

  it('should mark an order as complete', async () => {
    const req = { user: { id: 1 } } as Request & { user: AuthenticatedUser };
    const result = { affected: 1 } as any;
    jest.spyOn(service, 'markToComplete').mockResolvedValue(result);

    expect(await controller.markToComplete(1, req)).toBe(result);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { ClienteEntity } from 'src/modules/clientes/cliente.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';
import { ProductEntity } from 'src/modules/products/product.entity';
import { Repository } from 'typeorm';
import { EmployeesEntity } from 'src/modules/employees/employees.entity';
import { PedidoDTO } from './dto/pedido.dto';
import { HttpException } from '@nestjs/common';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepository: Repository<PedidoEntity>;
  let localRepository: Repository<LocalEntity>;
  let clienteRepository: Repository<ClienteEntity>;
  let pedidoDetalleRepository: Repository<PedidoDetalleEntity>;
  let productRepository: Repository<ProductEntity>;
  let employeesRepository: Repository<EmployeesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: getRepositoryToken(PedidoEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(LocalEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ClienteEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PedidoDetalleEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EmployeesEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    pedidoRepository = module.get<Repository<PedidoEntity>>(getRepositoryToken(PedidoEntity));
    localRepository = module.get<Repository<LocalEntity>>(getRepositoryToken(LocalEntity));
    clienteRepository = module.get<Repository<ClienteEntity>>(getRepositoryToken(ClienteEntity));
    pedidoDetalleRepository = module.get<Repository<PedidoDetalleEntity>>(getRepositoryToken(PedidoDetalleEntity));
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    employeesRepository = module.get<Repository<EmployeesEntity>>(getRepositoryToken(EmployeesEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const local = { id: 1 } as LocalEntity;
    const cliente = { id: 1 } as ClienteEntity;
    const pedido = { id: 1 } as PedidoEntity;

    jest.spyOn(localRepository, 'findOne').mockResolvedValue(local);
    jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(cliente);
    jest.spyOn(pedidoRepository, 'create').mockReturnValue(pedido);
    jest.spyOn(pedidoRepository, 'save').mockResolvedValue(pedido);

    expect(await service.createPedido(pedidoDto)).toBe(pedido);
  });

  it('should get pending orders', async () => {
    const result = [
      {
        id: 1,
        client: 'Test Client',
        date: new Date(),
        items: 2,
        status: false,
        localId: 1,
      },
    ] as PedidoPendienteDTO[];
    
    const pedidos = [
      {
        id: 1,
        cliente: { name: 'Test Client' },
        fecha: new Date(),
        detalles: [{}, {}],
        estado: false,
        local: { id: 1 },
      },
    ] as PedidoEntity[];

    jest.spyOn(pedidoRepository, 'find').mockResolvedValue(pedidos);

    const pendingOrders = await service.getPedidosPedientes();
    expect(pendingOrders).toEqual(result);
  });

  it('should get all orders', async () => {
    const result = [
      {
        id: 1,
        client: 'Test Client',
        date: new Date(),
        items: 2,
        status: false,
        localId: 1,
      },
    ] as PedidoPendienteDTO[];
    
    const pedidos = [
      {
        id: 1,
        cliente: { name: 'Test Client' },
        fecha: new Date(),
        detalles: [{}, {}],
        estado: false,
        local: { id: 1 },
      },
    ] as PedidoEntity[];

    jest.spyOn(pedidoRepository, 'find').mockResolvedValue(pedidos);

    const allOrders = await service.getPedidos();
    expect(allOrders).toEqual(result);
  });

  it('should mark an order as complete', async () => {
    const pedido = { id: 1, local: { id: 1 }, estado: false } as PedidoEntity;
    const empleado = { id: 1, local: { id: 1 } } as EmployeesEntity;

    jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(pedido);
    jest.spyOn(employeesRepository, 'findOne').mockResolvedValue(empleado);
    jest.spyOn(pedidoRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.markToComplete(1, 1)).toEqual({ affected: 1 });
  });
});

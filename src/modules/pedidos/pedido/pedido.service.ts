import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { PedidoDTO } from './dto/pedido.dto';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { ClienteEntity } from 'src/modules/clientes/cliente.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';
import { ProductEntity } from 'src/modules/products/product.entity';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';
import { PedidoDetailDto, Product } from './dto/pedidoDetail.dto';
import { EmployeesEntity } from 'src/modules/employees/employees.entity';
import { MetodoPagoEntity } from 'src/modules/metodo-pago/metodo-pago.entity';

@Injectable()
export class PedidoService {
  
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
    @InjectRepository(PedidoDetalleEntity)
    private readonly pedidoDetalleRepository: Repository<PedidoDetalleEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(EmployeesEntity)
    private readonly employeesRepository: Repository<EmployeesEntity>,
    @InjectRepository(MetodoPagoEntity)
    private readonly metodoPagoRepository: Repository<MetodoPagoEntity>
    
  ) {}

  async createPedido(pedidoDto: PedidoDTO): Promise<PedidoEntity> {
    const { precioTotal, fecha, fechaEntrega, estado, detalles, localId, clienteId } = pedidoDto;

    const local = await this.localRepository.findOne({ where: { id: +localId } });
    const cliente = await this.clienteRepository.findOne({ where: { id: +clienteId } });

    if (!local) {
      throw new HttpException('Local not found', 404);
    }

    if (!cliente) {
      throw new HttpException('Cliente not found', 404);
    }
    const pedido = this.pedidoRepository.create({
      precioTotal,
      fecha,
      fechaEntrega,
      estado,
      local: local,
      cliente,
    });


    const savedPedido = await this.pedidoRepository.save(pedido);

    for (const detalleDto of detalles) {
      const producto = await this.productRepository.findOne({ where: { id: +detalleDto.productoId } });
      if (!producto) {
        throw new HttpException('Product not found', 404);
      }
      const pedidoDetalle = this.pedidoDetalleRepository.create({
        cantidad: detalleDto.cantidad,
        producto,
        pedido: savedPedido,
      });
      await this.pedidoDetalleRepository.save(pedidoDetalle);
    }

    return savedPedido;
  }

  async getPedidosPedientes(): Promise<PedidoPendienteDTO[]> {
    let pedidos = await this.pedidoRepository.find({ where: { estado: true }, relations: ['cliente', 'detalles']}
    );
    if (!pedidos) {
      throw new Error('No hay pedidos pendientes');
    }
    return pedidos.map((pedido) => {
      return {
        id: pedido.id,
        client: pedido.cliente.name,
        date: pedido.fecha,
        items: pedido.detalles.length,
        status: pedido.estado ? 'pendiente' : 'entregado', 
      };
    });
  }

  async getPedidoDetail(id: number): Promise<any> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'detalles', 'detalles.producto'],
    });

    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    const pedidoDetailDto: PedidoDetailDto = {
      id: pedido.id,
      nameClient: pedido.cliente.name,
      lastNameClient: pedido.cliente.lastname,
      phone: pedido.cliente.phone,
      dateOrder: pedido.fecha.toISOString(), // Ajusta el formato de fecha según tus necesidades
      orderDeliveryDate: pedido.fechaEntrega.toISOString(), // Ajusta el formato de fecha según tus necesidades
      products: [],
      total: 0,
      status: pedido.estado ? 'Entregado' : 'Pendiente', // Ajusta según tu lógica de estado
    };

    pedido.detalles.forEach((detalle) => {
      const product: Product = {
        name: detalle.producto.nombre,
        price: detalle.producto.precio,
        quantity: detalle.cantidad,
        totalPartial: detalle.cantidad * detalle.producto.precio,
      };
      pedidoDetailDto.products.push(product);
      pedidoDetailDto.total += product.totalPartial;
    });

    return pedidoDetailDto;
  }

  async markToComplete(pedidoId: number) {
    return this.pedidoRepository.update({ id: pedidoId }, { estado: false });
  }
}

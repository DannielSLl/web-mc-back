import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { PedidoDTO } from './dto/pedido.dto';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { ClienteEntity } from 'src/modules/clientes/cliente.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';
import { ProductEntity } from 'src/modules/products/product.entity';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';
import { PedidoDetalleDTO } from '../pedido-detalles/dto/pedido-detalle.dto';

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
  ) {}

  async createPedido(pedidoDto: PedidoDTO): Promise<PedidoEntity> {
    const { precioTotal, fecha, fechaEntrega, estado, metodoPago, detalles, localId, clienteId } = pedidoDto;

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
      metodoPago,
      local: local,
      cliente,
    });

    const savedPedido = await this.pedidoRepository.save(pedido);
    console.log("Pedido guardado: ",savedPedido)

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

  getPedidosPedientes(): Promise<PedidoPendienteDTO[]> {
    let pedidos = this.pedidoRepository.find({ where: { estado: false }, relations: ['cliente', 'detalles', "local"]}
      
    );
    if (!pedidos) {
      throw new Error('No hay pedidos pendientes');
    }
    return pedidos.then((pedidos) => {
      return pedidos.map((pedido) => {
        return {
          id: pedido.id,
          client: pedido.cliente.name,
          date: pedido.fecha,
          items: pedido.detalles.length,
          status: pedido.estado,
          localId: pedido.local.id
        };
      });
    });
  }

  markToComplete(pedidoId: number) {
    return this.pedidoRepository.update({ id: pedidoId }, { estado: true });
  }
}

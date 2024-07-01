import { LocalProductoService } from './../local/local-producto/local-producto.service';
import { LocalService } from './../local/local/local.service';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { In, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { CategoriaService } from '../categoria/categoria.service';
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => CategoriaService))
    private categoriaService: CategoriaService,
    @InjectRepository(LocalProductoEntity)
    private localProductoRepository: Repository<LocalProductoEntity>,

    @Inject(forwardRef(() => LocalProductoService))
    private localProductoService: LocalProductoService,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    const list = await this.productRepository.find({
      relations: ['categoria'],
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista esta vacia' });
    }
    return list;
  }

  async getByLocal(id: number): Promise<LocalProductoEntity[]> {
    const localProductos = await this.localProductoRepository
      .createQueryBuilder('local_producto')
      .innerJoinAndSelect('local_producto.producto', 'producto')
      .where('local_producto.local_id = :id', { id })
      .getMany();

    if (!localProductos.length) {
      throw new NotFoundException({
        message: 'No se encontraron productos para el local especificado',
      });
    }

    return localProductos;
  }

  async findById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!product) {
      throw new NotFoundException({
        message: `Producto con ID ${id} no encontrado`,
      });
    }
    return product;
  }

  async findByCategoria(categoriaId: number): Promise<ProductEntity[]> {
    const productos = await this.productRepository.find({
      where: { categoria: { id: categoriaId } },
    });
    if (!productos.length) {
      throw new NotFoundException(
        `No hay productos en la categoría con ID ${categoriaId}`,
      );
    }
    return productos;
  }

  async findByNombre(nombre: string): Promise<ProductEntity> {
    const producto = await this.productRepository
      .createQueryBuilder('productos')
      .where('productos.nombre = :nombre', { nombre })
      .getOne();
    if (!producto) {
      throw new NotFoundException(`No hay productos con el nombre ${nombre}`);
    }
    return producto;
  }

  async existProduct(nombre: string): Promise<Boolean> {
    const producto = await this.productRepository
      .createQueryBuilder('productos')
      .where('productos.nombre = :nombre', { nombre })
      .getOne();
    let existe = true;
    if (!producto) {
      existe = false;
    }
    return existe;
  }

  async create(dto: ProductDto): Promise<any> {
    // Verifica si ya existe un producto con el mismo nombre en el local especificado
    const existingProduct = await this.localProductoRepository
      .createQueryBuilder('local_producto')
      .innerJoinAndSelect('local_producto.producto', 'producto')
      .innerJoinAndSelect('local_producto.local', 'local')
      .where('producto.nombre = :nombre', { nombre: dto.nombre })
      .andWhere('local.id = :localId', { localId: dto.localId })
      .getOne();

    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe en el local ${existingProduct.local.nombre}.`,
      );
    }

    const productoExist = await this.existProduct(dto.nombre);
    if (productoExist) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe.`,
      );
    }

    // Encuentra la categoría especificada en el DTO
    const categoria = await this.categoriaService.findById(dto.categoriaId);
    if (!categoria) {
      throw new NotFoundException(
        `La categoría con id ${dto.categoriaId} no existe.`,
      );
    }

    // Crea el nuevo producto
    const producto = this.productRepository.create({
      nombre: dto.nombre,
      precio: dto.precio,
      calorias: dto.calorias,
      description: dto.description,
      img: dto.img,
      categoria: categoria,
    });
    await this.productRepository.save(producto);

    // Asocia el producto al local
    const localProducto = this.localProductoRepository.create({
      producto: producto,
      local: { id: dto.localId },
      cantidad: 0,
    });
    await this.localProductoRepository.save(localProducto);

    return {
      message: `Producto ${producto.nombre} creado y asociado al local ${dto.localId}`,
    };
  }

  async update(id: number, dto: UpdateProductDto): Promise<any> {
    const existingProduct = await this.existProduct(dto.nombre);
    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe.`,
      );
    }
    const producto = await this.findById(id);
    dto.nombre
      ? (producto.nombre = dto.nombre)
      : (producto.nombre = producto.nombre);
    dto.precio
      ? (producto.precio = dto.precio)
      : (producto.precio = producto.precio);
    dto.calorias
      ? (producto.calorias = dto.calorias)
      : (producto.calorias = producto.calorias);
    dto.description
      ? (producto.description = dto.description)
      : (producto.description = producto.description);
    dto.img ? (producto.img = dto.img) : (producto.img = producto.img);
    dto.categoria
      ? (producto.categoria = await this.categoriaService.findById(
          dto.categoria,
        ))
      : (producto.categoria = producto.categoria);
    await this.productRepository.save(producto);
    return { message: `Producto ${producto.nombre} actualizado` };
  }

  async delete(id: number): Promise<any> {
    try{
      const producto = await this.productRepository.createQueryBuilder('productos')
      .innerJoin('local_producto', 'lp', 'lp.producto_id = productos.id')
      .select(['productos.id', 'lp.id AS localProductoId'])
      .where('productos.id = :id', { id })
      .getRawOne();

      const localProductoId = producto.localProductoId;

      await this.localProductoRepository.delete(localProductoId);

      await this.productRepository.delete(id);
      return { message: `Producto con ID ${id} eliminado` };
    }
    catch(e){
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

}

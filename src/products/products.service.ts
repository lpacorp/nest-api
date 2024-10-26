import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

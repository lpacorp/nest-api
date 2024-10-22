import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Phone', price: 800 },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product {
    return this.products.find((p) => p.id === id);
  }

  createProduct(product: Product): Product {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  updateProduct(id: number, product: Product): Product {
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }
}

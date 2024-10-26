import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // get all products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getProductById(+id);
  }

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    return await this.productsService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productsService.updateProduct(+id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteProduct(+id);
  }
}

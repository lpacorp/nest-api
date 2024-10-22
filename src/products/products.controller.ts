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
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // get all products
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getProductById(+id);
  }

  @Post()
  createProduct(@Body() product: Product): Product {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product): Product {
    return this.productsService.updateProduct(+id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    return this.productsService.deleteProduct(+id);
  }
}

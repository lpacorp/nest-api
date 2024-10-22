import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.interface';

describe('ProductsController', () => {
  let controller: ProductsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getAllProducts: jest.fn().mockReturnValue([
              { id: 1, name: 'Laptop', price: 1200 },
              { id: 2, name: 'Phone', price: 800 },
            ]),
            getProductById: jest
              .fn()
              .mockReturnValue({ id: 1, name: 'Laptop', price: 1200 }),
            createProduct: jest
              .fn()
              .mockReturnValue({ id: 3, name: 'Tablet', price: 600 }),
            updateProduct: jest
              .fn()
              .mockReturnValue({ id: 1, name: 'Updated Laptop', price: 1500 }),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', () => {
    expect(controller.getAllProducts()).toEqual([
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Phone', price: 800 },
    ]);
  });

  it('should return a single product by ID', () => {
    expect(controller.getProductById('1')).toEqual({
      id: 1,
      name: 'Laptop',
      price: 1200,
    });
  });

  it('should create a new product', () => {
    const newProduct: Product = { id: 3, name: 'Tablet', price: 600 };
    expect(controller.createProduct(newProduct)).toEqual({
      id: 3,
      name: 'Tablet',
      price: 600,
    });
  });

  it('should update an existing product', () => {
    const updateProduct: Product = {
      id: 1,
      name: 'Updated Laptop',
      price: 1500,
    };
    expect(controller.updateProduct('1', updateProduct)).toEqual(updateProduct);
  });

  it('should delete a product', () => {
    controller.deleteProduct('1');
    expect(service.deleteProduct).toHaveBeenCalledWith(1);
  });
});

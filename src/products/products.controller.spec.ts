import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

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

  it('should return all products', async () => {
    const result: Product[] = [{ id: 1, name: 'Laptop', price: 1200 }];
    (service.getAllProducts as jest.Mock).mockResolvedValue(result);
    expect(await controller.getAllProducts()).toEqual(result);
  });

  it('should return a single product by ID', async () => {
    const result: Product = { id: 1, name: 'Laptop', price: 1200 };
    (service.getProductById as jest.Mock).mockResolvedValue(result);

    expect(await controller.getProductById('1')).toEqual(result);
  });

  it('should create a new product', async () => {
    const newProduct: Product = { id: 2, name: 'Phone', price: 800 };
    (service.createProduct as jest.Mock).mockResolvedValue(newProduct);

    expect(await controller.createProduct(newProduct)).toEqual(newProduct);
  });

  it('should update an existing product', async () => {
    const updatedProduct: Product = {
      id: 1,
      name: 'Updated Laptop',
      price: 1500,
    };
    (service.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);

    expect(await controller.updateProduct('1', updatedProduct)).toEqual(
      updatedProduct,
    );
  });

  it('should delete a product', async () => {
    (service.deleteProduct as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.deleteProduct('1')).resolves.not.toThrow();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockProductRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};
describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result: Product[] = [{ id: 1, name: 'Laptop', price: 1200 }];
      (repository.find as jest.Mock).mockResolvedValue(result);
      expect(await service.getAllProducts()).toEqual(result);
    });
  });

  it('should successfully create a new product', async () => {
    const newProduct: Product = { id: 2, name: 'Phone', price: 800 };
    (repository.create as jest.Mock).mockReturnValue(newProduct);
    (repository.save as jest.Mock).mockResolvedValue(newProduct);

    expect(await service.createProduct(newProduct)).toEqual(newProduct);
  });

  describe('remove', () => {
    it('should remove a product successfully', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });
      await expect(service.deleteProduct(1)).resolves.not.toThrow();
    });
  });
});

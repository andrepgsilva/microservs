import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductModel, ProductSchema } from '../entities/product.model';
import { ProductGatewayInMemory } from '../gateways/product-in-memory.gateway';
import { ProductGatewayMongo } from '../gateways/product-mongo.gateway';
import { CreateProductService } from './create-product.service';
import { FindAllProductService } from './findall-product.service';

const mockProduct = {
  name: 'Amazing Phone',
  price: 950
};

describe('ProductsService (InMemory)', () => {
  let createProductService: CreateProductService;
  let findAllProductService: FindAllProductService;
  let ProductGateway: ProductGatewayInMemory;

  beforeEach(async () => {
    ProductGateway = new ProductGatewayInMemory();
    createProductService = new CreateProductService(ProductGateway);
    findAllProductService = new FindAllProductService(ProductGateway);
  });

  it('can create a product', async () => {
    const data: CreateProductDto = {
      name: mockProduct.name,
      price: mockProduct.price
    }
    
    await createProductService.execute(data);
  });
});

describe('ProductsService Mongo', () => {
  let model: Model<ProductModel>;
  let serviceCreateProduct: CreateProductService;
  let serviceFindAllProduct: FindAllProductService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri = `mongodb://root:example@mongo:27017/`;
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }]),
      ],
      providers: [
        CreateProductService,
        FindAllProductService,
        ProductGatewayInMemory,
        ProductGatewayMongo,
        {
          provide: 'ProductPersistenceGateway',
          useExisting: ProductGatewayMongo,
        },],
    }).compile();
    serviceCreateProduct = module.get<CreateProductService>(CreateProductService);
    serviceFindAllProduct = module.get<FindAllProductService>(FindAllProductService);
    model = module.get<Model<ProductModel>>(getModelToken('ProductModel'));
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(serviceCreateProduct).toBeDefined();
    expect(serviceFindAllProduct).toBeDefined();
  });

  it('should create a product', async () => {
    const product = await serviceCreateProduct.execute({
      name: 'Amazing Phone',
      price: 95.40,
    });

    expect(product.name).toBe('Amazing Phone');
    expect(product.price).toBe(95.40);
  
    const productCreated = await model.findOne({_id: product.id});
    expect(productCreated.name).toBe('Amazing Phone');
    expect(productCreated.price).toBe(95.40);
  });

  it('should return all products', async () => {
    await serviceCreateProduct.execute({
      name: 'Amazing Phone',
      price: 95.40,
    });

    const products = await serviceFindAllProduct.execute();
    expect(products.length).toBeGreaterThanOrEqual(1);
  });
});
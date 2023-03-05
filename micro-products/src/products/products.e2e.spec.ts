import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FindAllProductService } from './services/findall-product.service';

describe('Products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ProductsModule,
        MongooseModule
        .forRoot('mongodb://root:example@mongo:27017/micro-products?authSource=admin')
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST products`, async () => {
    const response = await request(app.getHttpServer())
      .post('/products/')
      .send({ name: 'Wise Clock', price: 9210 });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Wise Clock');
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
  });

  afterAll(async () => {
    await app.close();
  });
});
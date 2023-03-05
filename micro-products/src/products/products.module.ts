import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './entities/product.model';
import { ProductsController } from './products.controller';
import { ProductGatewayInMemory } from './gateways/product-in-memory.gateway';
import { CreateProductService } from './services/create-product.service';
import { ProductGatewayMongo } from './gateways/product-mongo.gateway';
import { FindAllProductService } from './services/findall-product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [
    CreateProductService,
    FindAllProductService,
    ProductGatewayInMemory,
    ProductGatewayMongo,
    {
      provide: 'ProductPersistenceGateway',
      useExisting: ProductGatewayMongo,
    },
  ]
})
export class ProductsModule {}

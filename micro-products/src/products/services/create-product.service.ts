import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import ProductFactory from '../factories/product.factory';
import { ProductGateway } from '../gateways/product.gateway';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('ProductPersistenceGateway')
    private productPersistenceGateway: ProductGateway,
  ) {}

  async execute(createProductDto: CreateProductDto) {
    const product = ProductFactory.create(
      '',
      createProductDto.name,
      createProductDto.price
    );
    
    return await this.productPersistenceGateway.create(product);
  }
}

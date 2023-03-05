import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductGateway } from "../gateways/product.gateway";
import { FindAllProductUseCase } from "./findall-product.usecase";

@Injectable()
export class FindAllProductService implements FindAllProductUseCase {
  constructor(
    @Inject('ProductPersistenceGateway')
    private productPersistenceGateway: ProductGateway,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.productPersistenceGateway.findAll();
  }
}
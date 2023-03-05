import { Product } from "../entities/product.entity";

export abstract class ProductGateway {
  abstract create(product: Product): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
}
import { Product } from "../entities/product.entity";

export abstract class FindAllProductUseCase {
  abstract execute(): Promise<Product[]>;
}
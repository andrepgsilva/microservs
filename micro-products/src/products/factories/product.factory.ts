import { Product } from "../entities/product.entity";

export default class ProductFactory {
  static create(id: string, name: string, price: number){
    return new Product({ id, name, price });
  }
}
import { Product } from "../entities/product.entity";

export class FindAllProductDtoResponse {
  readonly products: Object[];

  constructor(products: Product[]) {
    this.products = products.map(product => {
      return { 
        productId: product.id,
        price: product.price
      }
    });
  }
}
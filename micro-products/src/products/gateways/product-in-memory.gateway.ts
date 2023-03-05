import { Product } from '../entities/product.entity';
import { ProductModel } from '../entities/product.model';
import { ProductGateway } from './product.gateway';

export class ProductGatewayInMemory implements ProductGateway {
  private products: Array<Product> = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async create(product: Product): Promise<Product> {
    product.id = this.getLastId() + 1;
    this.products.push();

    return product;
  }

  private getLastId(): string {
    if (this.products.length === 0) return;

    const lastIndex = this.products.length - 1;

    return this.products[lastIndex].id;
  }
}

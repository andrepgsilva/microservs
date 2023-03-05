import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { ProductDocument, ProductModel } from '../entities/product.model';
import ProductFactory from '../factories/product.factory';
import { ProductGateway } from './product.gateway';

@Injectable()
export class ProductGatewayMongo implements ProductGateway {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>
  ) {}
  
  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel({
      name: product.name,
      price: product.price,
    });

    try {
      const result = await createdProduct.save();
      product.id = result._id.toHexString();
    } catch(e) {
      console.log(e.getMessage());
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    let productCollection: Product[] = [];

    try {
      const dbResponse = await this.productModel.find();

      productCollection = dbResponse.map((dbProduct) => {
        return (ProductFactory.create(
          dbProduct._id.toHexString(),
          dbProduct.name,
          dbProduct.price
        ));
      })

    } catch(e) {
      console.log(e.getMessage());
    }

    return productCollection;
  }
}

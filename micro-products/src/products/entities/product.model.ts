import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

export type ProductProps = {
  name: string;
  price: string;
};

@Schema()
export class ProductModel {
  constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  @Prop()
  name: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
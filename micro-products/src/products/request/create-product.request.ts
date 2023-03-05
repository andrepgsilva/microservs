import { IsNotEmpty, Min } from 'class-validator';
import { CreateProductDto } from "../dto/create-product.dto";

export class CreateProductRequest {
  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly price: number;

  handle(): CreateProductDto {
    return new CreateProductDto(this.name, this.price);
  }
}
import { CreateProductDto } from "../dto/create-product.dto";

export abstract class CreateProductUseCase {
  abstract execute(payload: CreateProductDto): Promise<void>;
}
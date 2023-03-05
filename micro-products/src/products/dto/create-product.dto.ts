export class CreateProductDto {
  constructor(readonly name: string, readonly price: number) {
    Object.assign(this, {name, price});
  }
}
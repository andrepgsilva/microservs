export class CreateProductResponseDto {
  constructor(readonly id: string, readonly name: string, readonly price: number) {
    Object.assign(this, {id, name, price});
  }
}
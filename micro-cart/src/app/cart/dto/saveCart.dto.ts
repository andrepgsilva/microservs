export class SaveCartDto {
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  products: [{
    productId: string,
    price: number,
    quantity: number,
  }]
}
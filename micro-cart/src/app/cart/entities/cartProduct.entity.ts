export class CartProduct {
  constructor(
    private _productId: string,
    private _price: number,
    private _quantity: number,
  ) {
    this._productId = _productId;
    this._price = _price;
    this._quantity = _quantity;

    this.isPriceValid();
    this.isQuantityValid();
  }

  get productId() {
    return this._productId;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }

  private isPriceValid() {
    if (this.price < 1) {
      throw new Error("The price value is invalid");
    }
  }

  private isQuantityValid() {
    if (this.quantity < 1) {
      throw new Error("The quantity value is invalid");
    }
  }
}
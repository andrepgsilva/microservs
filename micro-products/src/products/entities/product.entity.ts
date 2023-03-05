type ProductProps = {
  id?: string,
  name: string,
  price: number;
}

export class Product {
  private props: ProductProps;

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  constructor(props: ProductProps) {
    this.props = props;

    this.checkIfItHasAName();
    this.checkIfItHasAValidPrice();
  }

  private checkIfItHasAValidPrice() {
    if (this.price === null || this.price < 1) {
      throw new Error('The product price must be greater than zero');
    }

    return true;
  }

  private checkIfItHasAName() {
    if (this.name === '') {
      throw new Error('The product needs a name');  
    }

    return true;
  }
}
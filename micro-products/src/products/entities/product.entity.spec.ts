import { Product } from "./product.entity"

describe('Product Entity', () => {
  it('can create a product', () => {
    const data = {
      id: '2312',
      name: 'Happy Mug',
      price: 23.45
    };

    const product = new Product(data);

    expect({
      id: product.id,
      name: product.name,
      price: product.price
    }).toStrictEqual(data);
  })

  it('It cannot create a product with an invalid price', () => {
    expect(() => {
      const data = {
        id: '2312',
        name: 'Happy Mug',
        price: 0
      };
  
      new Product(data);
    }).toThrow(Error);
  })

  it('It cannot create a product with an invalid name', () => {
    expect(() => {
      const data = {
        id: '2313',
        name: '',
        price: 23.23
      };
  
      new Product(data);
    }).toThrow(Error);
  })
})
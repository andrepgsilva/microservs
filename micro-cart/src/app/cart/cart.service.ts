import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { SaveCartDto } from './dto/saveCart.dto';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { GetCartDto } from './dto/getCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ){}

  async get(body: GetCartDto): Promise<string | CartEntity> {
    const userCart = await this.cartRepository.findOneBy({ userId: body.userId });
    
    if (userCart === null) {
      return 'The user does not have any cart';
    }

    return userCart;
  }

  async save(data: SaveCartDto): Promise<CartEntity> {
    return this.cartRepository.save(this.cartRepository.create(data));
  }

  async add(body: AddProductToCartDto): Promise<string | CartEntity> {
    const resultMessage = 'Sucessfully Updated';
    const userCart = await this.cartRepository.findOneBy({ userId: body.userId });
    
    if (userCart === null) {
      const data: SaveCartDto = {
        userId: body.userId,
        totalPrice: body.quantity * body.price,
        totalQuantity: body.quantity,
        products: [{
          productId: body.productId,
          price: body.price,
          quantity: body.quantity,
        }]
      };
      
      this.cartRepository.save(this.cartRepository.create(data));
      return resultMessage;
    }

    userCart.totalQuantity += body.quantity;
    userCart.totalPrice += body.quantity * body.price;

    const productIndex = userCart.products.findIndex(product => {
      return product.productId == body.productId;
    })

    const userCartProductsAux = [...userCart.products];
    let newCart = [...userCartProductsAux, {
      productId: body.productId,
      price: body.price,
      quantity: body.quantity,
    }];

    if (productIndex === -1) {
      await this.cartRepository.update(userCart.id, { products:  newCart});
      
      return resultMessage;
    }

    newCart = [...userCartProductsAux];
    newCart[productIndex].quantity += body.quantity;
    await this.cartRepository.update(userCart.id, { products:  newCart});

    return resultMessage;
  }

  async remove(body: AddProductToCartDto): Promise<string | CartEntity> {
    const resultMessage = 'Sucessfully Deleted';
    const userCart = await this.cartRepository.findOneBy({ userId: body.userId });
    
    if (userCart === null) {
      return 'The cart is null';
    }

    if (userCart.totalQuantity - body.quantity < 0) {
      return 'You don\'t have enough items to remove';
    }

    userCart.totalQuantity -= body.quantity;
    userCart.totalPrice -= body.quantity * body.price;

    const productIndex = userCart.products.findIndex(product => {
      return product.productId == body.productId;
    })

    if (productIndex === -1) {
      return 'The product does not exist in the cart';
    }

    let newCart = [...userCart.products];
    newCart[productIndex].quantity -= body.quantity;
    
    await this.cartRepository.update(userCart.id, { products:  newCart});

    return resultMessage;
  }
}

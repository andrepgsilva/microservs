import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { GetCartDto } from './dto/getCart.dto';
import { SaveCartDto } from './dto/saveCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async index(@Body() body: GetCartDto) {
    return this.cartService.get(body);
  }

  @Post()
  async save(@Body() body: SaveCartDto) {
    return this.cartService.save(body);
  }

  @Post('add-product')
  async addProduct(@Body() body: AddProductToCartDto) {
    return this.cartService.add(body);
  }

  @Post('remove-product')
  async removeProduct(@Body() body: AddProductToCartDto) {
    return this.cartService.remove(body);
  }
}

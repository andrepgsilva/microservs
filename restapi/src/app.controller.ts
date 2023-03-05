import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('get-products-list')
  async getProducts() {
    return this.httpService.get('http://micro-products:3000/products');
  }

  @Post('get-cart')
  async getCart(@Body() body) {
    return this.httpService.post('http://micro-cart:3000/cart', body);
  }

  @Post('add-product')
  async addProductToCart(@Body() body) {
    return this.httpService.post('http://micro-cart:3000/cart/add-product', body);
  }
  
  @Post('remove-product')
  async removeProductFromCart(@Body() body) {
    return this.httpService.post('http://micro-cart:3000/cart/remove-product', body);
  }
}

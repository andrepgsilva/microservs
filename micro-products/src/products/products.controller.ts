import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductResponseDto } from './dto/create-product-response.dto';
import { FindAllProductDtoResponse } from './dto/findall-product-response.dto';
import { CreateProductRequest } from './request/create-product.request';
import { CreateProductService } from './services/create-product.service';
import { FindAllProductService } from './services/findall-product.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductsService: CreateProductService,
    private readonly findAllProductsService: FindAllProductService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() request: CreateProductRequest, response: CreateProductResponseDto) {
    const requestData = request.handle();
    const product = await this.createProductsService.execute(requestData);

    response = new CreateProductResponseDto(
      product.id,
      product.name,
      product.price
    );

    return response;
  }

  @Get()
  async findAll() {
    const productsFromService = await this.findAllProductsService.execute();
    
    return new FindAllProductDtoResponse(productsFromService).products;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SaveCartDto } from './dto/saveCart.dto';
import { CartEntity } from './entities/cart.entity';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            save: jest.fn()
          }
        }
      ]
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
    expect(cartService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new cart', async () => {
      const body: SaveCartDto = {
        userId: '221212',
        totalPrice: 1231,
        totalQuantity: 3,
        products: {
          productId: '2',
          price: 312,
          quantity: 3,
        }
      };

      const cartEntityMock = { ...body } as CartEntity;

      jest.spyOn(cartService, 'save').mockResolvedValue(cartEntityMock)

      const result = await cartController.save(body);

      expect(result).toBeDefined();
      expect(cartService.save).toBeCalledTimes(1);
    });
  });
});

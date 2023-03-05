import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from './cart.service';
import { SaveCartDto } from './dto/saveCart.dto';
import { CartEntity } from './entities/cart.entity';

describe('CartService', () => {
  let cartService: CartService;
  let cartRepository: Repository<CartEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          }
        }
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<CartEntity>>(getRepositoryToken(CartEntity));
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new cart with success', async () => {
      const data: SaveCartDto = {
        userId: '221212',
        totalPrice: 1231,
        totalQuantity: 3,
        products: {
          productId: '2',
          price: 312,
          quantity: 3,
        }
      } 

      const cartEntityMock = { ...data } as CartEntity;

      jest.spyOn(cartRepository, 'create').mockReturnValueOnce(cartEntityMock);
      jest.spyOn(cartRepository, 'save').mockResolvedValueOnce(cartEntityMock);

      const result = await cartService.save(data);
      
      expect(result).toBeDefined();
      expect(cartRepository.create).toBeCalledTimes(1);
      expect(cartRepository.save).toBeCalledTimes(1);
    })
  });
});

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })

export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string

  @Column({ name: 'total_price', nullable: false })
  totalPrice: number

  @Column({ name: 'total_quantity', nullable: false })
  totalQuantity: number

  @Column("simple-json")
  products: [{
    productId: string,
    price: number,
    quantity: number,
  }]
}

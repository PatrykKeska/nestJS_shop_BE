import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDto } from '../dto/shop-item.dto';
import { basketEntity } from './basket.entity';

@Entity()
export class shopItemsEntity extends BaseEntity implements ShopItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'int',
  })
  amount: number;

  @OneToMany(() => basketEntity, (entity) => entity.items)
  itemsInBasket: basketEntity[];
}

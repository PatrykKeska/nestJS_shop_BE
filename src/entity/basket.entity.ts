import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { userEntity } from './user.entity';
import { shopItemsEntity } from './shopItems.entity';

@Entity()
export class basketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @ManyToOne(() => shopItemsEntity, (entity) => entity.itemsInBasket)
  @JoinColumn()
  items: shopItemsEntity;

  @ManyToOne(() => userEntity, (entity) => entity.itemsInBasket)
  @JoinColumn()
  user: userEntity;
}

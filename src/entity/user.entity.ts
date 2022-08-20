import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { basketEntity } from './basket.entity';

@Entity()
export class userEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
    type: 'varchar',
  })
  email: string;

  @OneToMany(() => basketEntity, (entity) => entity.user)
  itemsInBasket: basketEntity[];
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { basketEntity } from './basket.entity';
import { UserDto } from '../dto/user.dto';

@Entity()
export class userEntity extends BaseEntity implements UserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
    type: 'varchar',
  })
  email: string;

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @OneToMany(() => basketEntity, (entity) => entity.user)
  itemsInBasket: basketEntity[];
}

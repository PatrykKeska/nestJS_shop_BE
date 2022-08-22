import { shopItemsEntity } from '../entity/shopItems.entity';
import { userEntity } from '../entity/user.entity';

export interface BasketDto {
  itemID: shopItemsEntity;
  userID: userEntity;
  amount: number;
}

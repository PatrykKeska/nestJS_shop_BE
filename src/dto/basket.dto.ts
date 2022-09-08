import { shopItemsEntity } from '../entity/shopItems.entity';

export interface BasketDto {
  itemID: shopItemsEntity;
  amount: number;
}

import {ProductInterface} from './IProduct'
export interface StorageInterface {
  ID ?: number;
  Key ?: string;

  ProductID ?: number;
  Product ?: ProductInterface;
}

import { ProductInterface } from "./IProduct";
export interface KeysoftwareInterface {
  ID?: number;
  Key?: string;
  Status_Key?: boolean;
  ProductID?: number;
  Product?: ProductInterface;
}

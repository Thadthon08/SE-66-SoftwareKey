import { ProductInterface } from "./IProduct";
export interface KeysoftwareInterface {
  ID?: number;
  Key?: string;
  Status?: boolean;
  ProductID?: number;
  Product?: ProductInterface;
}

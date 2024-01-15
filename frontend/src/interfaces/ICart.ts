import { ProductInterface } from "./IProduct";
import { UsersInterface } from "./IUser";

export interface CartInterface {
  ID: number;
  User_ID: number;
  User: UsersInterface;
  ProductID: number;
  Product: ProductInterface;
  Total: number;
}

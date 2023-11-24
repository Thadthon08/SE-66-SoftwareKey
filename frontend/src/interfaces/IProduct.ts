import { AdminsInterface } from "./IAdmin";
import { CategoryInterface } from "./ICategory";

export interface ProductInterface {
  ID?: number;
  Name?: string;
  Price?: number;
  Desciption?: string;
  Image?: string;

  AdminID?: number;
  Admin?: AdminsInterface;

  CategoryID?: number;
  Category?: CategoryInterface;
}

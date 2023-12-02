import { AdminsInterface } from "./IAdmin";
import { CategoryInterface } from "./ICategory";
import { ManufacturerInterface } from "./IManufacturer";

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

  ManufacturerID?: number;
  Manufacturer?: ManufacturerInterface;
}

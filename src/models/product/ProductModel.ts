import { BrandModel } from '@/models/product/BrandModel'
import { CategoryModel } from '@/models/product/CategoryModel'

export interface ProductModel {
  id: string;
  brand: BrandModel;
  category: CategoryModel;
  description: string;
  price: number;
  name: string;
}

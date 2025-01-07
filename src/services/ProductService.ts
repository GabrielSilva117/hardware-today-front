import FilterModel from '@/models/product/FilterModel'
import { ProductModel } from '@/models/product/ProductModel'
import axios, { AxiosResponse } from 'axios'

class ProductService {
  api

  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/products',
    })
  }

  getProductList (filter?: FilterModel): Promise<AxiosResponse<ProductModel[]>> {
    return this.api.post<ProductModel[]>('', filter)
  }
}

export default new ProductService()

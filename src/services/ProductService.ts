import FilterModel from '@/models/product/FilterModel'
import axios from 'axios'

class ProductService {
  api

  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/products',
    })
  }

  getProductList (filter?: FilterModel) {
    return this.api.get('', { params: filter })
  }
}

export default new ProductService()

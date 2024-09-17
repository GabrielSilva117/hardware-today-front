import axios from 'axios'

class ProductService {
  api

  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/products',
    })
  }

  getProductList () {
    return this.api.get('')
  }
}

export default new ProductService()

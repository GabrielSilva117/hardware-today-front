import axios from 'axios'
import UserModel from '../models/user/UserModel'

class UserService {
  api

  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/user',
    })
  }

  post (data: UserModel, resource: string = '') {
    // console.log(process.env.VUE_APP_API_URL)

    return this.api.post(resource, data)
  }

  get (resource: string = '') {
    return this.api.get(resource)
  }
}

export default new UserService()

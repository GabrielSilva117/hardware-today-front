<template>
  <v-list lines="two">
    <v-list-item v-for="product in products" :key="product.id" :subtitle="product.description" :title="product.name">
      <p>Brand: {{ product.brand.name }}</p>
      <p>Category: {{ product.category.name }}</p>
      <p>R$ {{ product.price }}</p>
    </v-list-item>
  </v-list>
<!--  <div  class="products-list-container">-->

<!--  </div>-->
</template>

<script setup lang="ts">
  import { ProductModel } from '@/models/product/ProductModel'
  import ProductService from '@/services/ProductService'

  const products: ProductModel[] = await getProducts()

  async function getProducts () : Promise<ProductModel[]> {
    const prodList = await ProductService.getProductList()
    return prodList.data
  }
</script>

<style scoped lang="css">
  .products-list-container {
    display: grid;
    justify-items: center;
    margin-top: 10px
  }
</style>

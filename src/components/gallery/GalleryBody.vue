<template>
  <v-responsive
    class="align-centerfill-height mx-auto mt-3"
    max-width="900"
  >
    <FilterContainer :products="products" @filter-products="filterProducts" />
    <ProductListContainer :products="products" />
  </v-responsive>
</template>

<script setup lang="ts">
  import { ProductModel } from '@/models/product/ProductModel'
  import ProductService from '@/services/ProductService'

  const products: ProductModel[] = await getProducts()

  function filterProducts (products: ProductModel[]) {
    console.log(products)
  }

  async function getProducts () : Promise<ProductModel[]> {
    const prodList = await ProductService.getProductList()
    console.log(prodList.data)
    return prodList.data
  }
</script>

<style scoped lang="css">

</style>

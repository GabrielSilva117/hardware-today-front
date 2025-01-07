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
  import { ref } from 'vue'

  const products = ref<ProductModel[]>([])

  function filterProducts (filteredProds: ProductModel[]) {
    products.value = filteredProds
  }

  await getProducts()

  async function getProducts () : Promise<void> {
    const prodList = await ProductService.getProductList()
    products.value = prodList.data
  }
</script>

<style scoped lang="css">

</style>

<template>
  <v-list lines="two">
    <v-list-item v-for="product in props.products" :key="product.id" :subtitle="product.description" :title="product.name">
      <p>Brand: {{ product.brand.name }}</p>
      <p>Category: {{ product.category.name }}</p>
      <p>R$ {{ product.price }}</p>
    </v-list-item>
  </v-list>
<!--  <div  class="products-list-container">-->

<!--  </div>-->
</template>

<script setup lang="ts">
  const props = defineProps({
    products: { type: Array, required: true },
  })
</script>

<style scoped lang="css">
  .products-list-container {
    display: grid;
    justify-items: center;
    margin-top: 10px
  }
</style>

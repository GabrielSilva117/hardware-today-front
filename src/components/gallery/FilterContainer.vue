<script setup lang="ts">
  import { BrandModel } from '@/models/product/BrandModel'
  import { CategoryModel } from '@/models/product/CategoryModel'
  import FilterModel from '@/models/product/FilterModel'
  import ProductService from '@/services/ProductService'

  const props = defineProps({
    products: { type: Array, required: true },
  })

  const price = ref([0])
  const category: CategoryModel[] = []
  const brand: BrandModel[] = []

  const selectedBrands = ref([])
  const selectedCategories = ref([])

  for (const product of props.products) {
    if (!price.value[1] || price.value[1] < product.price) {
      price.value[1] = product.price
    }

    if (category.length === 0 || category.findIndex(v => v.name === product.category.name) === -1) {
      category.push(product.category)
    }

    if (brand.length === 0 || brand.findIndex(v => v.name === product.brand.name) === -1) {
      brand.push(product.brand)
    }
  }

  // watch(selectedCategories, (newVal) => {
  //   console.log('Selected categories:', newVal)
  // })

  const filterProductList = async () => {
    const brandIds = getCSUUIDs(selectedBrands)
    const categoryIds = getCSUUIDs(selectedCategories)

    const filterObj: FilterModel = {
      minPrice: price.value[0],
      maxPrice: price.value[1],
      brand: brandIds,
      category: categoryIds,
    }

    this.$emit('filterProducts', await ProductService.getProductList(filterObj))
  }

  function getCSUUIDs (target: Array<any>) {
    let res = ''

    target.value.forEach(v => {
      res += !res ? v.id : ', ' + v.id
    })

    return res
  }
  // console.log(brand)
  // console.log(category)
  // function checkIfValueInArray(array: Array, callback: function) {
  //   if (array.length === 0 || callback) {}
  // }

  onMounted(() => {
    this.filterProductList = this.filterProductList.bind(this)
  })
</script>

<template>
  <v-expansion-panels variant="inset">
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="">
        <h3>Filters</h3>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="d-flex">
        <v-row>
          <v-col cols="6">
            <v-combobox
              v-model="selectedCategories"
              chips
              clearable
              item-title="name"
              item-value="id"
              :items="category"
              label="Category"
              multiple
            />
          </v-col>

          <v-col cols="6">
            <v-combobox
              v-model="selectedBrands"
              chips
              clearable
              item-title="name"
              item-value="id"
              :items="brand"
              label="Brand"
              multiple
            />
          </v-col>

          <v-col cols="12">
            <v-range-slider
              v-model="price"
              hide-details
              :max="9999"
              :min="0"
              :step="1"
              strict
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="price[0]"
                  density="compact"
                  hide-details
                  single-line
                  style="width: 100px"
                  type="number"
                  variant="outlined"
                />
              </template>
              <template v-slot:append>
                <v-text-field
                  v-model="price[1]"
                  density="compact"
                  hide-details
                  single-line
                  style="width: 100px"
                  type="number"
                  variant="outlined"
                />
              </template>
            </v-range-slider>
          </v-col>
          <v-col cols="12">
            <v-btn-group class="filter-btn-group">
              <v-btn variant="outlined" @click="filterProductList">Filter</v-btn>
            </v-btn-group>
          </v-col>
        </v-row>
      </v-expansion-panel-text>

    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped lang="css">
  .filter-btn-group {
    display: flex;
    justify-content: flex-end;
  }
</style>

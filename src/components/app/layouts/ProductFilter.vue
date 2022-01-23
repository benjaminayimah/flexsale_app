<template>
     <div v-for="filter in getAllFilters" :key="filter.id">
        <div v-if="filter.tag_id == $route.params.id">
            <div v-for="product in getProducts" :key="product.id">
                <product-row v-if="product.id == filter.product_id" v-bind:product="product" />
            </div>
        </div>
    </div>
                <!-- <product-row v-bind:product="product" /> -->
   
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../includes/ProductRow.vue'


export default {
  components: { ProductRow },
    name: 'ProductFilter',

    computed: mapGetters(['getProducts', 'getTags', 'getAllFilters']),
    methods: {
        getFilters() {
            this.$store.dispatch('fetchFilters', this.$route.params.id)
        }
    },
    created() {
        this.getFilters()
    }
}
</script>
<template>
    <product-row v-for="product in getProducts" :key="product.id" v-bind:product="product" />
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../includes/ProductRow.vue'

export default {
    name: 'AllProducts',
    components: { ProductRow },
    computed: mapGetters(['getProducts'])
}
</script>
<template>
    <product-row v-for="product in getProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))" :key="product.id" v-bind:product="product" />
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../includes/ProductRow.vue'

export default {
    name: 'AllProducts',
    components: { ProductRow },
    computed: {
        ...mapGetters(['getProducts'])
    }
}
</script>
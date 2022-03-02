<template>
    <product-row v-for="filter in filteredProducts" :key="filter.id"  v-bind:product="filter" />
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../includes/ProductRow.vue'


export default {
  components: { ProductRow },
    name: 'ProductFilter',
    computed: {
        ...mapGetters(['getAllFilters']),
        filteredProducts: function () {
        return this.getAllFilters.filter(product => product.tag_id === this.$route.params.id)
        }
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        getFilters() {
            this.$store.dispatch('fetchFilters')
        }
    },
    beforeMount() {
        this.getFilters()
        //console.log(this.getAllFilters)
    },
}
</script>
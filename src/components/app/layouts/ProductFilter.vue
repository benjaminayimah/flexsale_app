<template>
     <div v-for="filter in getAllFilters" :key="filter.id">
         <product-row v-if="filter.tag_id == $route.params.id" v-bind:product="filter" />
    </div>
    <!-- <product-row v-for="filter in newFilter" :key="filter.id" v-bind:product="filter" /> -->
   
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../includes/ProductRow.vue'


export default {
  components: { ProductRow },
    name: 'ProductFilter',
    computed: mapGetters(['getProducts', 'getAllFilters']),
    data() {
        return {
            newFilter: []
        }
    },
    methods: {
        getFilters() {
            this.$store.dispatch('fetchFilters')
        }
    },
    beforeMount() {
        this.getFilters()
    },
    // beforeUpdate() {
    //     this.newFilter = this.getAllFilters.filter(filter => filter.tag_id === this.$route.params.id)
    // }
}
</script>
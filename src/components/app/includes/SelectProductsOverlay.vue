<template>
    <teleport to="#selection_title">
        <h3>Select Products</h3>
        <div class="flex">
            <span class="count">{{ getTempContainer.array.length }}</span><span class="text">items selected</span>
        </div>
    </teleport>
    <teleport to="#selection_sheet_body">
        <ul>
            <add-tag-row v-for="product in getProducts.sort((a, b) => a.name.localeCompare(b.name))" :key="product.id" v-bind:product="product" />
        </ul>
    </teleport>
</template>
<script>
import AddTagRow from './AddTagRow.vue'
import { mapGetters } from 'vuex'
export default {
  components: { AddTagRow },
    name: 'SelectProductOverlay',
    computed: {
        ...mapGetters(['getProducts', 'getTempContainer'])
    }
}
</script>
<style scoped lang="scss">

h3{
    margin: 0;
}
.count{
    color: $primary-color;
}
.text{
    color: $gray-color;
    font-weight: 500;
}
ul{
    height: 100px;
    padding-left: 0;
} 

</style>
                                
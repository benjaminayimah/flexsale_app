<template>
    <teleport to="#selection_title">
        <h3>Search by Product</h3>
        <span class="text">Select from product list or type into the search field</span>
    </teleport>
    <teleport to="#selection_sheet_body">
        product list
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import TagSelectionGridItem from './TagSelectionGridItem.vue'
export default {
    components: { TagSelectionGridItem },
    name: 'SelectSearchOverlay',
    computed: mapGetters(['getSelectionSheet']),
}
</script>
<style scoped lang="scss">
h3{
    margin: 0;
}
.text{
    color: $gray-color;
    font-weight: 500;
}



</style>
                                
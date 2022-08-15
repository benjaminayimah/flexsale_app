<template>
    <teleport to="#selection_title">
        <h3>Add to tag</h3>
        <span class="text">Choose a tag to place your product</span>
    </teleport>
    <teleport to="#selection_sheet_body">
        <div class="grid" v-if="getTags.length > 0">
            <tag-selection-grid-item v-for="tag in getTags.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))" :key="tag.id" v-bind:tag="tag" v-bind:prodID="getSelectionSheet.prodID"/>
        </div>
        <div v-else class="flex-col empty-state">
            <h2>You have no Tag created</h2>
            <div>Start by creating a new tag.</div>
            <button class="button button-primary" @click.prevent=" $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'tag'})">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
            </svg>
            <span>Create tag</span>
        </button>
        </div>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import TagSelectionGridItem from './TagSelectionGridItem.vue'
export default {
  components: { TagSelectionGridItem },
    name: 'SelectTagOverlay',
    computed: mapGetters(['getSelectionSheet', 'getTags']),
    created() {
        this.$store.dispatch('fetchFilters')
    }
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
.grid{
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    margin: 30px 0;
}
.empty-state{
    padding-top: 0;
    height: 100%;
    justify-content: center;
}



</style>
                                
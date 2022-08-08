<template>
    <div class="main-page-body" v-if="getTrash.length > 0">
        <div class="prod-main-custom-table">
            <div class="page-info page-info-default flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path id="Path_2104" data-name="Path 2104" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15H11V11h2Zm0-8H11V7h2Z" transform="translate(-2 -2)" fill="#212121"/>
                </svg>
                <span>Items in Trash will be permanently deleted after <strong>30 days.</strong> </span>
            </div>
            <div class="table">
                <div class="table-body">
                    <div class="table-menu flex">
                        <div v-if="getBulkSelection.active" class="flex gap-8  align-items-center">
                            <button class="button button-secondary cancel-btn" @click.prevent="$store.commit('toggleBulkSeletion')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                    <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                </svg>
                            </button>
                            <span class="selection-count">{{ getBulkSelection.array.length }}</span>
                            <span class="cap">items selected</span>
                        </div>
                        <div></div>
                        <div v-show="!getBulkSelection.active" class="category-pill">
                            <div class="pill-wrap">
                                <ul class="flex-row-st">
                                    <li><a @click.prevent="$store.commit('toggleBulkSeletion')" href="#">Select</a></li>
                                    <li><a href="#" class="perm-delete" @click.prevent="$store.commit('setTrashRestoreDeleteModal', { type: 'bulk-Delete', count: getTrash.length })">Empty trash</a></li>
                                </ul>
                            </div>
                        </div>
                        <div v-show="getBulkSelection.active && getBulkSelection.array.length > 0" class="category-pill">
                            <div class="pill-wrap">
                                <ul class="flex-row-st">
                                    <li><a @click.prevent="$store.commit('setTrashRestoreDeleteModal', { type: 'bulk-Restore', count: getBulkSelection.array.length })" class="rounded-button" href="#">Restore selected</a></li>
                                    <li><a @click.prevent="$store.commit('setTrashRestoreDeleteModal', { type: 'delete-Selected', count: getBulkSelection.array.length })" href="#" class="perm-delete">Delete selected</a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <product-row v-for="product in getTrash.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))" :key="product.id" v-bind:product="product" />
                </div>
            </div>
        </div>
    </div>
    <div class="empty-state flex-col" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" height="150" viewBox="0 0 204 204">
            <g id="trash" transform="translate(60.818 60.818)">
                <path d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                <path d="M968.731-10432.646a9.6,9.6,0,0,1-9.555-8.939l-3.953-60.019H946.24a1.916,1.916,0,0,1-1.917-1.914,1.917,1.917,0,0,1,1.917-1.917h24.9v-9.577a5.747,5.747,0,0,1,5.745-5.748h19.156a5.749,5.749,0,0,1,5.748,5.746v9.579h24.9a1.916,1.916,0,0,1,1.914,1.917,1.916,1.916,0,0,1-1.914,1.914h-8.9l-4.038,60.019a9.6,9.6,0,0,1-9.558,8.939Zm6.242-82.368v9.579h22.987v-9.579a1.916,1.916,0,0,0-1.917-1.914H976.887A1.915,1.915,0,0,0,974.972-10515.015Z" transform="translate(-945.283 10517.884)" fill="#566ff4"/>
                <path d="M971.141-10484.365v-34.479a1.916,1.916,0,0,1,1.914-1.917,1.917,1.917,0,0,1,1.917,1.917v34.479a1.917,1.917,0,0,1-1.917,1.917A1.916,1.916,0,0,1,971.141-10484.365Zm-13.368,0v-34.479a1.916,1.916,0,0,1,1.914-1.917,1.917,1.917,0,0,1,1.917,1.917v34.479a1.917,1.917,0,0,1-1.917,1.917A1.916,1.916,0,0,1,957.773-10484.365Zm-13.45,0v-34.479a1.917,1.917,0,0,1,1.917-1.917,1.916,1.916,0,0,1,1.914,1.917v34.479a1.916,1.916,0,0,1-1.914,1.917A1.917,1.917,0,0,1,944.323-10484.365Z" transform="translate(-918.466 10552.36)" fill="#d7dcfa"/>
            </g>
        </svg>

        <h1>Trash is Empty</h1>
        <div>Items in Trash will be permanently <br> deleted after 30 days.</div>
    </div>   
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../../components/app/includes/ProductRow.vue'

export default {
    name: 'Trash',
    components: { ProductRow },
    computed: mapGetters(['getTrash', 'getBulkSelection']),
     data() {
        return {
            title: 'Trash'
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
        this.$store.dispatch('fetchTrash')
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: true}
            this.$store.commit('setPagetitle', title)
        }
    },
    unmounted() {
        this.$store.commit('clearSelection')
    }
}
</script>
<style scoped lang="scss">
.table-menu{
    justify-content: space-between;
}
.cancel-btn{
    margin-right: 10px;
}
.selection-count{
    color: $primary-color;
}
.cap, .selection-count {
    font-weight: 600;
}
.perm-delete{
    border-color: $danger !important;
}
</style>
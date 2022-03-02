<template>
    <h1 id="page_title">Manage Tags</h1>
    <div id="tags" class="main-page-body">
        <div class="info-card">
            <div class="card-outer">
                <button class="add-new flex-column" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'tag'})">
                    <i class="flex-column">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582" data-v-b2891468=""><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff" data-v-b2891468=""></path>
                        </svg>
                    </i>
                    <span>Create new</span>
                </button>
            </div>
                <tag-items v-for="tag in getTags" :key="tag.id" v-bind:tag="tag" v-bind:filters="getAllFilters" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import TagItems from '../../components/app/includes/TagItems.vue'
export default {
  components: { TagItems },
    name: 'Tags',
    computed: mapGetters(['getTags', 'getAllFilters']),
    data() {
        return {
            newFilter: []
        }
    },
    methods: {
        setPage() {
            const title = { title: 'Manage Tags', back: false}
            this.$store.commit('setPagetitle', title)
        },
        getFilters() {
            this.$store.dispatch('fetchFilters')
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    beforeMount() {
        this.getFilters()
    }
}
</script>
<style scoped lang="scss">
.info-card{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .card-outer{
        width: 33.3%;
        padding: 10px;
        .add-new{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            border-radius: 24px;
            height: 195px;
            background-color: $primary-color;
            color: #ffffff;
            i{
                padding: 10px;
                height: 40px;
                width: 40px;
            }
            span{
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
}

</style>
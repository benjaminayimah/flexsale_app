<template>
    <h1 id="page_title">{{ title }}</h1>
    <div id="tags" class="main-page-body" v-if="getTags.length > 0">
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
            <tag-items v-for="tag in getTags.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))" :key="tag.id" v-bind:tag="tag" v-bind:filters="getAllFilters" />
        </div>
    </div>
    <div v-else class="flex-col empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 204 204">
            <g transform="translate(60.818 60.818)">
                <path d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                <path d="M-4144.227-181.952-4175-212.726V-243.5h30.773l30.773,30.774a8.489,8.489,0,0,1,2.5,6.039,8.489,8.489,0,0,1-2.5,6.039l-18.7,18.7a8.47,8.47,0,0,1-6.035,2.5A8.488,8.488,0,0,1-4144.227-181.952Zm-26.5-32.543,29.528,29.52a4.251,4.251,0,0,0,3.021,1.254,4.266,4.266,0,0,0,3.018-1.254l18.693-18.7a4.256,4.256,0,0,0,1.252-3.019,4.249,4.249,0,0,0-1.252-3.02l-29.521-29.52h-24.738Zm6.406-9.79a8.539,8.539,0,0,1,8.539-8.54,8.54,8.54,0,0,1,8.541,8.54,8.54,8.54,0,0,1-8.541,8.54A8.539,8.539,0,0,1-4164.325-224.285Zm4.27,0a4.269,4.269,0,0,0,4.269,4.27,4.269,4.269,0,0,0,4.27-4.27,4.269,4.269,0,0,0-4.27-4.27A4.269,4.269,0,0,0-4160.055-224.285Z" transform="translate(4184.158 252.657)" fill="#566ff4"/>
            </g>
        </svg>
        <h1>Tag list is empty</h1>
        <div>Add your tags</div>
        <button class="button button-primary" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'tag'}) : this.$store.commit('forceSetOnboard', 'intro')">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
            </svg>
            <span>Add tags</span>
        </button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import TagItems from '../../components/app/includes/TagItems.vue'
export default {
  components: { TagItems },
    name: 'Tags',
    computed: mapGetters(['getTags', 'getAllFilters', 'getStores']),
    data() {
        return {
            title: 'Manage Tags',
            newFilter: []
        }
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
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
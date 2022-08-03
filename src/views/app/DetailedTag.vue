<template>
<!-- <h1 id="page_title">{{ $route.params.id }}</h1> -->
<div class="main-page-body">
    <div class="mini-body" v-if="getTempContainer.active">
        <div class="mini-body-hold">
            <div class="mini-header-hold flex-row-js">
                <h1 class="text-overflow-ellipsis">{{ getTempContainer.array.length }} items</h1>
                <div class="flex-row">
                    <button class="icon-label-btn flex-row" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'tag'})">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711"><path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"></path></svg>
                        <span class="hide-mob">Edit</span>
                    </button>
                    <button class="icon-label-btn flex-row delete" @click.prevent="$store.commit('setDeleteModal', { id: $route.params.id, type: 'tag' } )">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 21.5 23.166"><path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)" fill="#0e142c"></path></svg>
                        <span class="text-overflow-ellipsis hide-mob">Delete</span>
                    </button>
                </div>
            </div>
            <div class="mini-body-content">
                <ul>
                    <selected-tag-row v-for="checked in getTempContainer.array" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="false" />
                </ul>
            </div>
        </div>
    </div>
    <div v-else>
        item does not exists
    </div>
</div>
    
</template>
<script>
import { mapGetters } from 'vuex'
import SelectedTagRow from '../../components/app/includes/SelectedTagRow.vue'
export default {
  components: { SelectedTagRow },
    name: 'DetailedTag',
    computed: mapGetters(['getAllFilters', 'getToken', 'getHostname', 'getTempContainer' ]),
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
        
    },
    created() {
        window.scrollTo(0,0)
        this.$store.dispatch('fetchThisFilter', this.$route.params.id)
    },
    beforeUpdate() {
        this.setPage()
    },
    unmounted() {
        this.$store.commit('clearTempDataContainer')
    }
}
</script>

<style scoped lang="scss">
h1{
    margin: 0;
}
ul{
    margin: 20px 0;
    padding-left: 0;
}
.mini-header-hold{
    display: flex;
}
.delete{
    span{
        color: $danger;
    }
    svg path{
        fill: $danger;
    }
}
</style>
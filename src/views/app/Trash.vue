<template>
    <div class="main-page-body" v-if="getTrash.length > 0">
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
export default {
    name: 'Trash',
    computed: mapGetters(['getTrash']),
     data() {
        return {
            title: 'Trash'
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: true}
            this.$store.commit('setPagetitle', title)
        }
    }
}
</script>
<style scoped lang="scss">
.empty-state {
    margin: 0;
    padding-top: 120px;
    text-align: center;
    align-items: center;
}
</style>
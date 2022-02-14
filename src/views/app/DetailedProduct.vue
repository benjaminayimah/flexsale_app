<template>
<div class="main-page-body">
    <!-- <transition name="fade"> -->
        <div v-if="getTempContainer.data.name">
            <div class="header">
                <div class="cover-image bg-img" :style="{ backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+getTempContainer.data.image+')' }">
                    <div class="cover-image-backdrop"></div>
                    <div class="flex-row action-btn-hold">
                        <button class="icon-label-btn image-icon menu-toggle-btn flex-row" @click.prevent="$store.commit('getMainHomeWidth', 'product')">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#ffffff"/>
                            </svg>
                        </button>
                        <button class="icon-label-btn menu-toggle-btn flex-row" @click.prevent="">
                            <i></i>
                            <i></i>
                            <i></i>
                        </button>
                    </div>
                    <div class="cover-caption">
                        <div class="flex align-items-center">
                            <h1>{{ getTempContainer.data.name }}</h1>
                            </div>
                            <div class="flex-row caption-row"><span v-if="getTempContainer.data.batch_no">({{ getTempContainer.data.batch_no }})</span></div>
                            <p></p>
                        <div class="flex-row caption-row"><label>Created:</label><span>{{ dateTime(getTempContainer.data.created_at) }}</span></div>
                        <div class="flex-row caption-row"><label>By:</label><span>{{ getTempContainer.data.added_by }}</span></div>
                    </div>
                </div>
            </div>
            <div class="table-body">
                <div class="table-menu flex-row-js">
                    <div class="category-pill pill">
                        <div class="pill-wrap">
                            <ul class="flex-row-st">
                                <li><router-link replace :to="'/product/'+getTempContainer.data.id+'/'+getTempContainer.data.name">Details</router-link></li>
                                <li><router-link replace :to="'/product/stats/'+getTempContainer.data.id+'/'+getTempContainer.data.name">Statistics</router-link></li>
                                <li><router-link replace :to="'/product/logs/'+getTempContainer.data.id+'/'+getTempContainer.data.name">Activity logs</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
        
    <!-- </transition> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'DetailedProduct',
    computed: mapGetters(['getProducts', 'getHostname', 'getUser', 'getTempContainer']),
    data() {
        return {
            product: {}
        }
    },
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
        fetchThisProduct() {
            this.$store.dispatch('fetchThisProduct', this.$route.params.id)
        },
        dateTime(value) {
        return moment(value).format('MMM DD, YYYY hh:mm a')
        },
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
        this.fetchThisProduct()
    },
    unmounted() {
        this.$store.commit('clearTempDataContainer')
    },
}
</script>
<style scoped lang="scss">
.cover-image{
    height: 350px;
    border-radius: 20px;
    position: relative;
    .action-btn-hold{
        position: absolute;
        top: 15px;
        right: 15px;
        border-radius: 16px;
        z-index: 10;

    }
    .cover-image-backdrop{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 70%;
        width: 100%;
        //background-color: rgba($color: #000000, $alpha: 0.2);
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
        border-radius: inherit;
    }
}
.cover-caption{
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
    width: 70%;
    flex-direction: column;
    padding: 40px 32px;
    color: #fff;
    position: absolute;
    h1{
        margin: 0;
        font-size: 2.2rem;
        font-weight: 800;
    }
    p{
        margin: 8px 0;
        font-size: 1.1rem;
    }
}
.icon-label-btn{
    padding: 12px 10px;
    background-color: #fff;
    margin-left: 5px;
}
.caption-row{
    font-size: 0.98rem;
    label{
        margin: 0 6px 0 0;
    }
    span{
        color: $dark-light;
    }
}

.image-icon{
    background-color: rgba($color: #000000, $alpha: 0.4);
    margin-right: 10px;
    svg path {
        fill: #ffffff;
    }
    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.8);
    }
}

.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}
</style>
<template>
<div class="main-page-body">
    <!-- <transition name="fade"> -->
        <div v-if="getTempContainer.data.name">
            <div class="header">
                <div class="cover-image bg-img" :style="getTempContainer.data.image ? { backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+getTempContainer.data.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}">
                    <div class="cover-image-backdrop"></div>
                    <div class="flex-row action-btn-hold">
                        <!-- <button class="icon-label-btn image-icon menu-toggle-btn flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#ffffff"/>
                            </svg>
                        </button> -->
                        <button class="icon-label-btn menu-toggle-btn flex-row" @click.prevent="doMenu()">
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
                        <div class="flex-row caption-row"><label>Created:</label><span>{{ dateTime(getTempContainer.data.created_at) }}</span></div>
                        <div class="flex-row caption-row"><label>By:</label><span>{{ getTempContainer.data.added_by }}</span></div>
                    </div>
                    <teleport to="body">
                        <transition name="fade">
                            <backdrop v-if="toggleMenu" @mousedown="doMenu()" />
                        </transition>
                    </teleport>
                    <transition :name="getMobile? 'slide' : ''">
                        <div class="menu" v-if="toggleMenu" :class="[{ 'show-menu' : toggleMenu && !getMobile}, { 'menu-card-mob': getMobile}]">
                            <div class="title" v-show="getMobile">
                                <div>Menu</div>
                                <button @click.prevent="doMenu()">
                                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                                    </svg>
                                </button>
                            </div>
                            <ul>
                                <li @click.prevent="doMenu()"><a href="javascript: void" @click.prevent="$store.commit('getMainHomeWidth', 'product')">Edit product</a></li>
                                <li><a href="javascript: void">Update stock</a></li>
                                <li @click.prevent="doMenu()"><a href="javascript: void" @click.prevent="$store.commit('setDeleteModal', { id: $route.params.id, type: 'product' } )">Delete</a></li>
                            </ul>
                        </div>
                    </transition>
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
import Backdrop from '../../components/app/includes/Backdrop.vue'
export default {
  components: { Backdrop },
    name: 'DetailedProduct',
    computed: mapGetters(['getProducts', 'getHostname', 'getUser', 'getTempContainer', 'getMobile', 'getDefaultImage']),
    data() {
        return {
            product: {},
            toggleMenu: false,
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
        doMenu() {
            if(this.toggleMenu == false) {
                this.toggleMenu = true
                document.body.classList.add('fixed-body')
            }else{
                this.toggleMenu = false
                document.body.classList.remove('fixed-body')
            }
        },
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
        this.fetchThisProduct()
    },
    beforeUpdate() {
        this.setPage()
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
    box-shadow: 0 1px 3px 0 rgb(14 20 44 / 15%);
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
        height: 45%;
        width: 100%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
        border-radius: inherit;
    }
}
.menu-toggle-btn{
    background-color: rgba($color: #000000, $alpha: 0.4) !important;
    i {
        background-color: #ffffff !important;
    }
    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.8) !important;
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
        margin: 0 0 8px 0;
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
.slide-enter-from,
.slide-leave-to {
  transform: translateY(240px);
  
}




.menu{
    position: absolute;
    background-color: #ffffff;
    z-index: 200;
    padding: 20px 0;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    //0 1px 6px 0 rgb(14 20 44 / 18%);
    border-radius: 16px;
    width: 200px;
    ul{
        padding: 0;
        list-style-type: none;
        display: flex;
        margin: 0;
        flex-direction: column;
        li{
            display: flex;
            height: 50px;
            width: 100%;
            a{
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                color: $dark;
                text-decoration: none;
                transition: 0.3s all;
                padding: 0 20px;
                font-weight: 500;
            }
            &:hover a{
                background-color: $dark-light;
            }
        }
    }
}
.show-menu{
    right: 13px;
    top: 40px
}
.menu-card-mob{
    right: 0;
    padding: 25px 0;
    position: fixed;
    bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 1.4rem;
        button{
            border-radius: 50%;
            padding: 10px;
            background-color: #f0f3ff;
        }
    }
   
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
</style>
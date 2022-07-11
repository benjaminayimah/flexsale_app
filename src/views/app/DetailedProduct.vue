<template>
<div class="main-page-body">
    <!-- <transition name="fade"> -->
        <div class="prod-main-custom-table" v-if="getTempContainer.data.name">
            <div class="header detailed-items-banner-holder">
                <div v-if="getTempContainer.data.deleted" class="flex gap-8 justify-content-center perm-delete-row">
                <button class="button button-secondary rounded-button" @click.prevent="$store.dispatch('restoreThisProduct', getTempContainer.data.id)">Restore this product</button>
                <button class="button button-secondary perm-delete" @click.prevent="$store.commit('setDeleteModal', { id: getTempContainer.data.id, type: 'product' })">Permanently Delete</button>
                </div>
                <div class="cover-image bg-img" :style="getTempContainer.data.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+getTempContainer.data.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}">
                    <div class="cover-image-backdrop"></div>
                    <div class="flex-row action-btn-hold">
                        <!-- <button class="icon-label-btn image-icon menu-toggle-btn flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#ffffff"/>
                            </svg>
                        </button> -->
                        <button class="icon-label-btn menu-toggle-btn flex-row" @click.prevent="doMenu">
                            <i></i>
                            <i></i>
                            <i></i>
                        </button>
                    </div>
                    <div class="cover-caption">
                        <div class="flex align-items-center">
                            <h1>{{ getTempContainer.data.name }}</h1>
                        </div>
                        <div v-if="!computeSupplier == false">
                            <div class="flex-row caption-row"><label>Supplied by:</label><router-link :to="{ name: 'DetailedSupplier', params: { id: computeSupplier.id, name: computeSupplier.name} }">{{computeSupplier.name }}</router-link></div>
                        </div>
                        <div class="flex-row caption-row"><span v-if="getTempContainer.data.batch_no">({{ getTempContainer.data.batch_no }})</span></div>
                        <div class="flex-row caption-row"><label>Created:</label><span>{{ dateTime(getTempContainer.data.created_at) }}</span></div>
                        <div class="flex-row caption-row"><label>By:</label><span>{{ getTempContainer.data.added_by }}</span></div>
                    </div>
                    <teleport to="body">
                        <transition name="fade">
                            <backdrop v-if="toggleMenu" @mousedown="doMenu" />
                        </transition>
                    </teleport>
                    <transition :name="getMobile? 'slide' : ''">
                        <div class="menu" v-if="toggleMenu" :class="[{ 'show-menu' : toggleMenu && !getMobile}, { 'menu-card-mob': getMobile}]">
                            <div class="title" v-show="getMobile">
                                <div>Menu</div>
                                <button @click.prevent="doMenu">
                                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                                    </svg>
                                </button>
                            </div>
                            <ul>
                                <li v-if="!getTempContainer.data.deleted" @click.prevent="closeJustMenu()"><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'product', id: $route.params.id })">Edit product</a></li>
                                <li v-if="!getTempContainer.data.deleted" @click.prevent="closeJustMenu()"><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: $route.params.id })">Update stock</a></li>
                                <li v-if="!getTempContainer.data.deleted" @click.prevent="closeJustMenu()"><a href="#" @click.prevent="$store.commit('setSelectionSheet', { type: 'tag', id: $route.params.id })">Add to tag</a></li>
                                <li v-if="getTempContainer.data.deleted" @click.prevent="closeJustMenu()"><a href="#" @click.prevent="$store.dispatch('restoreThisProduct', getTempContainer.data.id)">Restore</a></li>
                                <li @click.prevent="closeJustMenu()"><a :class="{ 'perm-delete' : getTempContainer.data.deleted }" href="#" @click.prevent="$store.commit('setDeleteModal', { id: $route.params.id, type: 'trash' } )">Delete</a></li>
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
                                <li><router-link replace :to="{ name: 'ProductDetailsBasic', params: { id: getTempContainer.data.id, name: getTempContainer.data.name }}">Details</router-link></li>
                                <li><router-link replace :to="{ name: 'ProductDetailsStats', params: { id: getTempContainer.data.id, name: getTempContainer.data.name }}">Statistics</router-link></li>
                                <li><router-link replace :to="{ name: 'ProductDetailsLogs', params: { id: getTempContainer.data.id, name: getTempContainer.data.name }}">Activity logs</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    <!-- </transition> -->
    </div>
<select-tag-overlay v-if="getSelectionSheet.selectTag"  />
</template>
<script>
import { mapGetters } from 'vuex'
import SelectTagOverlay from '../../components/app/includes/SelectTagOverlay.vue'
import moment from 'moment'
import Backdrop from '../../components/app/includes/Backdrop.vue'
export default {
  components: { Backdrop, SelectTagOverlay },
    name: 'DetailedProduct',
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getTempContainer', 'getMobile', 'getDefaultImage', 'getUserAdminID', 'getSuppliers', 'getSelectionSheet']),
        computeSupplier() {
            if(this.getTempContainer.data.suppler_id !== null) {
                let supplier = this.getSuppliers.find(supplier => supplier.id == this.getTempContainer.data.supplier_id)
                return supplier
            }
            else
            return false
        }
    },
    data() {
        return {
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
        closeJustMenu() {
            this.toggleMenu = false
        }
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
.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}
.logout, .perm-delete{
  color: $danger !important;
  &:hover{
    background-color: rgba(230, 50, 50, 0.05) !important;
  }
  &:active{
    background-color: rgba(230, 50, 50, 0.12) !important;
  }
}
.perm-delete-row{
    position: sticky;
    top: 80px;
    background-color: rgba(255, 255, 255, 1);
    padding: 10px;
    z-index: 11;
    margin: -30px -2px 0 -2px;
    button{
        line-height: 28px;
        border-radius: 30px;
    }
    .perm-delete{
        border-color: $danger;
    }
}
</style>
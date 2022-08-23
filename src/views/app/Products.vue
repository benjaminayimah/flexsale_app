<template>
<h1 id="page_title">{{ title }}</h1>
<div class="main-page-body" v-if="getProducts.length > 0">
    <div class="prod-main-custom-table">
            <div class="table">
                <div class="table-head">
                    <div class="flex-row-js tbh-row">
                        <div class="prod-stat-hold">
                            <div class="prod-stat-item">
                                <a href="#">
                                    <div class="stat-count">{{ computedInventory }}</div>
                                    <span class="label">Total inventory size</span>
                                </a>
                            </div>
                        </div>
                        <div class="prod-stat-hold">
                            <div class="prod-stat-item">
                                <a href="#">
                                    <div class="stat-count">{{ getProducts.length }}</div>
                                    <span class="label">Unique products</span>
                                </a>
                            </div>
                        </div>
                        <div class="prod-stat-hold">
                            <div class="add-new">
                                <a href="#" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'tag'}) : this.$store.commit('forceSetOnboard', 'intro')">
                                    <i class="flex-column">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582">
                                        <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff"/>
                                    </svg>
                                    </i>
                                    <span>Create Tags</span>
                                </a>
                            </div>
                        </div>
                        <div class="prod-stat-hold">
                            <div class="add-new">
                                <a href="#" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'product'}) : this.$store.commit('forceSetOnboard', 'intro')">
                                    <i class="flex-column">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582">
                                        <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff"/>
                                    </svg>
                                    </i>
                                    <span>Add Product</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-body">
                    <!-- table row -->
                    <div class="table-menu flex-row-js">
                        <div class="category-pill">
                            <div class="pill-wrap" >
                                <ul class="flex-row-st">
                                    <li><router-link replace :to="{ name: 'Products', params: { id: 'all' , name: 'products'} }">All</router-link></li>
                                    <li v-for="tag in getTags" :key="tag.id"><router-link replace class="text-overflow-ellipsis" :to="{ name: 'Products', params: { id: tag.id , name: tag.name } }">{{ tag.name }}</router-link></li>
                                    <i class="horizontal-separator"></i>
                                    <li id="product_filter_toggle" @click.prevent="doMenu('product_filter_toggle')">
                                        <a href="#" :class="{ 'dropdown-out' : toggleFilter }" @click.prevent="doMenu('product_filter_toggle')">
                                        {{ sort.name}}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 18.312 11.241">
                                            <path d="M766.473,22.642a.989.989,0,0,1-.643-.232.784.784,0,0,1-.034-1.19l8.374-7.937-8.357-7.518a.784.784,0,0,1,0-1.19,1.009,1.009,0,0,1,1.321,0l9.646,8.678-9.63,9.127A.984.984,0,0,1,766.473,22.642Z" transform="translate(22.642 -765.539) rotate(90)" fill="#0e142c"/>
                                        </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <product-row v-for="product in sortProducts(computedProducts)" :key="product.id" v-bind:product="product" />
                </div>
            </div>
        </div>
</div>
<div v-else class="flex-col empty-state">
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 204 204">
        <g id="discount" transform="translate(60.818 60.818)">
            <path d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
            <path d="M48.966-1209.653l-.049-.051,23.891-23.891a12.273,12.273,0,0,0,3.618-8.736,12.275,12.275,0,0,0-3.618-8.735L45.873-1278H58.647a6.591,6.591,0,0,1,4.659,1.928l21.51,21.71c7.073,7.715,5.02,19.772-.347,24.534l-20.1,20.175c-1.288,1.286-4.5,1.929-7.7,1.929S50.252-1208.367,48.966-1209.653Zm-19.6-1.233L.894-1239.329A3.035,3.035,0,0,1,0-1241.48v-33.153a3.044,3.044,0,0,1,3.044-3.043H36.2a3.044,3.044,0,0,1,2.152.892l28.475,28.477.007.005a9.612,9.612,0,0,1,2.812,6.821,9.61,9.61,0,0,1-2.812,6.819l-.007.007-23.769,23.769a9.611,9.611,0,0,1-6.844,2.835A9.615,9.615,0,0,1,29.367-1210.886Z" transform="translate(-3.493 1286.587)" fill="#566ff4"/>
        </g>
    </svg>
    <h1>Product list is empty</h1>
    <div>Upload new product</div>
    <button class="button button-primary" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'product'}) : this.$store.commit('forceSetOnboard', 'intro')">
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
            <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
        </svg>
        <span>Add products</span>
    </button>
</div>
<teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleFilter" @mousedown="closeJustMenu('product_filter_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="menu-dropdown dropdown" v-if="toggleFilter" :class="[{ 'show-menu' : toggleFilter && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-100+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
            <div class="title" v-show="getMobile">
                <div>Sort by</div>
                <button @click.prevent="closeJustMenu('product_filter_toggle')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </button>
            </div>
            <ul>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : sort.id == 1 }" @click.prevent="doSort(1, 'Newest')"><span>Newest first</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : sort.id == 2 }" @click.prevent="doSort(2, 'Oldest')"><span>Oldest first</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : sort.id == 3 }" @click.prevent="doSort(3, 'Sort A-Z')"><span>Sort A-Z</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : sort.id == 4 }" @click.prevent="doSort(4, 'Sort Z-A')"><span>Sort Z-A</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
            </ul>
        </div>
    </transition>
</teleport>
<select-tag-overlay v-if="getSelectionSheet.selectTag"  />
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from '../../components/app/includes/Backdrop.vue'
import ProductRow from '../../components/app/includes/ProductRow.vue'
import dropdownToggleMixin from '../../mixins/dropdownToggle'
import SelectTagOverlay from '../../components/app/includes/SelectTagOverlay.vue'
export default {
  components: { Backdrop, ProductRow, SelectTagOverlay },
    name: 'Products',
    mixins: [dropdownToggleMixin],
    computed: {
        ...mapGetters(['getMobile', 'getProducts', 'getAllFilters', 'getTags', 'getFloatingDiv', 'getStores', 'getSelectionSheet']),
        computedProducts() {
            if(this.$route.params.id !== 'all') {
                return this.getAllFilters.filter(product => product.tag_id === this.$route.params.id)
            }else
            return this.getProducts
        },
        computedFilters() {
            return false
        },
        computedInventory() {
            return this.getProducts.reduce((acc, item) => acc + Number(item.stock), 0)
        }
    },
    data() {
        return {
            title: 'All Products',
            sort: { id: 1, name: 'Newest'}
        }
    },
    created() {
        this.setPage()
        window.scrollTo(0,0)
        this.$store.dispatch('fetchFilters')
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
        },
        sortProducts(product) {
            if(this.sort.id === 1)
            return product.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // newest
            else if(this.sort.id === 2)
            return product.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // oldest
            else if(this.sort.id === 3)
            return product.sort((a, b) => a.name.localeCompare(b.name)) //a-z
            else if(this.sort.id === 4)
            return product.sort((a, b) => b.name.localeCompare(a.name))  //z-a
        },
        doSort(id, name) {
            this.sort.id = id
            this.sort.name = name
            this.closeJustMenu('product_filter_toggle')
        }
    },
}
</script>


<style scoped lang="scss">
.is-sorted {
    color: $primary-color !important;
    svg {
        display: block !important;
    }
}
.menu-card-mob{
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
  .acct-label .user-details{
    max-width: 100%;
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(350px);
}
.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}
</style>
<template>
    <div class="main-page-body">
        <div class="header detailed-items-banner-holder">
                <div class="cover-image bg-img">
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
                            <h1>{{ $route.params.name }}</h1>
                            </div>
                        <div class="flex-row caption-row" v-if="getTempContainer.data.phone"><label>Phone:</label><span>{{ getTempContainer.data.phone }}</span></div>
                        <div class="flex-row caption-row" v-if="getTempContainer.data.email"><label>Email:</label><span>{{ getTempContainer.data.email }}</span></div>
                        <div class="flex-row caption-row" v-if="getTempContainer.data.location"><label>Location:</label><span>{{ getTempContainer.data.location }}</span></div>
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
                                <li @click.prevent="closeJustMenu()"><a href="javascript: void" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'supplier', id: $route.params.id})">Edit details</a></li>
                                <li @click.prevent="closeJustMenu()"><a href="javascript: void" @click.prevent="$store.commit('setDeleteModal', { id: $route.params.id, type: 'supplier' } )">Delete</a></li>
                            </ul>
                        </div>
                    </transition>
                </div>
            </div>
        <!-- {{ $route.params.name }} -->
        <div class="section">
            <div class="flex align-items-center content-row">
                <div class="row-title">products supplied</div><span class="separator-dot"></span><div class="sup-items-count">{{ getTempContainer.array.length }} items</div>
            </div>
            <ul v-if="getTempContainer.array.length > 0">
                <supplier-items-row  v-for="product in getTempContainer.array" :key="product.id" v-bind:product="product" />   
            </ul>
            <div v-else>
                No product by this Supplier
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from '../../components/app/includes/Backdrop.vue'
import SupplierItemsRow from '../../components/app/includes/SupplierItemsRow.vue'
export default {
  components: { Backdrop, SupplierItemsRow },
  computed: mapGetters(['getMobile', 'getTempContainer']),
    name: 'DetailedSupplier',
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
        fetchThisSupplier() {
            this.$store.dispatch('fetchThisSupplier', this.$route.params.id)
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
        this.fetchThisSupplier()
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
.detailed-items-banner-holder{
    .cover-image{
        height: 250px;
        background-color: #6A2DBE;
    }
}
ul{
    padding-left: 0;
}
.section{
    padding: 50px 0
}

.sup-items-count{
    color: $gray-color;
}
</style>
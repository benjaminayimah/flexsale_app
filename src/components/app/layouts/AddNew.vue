<template>
    <transition :name="getMobile? 'fade' : ''">
        <secondary-backdrop v-if="getAddingProduct.active" @click="beat" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div v-if="getAddingProduct.active" id="add_hero_modal" :class="computeWidth ? 'width-active': 'width-inactive'">
            <div class="add-master-wrap">
                <div class="add-master-head">
                    <div class="add-head-content flex-row-js">
                        <button class="button button-secondary cancel-btn" @click.prevent="$store.commit('unsetMainHomeWidth')">
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"/>
                            </svg>
                        </button>
                        <h1 id="add_title" class="text-overflow-ellipsis"></h1>
                        <div id="add_submit_button"></div> 
                    </div>
                </div>
                <div class="add-master-body" :style="{maxHeight: (winHeight-180)+'px'}">
                    <div id="add_master_body_container"></div>
                </div>
            </div>
        </div>
    </transition>
    <add-new-product v-if="getAddingProduct.product" />
    <add-new-tag v-if="getAddingProduct.tag" />
    <add-new-discount v-if="getAddingProduct.discount" />
    <add-new-user v-if="getAddingProduct.admin" />
    <add-new-store v-if="getAddingProduct.store" />
    <add-new-supplier v-if="getAddingProduct.supplier" />
    <update-stock />
</template>
<script>
import { mapGetters } from 'vuex'
import AddNewTag from './AddNewTag.vue'
import SecondaryBackdrop from '../includes/SecondaryBackdrop.vue'
import AddNewProduct from './AddNewProduct.vue'
import AddNewDiscount from './AddNewDiscount.vue'
import AddNewUser from './AddNewUser.vue'
import AddNewStore from './AddNewStore.vue'
import AddNewSupplier from './AddNewSupplier.vue'
import UpdateStock from './UpdateStock.vue'
export default {
  components: { AddNewTag, SecondaryBackdrop, AddNewProduct, AddNewDiscount, AddNewUser, AddNewStore, AddNewSupplier, UpdateStock },
    name: 'AddNew',
    props: ['winHeight'],
    computed: {
        ...mapGetters(['getAddingProduct', 'getWindowWidth', 'getMobile']),
        computeWidth() {
            if(this.getWindowWidth <= 600) {
                return true
            }else {
                return false
            }
        }
    },
    methods: {
        beat() {
            const elem = document.getElementById('add_hero_modal')
            elem.classList.add('beat-in')
            setTimeout(() => {
                elem.classList.remove('beat-in')
            }, 100);
        }
    }
}
</script>
<style scoped lang="scss">
#add_hero_modal{
    background-color: #ffffff;
    position: fixed;
    z-index: 202;
    .add-master-head{
        border-bottom: 1px solid $dark-light;
    }
    .add-head-content{
        height: inherit;
        #add_submit_button button{
            height: 44px;
            border-radius: 13px;
        }
    }
    .add-master-body{
        min-height: 100px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
            -ms-overflow-style: none; 
            scrollbar-width: none; 
        }
    }
}
.add-master-wrap{
    height: 100%;
}
.width-inactive{
    border-radius: 16px;
    width: 600px;
    top: 8%;
    .add-master-head{
        height: 75px;
    }
    .add-head-content{
        padding: 0 20px;
    }
    .add-master-body{
        padding: 0 30px;
    }
}
.width-active{
    width: 100%;
    top: 0;
    height: 100%;
    .add-master-head{
        height: 60px;
    }
    .add-head-content{
        padding: 0 15px;
    }
    .add-master-body{
        max-height: 100% !important;
        padding: 0 15px 50px 15px;
    }
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(900px);
//   opacity: 0;
}
.beat-in {
  animation: animateHeart 1.2s;
}
@keyframes animateHeart {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>
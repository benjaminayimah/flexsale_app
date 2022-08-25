<template>
    <button id="mob_add" @click.prevent="showthisMenu('mob_add')">
        <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5">
            <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(1.25 1.25)">
            <path d="M18,28.75a1.25,1.25,0,0,1-1.25-1.25V7.5a1.25,1.25,0,0,1,2.5,0v20A1.25,1.25,0,0,1,18,28.75Z" transform="translate(-8 -7.5)" fill="#fff"/>
            <path d="M27.5,19.25H7.5a1.25,1.25,0,0,1,0-2.5h20a1.25,1.25,0,0,1,0,2.5Z" transform="translate(-7.5 -8)" fill="#fff"/>
            </g>
        </svg>
    </button>
    <teleport to="body">
      <transition name="fade">
        <backdrop v-if="showMenu" @click.prevent="showthisMenu('mob_add')" />
      </transition>
      <transition :name="getMobile? 'slide' : ''">
        <div class="dialog" v-if="showMenu" :class="getMobile ? 'menu-card-mob' : 'menu-card-tab'" :style="{ left: getFloatingDiv.left+'px', bottom: getFloatingDiv.bottom + 'px' }">
            <div class="title" v-if="getMobile">
                <div>Add</div>
                <button @click.prevent="showthisMenu('mob_add')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                      <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                  </button>
            </div>
            <ul>
                <li @click="showthisMenu('mob_add')">
                    <a href="#" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'product'}) : this.$store.commit('forceSetOnboard', 'intro')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20.291 20.29">
                            <path d="M-4280.267-699.712a2.84,2.84,0,0,1-2.837-2.838v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a1.339,1.339,0,0,0,1.337,1.338h14.615a1.34,1.34,0,0,0,1.338-1.338v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a2.842,2.842,0,0,1-2.839,2.838Zm6.558-7.013v-10.717l-3.939,3.94a.751.751,0,0,1-1.061,0,.751.751,0,0,1,0-1.061l5.22-5.22a.748.748,0,0,1,.531-.219h.018a.745.745,0,0,1,.33.085h0l.012.006.007,0,.007,0,.01.006,0,0,.014.009h0a.762.762,0,0,1,.126.1l5.22,5.22a.751.751,0,0,1,0,1.061.748.748,0,0,1-.531.219.749.749,0,0,1-.53-.219l-3.939-3.94v10.718a.749.749,0,0,1-.749.749A.749.749,0,0,1-4273.709-706.725Z" transform="translate(4283.104 720.002)"/>
                        </svg>
                        <span>Add New Product</span>
                    </a>
                </li>
                <li @click="showthisMenu('mob_add')">
                    <a href="#" @click.prevent="getStores.length > 0 ? $store.commit('addToSale') : this.$store.commit('forceSetOnboard', 'intro')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14.481 14.481">
                            <path d="M11.241,7.62V4l7.241,7.241-7.241,7.241v-3.62H4V7.62Z" transform="translate(-4 -4)" fill="#212121"/>
                        </svg>
                        <span>Add Sale</span>
                    </a>
                </li>
            </ul>
        </div>
      </transition>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
    name: 'MobileAddDialog',
    components: { Backdrop },
    computed: mapGetters(['getFloatingDiv', 'getMobile', 'getTablet', 'getDesktop', 'getStores']),
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        showthisMenu(id) {
            let elem = document.getElementById(id)
            if(this.showMenu == false) {
                this.showMenu = true
                this.$store.commit('setDynamicFloatingDiv', elem)
            }else{
                this.showMenu = false
                this.$store.commit('reSetDynamicFloatingDiv', elem)
            }
        }
    }
}
</script>
<style scoped lang="scss">
.slide-enter-from,
.slide-leave-to {
  transform: translateY(250px);
  
}

.dialog{
    position: fixed;
    background-color: $white-color;
    z-index: 101;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 0; 
    ul{
    padding: 0;
    position: relative;
    margin: 0;
        }
    li{
        list-style-type: none;
    }
    li a {
        display: flex;
        flex-direction: row;
        padding: 20px;
        color: $dark;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.15rem;
        line-height: 22px;
        transition: 0.2s linear all;
        position: relative;
        align-items: center;
        height: 62px;
    }
        li span {
        margin-left: 20px;
        }
        li svg path {
            fill: $dark;
        }

        li label{
            font-size: 0.8rem;
            text-align: center;
            display: none;
        }
  }
  
  .menu-card-mob{
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    box-shadow: rgb(86 111 244 / 33%) 0 5px 15px 0;
  }
  .menu-card-tab{
    width: unset;
    border-radius: 16px;
    bottom: unset !important;
    top: 50%;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    li a{
        padding-left: 30px;
        padding-right: 30px;
        span {
            font-size: 1rem;
        }
    }
  }
#mob_add{
    background-color: $primary-color;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    padding: 0;
}
</style>
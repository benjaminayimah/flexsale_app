<template>
<section id="app_section" :style="{minHeight: getWindowHeight + 'px'}" :class="[{ 'tb-mw': getTablet }, {'tb-mw2': getHideRight }, {'mob-view': getMobile }  ]">
  <!-- main home -->
    <div id="left" v-if="!getMobile">
      <div id="left_wrap" :class="[{ 'dt-w' : getDesktop }, { 'tb-w': getTablet}, { 'tb-p0': getHideRight}]">
        <div class="left-hold flex">
          <div class="left-content" :class="[{ 'dt-w' : getDesktop }, { 'tb-w': getTablet}]">
            <div>
              <div id="logo">
                <a href="">
                  <logo />
                </a>
              </div>
              <div class="menu flex" :class="{ 'jc' : getTablet }">
                <nav id="main_nav">
                    <main-menu />
                </nav>
              </div>
              <div id="left_add_new_pd" :class="{ 'desktop-mode': getDesktop}">
                <div class="left-new-wrap flex-column" :class="{ 'jc' : getTablet }">
                  <div class="left-new-hold flex-column" v-if="!getHideRight">
                    <button class="flex-column rounded-btn-light" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'product'}) : this.$store.commit('forceSetOnboard', 'intro')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20.291 20.29">
                        <path d="M-4280.267-699.712a2.84,2.84,0,0,1-2.837-2.838v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a1.339,1.339,0,0,0,1.337,1.338h14.615a1.34,1.34,0,0,0,1.338-1.338v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a2.842,2.842,0,0,1-2.839,2.838Zm6.558-7.013v-10.717l-3.939,3.94a.751.751,0,0,1-1.061,0,.751.751,0,0,1,0-1.061l5.22-5.22a.748.748,0,0,1,.531-.219h.018a.745.745,0,0,1,.33.085h0l.012.006.007,0,.007,0,.01.006,0,0,.014.009h0a.762.762,0,0,1,.126.1l5.22,5.22a.751.751,0,0,1,0,1.061.748.748,0,0,1-.531.219.749.749,0,0,1-.53-.219l-3.939-3.94v10.718a.749.749,0,0,1-.749.749A.749.749,0,0,1-4273.709-706.725Z" transform="translate(4283.104 720.002)" fill="#566ff4"/>
                      </svg>
                    </button>
                    <span v-if="getDesktop">Add new product</span>
                  </div>
                  <mob-add-dialog v-if="getHideRight" />
                </div>
              </div>
            </div>
            <account-menu />
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <main>
        <div class="main-wrap">
          <div class="main-hold">
            <!-- main home -->
            <div class="main-home" id="main_home">
              <alerts />
              <header>
                <div class="header-wrap">
                  <div class="header-hold" :class="{ 'bt-0' : !getCurrentpage.mobile }">
                    <div class="header-content">
                      <div id="mob_logo" class="mob-logo" v-if="getMobile && !getCurrentpage.mobile && !getCurrentpage.back" >
                        <logo />
                      </div>
                      <div class="page-title flex-row-st" :class="{ 'mob-title': getMobile}" v-else>
                        <back-button v-if="getCurrentpage.back" />
                        <span  class="page-title-span text-overflow-ellipsis">{{ getCurrentpage.title }}</span>
                      </div>
                      <div class="noti-help align-items-center justify-content-center" >
                        <li><span class="beta text-overflow-ellipsis">Beta {{ getBeta }}</span></li>
                        <li class="ml-0" v-if="(getHideRight || getMobile) && !getCurrentpage.back">
                          <router-link :to="{ name: 'Search', params: { query: 'all'} }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                              <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)"/>
                            </svg>
                          </router-link>
                        </li>
                        <notification />
                        <!-- <li v-if="!getMobile"><a href="javascript: void">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.25 26.249">
                              <path d="M-1129.625,12.658A13.123,13.123,0,0,1-1116.5-.467a13.123,13.123,0,0,1,13.126,13.125A13.123,13.123,0,0,1-1116.5,25.782,13.123,13.123,0,0,1-1129.625,12.658Zm5.092-8.033a11.281,11.281,0,0,0-3.325,8.033,11.283,11.283,0,0,0,3.325,8.032,11.283,11.283,0,0,0,8.032,3.326,11.283,11.283,0,0,0,8.033-3.326,11.283,11.283,0,0,0,3.326-8.032,11.281,11.281,0,0,0-3.326-8.033A11.283,11.283,0,0,0-1116.5,1.3,11.283,11.283,0,0,0-1124.533,4.625Zm6.418,12.79a1.321,1.321,0,0,1,1.35-1.3,1.319,1.319,0,0,1,1.356,1.3,1.319,1.319,0,0,1-1.356,1.3A1.314,1.314,0,0,1-1118.115,17.415Zm.22-2.4-.019-.543a2.628,2.628,0,0,1,1.49-2.776c1.066-.637,1.514-1.041,1.514-1.823a1.531,1.531,0,0,0-1.7-1.356,1.6,1.6,0,0,0-1.691,1.552h-2.24c.044-2.031,1.546-3.464,4.083-3.464,2.366,0,3.994,1.312,3.994,3.2a3.086,3.086,0,0,1-1.773,2.8c-1.1.637-1.471,1.1-1.471,1.912v.5Z" transform="translate(1129.625 0.467)"/>
                            </svg>
                            <span>Help</span></a>
                        </li> -->
                        <li v-if="getMobile" >
                          <a id="acct_mob_a" href="javascript: void">
                            <account-menu />
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <loader v-bind:size="35" />
              <div class="main-body">
                <div class="main-body-content">
                    <router-view />
                </div>
              </div>
              <mob-nav />
               <!-- end -->
            </div>
            <!-- end -->

            <!-- right -->
            <div class="main-right" v-if="!getMobile && !getHideRight">
              <div class="right-header">
                <div class="header-wrap">
                  <div class="right-header-hold">
                    <div class="header-content-2">
                      <search-float v-bind:inputID="'global_search_1'"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="main-body">
                <div class="main-body-content">
                  <right-body-content />
                </div>
              </div>
            </div>
            <!-- end -->
          </div>
        </div>
    </main>
    <delete-modal />
    <restore-trash-modal />
    <new-sale />
</section>
<onboarding-view v-bind:winHeight="getWindowHeight" v-if="getOnboard.status" />
<add-new v-bind:winHeight="getWindowHeight" />
<selection-sheet v-bind:windowHeight="getWindowHeight" />
<refresh-button />
</template>
<script>
import AccountMenu from '../components/app/includes/AccountMenu.vue'
import { mapGetters } from 'vuex'
import MainMenu from '../components/app/includes/MainMenu.vue'
import Logo from '../components/app/includes/Logo.vue'
import MobNav from '../components/app/includes/MobNav.vue'
import AddNew from '../components/app/layouts/AddNew.vue'
import BackButton from '../components/app/includes/BackButton.vue'
import RefreshButton from '../components/app/includes/RefreshButton.vue'
import Alerts from '../components/app/includes/Alerts.vue'
import Loader from '../components/app/includes/Loader.vue'
import DeleteModal from '../components/app/includes/DeleteModal.vue'
import RightBodyContent from '../components/app/layouts/RightBodyContent.vue'
import NewSale from '../components/app/includes/NewSale.vue'
import OnboardingView from '../components/app/layouts/OnboardingView.vue'
import RestoreTrashModal from '../components/app/includes/RestoreTrashModal.vue'
import Notification from '../components/app/includes/NotificationFloat.vue'
import SearchFloat from '../components/app/includes/SearchFloat.vue'
import SelectionSheet from '../components/app/layouts/SelectionSheet.vue'
import MobAddDialog from '../components/app/includes/MobAddDialog.vue'
export default {
  components: { MainMenu, AccountMenu, Logo, MobNav, AddNew, SelectionSheet, BackButton, Alerts, Loader, DeleteModal, RightBodyContent, NewSale, OnboardingView, RestoreTrashModal, Notification, SearchFloat, RefreshButton, MobAddDialog },
    name: 'AdminHome',
    computed: mapGetters(['getCurrentpage', 'getMobile', 'getTablet', 'getBeta', 'getDesktop', 'getHideRight', 'getAddingProduct', 'getWindowHeight', 'getOnboard','getStores']),
    created() {
      this.$store.commit('setBodyBgColor')
      this.$store.dispatch('getAuthUser')
      window.addEventListener('resize', this.windowSize )
      window.addEventListener('scroll', this.pageScroll)
      this.$store.commit('computeWindow')
      this.$store.dispatch('setNotification')
  },
  unmounted() {
    window.removeEventListener('resize', this.windowSize)
    document.removeEventListener('scroll', this.pageScroll )
  },
  methods: {
    windowSize() {
      setTimeout(()=> {
        this.$store.commit('computeWindow')
        let elem = document.getElementsByClassName('this-will-change')
        if(elem.length > 0){
            return this.$store.commit('setDynamicFloatingDiv', elem[0])
        }
      }, 100)
    },
    pageScroll(){
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
          return this.$store.commit('setMobileTitle')
        }else{
            return this.$store.commit('unSetMobileTitle')
        }
    }
  }
}
</script>
<style scoped lang="scss">
$desktop: 275px;
$tablet: 100px;
.jc{
  justify-content: center;
}
.dt-w{
  width: $desktop;
}
.tb-w{
  width: $tablet;
}
.tb-w2{
  width: 70px;
}
.tb-mw{
  max-width: 1170px;
}
.tb-mw2{
  max-width: 810px ;
}
.tb-p0{
  width: 70px ;
}
.tb-p0 .left-content{
  padding: 15px 0 ;
  width: 70px;
}

section{
  display: flex;
  width: 1344px;
}
#left{
    display: flex;
    flex-direction: column;
    -webkit-box-align: end;
    align-items: flex-end;
    position: relative;
    z-index: 2;
}
#left_wrap{
  display: flex;
  flex-direction: column;
}
#main_nav{
  width: 90%;
}
.left-hold{
  position: fixed;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.left-content{
  height: 100%;
  padding: 15px;
  position: relative;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
main{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-wrap{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-hold{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
}
.main-right{
  width: 350px;
  min-width: 300px
}
.main-body-content{
  height: 100%;
}
.main-home{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 710px;
  border-right: 1px solid $dark-light;
  border-left: 1px solid $dark-light;
  align-items: stretch;
  flex-basis: auto;
  position: relative;
}
#logo{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  & a {
    padding: 10px 20px;
    display: flex;
  }
}

header, .right-header{
  position: sticky;
  -webkit-position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 90
}
.header-wrap{
  display: flex;
  flex-direction: row;
  height: 80px;
}
.header-hold{
  display: flex;
  flex-direction: column;
  background-color: $white-color;
  width: 100%;
  max-width: 710px;
  border-bottom: 1px solid $dark-light;
}
.right-header-hold{
  display: flex;
  flex-direction: column;
  background-color: $white-color;
  width: 100%;
}
.header-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  height: 80px;
  align-items: center;
  overflow: hidden;
}
.header-content-2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  height: 80px;
  align-items: center;
  overflow: hidden;
}
.page-title{
  font-weight: 700;
  font-size: 1.2rem;
  align-items: center;
  width: 70%;
  a {
    flex-shrink: 0;
  }
}
.noti-help{
  display: flex;
  flex-direction: row;
}

.form-control{
  border: 1px solid #ffffff;
}
.desktop-mode .left-new-wrap{
    border: 1px dashed $primary-color;
    width: 90%;
    padding: 30px 15px;
    border-radius: 16px;
    background-color: #ffffff;
  }
#left_add_new_pd{
  padding-top: 15px;
  span{
    text-align: center;
    color: $gray-color;
    margin-top: 10px;
  }
  button{
    border-style: none;
    padding: 8px;
    border-radius: 50%;
    color: $white-color;
    cursor: pointer;
    padding: 10px;
    height: 50px;
    width: 50px;
    
  }
}
.menu{
  margin-top: 10px;
}


</style>
<template>
<section id="app_section" :style="{minHeight: windowHeight + 'px'}" :class="[{ 'tb-mw': getTablet }, {'tb-mw2': getHideRight } ]">
    <div id="left">
      <div id="left_wrap" :class="[{ 'dt-w' : getDesktop }, { 'tb-w': getTablet}, { 'tb-p0': getHideRight}]">
        <div class="left-hold flex">
          <div class="left-content" :class="[{ 'dt-w' : getDesktop }, { 'tb-w': getTablet}]">
            <div>
              <div id="logo">
                <a href="">
                  <svg v-if="getDesktop" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 197.728 34.824">
                    <g id="Group_3413" data-name="Group 3413" transform="translate(-54.944 -670.846)">
                      <path id="Path_5" data-name="Path 5" d="M3.3-9.471V-38.5H20.323v3.483H6.783v8.252H18.333v3.483H6.783V-9.471Zm20.279,0v-28.84h3.463v28.84Zm17.915.539A9.636,9.636,0,0,1,36.279-10.4a10.9,10.9,0,0,1-3.753-3.95,10.957,10.957,0,0,1-1.4-5.484,11.161,11.161,0,0,1,.809-4.261,11.169,11.169,0,0,1,2.229-3.483,10.364,10.364,0,0,1,3.307-2.353,9.679,9.679,0,0,1,4.023-.85,9.787,9.787,0,0,1,4.3.943,9.936,9.936,0,0,1,3.359,2.623,11.281,11.281,0,0,1,2.094,3.9,12.647,12.647,0,0,1,.508,4.748H34.838A7.516,7.516,0,0,0,36-15.432a6.793,6.793,0,0,0,2.333,2.188,6.437,6.437,0,0,0,3.162.829,6.16,6.16,0,0,0,3.38-.964,7.226,7.226,0,0,0,2.447-2.644l3.546.829a10.856,10.856,0,0,1-3.753,4.51A9.586,9.586,0,0,1,41.494-8.932Zm-6.76-12.379H48.253a6.857,6.857,0,0,0-1.12-3.183,7.385,7.385,0,0,0-2.426-2.312,6.2,6.2,0,0,0-3.214-.871,6.2,6.2,0,0,0-3.193.85,7.155,7.155,0,0,0-2.395,2.291A7.554,7.554,0,0,0,34.734-21.311ZM50.677-9.471,58.266-19.88,50.719-30.248h6.554l5.412,7.382,5.391-7.382H74.63L67.083-19.88,74.671-9.471H68.117l-5.433-7.465L57.232-9.471Zm31.851.394a10.777,10.777,0,0,1-3.266-.632,9.21,9.21,0,0,1-2.778-1.555,5.893,5.893,0,0,1-1.731-2.27l2.986-1.286a3.51,3.51,0,0,0,1.12,1.327,6.682,6.682,0,0,0,1.866,1,6.377,6.377,0,0,0,2.136.373A6.351,6.351,0,0,0,85-12.478a3.926,3.926,0,0,0,1.628-1.047,2.393,2.393,0,0,0,.632-1.669,2.023,2.023,0,0,0-.695-1.628,5.1,5.1,0,0,0-1.742-.933q-1.047-.342-2.125-.653a23,23,0,0,1-3.815-1.3,7.153,7.153,0,0,1-2.644-1.928,4.56,4.56,0,0,1-.964-3,5.371,5.371,0,0,1,1.068-3.338,6.972,6.972,0,0,1,2.81-2.177,9.155,9.155,0,0,1,3.732-.767,9.782,9.782,0,0,1,4.582,1.078,7.2,7.2,0,0,1,3.09,2.924l-2.8,1.638a3.663,3.663,0,0,0-1.078-1.317,5.814,5.814,0,0,0-1.659-.9,6.043,6.043,0,0,0-1.908-.352,6.315,6.315,0,0,0-2.25.311,3.807,3.807,0,0,0-1.68,1.068,2.58,2.58,0,0,0-.632,1.773,1.9,1.9,0,0,0,.674,1.576,5.116,5.116,0,0,0,1.762.86q1.089.321,2.374.736a27.12,27.12,0,0,1,3.525,1.389,7.907,7.907,0,0,1,2.644,1.97,4.273,4.273,0,0,1,.985,2.924,5.157,5.157,0,0,1-1.14,3.328,7.242,7.242,0,0,1-2.955,2.167A9.137,9.137,0,0,1,82.528-9.077ZM111-30.206h3.483V-9.471h-3.5l-.124-3.5a7.966,7.966,0,0,1-2.685,2.924,7.234,7.234,0,0,1-4.054,1.12,10.7,10.7,0,0,1-4.292-.86,11.222,11.222,0,0,1-3.515-2.385,11.077,11.077,0,0,1-2.374-3.515,10.812,10.812,0,0,1-.85-4.292,10.683,10.683,0,0,1,.829-4.188,10.708,10.708,0,0,1,2.312-3.452,10.913,10.913,0,0,1,3.432-2.322,10.42,10.42,0,0,1,4.168-.84,8.034,8.034,0,0,1,4.323,1.151,9,9,0,0,1,2.975,2.975Zm-6.8,17.894a6.1,6.1,0,0,0,3.566-1.037,6.561,6.561,0,0,0,2.27-2.778,8.518,8.518,0,0,0,.695-3.857,8.632,8.632,0,0,0-.975-3.753,7.063,7.063,0,0,0-2.405-2.664,6.317,6.317,0,0,0-3.525-.985,6.964,6.964,0,0,0-3.732,1.037,7.29,7.29,0,0,0-2.623,2.778,7.387,7.387,0,0,0-.86,3.877,7.6,7.6,0,0,0,1.161,3.732,7.917,7.917,0,0,0,2.747,2.664A7.181,7.181,0,0,0,104.2-12.312ZM119.81-9.471v-28.84h3.463v28.84Zm17.915.539A9.636,9.636,0,0,1,132.51-10.4a10.9,10.9,0,0,1-3.753-3.95,10.957,10.957,0,0,1-1.4-5.484,11.161,11.161,0,0,1,.809-4.261,11.169,11.169,0,0,1,2.229-3.483,10.364,10.364,0,0,1,3.307-2.353,9.679,9.679,0,0,1,4.023-.85,9.787,9.787,0,0,1,4.3.943,9.936,9.936,0,0,1,3.359,2.623,11.281,11.281,0,0,1,2.094,3.9,12.647,12.647,0,0,1,.508,4.748h-16.92a7.516,7.516,0,0,0,1.161,3.141,6.793,6.793,0,0,0,2.333,2.188,6.437,6.437,0,0,0,3.162.829,6.16,6.16,0,0,0,3.38-.964,7.226,7.226,0,0,0,2.447-2.644l3.546.829a10.856,10.856,0,0,1-3.753,4.51A9.586,9.586,0,0,1,137.725-8.932Zm-6.76-12.379h13.519a6.857,6.857,0,0,0-1.12-3.183,7.385,7.385,0,0,0-2.426-2.312,6.2,6.2,0,0,0-3.214-.871,6.2,6.2,0,0,0-3.193.85,7.155,7.155,0,0,0-2.395,2.291A7.554,7.554,0,0,0,130.965-21.311Z" transform="translate(104.644 712.055)" fill="#090b10"/>
                      <path id="Path_1656" data-name="Path 1656" d="M24.264-1244.132l-.024-.025L36.078-1256a6.081,6.081,0,0,0,1.793-4.329,6.081,6.081,0,0,0-1.793-4.328L22.731-1278h6.33a3.266,3.266,0,0,1,2.309.956l10.659,10.758c3.5,3.823,2.488,9.8-.172,12.157l-9.958,10c-.638.637-2.227.956-3.817.956S24.9-1243.495,24.264-1244.132Zm-9.712-.611L.443-1258.837A1.505,1.505,0,0,1,0-1259.9v-16.428a1.508,1.508,0,0,1,1.508-1.508H17.936A1.507,1.507,0,0,1,19-1277.4l14.11,14.111,0,0a4.762,4.762,0,0,1,1.393,3.38,4.762,4.762,0,0,1-1.393,3.38l0,0-11.778,11.778a4.763,4.763,0,0,1-3.391,1.4A4.765,4.765,0,0,1,14.552-1244.743Z" transform="translate(54.944 1948.846)" fill="#4a85f5"/>
                    </g>
                  </svg>
                  <svg v-if="getTablet" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 44.275 34.824">
                    <path  d="M24.264-1244.132l-.024-.025L36.078-1256a6.081,6.081,0,0,0,1.793-4.329,6.081,6.081,0,0,0-1.793-4.328L22.731-1278h6.33a3.266,3.266,0,0,1,2.309.956l10.659,10.758c3.5,3.823,2.488,9.8-.172,12.157l-9.958,10c-.638.637-2.227.956-3.817.956S24.9-1243.495,24.264-1244.132Zm-9.712-.611L.443-1258.837A1.505,1.505,0,0,1,0-1259.9v-16.428a1.508,1.508,0,0,1,1.508-1.508H17.936A1.507,1.507,0,0,1,19-1277.4l14.11,14.111,0,0a4.762,4.762,0,0,1,1.393,3.38,4.762,4.762,0,0,1-1.393,3.38l0,0-11.778,11.778a4.763,4.763,0,0,1-3.391,1.4A4.765,4.765,0,0,1,14.552-1244.743Z" transform="translate(0 1278)" fill="#4a85f5"/>
                  </svg>
                </a>
              </div>
              <div class="menu flex" :class="{ 'jc' : getTablet }">
                <nav id="main_nav">
                    <main-menu />
                </nav>
              </div>
            </div>
            <account-menu />
          </div>
        </div>
      </div>
    </div>
    <main>
        <div class="main-wrap">
          <div class="main-hold">
            <!-- main home -->
            <div class="main-home">
              <header>
                <div class="header-wrap">
                  <div class="header-hold">
                    <div class="header-content">
                      <div class="page-title">{{ getCurrentpage.title }}</div>
                      <div class="noti-help">
                        <li class="ml-0"><a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26.25 26.249">
                          <path d="M-1129.625,12.658A13.123,13.123,0,0,1-1116.5-.467a13.123,13.123,0,0,1,13.126,13.125A13.123,13.123,0,0,1-1116.5,25.782,13.123,13.123,0,0,1-1129.625,12.658Zm5.092-8.033a11.281,11.281,0,0,0-3.325,8.033,11.283,11.283,0,0,0,3.325,8.032,11.283,11.283,0,0,0,8.032,3.326,11.283,11.283,0,0,0,8.033-3.326,11.283,11.283,0,0,0,3.326-8.032,11.281,11.281,0,0,0-3.326-8.033A11.283,11.283,0,0,0-1116.5,1.3,11.283,11.283,0,0,0-1124.533,4.625Zm6.418,12.79a1.321,1.321,0,0,1,1.35-1.3,1.319,1.319,0,0,1,1.356,1.3,1.319,1.319,0,0,1-1.356,1.3A1.314,1.314,0,0,1-1118.115,17.415Zm.22-2.4-.019-.543a2.628,2.628,0,0,1,1.49-2.776c1.066-.637,1.514-1.041,1.514-1.823a1.531,1.531,0,0,0-1.7-1.356,1.6,1.6,0,0,0-1.691,1.552h-2.24c.044-2.031,1.546-3.464,4.083-3.464,2.366,0,3.994,1.312,3.994,3.2a3.086,3.086,0,0,1-1.773,2.8c-1.1.637-1.471,1.1-1.471,1.912v.5Z" transform="translate(1129.625 0.467)"/>
                        </svg>
                          <span>Help</span></a></li>
                        <li><a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
                            <g transform="translate(-6.775 -3.93)">
                              <path d="M-1239.676-30.952a.746.746,0,0,1,.795-.874.794.794,0,0,1,.795.561,1.317,1.317,0,0,0,.313.6,1.285,1.285,0,0,0,1.008.324,1.26,1.26,0,0,0,1.008-.324,1.317,1.317,0,0,0,.313-.6.794.794,0,0,1,.795-.561.749.749,0,0,1,.795.874,2.73,2.73,0,0,1-2.909,2.04A2.735,2.735,0,0,1-1239.676-30.952Zm2.959-1.919h-8.784a1.089,1.089,0,0,1-.995-1.748c.964-1.122,2.86-1.77,2.86-6.769,0-5.13,2.571-7.187,4.98-7.687.226-.05.388-.121.388-.324v-.16a1.446,1.446,0,0,1,1.5-1.352h.038a1.445,1.445,0,0,1,1.5,1.352v.16c0,.209.163.275.388.324,2.4.495,4.981,2.557,4.981,7.687,0,5,1.9,5.653,2.859,6.769a1.087,1.087,0,0,1-.976,1.748Zm-.419-15.385a2.278,2.278,0,0,1-1.164.578,4.062,4.062,0,0,0-2.421,1.518,7.641,7.641,0,0,0-1.308,4.772,11.131,11.131,0,0,1-.894,4.85,6.65,6.65,0,0,1-1.314,1.837.239.239,0,0,0,.206.4h14.591a.226.226,0,0,0,.194-.374,6.717,6.717,0,0,1-1.345-1.864,11.116,11.116,0,0,1-.9-4.85,7.646,7.646,0,0,0-1.307-4.772,4.062,4.062,0,0,0-2.421-1.518,2.368,2.368,0,0,1-1.177-.588.509.509,0,0,0-.361-.143A.547.547,0,0,0-1237.136-48.256Z" transform="translate(1253.524 54.842)"/>
                            </g>
                          </svg>
                          <i></i></a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <div class="main-body" style="height: 2000px">
                <div class="main-body-content">
                  <router-view />
                </div>
              </div>
            </div>
            <!-- end -->

            <!-- right -->
            <div class="main-right" v-if="!getHideRight">
              <div class="right-header">
                <div class="header-wrap">
                  <div class="right-header-hold">
                    <div class="header-content">
                      <div class="form-row" id="search_hold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                          <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                        </svg>
                          <input id="search_field" type="text" name="searchField" class="form-control" placeholder="Search application...">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="main-body">
                <div class="main-body-content">
                  Right
                </div>
              </div>
            </div>
            <!-- end -->
          </div>
        </div>
    </main>
</section>

    
    
    
</template>
<script>
import AccountMenu from '../components/app/includes/AccountMenu.vue'
import { mapGetters } from 'vuex'
import MainMenu from '../components/app/includes/MainMenu.vue'
export default {
  components: { MainMenu, AccountMenu },
    name: 'AdminHome',
    computed: mapGetters(['getCurrentpage', 'getMobile', 'getTablet', 'getDesktop', 'getHideRight']),
    data() {
      return {
        windowHeight: ''
      }
    },
    created() {
    window.addEventListener('resize', this.windowSize)
    this.computeWindow()
    this.windowDimension()
  },
  unmounted() {
    window.removeEventListener('resize', this.windowSize)
  },
  methods: {
    windowSize() {
      this.computeWindow()
      this.windowDimension() 
      let elem = document.getElementsByClassName('this-will-change')
      if(elem.length > 0){
        return this.$store.commit('setDynamicFloatingDiv', elem[0])
      }
      //console.log(document.getElementById('app_section').offsetWidth)
    },
    computeWindow() {
      this.windowHeight = window.innerHeight
    },
    windowDimension() {
      let winWidth = window.innerWidth
      let appWidth = 1344
      if(winWidth < 500){
        return this.$store.commit('setMobile')
      }else if(winWidth > appWidth){
        return this.$store.commit('setDesktop')
      }else{
        return this.$store.commit('setTablet', winWidth)
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
}
#logo{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  & a {
    padding: 10px 20px;
  }
}

header, .right-header{
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}
.header-wrap{
  display: flex;
  flex-direction: row;
  height: 80px;
}
.header-hold{
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
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
}
.main-body-content{
  padding: 30px;
}
.page-title{
  font-weight: 700;
  font-size: 1.5rem;
}
.noti-help{
  display: flex;
  flex-direction: row;
}
.noti-help li{
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-left: 5px;
  min-width: 48px;
  a{
    color: $dark;
    text-decoration: none;
    padding: 13px;
    border-radius: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    transition: 0.2s linear all;
    width: 100%;
    span{
      margin-left: 5px;
    }
    i{
      height: 12px;
      width: 12px;
      background-color: $accent-color;
      position: absolute;
      border-radius: 50%;
      border: 2px $white-color solid;
      top: 10px;
      right: 10px;
    }
  }
}
.noti-help li:hover a{
  background-color: $dark-light;
}
.form-control{
  border: 1px solid #ffffff;
}
#search_hold{
  margin-bottom: 0;
  width: 100%;
  input{
    border-radius: 0.9rem;
    background-color: $primary-light;
    padding: 10px 20px 10px 50px;
    width: 100%;
    & :focus{
      border: 1px solid $primary-color !important;
    }
  }
  input::placeholder{
      color: $gray-color;
  }
  svg{
    position: absolute;
    z-index: 1;
    top: 30%;
    left: 18px;
  }
}
</style>
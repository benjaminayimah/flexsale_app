<template>
    <div id="mob_nav" v-if="getMobile">
        <div class="mob-nav-content">
            <li>
            <router-link :to="{ name: 'Dashboard'}">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21">
                    <path  d="M17.5,19.5a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2H15.166a2,2,0,0,0-2,2v3.5a2,2,0,0,0,2,2H17.5m-11.667,0a2,2,0,0,0,2-2V16.334a2,2,0,0,0-2-2H3.5a2,2,0,0,0-2,2V17.5a2,2,0,0,0,2,2H5.834m0-10.5a2,2,0,0,0,2-2V3.5a2,2,0,0,0-2-2H3.5a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2H5.834M17.5,6.667a2,2,0,0,0,2-2V3.5a2,2,0,0,0-2-2H15.166a2,2,0,0,0-2,2V4.666a2,2,0,0,0,2,2H17.5M17.5,21H15.166a3.5,3.5,0,0,1-3.5-3.5V14a3.5,3.5,0,0,1,3.5-3.5H17.5A3.5,3.5,0,0,1,21,14v3.5A3.5,3.5,0,0,1,17.5,21ZM5.834,21H3.5A3.5,3.5,0,0,1,0,17.5V16.334a3.5,3.5,0,0,1,3.5-3.5H5.834a3.5,3.5,0,0,1,3.5,3.5V17.5A3.5,3.5,0,0,1,5.834,21Zm0-10.5H3.5A3.5,3.5,0,0,1,0,7V3.5A3.5,3.5,0,0,1,3.5,0H5.834a3.5,3.5,0,0,1,3.5,3.5V7A3.5,3.5,0,0,1,5.834,10.5ZM17.5,8.167H15.166a3.5,3.5,0,0,1-3.5-3.5V3.5a3.5,3.5,0,0,1,3.5-3.5H17.5A3.5,3.5,0,0,1,21,3.5V4.666A3.5,3.5,0,0,1,17.5,8.167Z"/>
                </svg>
                </i>
                <span>Home</span>
            </router-link>
            </li>
            <li>
            <router-link :to="{ name: 'Products', params: { id: 'all' , name: 'products'} }">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21.001">
                    <path d="M-4164.91-223.32-4175-233.41V-243.5h10.09l10.09,10.09a2.786,2.786,0,0,1,.819,1.98,2.786,2.786,0,0,1-.819,1.98l-6.131,6.13a2.777,2.777,0,0,1-1.979.82A2.783,2.783,0,0,1-4164.91-223.32Zm-8.69-10.67,9.681,9.679a1.393,1.393,0,0,0,.99.411,1.4,1.4,0,0,0,.99-.411l6.129-6.13a1.393,1.393,0,0,0,.41-.99,1.391,1.391,0,0,0-.41-.99l-9.679-9.679h-8.111Zm2.1-3.21a2.8,2.8,0,0,1,2.8-2.8,2.8,2.8,0,0,1,2.8,2.8,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-4171.5-237.2Zm1.4,0a1.4,1.4,0,0,0,1.4,1.4,1.4,1.4,0,0,0,1.4-1.4,1.4,1.4,0,0,0-1.4-1.4A1.4,1.4,0,0,0-4170.1-237.2Z" transform="translate(4175 243.5)"/>
                </svg>
                </i>
                <span>Products</span>
            </router-link>
            </li>
            <li>
            <a id="add_button" href="javascript: void">
                <mob-add-dialog />
            </a>
            </li>
            <li>
            <router-link :to="'/sales-record/filter/todays-sales'">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22.638 22.638">
                    <path d="M-4170.306-473.723h0a2.767,2.767,0,0,1-2.763-2.764v-8.8h3.01v1.5h-1.51v7.3a1.266,1.266,0,0,0,1.264,1.264,1.265,1.265,0,0,0,1.262-1.264v-19.875h18.612v19.875a2.766,2.766,0,0,1-2.763,2.764Zm2.764-2.764a2.746,2.746,0,0,1-.307,1.264h14.655a1.265,1.265,0,0,0,1.263-1.264v-18.375h-15.611Zm2.474-2.236v-1.5h10.5v1.5Zm0-4v-1.5h10.5v1.5Zm0-4v-5.5h10.5v5.5Zm1.5-1.5h7.5v-2.5h-7.5Z" transform="translate(4173.069 496.362)"/>
                </svg>
                </i>
                <span>Records</span>
            </router-link>
            </li>
            <li>
            <a href="#" id="more_mob" @click.prevent="showthisMenu('more_mob')">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M-4181.094-559.625a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-12,12A12,12,0,0,1-4181.094-559.625Zm1.5,0a10.512,10.512,0,0,0,10.5,10.5,10.513,10.513,0,0,0,10.5-10.5,10.513,10.513,0,0,0-10.5-10.5A10.512,10.512,0,0,0-4179.593-559.625Zm15.059-.46a1.414,1.414,0,0,1,1.415-1.414,1.414,1.414,0,0,1,1.415,1.414,1.414,1.414,0,0,1-1.415,1.414A1.414,1.414,0,0,1-4164.535-560.085Zm-5.74,0a1.414,1.414,0,0,1,1.415-1.414,1.414,1.414,0,0,1,1.415,1.414,1.414,1.414,0,0,1-1.415,1.414A1.414,1.414,0,0,1-4170.274-560.085Zm-5.726,0a1.414,1.414,0,0,1,1.415-1.414,1.415,1.415,0,0,1,1.416,1.414,1.415,1.415,0,0,1-1.416,1.414A1.414,1.414,0,0,1-4176-560.085Z" transform="translate(4181.094 571.625)"/>
                </svg>
                </i>
                <span>More</span>
            </a>
            </li>
        </div>
    </div>
    <teleport to="body">
      <transition name="fade">
        <backdrop v-if="showMenu" @click.prevent="showthisMenu('more_mob')" />
      </transition>
      <transition name="slide">
        <div id="more_menu_mob" class="dialog" v-if="showMenu" :class="{ 'menu-card-mob': getMobile}" :style="{ left: getFloatingDiv.left+'px', bottom: getFloatingDiv.bottom + 'px' }">
          <div class="title" v-show="getMobile">
            <div>More menus</div>
            <button @click.prevent="showthisMenu('more_mob')">
              <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
              </svg>
          </button>
          </div>
            <ul>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'ProfileStoreDetails', params: { name: getUser.name }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 19.597 22.966">
                            <path d="M-155.951-501.122A24.73,24.73,0,0,1-165.3-502.7l-.445-.2v-.487a7.545,7.545,0,0,1,7.536-7.537h4.524a7.545,7.545,0,0,1,7.537,7.537v.487l-.445.2A24.73,24.73,0,0,1-155.951-501.122Zm-8.278-2.765a25.4,25.4,0,0,0,8.278,1.265,25.269,25.269,0,0,0,8.278-1.264,6.045,6.045,0,0,0-6.016-5.531h-4.524A6.044,6.044,0,0,0-164.229-503.888Zm8.278-8.169a5.28,5.28,0,0,1-4.043-2.066,6.889,6.889,0,0,1-1.609-4.315,5.658,5.658,0,0,1,5.651-5.651,5.658,5.658,0,0,1,5.651,5.651C-150.3-515.425-152.717-512.057-155.951-512.057Zm0-10.532a4.156,4.156,0,0,0-4.151,4.151,5.442,5.442,0,0,0,1.262,3.356,3.814,3.814,0,0,0,2.889,1.524,3.814,3.814,0,0,0,2.889-1.524,5.442,5.442,0,0,0,1.262-3.356A4.156,4.156,0,0,0-155.951-522.588Z" transform="translate(165.75 524.088)"/>
                        </svg>
                        <span>Profile</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{name: 'Tags'}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 15.97 15.97">
                            <path d="M1.207.707h5a.5.5,0,0,1,.354.146l5,5a1.5,1.5,0,0,1,0,2.121L7.975,11.561a1.5,1.5,0,0,1-2.121,0l-5-5a.5.5,0,0,1-.146-.354v-5A.5.5,0,0,1,1.207.707ZM6,1.707H1.707V6l4.853,4.853a.5.5,0,0,0,.707,0l3.586-3.586a.5.5,0,0,0,0-.707Z" transform="translate(16.97 7.985) rotate(135)" fill="#212121"/>
                        </svg>
                        <span>Tags</span>
                    </router-link>
                </li>
                <!-- <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Customers'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25.57 21.724">
                            <path id="Path_1655" data-name="Path 1655" d="M-127.122-114.189h-7.627v-.665a8.081,8.081,0,0,1,8.071-8.072,8.081,8.081,0,0,1,8.072,8.072v.665Zm-6.265-1.33h13.418a6.751,6.751,0,0,0-6.71-6.077A6.751,6.751,0,0,0-133.387-115.52Zm16.144-3.383v-1.33h6.7a6.053,6.053,0,0,0-.87-2.525A6.055,6.055,0,0,0-113.864-125a6.073,6.073,0,0,0-3.259-.617,6.069,6.069,0,0,0-3.1,1.19l-.532.4-.8-1.064.533-.4a7.394,7.394,0,0,1,3.775-1.449,7.387,7.387,0,0,1,3.973.751,7.392,7.392,0,0,1,2.985,2.728,7.4,7.4,0,0,1,1.1,3.89v.665ZM-130.6-129.042a4.217,4.217,0,0,1,4.212-4.212,4.217,4.217,0,0,1,4.212,4.212,4.216,4.216,0,0,1-4.212,4.212A4.217,4.217,0,0,1-130.6-129.042Zm1.33,0a2.885,2.885,0,0,0,2.882,2.882,2.885,2.885,0,0,0,2.882-2.882,2.885,2.885,0,0,0-2.882-2.882A2.886,2.886,0,0,0-129.271-129.042Zm9.31-3.547a3.329,3.329,0,0,1,3.326-3.325,3.328,3.328,0,0,1,3.325,3.325,3.328,3.328,0,0,1-3.325,3.326A3.329,3.329,0,0,1-119.96-132.589Zm1.33,0a2,2,0,0,0,2,2,2,2,0,0,0,2-2,2,2,0,0,0-2-1.994A2,2,0,0,0-118.63-132.589Z" transform="translate(134.75 135.913)"/>
                        </svg>
                        <span>Customers</span>
                    </router-link>
                </li> -->
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Suppliers' }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16.144 19.065">
                            <path d="M-4144.75-98.349v-.666a8.081,8.081,0,0,1,8.072-8.071,8.08,8.08,0,0,1,8.072,8.071v.666Zm1.363-1.33h13.418a6.751,6.751,0,0,0-6.709-6.077A6.751,6.751,0,0,0-4143.387-99.68Zm2.787-13.523a4.217,4.217,0,0,1,4.211-4.212,4.217,4.217,0,0,1,4.212,4.212,4.217,4.217,0,0,1-4.212,4.213A4.218,4.218,0,0,1-4140.6-113.2Zm1.33,0a2.885,2.885,0,0,0,2.881,2.882,2.886,2.886,0,0,0,2.883-2.882,2.885,2.885,0,0,0-2.883-2.881A2.885,2.885,0,0,0-4139.271-113.2Z" transform="translate(4144.75 117.414)"/>
                        </svg>
                        <span>My Suppliers</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link to="/discounts">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.5 22.5">
                            <path d="M-4152.781-279.75a4.036,4.036,0,0,1-4.031-4.031,4.036,4.036,0,0,1,4.031-4.031,4.036,4.036,0,0,1,4.031,4.031A4.036,4.036,0,0,1-4152.781-279.75Zm0-6.563a2.534,2.534,0,0,0-2.531,2.531,2.534,2.534,0,0,0,2.531,2.531,2.534,2.534,0,0,0,2.531-2.531A2.534,2.534,0,0,0-4152.781-286.313Zm-16.407,5.25a.748.748,0,0,1-.53-.22.747.747,0,0,1-.22-.53.748.748,0,0,1,.22-.53l18.375-18.375a.75.75,0,0,1,1.061,0,.747.747,0,0,1,.22.53.748.748,0,0,1-.22.53l-18.375,18.375A.748.748,0,0,1-4169.188-281.063Zm1.969-13.125a4.036,4.036,0,0,1-4.031-4.031,4.036,4.036,0,0,1,4.031-4.031,4.036,4.036,0,0,1,4.031,4.031A4.036,4.036,0,0,1-4167.219-294.188Zm0-6.563a2.534,2.534,0,0,0-2.531,2.531,2.534,2.534,0,0,0,2.531,2.531,2.534,2.534,0,0,0,2.531-2.531A2.534,2.534,0,0,0-4167.219-300.75Z" transform="translate(4171.25 302.25)"/>
                        </svg>
                        <span>Discounts</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="'/sales-record/filter/todays-sales'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.638 22.638">
                            <path d="M-4170.306-473.723h0a2.767,2.767,0,0,1-2.763-2.764v-8.8h3.01v1.5h-1.51v7.3a1.266,1.266,0,0,0,1.264,1.264,1.265,1.265,0,0,0,1.262-1.264v-19.875h18.612v19.875a2.766,2.766,0,0,1-2.763,2.764Zm2.764-2.764a2.746,2.746,0,0,1-.307,1.264h14.655a1.265,1.265,0,0,0,1.263-1.264v-18.375h-15.611Zm2.474-2.236v-1.5h10.5v1.5Zm0-4v-1.5h10.5v1.5Zm0-4v-5.5h10.5v5.5Zm1.5-1.5h7.5v-2.5h-7.5Z" transform="translate(4173.069 496.362)"/>
                        </svg>
                        <span>Records</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Trash'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21.5 23.166">
                            <path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)"/>
                        </svg>
                        <span>Trash</span>
                    </router-link>
                </li>
                 <hr>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'ProfileStoreDetails', params: { name: getUser.name }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23.5 23.5">
                            <path d="M-159.906-585.5l-.281-3.358a8.646,8.646,0,0,1-1.716-.714l-2.576,2.179-3.1-3.1,2.179-2.576a8.67,8.67,0,0,1-.711-1.714l-3.358-.281v-4.379l3.358-.281a8.71,8.71,0,0,1,.714-1.715l-2.179-2.575,3.1-3.1,2.576,2.18a8.675,8.675,0,0,1,1.714-.711l.281-3.359h4.379l.281,3.359a8.656,8.656,0,0,1,1.714.714l2.575-2.179,3.1,3.1-2.18,2.576a8.67,8.67,0,0,1,.711,1.714l3.359.281v4.379l-3.359.281a8.708,8.708,0,0,1-.714,1.714l2.18,2.575-3.1,3.1-2.576-2.179a8.668,8.668,0,0,1-1.714.711l-.281,3.361Zm-1.673-5.621a7.166,7.166,0,0,0,2.262.94l.536.122.256,3.06h1.62l.256-3.063.536-.122a7.18,7.18,0,0,0,2.26-.938l.465-.3,2.349,1.988,1.146-1.146-1.988-2.349.3-.465a7.174,7.174,0,0,0,.941-2.26l.121-.536,3.06-.256v-1.62l-3.06-.256-.121-.536a7.18,7.18,0,0,0-.938-2.26l-.3-.465,1.987-2.349-1.148-1.146-2.349,1.988-.465-.3a7.166,7.166,0,0,0-2.26-.941l-.536-.121-.256-3.06h-1.62l-.256,3.06-.536.121a7.182,7.182,0,0,0-2.26.938l-.465.3-2.348-1.987-1.147,1.147,1.988,2.349-.3.465a7.165,7.165,0,0,0-.941,2.26l-.121.536-3.06.256v1.62l3.06.256.121.536a7.161,7.161,0,0,0,.939,2.26l.294.465-1.987,2.349,1.145,1.146,2.349-1.988Zm.112-6.128a3.755,3.755,0,0,1,3.75-3.75,3.754,3.754,0,0,1,3.75,3.75,3.755,3.755,0,0,1-3.75,3.75A3.755,3.755,0,0,1-161.466-597.25Zm1.5,0a2.253,2.253,0,0,0,2.25,2.25,2.253,2.253,0,0,0,2.25-2.25,2.252,2.252,0,0,0-2.25-2.25A2.253,2.253,0,0,0-159.966-597.25Z" transform="translate(169.465 609)"/>
                        </svg>
                        <span>Settings</span>
                    </router-link>
                </li>
            </ul>
        </div>
      </transition>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
import MobAddDialog from './MobAddDialog.vue'
export default {
    name: 'MobileNavigation',
    components: { Backdrop, MobAddDialog },
    computed: mapGetters(['getMobile', 'getFloatingDiv', 'getUser']),
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
#mob_nav{
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: rgb(86 111 244 / 33%) 0 5px 12px 0;
  background-color: $white-color;
}
.mob-nav-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
  height: 68px;
  padding: 0 15px;
  li{
    list-style-type: none;
    display: flex;
    justify-content: center;
    width: 20%;
    position: relative;
    a{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-decoration: none;
      padding: 10px;
      font-size: 0.75rem;
      i{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 20px;
        margin-bottom: 5px;
      }
      span{
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-weight: 500;
        color: $dark;
        
      }
    }
  }
  #add_button{
    position: absolute;
    top: -20px;
  }
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
  }
  
  .menu-card-mob{
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
  

#more_menu_mob {
  ul{
    padding: 0;
    position: relative;
    margin: 0;
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
.slide-enter-from,
.slide-leave-to {
  transform: translateY(615px);
  
}
</style>
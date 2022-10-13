<template>
<div :class="{ 'jc' : getTablet }">
    <teleport to="body">
      <transition name="fade">
          <backdrop v-if="showMenu" @mousedown="showthisMenu('account_menu')"/>
      </transition>
      <transition :name="getMobile? 'slide' : ''">
            <div v-if="showMenu" class="dialog" :class="[{ 'menu-card-mob': getMobile}, { 'menu-card-desk': !getMobile}]" :style="{ left: getFloatingDiv.left+'px', bottom: getFloatingDiv.bottom + 'px'}">
                <div class="title" v-show="getMobile">
                  <div>Stores</div>
                  <button @click.prevent="showthisMenu('account_menu')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                      <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                  </button>
                </div>
                <div id="stores">
                  <div v-for="store in getStores" :key="store.id">
                      <div v-if="store.id == getUser.current" class="store-info-hold active">
                          <div class="avatar">
                            <span class="justify-content-center align-items-center bg-img"  v-bind:style="store.image != null ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+store.id+'/'+store.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></span>
                          </div>
                          <div class="acct-label">
                              <div class="user-details">
                                  <div class="user-name"><strong>{{ store.name }}</strong></div>
                                  <div class="shop">{{ store.address }}</div>
                                  <router-link @mouseup="showthisMenu('account_menu')" :to="{ name: 'SettingsAccount' }">Manage store</router-link>
                              </div>
                              <div class="acct-elipse">
                                  <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 27.028 19.354">
                                    <path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"/>
                                  </svg>
                              </div>
                          </div> 
                      </div>
                    </div>
                    <div v-for="store in getStores" :key="store.id">
                      <div class="store-info-hold inactive" v-if="store.id != getUser.current && getUser.role == 1" @click="doSwitch(store.id)">
                          <div class="avatar">
                            <span class="justify-content-center align-items-center bg-img" v-bind:style="store.image != null ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+store.id+'/'+store.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></span>
                          </div>
                          <div class="acct-label">
                              <div class="user-details">
                                  <div class="user-name"><strong>{{ store.name }}</strong></div>
                                  <div class="shop">{{ store.address }}</div>
                              </div>
                              <div class="acct-elipse">
                                <spinner v-if="load" v-bind:size="20" />
                              </div>
                          </div> 
                      </div>
                      <div class="store-info-hold inactive" v-else-if="store.id != getUser.current && getUser.role == 2 && (getUser.store_1 == store.id || getUser.store_2 == store.id)" @click="doSwitch(store.id)">
                          <div class="avatar">
                            <span class="justify-content-center align-items-center bg-img"  v-bind:style="store.image != null ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+store.id+'/'+store.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></span>
                          </div>
                          <div class="acct-label">
                              <div class="user-details">
                                  <div class="user-name"><strong>{{ store.name }}</strong></div>
                                  <div class="shop">{{ store.address }}</div>
                              </div>
                              <div class="acct-elipse">
                                <spinner v-if="load" v-bind:size="20" />
                              </div>
                          </div> 
                      </div>
                    </div>
                </div>
                <hr v-show="getStores.length > 1">
                <div class="logout-hold" @mouseup="showthisMenu('account_menu')">
                    <a v-if="getStores.length < 1 && getUser.subscription_type == 0" href="#" @click.prevent="this.$store.commit('forceSetOnboard', 'basicInfo')">
                      <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#0e142c"></path>
                      </svg>
                      Add new store
                    </a>
                    <a href="#" class="logout" @click.prevent="$store.dispatch('getLogout')">
                      <svg xmlns="http://www.w3.org/2000/svg"  height="14" viewBox="0 0 12.142 10.928">
                        <path id="Path_1672" data-name="Path 1672" d="M11.107,5.428l-.856.856,1.566,1.572H5.643V9.071h6.174l-1.566,1.566.856.862,3.036-3.036ZM3.214,4.214H8.071V3H3.214A1.218,1.218,0,0,0,2,4.214v8.5a1.218,1.218,0,0,0,1.214,1.214H8.071V12.714H3.214Z" transform="translate(-2 -3)" fill="#e63232"/>
                    </svg>
                    Logout
                    </a>
                </div>
            </div>
      </transition>
    </teleport>
    <div id="account_menu" class="store-info-hold" @click.prevent="showthisMenu('account_menu')" :class="[{ 'mob-acct-menu': getMobile}, { 'acct-menu': !getMobile}]">
      <div class="avatar">
              <span v-if="getStores.length > 0" class="justify-content-center align-items-center bg-img" v-bind:style="getCurrentStore.image != null ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getCurrentStore.id+'/'+getCurrentStore.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></span>
              <div v-else class="no-store-profile-small justify-content-center align-items-center">{{ computeInitials }}</div>
              <!-- <svg v-if="getMobile" xmlns="http://www.w3.org/2000/svg" width="9.747" height="6.014" viewBox="0 0 9.747 6.014">
                  <path d="M404.366,1308.847l-4.744-4.732a.75.75,0,0,1,1.059-1.062l3.663,3.655,3.514-3.644a.75.75,0,1,1,1.08,1.041Z" transform="translate(-399.402 -1302.833)" fill="#11172f"/>
              </svg> -->
          </div>
          <div class="acct-label" v-if="getDesktop">
            <div class="user-details">
                <div class="user-name"><strong>{{ getStores.length == 0 ? getUser.name : getCurrentStore.name }}</strong></div>
                <div class="shop">{{ getStores.length == 0 ? getUser.email : getCurrentStore.address }}</div>
            </div>
            <div class="acct-elipse">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> 
    </div>
</div> 
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
import Spinner from './Spinner.vue'
export default {
    components: { Backdrop, Spinner },
    computed: {
      ...mapGetters(['getFloatingDiv', 'getMobile', 'getTablet', 'getDesktop', 'getStores', 'getUser', 'getCurrentStore', 'getHostname', 'getDefaultImage', 'getUserAdminID']),
      computeInitials() {
          if(this.getUser.name && this.getStores.length < 1) {
              let name = this.getUser.name.split(' ')
              let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
              return initial
          }else if(this.getCurrentStore.name){
              let name = this.getCurrentStore.name.split(' ')
              let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
              return initial
          }
          return ''
      }
    },
    name: 'AccountMenu',
    data() {
        return {
            showMenu: false,
            load: false
        }
    },
    methods: {
        showthisMenu(id) {
            let elem = document.getElementById(id)
            if(this.showMenu === false) {
                this.showMenu = true
                this.$store.commit('setDynamicFloatingDiv', elem)
                this.$store.commit('setBodyFixed')
            }else{
                this.showMenu = false
                this.$store.commit('reSetDynamicFloatingDiv', elem)
                this.$store.commit('removeBodyFixed')
            }
        },
        doSwitch(id) {
          this.load = true
          this.$store.dispatch('getSwitchStore', id)
          
        }
    }
}
</script>
<style scoped lang="scss">
.jc{
  padding: 0 3px;
  #account_menu{
    justify-content: center;
    height: 64px
  }
  
}
hr{
  margin: 0;
}
.acct-menu{
padding: 15px 20px;
}
.mob-acct-menu{
  padding: none ;
}

#account_menu{
  cursor: pointer;
  &:hover{
    background-color: $dark-light;
  }
  &:hover .acct-elipse span{
      background-color: $primary-color;
    }
}
.menu-card-mob{
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    padding: 25px 0 !important; 
  }

.store-info-hold{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    border-radius: 1rem;
    transition: 0.2s all linear;
  }
  
  .acct-label{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .user-details{
      max-width: 140px;
      flex-shrink: 1;
      padding: 0 10px;
      .user-name{
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .shop{
        color: $gray-color;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a{
        color: $primary-color;
        text-decoration: none;
        font-weight: 500;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .acct-elipse{
      display: flex;
      align-items: center;
      width: 24px;
      justify-content: flex-end;
      span{
        display: block;
        height: 4px;
        width: 4px;
        background-color: $dark;
        margin-right: 3px;
        border-radius: 50%;
      }
    }
  }
  .avatar {
      svg{
          margin-left: 5px;
      }
  }
  .bg-img{
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid $dark-light;
  }
  .dialog{
    position: fixed;
    background-color: $white-color;
    z-index: 101;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0; 
  }
  .menu-card-desk{
    width: 255px;
    border-radius: 16px; 
  }
  .logout-hold{
      
      a{
          display: block;
          padding: 16px 20px;
          color: $dark;
          text-decoration: none;
          font-weight: 500;
          transition: 0.2s all linear;
          display: flex;
          align-items: center;
          svg{
            margin-right: 15px;
          }
      }
      a:hover{
          background-color: $dark-light;
      }
      a:active{
          background-color: $dark-light;
      }
      
  }
  #stores{
    .store-info-hold{
      padding: 15px 20px;
      border-radius: 0;
      
    }
  
    .inactive {
      cursor: pointer;
      &:hover{
        background-color: $dark-light;
      }
    }
  }

.slide-enter-from,
.slide-leave-to {
  transform: translateY(350px);
}
  
</style>
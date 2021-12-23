<template>
    <teleport to="body">
        <backdrop v-if="showMenu" @click="showthisMenu('account_menu')"/>
        <div v-if="showMenu" class="menu-card" :style="{ left: getFloatingDiv.left-15+'px', bottom: '100px'}">
            <div></div>
            <div class="logout-hold">
                <hr>
                <a href="#" @click.prevent="$store.commit('destroyToken')">Logout</a>
            </div>
            <!--<a href="#" @click.prevent="$store.commit('destroyToken')">Logout</a>-->
        </div>
    </teleport>
    <div id="account_menu" @click="showthisMenu('account_menu')" :class="{ 'jc' : getTablet }">
        <div id="avatar">
            <span v-bind:style="{backgroundImage: 'url('+require('@/assets/images/avatar.png')+')'}"></span>
        </div>
        <div class="acct-label" v-if="getDesktop">
            <div class="user-details">
                <div id="user_name"><strong>Benjamin Ayimah</strong></div>
                <div id="shop">John’s Enterprise</div>
            </div>
            <div id="acct_elipse">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> 
    </div>

    
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
    components: { Backdrop },
    computed: mapGetters(['getFloatingDiv', 'getMobile', 'getTablet', 'getDesktop']),
    name: 'AccountMenu',
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
.jc{
  justify-content: center;
}
#account_menu{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 15px 20px;
    border-radius: 1rem;
    transition: 0.2s all linear;
    width: 100%;
    cursor: pointer;
  }
  #account_menu:hover{
      background-color: $dark-light;
    }
    #account_menu:hover #acct_elipse span{
      background-color: $primary-color;
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
      #user_name{
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #shop{
        color: $gray-color;
        font-size: 0.99rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    #acct_elipse{
      display: flex;
      align-items: center;
      width: 24px;
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
  #avatar span{
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid $gray-light;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .menu-card{
    position: fixed;
    height: 200px;
    width: 300px;
    border-radius: 16px;
    background-color: $white-color;
    z-index: 101;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 0; 
  }
  .logout-hold{
      
      a{
          display: block;
          padding: 20px;
          color: $dark;
          text-decoration: none;
          
          font-weight: 500;
          transition: 0.2s all linear;
      }
      a:hover{
          background-color: $primary-light;
          color: $primary-color;
      }
      a:active{
          background-color: $dark-light;
      }
      
  }

</style>
<template>
<teleport to="body" v-if="showNoti && !getMobile">
<backdrop @click="showNotification('noti_main_list')" />
<div class="notification-dropdown" :style="{ left: getFloatingDiv.left-345+'px'}">
    <div class="noti-head align-items-center">
        <h3>Notifications</h3>
        <div @click="showNotification('noti_main_list')">
            <router-link :to="{ name: 'Notifications', params: { name: 'all'} }">See all</router-link>
        </div>
    </div>
    <div class="noti-body">
        <div id="noti_main_wrapper">
            <div v-if="getNotifications.length > 0">
                <notification-float-row v-on:closeDropdown="showNotification" />
            </div>
            <div v-else class="empty-state flex justify-content-center align-items-center">
                <div class="flex gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354">
                        <path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path>
                    </svg>
                    <div>Everything looks Good up here!</div>
                </div>
            </div>
        </div>
    </div>
    <div class="noti-bottom"></div>
</div>
</teleport>

<li id="noti_main_list">
    <router-link :to="getMobile ? { name: 'Notifications', params: { name: 'all'} } : ''" @click.prevent="!getMobile ? showNotification('noti_main_list') : ''">
        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'noti-isActive' : showNoti }" height="22" viewBox="0 0 24.177 26.285"><g transform="translate(-4.955 -2)">
            <path id="bell" d="M27.088,21.883s-2.812-3.616-2.812-6.83V10.232A7.232,7.232,0,0,0,17.044,3h0a7.232,7.232,0,0,0-7.232,7.232v4.821c0,3.214-2.812,6.83-2.812,6.83Z" transform="translate(0 0)" fill="rgba(255,255,255,0)" stroke="#0e142c" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/><path id="Path_1761" d="M30.821,55A2.411,2.411,0,0,1,26,55" transform="translate(-11.367 -30.126)" fill="rgba(0,0,0,0)" stroke="#0e142c" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></g>
        </svg>
        <span class="noti-count flex justify-content-center align-items-center" v-if="getNotifications.length > 0">
        {{ getNotifications.length}}
        </span>
    </router-link>
</li>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
import NotificationFloatRow from './NotificationFloatRow.vue'
export default {
  components: { Backdrop, NotificationFloatRow },
  computed: mapGetters(['getFloatingDiv', 'getMobile', 'getNotifications']),
    name: 'NotificationFloat',
    data() {
        return {
            showNoti: false,
            mobile: false,
        }
    },
    methods: {
        showNotification(id) {
            let elem = document.getElementById(id)
            if(this.showNoti === false) {
                this.showNoti = true
                this.$store.dispatch('setNotification')
                document.body.classList.add('fixed-body')
                this.$store.commit('setDynamicFloatingDiv', elem)
            }else{
                this.showNoti = false
                document.body.classList.remove('fixed-body')
                this.$store.commit('reSetDynamicFloatingDiv', elem)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.notification-dropdown{
    position: fixed;
    background-color: $white-color;
    z-index: 101;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 16px;
    top: 79px;
    .noti-head{
        display: inherit;
        justify-content: space-between;
        height: 60px;
        border-bottom: 1px solid $dark-light;
        padding: 0 20px;
        a{
            color: $primary-color;
            font-weight: 600;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .noti-body{
        min-height: 180px;
        max-height: 400px;
        overflow-y: auto;         
    }
    .noti-bottom{
        position: absolute;
        width: 100%;
        height: 30px;
        bottom: 0;
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        background: linear-gradient(0deg, rgba(255,255,255,1), rgba(0,0,0,0));
    }
}

a{
    text-decoration: unset;
}
#noti_main_wrapper{
    height: inherit;
    .empty-state{
        height: 300px;
        padding: 0;
        .gap-8{
            justify-content: inherit;
            align-items: inherit;
        }
    }
}
.noti-count{
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
    height: 20px;
    width: 20px;
    background-color: $danger;
    position: absolute;
    border-radius: 50%;
    border: 1px $white-color solid;
    top: 5px;
    right: 5px;
}
.noti-isActive path{
    fill: $dark;
}

</style>
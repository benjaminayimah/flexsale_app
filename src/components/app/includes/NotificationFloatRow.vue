<template>
    <li @click="$emit('closeDropdown', 'noti_main_list')" v-for="notification in computedNotifications.sort((a, b) => new Date(b.time) - new Date(a.time))" :key="notification.id">
        <router-link :to="{ name: 'Notifications', params: { name: notification.key} }">
            <div class="flex gap-8">
                <div class="img bg-img" :class="{ 'stacks' : notification.count > 1 }" :style="notification.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+notification.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                <div>
                    <div class="flex align-items-center noti-title">
                        <div class="noti-label" :style="{ 'color' : notification.color }">{{ notification.title }}</div>
                        <i class="separator-dot"></i>
                        <div class="noti-time">{{ dateTime(notification.time) }}</div>
                        <i class="unread" v-if="!notification.read"></i>
                    </div>
                    <div>{{ notification.message }}</div>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
import NotificationMixin from '../../../mixins/notifications'

import { mapGetters } from "vuex"
export default {
    inheritAttrs: false,
    name: 'NotificationRow',
    mixins: [NotificationMixin],
    computed: {
        ...mapGetters(['getHostname', 'getDefaultImage', 'getUser', 'getUserAdminID'])
    }
}
</script>
<style lang="scss" scoped>
li{
    list-style-type: none;
    a{
        text-decoration: unset;
        padding: 20px;
        color: unset;
        display: flex;
        flex-direction: row;
        transition: 0.3s all;
        gap: 8px;
        &:hover{
            background-color: #F2F2F7;
        }
    }
    .img{
        height: 40px;
        width: 40px;
        min-width: 40px;
        border-radius: 5px;
    }
    .stacks{
        position: relative;
        &::after, &::before{
            content: "";
            border-bottom: 1px solid $gray-color;
            position: absolute;
        }
        &::after{
            bottom: -3px;
            width: 80%;
            margin: 0 4px;
        }
        &::before{
            bottom: -5px;
            width: 60%;
            margin: 0 8px;
        }
    }
    .noti-label{
        font-weight: 700;
        text-transform: uppercase;
        font-size: 15px;
    }
    .noti-time{
        color: $gray-color;
        font-size: 13px;
    }
}
.noti-title{
    position: relative;
}
.unread{
    background-color: #5B94F0;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    margin-left: 5px;
}
</style>
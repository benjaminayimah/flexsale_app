<template>
<div class="noti-main-row flex">
    <div class="noti-main-row-top">
        <div class="flex align-items-center noti-title">
            <div class="noti-label" :style="{ 'color' : notification.color }">{{ notification.title }}</div>
            <i class="separator-dot"></i>
            <div class="noti-time">{{ dateTime(notification.time) }}</div>
            <i class="unread" v-if="!notification.read"></i>
        </div>
        <div>{{ notification.message }}</div>
    </div>
    <div class="noti-main-bottom-list">
        <noti-main-row-list v-for="list in computedList" :key="list.id" v-bind:list="list" />
    </div>
</div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import NotiMainRowList from './NotiMainRowList.vue'
export default {
    components: { NotiMainRowList },
    name: 'NotificationMainRow',
    props: ['notification'],
    computed: {
        ...mapGetters(['getNotifications']),
        computedList() {
            return this.getNotifications.filter(data => data.key === this.notification.key)
        }
    },
    methods: {
        dateTime(value) {
            return moment(value).fromNow()
        }
    }
}
</script>
<style lang="scss" scoped>
.noti-main-row{
    flex-direction: column;
    margin-bottom: 50px;
}
.noti-main-row-top{
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
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
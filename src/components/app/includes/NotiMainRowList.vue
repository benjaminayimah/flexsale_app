<template>
    <div class="flex gap-8 row-main-list">
        <div class="img bg-img" :style="list.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+list.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
        <div class="flex-row-js">
            <div class="captions">
                <div>{{ list.name }}</div>
                <div v-if="list.batch_no">{{ list.batch_no }}</div>
                <div class="time-remains flex">
                    <span>{{ computeExpiryDate(list.key, list.expiry_date) }}</span>
                </div>
            </div>
            <div class="flex actions">
                <router-link to="">Goto product</router-link>
                <router-link to="" class="rm-prod">Remove</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    name: 'NotiMainRowList',
    props: ['list'],
    computed: mapGetters(['getHostname', 'getUserAdminID', 'getDefaultImage', 'getUser']),
    methods: {
        computeExpiryDate(key, date) {
            if(key == 'expiring-soon'){
                const expiringDate = new Date(date);
                const diff = Math.abs(expiringDate - new Date());
                return Math.ceil(diff / (1000 * 60 * 60 * 24)) + ' days to expire'; 
            }else
            return ''
        }
    }
}
</script>
<style lang="scss" scoped>
.row-main-list{
    margin-bottom: 15px;
}
.img{
    background-color: $dark-light;
    height: 80px;
    width: 80px;
    min-width: 80px;
    border-radius: 12px;
}
.captions{
    display: flex;
    flex-direction: column;
}
.flex-row-js{
    width: 85%;;
}
.actions{
    a{
        padding: 8px;
        text-decoration: unset;
        color: $primary-color;
        font-weight: 500;
    }
    .rm-prod{
        color: $danger;
    }
}
</style>
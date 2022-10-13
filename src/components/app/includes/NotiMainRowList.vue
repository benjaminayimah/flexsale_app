<template>
    <div class="flex gap-8 row-main-list">
        <div class="img bg-img" :style="list.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+list.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
        <div class="flex-row-js">
            <div class="captions">
                <div class="name">{{ list.name }}</div>
                <div v-if="list.batch_no" class="batch-no flex"><label class="mg-0">Batch No.:</label><span>{{ list.batch_no }}</span></div>
                <div v-if="list.key === 'low-stocks'" class="batch-no flex"><label class="mg-0">Stock:</label><span>{{ list.stock }}</span></div>
                <div class="time-remains flex">
                    <span>{{ computeExpiryDate(list.key, list.expiry_date) }}</span>
                </div>
            </div>
            <div class="flex actions align-items-center ">
                <router-link :to="{ name: 'ProductDetailsBasic', params: { id: list.product_id, name: list.name } }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.6 15.6">
                        <path d="M1181.982-10350.9a2.357,2.357,0,0,1-2.354-2.354v-8.558a2.357,2.357,0,0,1,2.354-2.354h4.667a.8.8,0,0,1,.8.8.8.8,0,0,1-.8.8h-4.667a.755.755,0,0,0-.755.754v8.558a.755.755,0,0,0,.755.754h8.557a.755.755,0,0,0,.755-.754v-4.668a.8.8,0,0,1,.8-.8.8.8,0,0,1,.8.8v4.668a2.357,2.357,0,0,1-2.354,2.354Zm3.325-5.68a.8.8,0,0,1,0-1.129l7.189-7.191h-2.735a.8.8,0,0,1-.8-.8.8.8,0,0,1,.8-.8h4.665a.8.8,0,0,1,.567.234.8.8,0,0,1,.234.566h0v4.665a.8.8,0,0,1-.8.8.8.8,0,0,1-.8-.8v-2.734l-7.191,7.188a.793.793,0,0,1-.565.234A.793.793,0,0,1,1185.307-10356.58Z" transform="translate(-1179.628 10366.5)" fill="#566ff4"/>
                    </svg>
                    <span class="hide-mob text-overflow-ellipsis">See product</span>
                </router-link>
                <span class="horizontal-separator"></span>
                <a href="#" class="rm-prod" v-if="list.key !== 'low-stocks'" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: list.product_id })">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 21.5 23.166">
                        <path fill="#e63232" d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)"></path>
                    </svg>
                    <span class="hide-mob text-overflow-ellipsis">Remove</span>
                </a>
                <a href="#" v-else @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: list.product_id })">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 14">
                        <path d="M14,10H2v2H14Zm0-4H2V8H14Zm4,8V10H16v4H12v2h4v4h2V16h4V14ZM2,16h8V14H2Z" transform="translate(-2 -6)" fill="#566ff4"/>
                    </svg>
                    <span class="hide-mob text-overflow-ellipsis">Re-stock</span>
                </a>
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
    gap: 5px;
    .name{
        font-weight: 500
    }
    .batch-no{
        color: $gray-color;
        span{
            margin-left: 5px;
        }
    }
}
.flex-row-js{
    width: 85%;;
}
.actions{
    a{
        padding: 10px;
        text-decoration: unset;
        color: $primary-color;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        &:hover{
            background-color: $primary-light;
        }
    }
    svg{
        flex-shrink: 0;
    }
    .rm-prod{
        color: $danger;
        &:hover{
            background-color: rgba(230, 50, 50, 0.05);
        }
    }
}
</style>
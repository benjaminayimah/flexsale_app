<template>
    <div class="info-section">
        <div v-if="getStores.length > 0">
            <div class="flex-col">
                <div class="flex align-items-center"><label>Store name:</label><span>{{ getCurrentStore.name }}</span></div>
                <div class="flex align-items-center" v-if="getCurrentStore.phone_1 || getCurrentStore.phone_2"><label>Phone:</label><span>{{ getCurrentStore.phone_1 }}</span><span v-if="getCurrentStore.phone_2">, {{ getCurrentStore.phone_2 }}</span></div>
                <div class="flex align-items-center"><label>Address:</label><span>{{ getCurrentStore.address || 'n/a' }}</span></div>
                <div class="flex align-items-center"><label>City:</label><span>{{ getCurrentStore.city || 'n/a' }}</span></div>
                <div class="flex align-items-center"><label>Region:</label><span>{{ getCurrentStore.region || 'n/a' }}</span></div>
                <div class="flex align-items-center"><label>Country:</label><span>{{ getCurrentStore.country || 'n/a' }}</span></div>
                <div class="flex align-items-center"><label>Currency:</label><span>{{ getCurrentStore.currency_code || 'n/a' }}</span></div>
                <div class="flex align-items-center"><label>Date created:</label><span>{{ dateTime(getCurrentStore.created_at) }}</span></div>
            </div>
            <button v-if="getUser.role == 1" class="button button-secondary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'store'})">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
                </svg>
                <span>Update store details</span>
            </button>
        </div>
        <div v-else>
            No store found, begin by creating new store
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'ProfileStoreDetails',
    computed: mapGetters(['getCurrentStore', 'getUser', 'getStores']),
    methods: {
        dateTime(value) {
            return moment(value).format('MMM DD, YYYY hh:mm a')
        }
    }
}
</script>
<style scoped lang="scss">
.info-section{
    padding: 20px 0;
    transition: 0.3s all;
    .align-items-center{
        span{
            text-transform: capitalize;
        }
    }
}
.button-secondary{
    height: 50px;
    width: 100%;
    background-color: transparent;
    color: $primary-color;
    margin: 20px 0;
    transition: 0.3s all text-decoration;
    path {
        fill: $primary-color;
    }
    span{
        margin-left: 8px;
    }
    &:hover{
        background-color: $primary-light;
        border-color: rgba(86, 110, 244, 0.5);
    }
}
label{
    margin-right: 10px;
}

</style>
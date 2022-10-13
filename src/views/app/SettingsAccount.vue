<template>
    <div class="main-page-body">
        <div class="flex-col">
            <div v-if="getStores.length > 0" class="justify-content-center relative align-items-center profile-pg-avatar bg-img" :class="getCurrentStore.image? 'bg-img': 'no-store-profile-large'" v-bind:style="getCurrentStore.image != null ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getCurrentStore.id+'/'+getCurrentStore.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}">
                <div class="overlay" v-if="getUser.role == 1">
                    <div class="flex cam justify-content-center align-items-center">
                        <div class="btn-holder">
                            <button class="button upload-btn flex" @click.prevent="$store.commit('editProfileImage')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                                    <path d="M20,4H16.83L15,2H9L7.17,4H4A2.006,2.006,0,0,0,2,6V18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,20,4Zm0,14H4V6H8.05L9.88,4h4.24l1.83,2H20ZM12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3.009,3.009,0,0,1,12,15Z" transform="translate(-2 -2)" fill="#ffffff"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="no-store-profile-large justify-content-center align-items-center">
                {{ computeInitials }}
            </div>
        </div>
        <div class="flex-row-js align-items-center content-row">
            <div class="row-title">Store Details</div>
            <a v-if="getUser.role == 1" href="#" class="add-more text-primary text-600 flex align-items-center" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'store'})">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
                </svg>
                Update details
            </a>
        </div>
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
        <!-- <div v-else>
            No store found, begin by creating new store
        </div> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'SettingsAccount',
    computed: {
        ...mapGetters(['getUser', 'getCurrentStore', 'getHostname', 'getStores', 'getUserAdminID', 'getDefaultImage']),
        computeInitials() {
            if(this.getCurrentStore.name){
              let name = this.getCurrentStore.name.split(' ')
              let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
              return initial
            }
            return ''
        }
    },
    data() {
        return {
            title: 'Account Settings'
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: true}
            this.$store.commit('setPagetitle', title)
        },
        dateTime(value) {
            return moment(value).format('MMM DD, YYYY hh:mm a')
        }
    }
}
</script>
<style scoped lang="scss">
.bg-img{
    border: 1px solid $dark-light;
    border-radius: 50%;
    margin-bottom: 20px;
}
.profile-pg-avatar{
    height: 150px;
    width: 150px;
}
label{
    margin-right: 10px;
}
.add-more{
    text-decoration: none;
    gap: 4px;
    path {
        fill: $primary-color;
    }
}
.text-primary:hover{
    text-decoration: underline;
}
.overlay{
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    transition: 0.3s all;
    &:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    .cam{
        height: 100%;
    }
    button{
        align-items: center;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        &:hover{
            background-color: rgba(0, 0, 0, 0.8);
        }
        &:active{
            background-color: rgba(0, 0, 0, 0.5);
        }
    }
    .btn-holder{
        position: relative;
        .upload-btn{
            height: 50px;
            width: 50px;
        }
        
    }
}
</style>
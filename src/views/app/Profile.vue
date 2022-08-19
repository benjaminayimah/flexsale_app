<template>
    <div class="main-page-body">
        <div class="flex-col align-items-center">
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
            <div class="main-top profile-name"><strong>{{ getUser.name }}</strong></div>
            <div class="main-top profile-email flex align-items-center">
                <label>Email:</label><span>{{ getUser.email }}</span>
            </div>
            <div class="flex gap-16">
                <button class="button add-more" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'admin', id: getUser.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                        <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
                    </svg>
                    <span>Edit profile</span>
                </button>
                <button class="button add-more" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'pass', type: 'admin', id: getUser.id})">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="16" viewBox="0 0 19.051 19.049">
                        <path d="M6899.083-7467.026a5.758,5.758,0,0,1,0-8.137,5.764,5.764,0,0,1,7.368-.645l8.585-8.585,1.412,1.415-2.376,2.376,2.378,2.378-3.792,3.791-2.376-2.378-2.417,2.417a5.764,5.764,0,0,1-.645,7.369,5.741,5.741,0,0,1-4.069,1.682A5.737,5.737,0,0,1,6899.083-7467.026Zm1.413-6.723a3.759,3.759,0,0,0,0,5.308,3.76,3.76,0,0,0,5.31,0,3.758,3.758,0,0,0,0-5.308,3.746,3.746,0,0,0-2.655-1.1A3.746,3.746,0,0,0,6900.5-7473.749Zm12.162-3.514.964-.962-.964-.963-.963.963Z" transform="translate(-6897.4 7484.394)" fill="#212121"/>
                    </svg>
                    <span>Reset password</span>
                </button>
            </div>
            <nav class="justify-content-center">
                <ul class="flex justify-content-center">
                    <li><router-link replace :to="{ name: 'ProfileStoreDetails', param: { name: getUser.name }}"><div>Store details</div></router-link></li>
                    <li><router-link v-if="getUser.role == 1" replace :to="{ name: 'ProfileAdministration', param: { name: getUser.name }}"><div>Administration</div></router-link></li>
                </ul>
            </nav>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Profile',
    computed: {
        ...mapGetters(['getUser', 'getCurrentStore', 'getHostname', 'getStores', 'getUserAdminID', 'getDefaultImage']),
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
    data() {
        return {
            title: 'Profile'
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
    height: 200px;
    width: 200px;
}


.main-top{
    margin-bottom: 8px;
}
.profile-name{
    font-size: 28px;
    text-transform: capitalize;
}
label{
    margin-right: 5px;
    color: $gray-color
}
.button-secondary{
    height: 45px;
    svg{
        margin-right: 8px;
    }
    &:first-child{
        margin-right: 16px;
    }
}
nav{
    display: flex;
    width: 100%;
    ul{
        padding-left: 0;
        margin-top: 30px;
        border-bottom: 1px solid $dark-light;
        width: 100%;
    }
    a{
        display: flex;
        color: $gray-color;
        text-decoration: none;
        padding: 0 20px;
        font-weight: 700;
        transition: 0.3s all;
        height: 100%;
        div{
            padding: 14px 0;
            
        }
        &:hover{
            background-color: $dark-light;
        }
        
    }
    .router-link-exact-active{
        color: $dark ;
        div{
            border-bottom: 2px $primary-color solid;

        }
    }

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
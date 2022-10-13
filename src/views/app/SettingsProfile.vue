<template>
    <div class="main-page-body">
        <div class="flex-col align-items-center">
            <div class="no-store-profile-large justify-content-center align-items-center">
                {{ computeInitials }}
            </div>
            <div class="main-top profile-name"><strong>{{ getUser.name }}</strong></div>
            <div class="main-top profile-email flex align-items-center">
                <label>Email:</label><span>{{ getUser.email }}</span>
            </div>
            <div>
                <button class="button add-more" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'admin', id: getUser.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                        <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
                    </svg>
                    <span>Edit profile</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SettingsProfile',
    computed: {
        ...mapGetters(['getUser']),
        computeInitials() {
            if(this.getUser.name) {
                let name = this.getUser.name.split(' ')
                let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
                return initial
            }
            return ''
        }
    },
    data() {
        return {
            title: 'Profile Settings'
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
    height: 150px;
    width: 150px;
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
</style>
<template>
    <div class="main-page-body">
        <div v-if="getStores.length > 0">
            <div class="flex-row-js">
                <button class="button button-primary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'admin'})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"></path>
                    </svg>
                    <span>New user</span>
                </button>
            </div>
            <div class="admin-row-wrap">
                <admin-users-row v-for="admin in getAdmins" :key="admin.id" v-bind:admin="admin" /> 
            </div>
        </div>
        <div v-else>
            No store found, begin by creating new store
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AdminUsersRow from '../../components/app/includes/AdminUsersRow.vue'
export default {
    name: "SettingsAdmins",
    components: { AdminUsersRow },
    computed: {
        ...mapGetters(["getAdmins", "getStores"])
    },
    data() {
        return {
            title: "Administrators"
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.setPage();
        this.$store.dispatch("fetchAdmins");
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: true };
            this.$store.commit("setPagetitle", title);
        }
    }
}
</script>
<style scoped lang="scss">
.button-primary{
    height: 52px;
    gap: 5px;
}
h3{
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 900;
    margin: 0;
}
.admin-row-wrap{
    margin: 15px 0 150px 0 ;
   
}
</style>
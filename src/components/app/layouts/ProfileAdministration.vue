<template>
    <div id="admins">
        <div class="flex-row-js">
            <h3>Store admins</h3>
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
</template>
<script>
import AdminUsersRow from '../includes/AdminUsersRow.vue'
import { mapGetters } from 'vuex'
export default {
  components: { AdminUsersRow },
    name: 'ProfileAdministration',
    computed: mapGetters(['getAdmins'])
}
</script>
<style scoped lang="scss">
.button-primary{
    height: 48px;
    span{
        margin-left: 5px;
    }
}
h3{
    text-transform: uppercase;
    font-size: 16px;
}
.admin-row-wrap{
    margin: 30px 0 150px 0 ;
   
}
</style>
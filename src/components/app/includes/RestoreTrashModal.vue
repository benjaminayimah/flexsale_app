<template>
    <transition name="fade">
        <div v-if="getTrashRestoreDeleteModal.active" class="backdrop delete-backdrop" @click.prevent="$store.commit('closeDeleteModal')"></div>
    </transition>
    <transition name="slide">
        <div v-if="getTrashRestoreDeleteModal.active" class="delete-container">
            <div class="delete-wrap">
                <a href="#" class="alert-close flex justify-content-center align-items-center" @click.prevent="$store.commit('closeTrashRestoreDeleteModal')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 14 14">
                            <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </a>
                <div>
                    <svg v-if="getTrashRestoreDeleteModal.restore" xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 66.523 57.02">
                        <path d="M39.013,3A28.51,28.51,0,0,0,10.5,31.51H1L13.671,44.149,26.342,31.51h-9.5a22.281,22.281,0,1,1,6.526,15.649l-4.5,4.5A28.5,28.5,0,1,0,39.013,3ZM35.845,18.839V34.678L49.308,42.66l2.439-4.055L40.6,31.985V18.839Z" transform="translate(-1 -3)" fill="#566ff4"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="50" class="icon-delete" viewBox="0 0 56.991 62.562">
                        <path d="M13659.541-5182.932a6.892,6.892,0,0,1-4.724-1.867,6.878,6.878,0,0,1-2.174-4.59l-2.472-37.048,3-.2,2.469,37.049a3.925,3.925,0,0,0,3.905,3.655h25.063a3.921,3.921,0,0,0,3.906-3.655l2.472-37.049,2.992.2-2.469,37.048a6.9,6.9,0,0,1-2.177,4.59,6.894,6.894,0,0,1-4.725,1.867Zm-16.04-48.763v-3h17.595v-10.8h21.954v10.8h17.442v3Zm36.547-3v-7.8H13664.1v7.8Z" transform="translate(-13643.501 5245.493)"/>
                    </svg>
                </div>
                <div class="delete-info">
                    <h2 v-if="!getTrashRestoreDeleteModal.restore">Delete ({{ getTrashRestoreDeleteModal.count}}) products</h2>
                    <h2 v-else>Restore ({{ getTrashRestoreDeleteModal.count}}) products</h2>
                    <span v-if="getTrashRestoreDeleteModal.restore">Do you want to Restore items?</span>
                    <span v-else class="danger">Are you sure want to permanently delete items?</span>
                </div>
                <button v-if="getTrashRestoreDeleteModal.restore" class="button button-primary" :class="{ 'button-disabled' : getTrashRestoreDeleteModal.deleting }" :disabled="getTrashRestoreDeleteModal.deleting? true : false" @click.prevent="$store.commit('doRestoreDeleteTrash')">{{ getTrashRestoreDeleteModal.deleting ? 'Restoring... ' : 'Restore'}}</button>
                <button v-else class="button button-primary" :class="{ 'button-disabled' : getTrashRestoreDeleteModal.deleting }" :disabled="getTrashRestoreDeleteModal.deleting? true : false" @click.prevent="$store.commit('doRestoreDeleteTrash')">{{ getTrashRestoreDeleteModal.deleting ? 'Deleting... ' : 'Yes, Delete'}}</button>
                <button class="button cancel-btn" @click.prevent="$store.commit('closeTrashRestoreDeleteModal')">Cancel</button>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'RestoreTrashModal',
    computed: mapGetters(['getTrashRestoreDeleteModal']),
}
</script>
<style scoped lang="scss">
.delete-backdrop{
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999;
}
.icon-delete path{
    fill: $danger
}
.icon-trash path{
    fill: $gray-color
}
.danger{
    color: $danger !important;
}
    .slide-enter-from,
.slide-leave-to {
    transform: translate(-50%, -10%);
    opacity: 0;
}

</style>
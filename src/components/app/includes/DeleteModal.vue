<template>
    <transition name="fade">
        <div v-if="getDeleteModal.active" class="backdrop delete-backdrop" @click.prevent="$store.commit('closeDeleteModal')"></div>
    </transition>
    <transition name="slide">
        <div v-if="getDeleteModal.active" class="delete-container">
            <div class="delete-wrap">
                <a href="#" class="alert-close flex justify-content-center align-items-center" @click.prevent="$store.commit('closeDeleteModal')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 14 14">
                            <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </a>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="50" :class="!getDeleteModal.trash ? 'icon-delete' : 'icon-trash' " viewBox="0 0 56.991 62.562">
                        <path d="M13659.541-5182.932a6.892,6.892,0,0,1-4.724-1.867,6.878,6.878,0,0,1-2.174-4.59l-2.472-37.048,3-.2,2.469,37.049a3.925,3.925,0,0,0,3.905,3.655h25.063a3.921,3.921,0,0,0,3.906-3.655l2.472-37.049,2.992.2-2.469,37.048a6.9,6.9,0,0,1-2.177,4.59,6.894,6.894,0,0,1-4.725,1.867Zm-16.04-48.763v-3h17.595v-10.8h21.954v10.8h17.442v3Zm36.547-3v-7.8H13664.1v7.8Z" transform="translate(-13643.501 5245.493)"/>
                    </svg>
                </div>
                <div class="delete-info">
                    <h2>{{ !getDeleteModal.trash ? 'Delete '+getDeleteModal.type : 'Move to Trash' }}</h2>
                    <span>{{ !getDeleteModal.trash ? 'Are you sure you want to delete this '+getDeleteModal.type+'?' : 'Are you sure you want to delete. You can restore this item from the trash.' }}</span>
                </div>
                <button v-if="!getDeleteModal.trash" class="button button-primary" :class="{ 'button-disabled' : getDeleteModal.deleting }" :disabled="getDeleteModal.deleting? true : false" @click.prevent="$store.commit('doDelete')">{{ getDeleteModal.deleting ? 'Deleting... ' : 'Yes, Delete'}}</button>
                <button v-else class="button button-primary" :class="{ 'button-disabled' : getDeleteModal.deleting }" :disabled="getDeleteModal.deleting? true : false" @click.prevent="$store.commit('doDelete')">{{ getDeleteModal.deleting ? 'Moving... ' : 'Move to trash'}}</button>
                <button class="button cancel-btn" @click.prevent="$store.commit('closeDeleteModal')">Cancel</button>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'DeleteModal',
    computed: mapGetters(['getDeleteModal']),
}
</script>
<style scoped lang="scss">
.delete-backdrop{
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999;
}
.cancel-btn{
    border-radius: 30px;
}
.icon-delete path{
    fill: $danger
}
.icon-trash path{
    fill: $gray-color
}
    .slide-enter-from,
.slide-leave-to {
    transform: translate(-50%, -10%);
    opacity: 0;
}

</style>
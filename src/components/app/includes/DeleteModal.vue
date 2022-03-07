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
                    <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 56.991 62.562">
                    <path d="M13659.541-5182.932a6.892,6.892,0,0,1-4.724-1.867,6.878,6.878,0,0,1-2.174-4.59l-2.472-37.048,3-.2,2.469,37.049a3.925,3.925,0,0,0,3.905,3.655h25.063a3.921,3.921,0,0,0,3.906-3.655l2.472-37.049,2.992.2-2.469,37.048a6.9,6.9,0,0,1-2.177,4.59,6.894,6.894,0,0,1-4.725,1.867Zm-16.04-48.763v-3h17.595v-10.8h21.954v10.8h17.442v3Zm36.547-3v-7.8H13664.1v7.8Z" transform="translate(-13643.501 5245.493)" fill="#e63232"/>
                    </svg>
                </div>
                <div class="delete-info">
                    <h2>Delete {{ getDeleteModal.type }}</h2>
                    <span>Are you sure you want to delete this {{ getDeleteModal.type }}?</span>
                </div>
                <button class="button button-primary" :class="{ 'button-disabled' : getDeleteModal.deleting }" :disabled="getDeleteModal.deleting? true : false" @click.prevent="$store.commit('doDelete')">{{ getDeleteModal.deleting ? 'Deleting... ' : 'Yes, Delete'}}</button>
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
    methods: {
        me(id) {
            console.log(id)
        }
    }
}
</script>
<style scoped lang="scss">
.delete-backdrop{
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999;
}
.delete-container{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    z-index: 999999;
    height: auto;
    width: 280px;
    .delete-wrap{
        border-radius: 24px;
        background-color: #ffffff;
        padding: 38px 35px 30px 35px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: relative;
        align-items: center;
        justify-content: space-between;
        button{
            width: 100%;
            height: 48px;
            border-radius: 12px;
        }
        .delete-info{
            text-align: center;
            margin-bottom: 15px;
            h2{
                margin: 15px 0;
                font-size: 18px;
            }
            span{
                color: $gray-color;
                font-weight: 500;
            }
            
        }
        .cancel-btn{
            margin-top: 10px;
            margin-left: 0;
            background-color: transparent;
            color: $primary-color;
            font-weight: 500;
            &:hover {
                text-decoration: underline;
            }
            &:active {
                border: 1px solid $primary-color;
                box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
                background-color: $primary-light;
            }
        }
    }
}
.alert-close{
    background-image: url('/images/close.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: -8px;
    transition: 0.3s all;
    height: 38px;
    width: 38px;
    border-radius: 50%;
    position: absolute;
    right: 18px;
    top: 10px;
    &:hover {
        background-color: $dark-light;
    }
    &:focus{
        box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
        border: 1px solid #0e142c9d;
        background-color: #fff;
    }
}
    .slide-enter-from,
.slide-leave-to {
    transform: translate(-50%, -10%);
    opacity: 0;
  
}

</style>
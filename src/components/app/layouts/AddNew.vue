<template>
    <secondary-backdrop />
    <div class="add-wrap" :style="{width: thisWidth+'px'}">
        <div class="add-content">
            <div class="add-prd-head">
                <div class="add-head-wrap">
                    <div class="add-head-hold" :style="{width: thisWidth+'px'}">
                        <div class="head-content">
                            <button class="button button-secondary cancel-btn" @click.prevent="$store.commit('unsetMainHomeWidth')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                    <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"/>
                                </svg>
                            </button>
                            <div class="heading">
                                <h1 class="text-overflow-ellipsis" v-if="getAddingProduct.product">Add New Product</h1>
                                <h1 class="text-overflow-ellipsis" v-else-if="getAddingProduct.tag && !getTagEditMode.active">Create Product Tag</h1>
                                <h1 class="text-overflow-ellipsis" v-else>Edit {{ getTagEditMode.name }}</h1>
                            </div>
                            <div class="btn-wrap flex-row">
                                <button class="button button-primary" v-if="getAddingProduct.product" @click.prevent="doUpload">Submit</button>
                                <button class="button button-primary" style="visibility: hidden" v-if="getAddingProduct.tag && !getTagEditMode.active" @click.prevent="submitTag"></button>
                                <button class="button button-primary" style="visibility: hidden" v-if="getAddingProduct.tag && getTagEditMode.active" @click.prevent=""></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-page-body">
                <div class="add-body">
                    <div class="form-wrap">
                        <alerts />
                        <add-new-product v-if="getAddingProduct.product" />
                        <add-new-tag v-if="getAddingProduct.tag" v-bind:thisWidth="thisWidth" v-bind:getTagEditMode="getTagEditMode" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import Alerts from '../includes/Alerts.vue'
import AddNewTag from './AddNewTag.vue'
import SecondaryBackdrop from '../includes/SecondaryBackdrop.vue'
import AddNewProduct from './AddNewProduct.vue'
export default {
  components: { Alerts, AddNewTag, SecondaryBackdrop, AddNewProduct },
    name: 'AddNew',
    computed: mapGetters(['getAddingProduct', 'getTagEditMode']),
    props: ['thisWidth'],
        
}
</script>
<style scoped lang="scss">

.add-wrap{
    background-color: $white-color;
    height: 100%;
    position: fixed;
    z-index: 201;
    top: 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
}
.add-content{
    .add-prd-head{
        z-index: 100;
        display: flex;
        align-items: center;
        position: relative;
        .add-head-wrap{
            height: 80px;
            width: 100%;
        }
        .add-head-hold{
            position: fixed;
            top: 0;
            display: flex;
            height: 80px;
            border-bottom: 1px solid $dark-light;
            background-color: $white-color;
        }
        .head-content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            padding: 0 30px;
            align-items: center;
        }
    }
    .heading{
        display: flex;
        height: 100%;
        align-items: center;
        h1{
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0;
        }
    }
    .btn-wrap{
        height: 100%;
        button{
            height: 44px;
            border-radius: 12px;
        }
        
    }
    
    .add-body{
        overflow-y: auto;
        display: flex;
        justify-content: center;
    }
    
}
.cancel-btn{
    display: flex;
    background-color: #ffffff;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    border: none;
    margin-left: -10px;
    border: 1px solid transparent;
    padding: 0;
  //transition: 0.3s all;
  &:hover{
    background-color: $dark-light;
  }
  &:focus{
      box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
      border: 1px solid #0e142c;
      background-color: #fff;
  }
}
.form-wrap{
    padding: 20px 0;
    width: 70%;
}
.mob-view{
    .form-wrap{
        width: 100% !important;
    }
    .head-content{
        padding: 0 15px !important;
    }
    .add-head-wrap, .add-head-hold{
        height: 60px !important;
    }

} 





.slide-enter-from,
.slide-leave-to {
  transform: translateY(200px);
  
}
</style>
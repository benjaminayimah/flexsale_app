<template>
    <teleport to="#main_home">
        <tertiary-backdrop />
        <div class="product-selection-sheet" :style="{width: thisWidth+'px'}">
            <div style="width:75%">
                 <div class="selection-main">
                    <button @click.prevent="$store.commit('setSelectionSheet')" class="dismiss">
                        <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                            <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#ffffff"/>
                        </svg>
                    </button>
                    <div class="selection-header">
                        <div class="header-holder">
                            <div>
                                <span class="count">{{ getCheckedProducts.length }}</span><span>items are added to your group</span>
                            </div>
                        </div>
                    </div>
                    <div class="selection-body" :style="{height: (windowHeight-280)+'px'}">
                        <ul>
                            <add-tag-row v-for="product in getProducts" :key="product.id" v-bind:product="product" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>
<script>
import AddTagRow from './AddTagRow.vue'
import TertiaryBackdrop from './TertiaryBackdrop.vue'
import { mapGetters } from 'vuex'
export default {
  components: { AddTagRow, TertiaryBackdrop },
    name: 'SelectProductOverlay',
    props: ['thisWidth', 'windowHeight'],
    computed: mapGetters(['getSelectionSheet', 'getProducts', 'getCheckedProducts']),

}
</script>
<style scoped lang="scss">
.product-selection-sheet{
    
    position: fixed;
    z-index: 301;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .selection-main{
        width: 100%;
        border-radius: 20px;
        background-color: #ffffff;
        position: relative;
        .selection-body{
            overflow-y: auto;
            padding: 0 40px;
            min-height: 300px;
            
        }
    }
    .dismiss{
        background-color: $dark;
        position: absolute;
        right: -15px;
        top: -15px;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        
    }
    .selection-header{
        padding: 20px 40px;
    }
    ul{
        height: 100px;
    } 
}

</style>
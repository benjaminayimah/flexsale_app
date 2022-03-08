<template>
    <teleport to="#main_home">
        <tertiary-backdrop @click.prevent="$store.commit('doSelectionSheet')" />
        <div class="product-selection-sheet" :style="{width: thisWidth+'px'}">
            <div style="width:75%">
                 <div class="selection-main">
                    <div class="selection-header">
                        <div class="header-holder">
                            <div class="flex align-items-center justify-between">
                                <button @click.prevent="$store.commit('doSelectionSheet')" class="button button-secondary cancel-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                    </svg>
                                </button>
                                <div class="flex"><span class="count">{{ getTempContainer.array.length }}</span><span>items selected</span></div>
                                <button class="button button-primary" @click.prevent="$store.commit('doSelectionSheet')">Done</button>
                                
                            </div>
                        </div>
                    </div>
                    <div class="selection-body" :style="{height: (windowHeight-180)+'px'}">
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
    computed: mapGetters(['getSelectionSheet', 'getProducts', 'getTempContainer']),

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
            padding: 0 20px;
            min-height: 300px;
            
        }
    }
    .selection-header{
        padding: 10px 20px;
        .header-holder{
            padding-top: 5px;
        }
    }
    ul{
        height: 100px;
        padding-left: 0;
    } 
}
.count{
    color: $primary-color;
}
.button-primary{
    height: 40px;
    border-radius: 12px;
}

</style>
                                
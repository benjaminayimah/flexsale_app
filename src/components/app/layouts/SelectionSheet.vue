<template>
    <teleport to="#app">
        <tertiary-backdrop @click.prevent="$store.commit('unSetSelectionSheet')" v-bind:zIndex="300"/>
        <div class="product-selection-sheet" :class="computeWidth ? 'width-active': 'width-inactive'">
            <div class="selection-wrap">
                 <div class="selection-main">
                    <div class="selection-header">
                        <div class="header-holder">
                            <div class="flex top-hold">
                                <button @click.prevent="$store.commit('unSetSelectionSheet')" class="button button-secondary cancel-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 23.062 19.844">
                                        <path d="M3769.432-2903.1l-10.236-9.362,10.214-9.937a1,1,0,0,1,1.414.02,1,1,0,0,1-.02,1.413l-7.665,7.457H3781.3a.981.981,0,0,1,.961,1,.981.981,0,0,1-.961,1h-18.1l7.58,6.932a1,1,0,0,1,.063,1.412,1,1,0,0,1-.739.326A1,1,0,0,1,3769.432-2903.1Z" transform="translate(-3759.195 2922.683)" fill="#0e142c"></path>
                                    </svg>
                                </button>
                                <div id="selection_title" class="flex head-title"></div>
                                <div id="selection_button"></div>
                            </div>
                        </div>
                    </div>
                    <div id="selection_sheet_body" class="selection-body" :style="{height: (windowHeight-180)+'px'}"></div>
                </div>
            </div>
        </div>
    </teleport>
</template>
<script>
import TertiaryBackdrop from '../includes/TertiaryBackdrop.vue'
import { mapGetters } from 'vuex'
export default {
  components: { TertiaryBackdrop },
    name: 'SelectionSheet',
    props: ['windowHeight'],
    computed: {
        ...mapGetters(['getWindowWidth']),
        computeWidth() {
            if(this.getWindowWidth <= 600) {
                return true
            }else {
                return false
            }
        }
    },
}
</script>
<style scoped lang="scss">
.product-selection-sheet{
    position: fixed;
    z-index: 301;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 600px;
    top: 0;
    .selection-main{
        width: 100%;
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
}
.top-hold{
    gap: 20px;
    .head-title{
        flex-direction: column;
        gap: 6px;
    }
}
.button-primary{
    height: 40px;
    border-radius: 12px;
}
.width-inactive{
    align-items: center;
    .selection-wrap{
        width: 90%;
    }
    .selection-main{
        border-radius: 20px;
    }
}
.width-active{
    width: 100%;
    align-items: flex-end;
    .selection-wrap{
        width: 100%;
    }
     .selection-main{
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
    
}

</style>
                                
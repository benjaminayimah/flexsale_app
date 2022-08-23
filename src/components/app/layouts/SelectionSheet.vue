<template>
    <teleport to="#app">
        <transition name="fade">
            <tertiary-backdrop v-if="getSelectionSheet.active" @click.prevent="$store.commit('unSetSelectionSheet')" v-bind:zIndex="300"/>
        </transition>
        <transition :name="getMobile? 'slide' : ''">
            <div v-if="getSelectionSheet.active" class="product-selection-sheet f-f-c" :class="computeWidth ? 'width-active': 'width-inactive'">
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
                    <div class="selection-body" :style="{maxHeight: (windowHeight-180)+'px'}">
                        <div id="selection_sheet_searchInput"></div>
                        <div id="selection_sheet_body"></div>
                    </div>
                </div>
            </div>
        </transition>
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
        ...mapGetters(['getWindowWidth', 'getSelectionSheet', 'getMobile']),
        computeWidth() {
            if(this.getWindowWidth <= 540) {
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
    .selection-main{
        width: 100%;
        background-color: #ffffff;
        position: relative;
        .selection-body{
            overflow-y: auto;
            padding: 10px 20px 60px 20px;
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
    top: 8%;
    align-items: center;
    width: 540px;
    .selection-wrap{
        width: 100%;
    }
    .selection-main{
        border-radius: 20px;
        width: 100%;
    }
}
.width-active{
    width: 100%;
    bottom: 0;
    .selection-wrap{
        width: 100%;
        width: 100%;
    }
     .selection-main{
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100%;
    }
}
@media screen and (max-width: 499px){
    .selection-header, .selection-body{
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .selection-body{
        padding-left: 10px !important;
        padding-right: 10px !important;
    }
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(820px);  
}
</style>
                                
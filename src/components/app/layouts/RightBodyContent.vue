<template>
    <div class="right-content-wrap">
        <div class="flex-col">
            <div class="flex-col gap-8 sticky-top" id="right_top">
                <div class="flex-row-js">
                    <div class="flex-col gap-8">
                        <label class="mg-0">Today’s sales</label>
                        <div class="flex gap-8">
                            <div class="flex">
                                <span class="currency">{{ getCurrency }}</span><h1>{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</h1>
                            </div>
                            <div class="flex-col">
                                <div class="flex compared-figure align-items-center" :class="checkDiff.status ? 'isIncreased' : 'isDecreased'">
                                    <span>{{ checkDiff.status ? '+' : '-' }}</span>
                                    <span>{{ Intl.NumberFormat('en-US').format(computeCompare.toFixed(2))}}</span>
                                    <span>%</span>
                                    <svg v-if="checkDiff.status" xmlns="http://www.w3.org/2000/svg" class="compare-arrow arrow-up" height="12" viewBox="0 0 8.164 10.6">
                                        <path d="M18342.83-3197.193v-7.289l-2.049,2.049a.749.749,0,0,1-1.062,0,.752.752,0,0,1,0-1.059l3.332-3.333h0l0,0a.75.75,0,0,1,.488-.213h.076a.768.768,0,0,1,.213.042h0l.018.007a.789.789,0,0,1,.262.166l3.33,3.334a.748.748,0,0,1,0,1.059.748.748,0,0,1-.531.221.743.743,0,0,1-.529-.221l-2.053-2.05v7.291a.75.75,0,0,1-.75.75A.751.751,0,0,1,18342.83-3197.193Z" transform="translate(-18339.5 3207.042)" fill="#20c647"/>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="compare-arrow arrow-down" height="12" viewBox="0 0 8.164 10.6">
                                        <path d="M18342.83-3206.292V-3199l-2.049-2.049a.749.749,0,0,0-1.062,0,.752.752,0,0,0,0,1.059l3.332,3.333h0l0,0a.75.75,0,0,0,.488.213h.076a.768.768,0,0,0,.213-.042h0l.018-.007a.789.789,0,0,0,.262-.166l3.33-3.334a.748.748,0,0,0,0-1.059.748.748,0,0,0-.531-.221.743.743,0,0,0-.529.221l-2.053,2.05v-7.291a.75.75,0,0,0-.75-.75A.751.751,0,0,0,18342.83-3206.292Z" transform="translate(-18339.5 3207.042)" fill="#e63232"/>
                                    </svg>

                                </div>
                                <span class="compared-label">Compare to yest'day</span>
                            </div>
                        </div>
                    </div>
                    <!-- <button class="menu-toggle-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                    </button> -->
                </div>
                <button class="button button-primary add-sale-btn" @click.prevent="getStores.length > 0 ? $store.commit('addToSale') : this.$store.commit('forceSetOnboard', 'intro')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
                    </svg>
                    <span>New sale</span>
                </button>
            </div>
            <div class="flex-row-js dashboard-title-wrap">
                <h1 class="dashboard-title">Recent sales</h1>
                <router-link :to="'/sales-record/filter/todays-sales'" class="see-all">See all</router-link>
            </div>
            <div v-if="getStores.length > 0">
                <div class="flex-col" id="dash_sales" v-if="getTodaysales.length > 0">
                    <today-sales-row v-for="sale in getTodaysales.slice(0, 10)" :key="sale.id" v-bind:sale="sale" />
                </div>
                <div v-else>
                    No sales today
                </div>
            </div>
            <div v-else class="flex-col gap-32">
                <div class="wlc-container wlc-cont-1 flex align-items-center justify-content-center">
                    <div class="wlc-wrap flex-col">
                        <h3>Your most recent sale activities will show up here</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TodaySalesRow from '../includes/TodaySalesRow.vue'
export default {
    name: 'RightBodyContent',
    components: { TodaySalesRow },
    computed: {
        ...mapGetters(['getCurrency', 'getTodaysales', 'getWindowHeight', 'getYesterdaySale', 'getStores']),
        computeTotal() {
          return this.getTodaysales.reduce((acc, item) => acc + Number(item.total_paid), 0);
        },
        checkDiff() {
            let yesterday = this.getYesterdaySale
            let today = this.computeTotal
            if(yesterday >= today){
                let params = {
                    status: false,
                    yesterday: yesterday,
                    today: today
                }
                return params  
            }else {
                let params = {
                    status: true,
                    yesterday: yesterday,
                    today: today
                }
                return params
            }
        },
        computeCompare() {
            let og_val = this.checkDiff.yesterday
            let new_val = this.checkDiff.today
            if(og_val > 0) {
                if(this.checkDiff.status) {
                    let diff = new_val - og_val
                    let total = (diff/og_val)*100
                    return total
                }else{
                    let diff = og_val - new_val
                    let total = (diff/og_val)*100
                    return total
                }
            }else{
                return new_val - og_val
            }  
        }
    }
}
</script>
<style scoped lang="scss">
.wlc-container{
    margin: 0;
}
.currency{
    margin-top: 4px;
}
.right-content-wrap{
    padding: 0 15px;
}
h1{
    margin: 0;
    font-size: 1.8rem;
}
label{
    color: $gray-color;
}
.add-sale-btn {
    margin: 15px 0;
    svg{
        margin-right: 5px;
    }
}
.dashboard-title-wrap{
    padding: 0;
    margin-top: 30px;
}
.compared-figure{
    font-weight: 600;
}
.isIncreased{
    color: $success;
}
.isDecreased{
    color: $danger;
}
.compared-label{
    font-size: 0.8rem;
    color: $gray-color;
}
.compare-arrow{
    margin-left: 4px;
}


</style>
<template>
    <div class="right-content-wrap">
        <div class="flex-col">
            <div class="flex-row-js">
                <div class="flex-col">
                    <div class="flex align-items-center"><span>{{ getCurrency }}</span><h1>24,390.00</h1></div>
                    <label>Today’s sales</label>
                </div>
                <button class="menu-toggle-btn">
                    <i></i>
                    <i></i>
                    <i></i>
                </button>
            </div>
            <button class="button button-primary add-sale-btn" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                    <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
                </svg>
                <span>New sale</span>
            </button>
            <div class="flex-row-js dashboard-title-wrap">
                <h1 class="dashboard-title">Recent sales</h1>
                <a href="" class="see-all">See all</a>
            </div>
            <div class="flex-col" id="dash_sales">
                <today-sales-row v-for="sale in getTodaysales" :key="sale.id" v-bind:sale="sale" />
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
    computed: mapGetters(['getCurrency', 'getTodaysales', 'getWindowHeight'])
}
</script>
<style scoped lang="scss">
.right-content-wrap{
    padding: 0 15px;
}
h1{
    margin: 0;
}
label{
    color: $gray-color;
}
.add-sale-btn {
    margin: 15px 0;
    height: 52px;
    svg{
        margin-right: 5px;
    }
}
.dashboard-title-wrap{
    padding: 0;
    margin-top: 30px;
}


</style>
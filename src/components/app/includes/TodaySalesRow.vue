<template>
    <div class="sale-row flex-col">
        <div class="sale-inner flex-row-js" v-for="sale in mySale" :key="sale.id">
            <div class="flex">
                <span>{{ sale.name }}</span>
                <span class="qty">x{{ sale.qty }}</span>
            </div>
            <div class="flex">
                <span class="currency">{{ getCurrency }}</span>
                <span class="amount">{{ sale.amount }}</span>
            </div>
        </div>
        <div class="total flex-end">
            <label>Total:</label>
            <div class="flex">
                <span class="currency">{{ getCurrency }}</span>
                <span>83,730</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TodaySalesRow',
    computed: mapGetters(['getCurrency']),
    data() {
        return {
            mySale: [
                {id: 1, name: 'Cooking oil', amount: '23', qty: '2'},
                {id: 2, name: 'Note book', amount: '50', qty: '5'},
                {id: 3, name: 'Sugar', amount: '12', qty: '1'},
                {id: 4, name: 'Milk', amount: '39', qty: '5'},

            ]
        }
    }
}
</script>
<style scoped lang="scss">
.sale-row{
    background-color: $primary-light;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 15px;
}
.sale-inner{
    padding: 15px 0;
    border-bottom: 1px solid $gray-light;
    .qty{
        color: $gray-color;
        margin-left: 15px;
    }
}
.amount{
    font-weight: 500;
}
.total{
    font-weight: 600;
    padding: 20px 0;
    label{
        margin: 0 30px 0 0
    }
}

</style>
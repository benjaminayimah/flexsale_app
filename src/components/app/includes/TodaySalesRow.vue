<template>
    <div class="sale-row flex-col">
        <div class="sale-inner flex-row-js" v-for="saleitm in computeSaleItems" :key="saleitm.id">
            <div class="flex">
                <span>{{ saleitm.product_name }}</span>
                <span class="qty">x{{ saleitm.quantity }}</span>
            </div>
            <div class="flex">
                <span class="currency">{{ getCurrency }}</span>
                <span class="amount">{{ Intl.NumberFormat('en-US').format(Number(saleitm.total_paid).toFixed(2)) }}</span>
            </div>
        </div>
        <div class="total flex-end">
            <label>Total:</label>
            <div class="flex">
                <span class="currency">{{ getCurrency }}</span>
                <span>{{ Intl.NumberFormat('en-US').format(Number(sale.total_paid).toFixed(2)) }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TodaySalesRow',
    props: ['sale'],
    computed: {
        ...mapGetters(['getCurrency', 'getTodaysaleItems']),
        computeSaleItems() {
            return this.getTodaysaleItems.filter(item => item.sale_id == this.sale.id)
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
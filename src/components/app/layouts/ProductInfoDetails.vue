<template>
<div class="section">
    <div v-if="getTempProduct.data.description">
        <div class="flex align-items-center content-row">
            <div class="row-title">Product description</div>
        </div>
        <div class="flex lign-items-center item-row">
            <div>{{ getTempProduct.data.description }}</div>
        </div>
        <hr />
    </div>
    <div class="flex align-items-center content-row">
        <div class="row-title">inventory</div>
        <a href="#" class="add-more flex align-items-center" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: getTempProduct.data.id })">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
            </svg>
            Update stock
        </a>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Total stock:</div>
        <div class="item-value">
            <span>{{ computedStock }}</span>
        </div>
    </div>
    <div class="flex lign-items-cente item-row">
        <div class="item-label">Units (Batch numbers):</div>
    </div>
    <div class="units-wrap item-row" v-if="getTempProduct.array.length > 0">
        <div class="flex flex-wrap flx-gap-1">
            <product-unit-products v-for="unit in getTempProduct.array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 12)" :key="unit.id" v-bind:unit="unit" />
        </div>
        <div v-if="getTempProduct.array.length > 12" class="mt-16">
            <a href="#"  @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: getTempProduct.data.id })">View all</a>
        </div>
    </div>
    <div v-else>
        <div class="flex-collumn">
            <div>
                <strong>No product found</strong>
            </div>
            <div>Add units to this product</div>
        </div>
    </div>
    <hr />
    <div class="flex align-items-center content-row" v-if="getTempProduct.data.selling_price && getTempProduct.data.cost">
        <div class="row-title">Cost, pricing & profit</div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempProduct.data.cost">
        <div class="item-label">Unit Cost:</div>
        <div class="item-value"><span class="currency">{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(getTempProduct.data.cost) }}</div>
    </div>
    <div class="flex lign-items-center item-row flex-wrap" v-if="getTempProduct.data.selling_price">
        <div class="item-label">Selling Price:</div>
        <div class="item-value"><span :class="{ 'has-discount': getTempProduct.data.discount !== null && getTempProduct.data.selling_price != 0 && computePrice !== 0}"><span class="currency">{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(getTempProduct.data.selling_price) }}</span></div>
        <div v-if="getTempProduct.data.discount !== null && computePrice !== 0" class="flex has-discount-wrap">
            <div class="item-value" v-if="this.getTempProduct.data.selling_price != 0">
                <span class="currency">{{ getCurrency }}</span>
                <div>{{ Intl.NumberFormat("en-US").format(computePrice) }}</div>
            </div>
            <!-- <div>{{ computeDiscount[0].name }}</div> -->
            <div class="flex discount-value-wrap">
                <span class="discount-val" v-if="computeDiscount.percentage === 1">
                    <span>{{ computeDiscount.value }}</span><span>%</span>
                </span>
                <span v-else>
                    <span class="currency">{{ getCurrency }}</span><span>{{ computeDiscount.value }}</span>
                </span>
                <span class="discount-val">OFF</span>
            </div>
        </div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempProduct.data.selling_price && getTempProduct.data.cost">
        <div class="item-label">Profit:</div>
        <div class="item-value">
            <span class="currency">{{ getCurrency }}</span>
            <span >{{ Intl.NumberFormat("en-US").format(computeProfit) }}</span>
        </div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempProduct.data.selling_price && getTempProduct.data.cost">
        <div class="item-label">Profit Margin:</div>
        <div class="item-value">
            <span>{{ computePM }}%</span>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProductUnitProducts from '../includes/ProductUnitProducts.vue'
export default {
  components: { ProductUnitProducts },
    name: 'ProductInfoDetails',
    computed: {
        ...mapGetters(['getTempProduct', 'getDiscounts', 'getCurrency']),
        computeDiscount: function () {
            return this.getDiscounts.find(discount => discount.id == this.getTempProduct.data.discount)
        },
        computePrice() {
            if(this.getTempProduct.data.discount !== null && this.computeDiscount && this.computeDiscount.active == 1 ) {
                if(this.computeDiscount.percentage === 1) {
                    let price = this.getTempProduct.data.selling_price - ((this.computeDiscount.value)/100) * this.getTempProduct.data.selling_price
                    return price.toFixed(2)
                }else{
                    let price = this.getTempProduct.data.selling_price - this.computeDiscount.value
                    return price.toFixed(2)
                }
            }else {
                return 0
            }
        },
        computeProfit() {
            if(this.getTempProduct.data.discount !== null && this.computeDiscount && this.computeDiscount.active == 1){
                let profit = this.computePrice - this.getTempProduct.data.cost
                return profit.toFixed(2)
            }else{
                let profit = this.getTempProduct.data.selling_price - this.getTempProduct.data.cost
                return profit.toFixed(2)
            }
        },
        computePM() {
            if(this.getTempProduct.data.discount !== null && this.computeDiscount && this.computeDiscount.active == 1){
                let pm = (this.computeProfit / this.computePrice)*100
                return pm.toFixed(2)
            }else{
                if(this.computeProfit > 0) {
                    let pm = ((this.getTempProduct.data.selling_price - this.getTempProduct.data.cost) / this.getTempProduct.data.selling_price)*100
                    return pm.toFixed(2)
                }
                else
                return 0
            }
        },
        computedStock() {
            return this.getTempProduct.array.reduce((acc, item) => acc + Number(item.unit_stock), 0)
        }
    },
    data() {
        return {
            editMode: false,
            discount: {},
            profit: ''
            
        }
    }
}
</script>
<style scoped lang="scss">
.section{
    padding: 20px 0;
    margin-bottom: 120px;
}
a{
    color: $primary-color;
    text-decoration: none;
    font-weight: 600;
    &:hover{
        text-decoration: underline;
    }
}
.item-row{
    margin-bottom: 18px;
    align-items: center;
}
.item-label{
    font-weight: 500;
    border-bottom: 1px dashed ;
    color: $dark;
}
.item-value{
    margin-left: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;

}
.units-wrap{
    li{
        list-style-type: none;
    }
}


hr{
    border-bottom: none;
    margin: 22px 0;
}
.empty-state button{
    width: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    flex-direction: column;
    height: 300px;
    border-style: dashed;
    border-width: 1px;
    transition: 0.3s all;
    &:hover{
        background-color: #e9ebf059;
    }
    div{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: $primary-light;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s all;
        &:hover{
            background-color: rgba(86, 110, 244, 0.1);
        }
        &:active{
            box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            border: 1px solid $primary-color;
            background-color: $primary-light;
        }
    }
    span{
        font-weight: 500;
        padding: 15px 0;
        color: $gray-color;
    }
}
.add-more{
    margin-left: 20px;
    gap: 4px;
    path {
        fill: $primary-color;
    }
}

.has-discount-wrap{
    align-items: center;
    .discount-value-wrap{
        background-color: $accent-color;
        padding: 10px;
        border-radius: 20px;
        color: $white-color;
        font-weight: 600;
        margin-left: 10px;
    }
    .discount-val{
        margin-left: 5px;
    }
}
.remove-discount{
    color: $danger;
    padding: 14px;
    border-radius: 16px;
    background-color: transparent;
    transition: 0.2s linear all;
    margin-left: 20px;
    font-weight: 500;
    span{
        margin-left: 8px;
    }
    &:hover {
        background-color: $dark-light;
        
    }
}
</style>
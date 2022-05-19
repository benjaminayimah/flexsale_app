<template>
<div class="section">
    <div class="flex align-items-center content-row">
        <div class="row-title">inventory</div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Total stock:</div>
        <div class="item-value">
            <span v-if="getTempContainer.data.prod_type == 0">{{ getTempContainer.array.length }}</span>
            <span v-else>{{ getTempContainer.data.stock }}</span>
        </div>
    </div>
    <div class="flex lign-items-cente item-row">
        <div class="item-label">Units (Batch numbers):</div>
    </div>
    <div class="units-wrap item-row" v-if="getTempContainer.array.length > 0">
        <div class="flex flex-wrap flx-gap-1">
            <product-unit-products v-for="unit in getTempContainer.array.slice(0, 12)" :key="unit.id" v-bind:unit="unit" />
        </div>
        <div v-if="getTempContainer.array.length > 12">
            <a href="" >View all</a>
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
    <hr>
    <div class="flex align-items-center content-row" v-if="getTempContainer.data.selling_price && getTempContainer.data.cost">
        <div class="row-title">Cost, pricing & profit</div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.cost">
        <div class="item-label">Unit Cost:</div>
        <div class="item-value"><span class="currency">{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(getTempContainer.data.cost) }}</div>
    </div>
    <div class="flex lign-items-center item-row flex-wrap" v-if="getTempContainer.data.selling_price">
        <div class="item-label">Selling Price:</div>
        <div class="item-value"><span :class="{ 'has-discount': getTempContainer.data.discount !== null && getTempContainer.data.selling_price != 0 && computePrice !== 0}"><span class="currency">{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(getTempContainer.data.selling_price) }}</span></div>
        <div v-if="getTempContainer.data.discount !== null && computePrice !== 0" class="flex has-discount-wrap">
            <div class="item-value" v-if="this.getTempContainer.data.selling_price != 0">
                <span class="currency">{{ getCurrency }}</span>
                <div>{{ computePrice }}</div>
            </div>
            <!-- <div>{{ computeDiscount[0].name }}</div> -->
            <div class="flex discount-value-wrap">
                <span class="discount-val" v-if="computeDiscount[0].percentage === 1">
                    <span>{{ computeDiscount[0].value }}</span><span>%</span>
                </span>
                <span v-else>
                    <span class="currency">{{ getCurrency }}</span><span>{{ computeDiscount[0].value }}</span>
                </span>
                <span class="discount-val">OFF</span>
            </div>
            <button class="remove-discount">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 21.5 23.166">
                    <path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)" fill="#e63232">
                    </path>
                </svg>
                <span>Remove discount</span>
            </button>
        </div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.selling_price && getTempContainer.data.cost">
        <div class="item-label">Profit:</div>
        <div class="item-value">
            <span class="currency">{{ getCurrency }}</span>
            <span >{{ computeProfit }}</span>
        </div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.selling_price && getTempContainer.data.cost">
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
        ...mapGetters(['getTempContainer', 'getDiscounts', 'getCurrency']),
        computeDiscount: function () {
            return this.getDiscounts.filter(discount => discount.id == this.getTempContainer.data.discount)
        },
        computePrice() {
            if(this.getTempContainer.data.discount !== null && this.computeDiscount.length > 0 && this.computeDiscount[0].active == 1 ) {
                if(this.computeDiscount[0].percentage === 1) {
                    let price = this.getTempContainer.data.selling_price - ((this.computeDiscount[0].value)/100) * this.getTempContainer.data.selling_price
                    return Intl.NumberFormat('en-US').format(price.toFixed(2))
                }else{
                    let price = this.getTempContainer.data.selling_price - this.computeDiscount[0].value
                    return Intl.NumberFormat('en-US').format(price.toFixed(2))
                }
            }else {
                return 0
            }
        },
        computeProfit() {
            if(this.getTempContainer.data.discount !== null){
                let profit = (this.computePrice - this.getTempContainer.data.cost).toFixed(2)
                return Intl.NumberFormat('en-US').format(profit)
            }else{
                let profit = (this.getTempContainer.data.selling_price - this.getTempContainer.data.cost).toFixed(2)
                return Intl.NumberFormat('en-US').format(profit)
            }
        },
        computePM() {
            if(this.getTempContainer.data.discount !== null){
                let pm = (this.computeProfit / this.computePrice)*100
                return pm.toFixed(2)
            }else{
                let pm = ((this.getTempContainer.data.selling_price - this.getTempContainer.data.cost) / this.getTempContainer.data.selling_price)*100
                return pm.toFixed(2)
            }
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
    padding: 20px 0
}
a{
    color: $primary-color;
    text-decoration: none;
    font-weight: 600;
    &:hover{
        text-decoration: underline;
    }
}
.row-title{
    text-transform: uppercase;
    font-weight: 700;
    //color: $gray-color;
}
.content-row{
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $gray-light;
    position: relative
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
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
        <div class="item-label">Units (Batch number / expiration date):</div>
    </div>
    <div class="units-wrap item-row">
        <div class="flex flex-wrap">
            <li v-for="unit in getTempContainer.array.slice(0, 6)" :key="unit.id">
                <div class="unit-pill flex flex-row-js">
                    <span class="pill-batch-no text-overflow-ellipsis">{{ unit.batch_no }}</span>
                    <span class="divider">|</span>
                    <span class="expiry-date text-overflow-ellipsis">{{ unit.expiry_date }}</span>
                    <button v-if="editMode" class="flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="3" viewBox="0 0 22 4">
                            <path d="M5001-4120a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,5001-4120Zm-9,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,4992-4120Zm-9,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,4983-4120Z" transform="translate(-4983 4122)" fill="#434752"/>
                        </svg>
                    </button>
                </div>
            </li>
            <a href="" v-if="getTempContainer.array.length > 6">View all</a>
        </div>
    </div>
    <hr>
    <div class="flex align-items-center content-row" v-if="getTempContainer.data.selling_price && getTempContainer.data.cost">
        <div class="row-title">Cost, pricing & profit</div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.cost">
        <div class="item-label">Unit Cost:</div>
        <div class="item-value"><span class="currency">{{ getCurrency }}</span>{{ getTempContainer.data.cost }}</div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.selling_price">
        <div class="item-label">Selling Price:</div>
        <div class="item-value"><span :class="{ 'has-discount': getTempContainer.data.discount !== null && getTempContainer.data.selling_price != 0 }"><span class="currency">{{ getCurrency }}</span>{{ getTempContainer.data.selling_price }}</span></div>
        <div v-if="getTempContainer.data.discount !== null" class="flex has-discount-wrap">
            <div class="item-value" v-if="this.getTempContainer.data.selling_price != 0">
                <span class="currency">{{ getCurrency }}</span>
                <div>{{ Intl.NumberFormat('en-US').format(computePrice.toFixed(2)) }}</div>
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
            <span v-if="getTempContainer.data.discount !== null">{{ Intl.NumberFormat('en-US').format((computePrice - getTempContainer.data.cost).toFixed(2)) }}</span>
            <span v-else>{{ Intl.NumberFormat('en-US').format((getTempContainer.data.selling_price - getTempContainer.data.cost).toFixed(2)) }}</span>
        </div>
    </div>
    <div class="flex lign-items-center item-row" v-if="getTempContainer.data.selling_price && getTempContainer.data.cost">
        <div class="item-label">Profit Margin:</div>
        <div class="item-value">
            <span v-if="getTempContainer.data.discount !== null">{{ Intl.NumberFormat('en-US').format((((computePrice - getTempContainer.data.cost) / computePrice)*100).toFixed(2)) }}%</span>
            <span v-else>{{ Intl.NumberFormat('en-US').format((((getTempContainer.data.selling_price - getTempContainer.data.cost) / getTempContainer.data.selling_price)*100).toFixed(2)) }}%</span>
            
        </div>
    </div>
    <hr>
    <div class="flex align-items-center content-row">
        <div class="row-title">Discounts</div>
    </div>
    <div class="flex empty-state">
        <button class="button-secondary">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
            </div>
            <span>Add a discount tag</span>
        </button>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ProductInfoDetails',
    computed: {
        ...mapGetters(['getTempContainer', 'getDiscounts', 'getCurrency']),

        computeDiscount: function () {
            return this.getDiscounts.filter(discount => discount.id == this.getTempContainer.data.discount)
        },
        computePrice() {
            if(this.getTempContainer.data.discount !== null ) {
                if(this.computeDiscount[0].percentage === 1) {
                    let price = this.getTempContainer.data.selling_price - ((this.computeDiscount[0].value)/100) * this.getTempContainer.data.selling_price
                    return price
                }else{
                    let price = this.getTempContainer.data.selling_price - this.computeDiscount[0].value
                    return price
                }
            }else {
                return false
            }
        }
        // filteredProducts: function () {
        // return this.getAllFilters.filter(product => product.tag_id === this.$route.params.id)
        // }
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
    color: $gray-color;
}
.item-value{
    margin-left: 20px;
    font-weight: 500;
    display: flex;

}
.units-wrap{
    li{
        width: 50%;
        list-style-type: none;
        padding: 0 15px 15px 0;
    }
}
.unit-pill{
    border: 1px solid #D4D8DE;
    border-radius: 27px;
    padding: 4px 4px 4px 18px;
    span{
        align-items: center;
        display: flex;
        //margin-right: 20px;
        height: 38px;
        &:last-child{
            padding-right: 18px;
        }
    }
    .divider{
        color: $gray-color;
    }
    .expiry-date{
        color: $gray-color;
    }
    button{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        background-color: transparent;
        &:hover{
            background-color: $dark-light;
        }
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
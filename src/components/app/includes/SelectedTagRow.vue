<template>
    <li>
        <hr>
        <div class="li-hold">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="checkedProduct.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+checkedProduct.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                <div class="prod-captions">
                    <div class="item-name">{{ checkedProduct.name }}</div>
                    <div class="flex">
                        <label>Price:</label>
                        <div :class="{ 'has-discount': checkedProduct.discount !== null && checkedProduct.selling_price != 0 &&  computePrice !== 0  }"><span class="currency">{{ getCurrency }}</span>{{ checkedProduct.selling_price }}</div>
                        <div class="discount-price" v-if="checkedProduct.discount !== null && checkedProduct.selling_price != 0 &&  computePrice !== 0"><span class="currency">{{ getCurrency }}</span><span>{{ Intl.NumberFormat('en-US').format(computePrice.toFixed(2)) }}</span></div>
                    </div>
                    <div><label>Stock:</label><span>{{ checkedProduct.stock }}</span></div>
                </div>
            </div>
            <button v-if="editMode || addMode" class="button" @click.prevent="removeSelectedProduct(checkedProduct.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14"><path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"></path></svg>
            </button>
        </div> 
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SelectedTagRow',
    props: ['checkedProduct', 'editMode', 'addMode'],
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getDefaultImage', 'getDiscounts', 'getCurrency', 'getUserAdminID']),
        computeDiscount: function () {
            return this.getDiscounts.find(discount => discount.id == this.checkedProduct.discount)
        },
        computePrice() {
            if(this.checkedProduct.discount !== null && this.computeDiscount && this.computeDiscount.active == 1 ) {
                if(this.computeDiscount.percentage == 1 && this.checkedProduct.selling_price > 0 ) {
                    let price = this.checkedProduct.selling_price - ((this.computeDiscount.value)/100) * this.checkedProduct.selling_price
                    return price
                }else{
                    let price = this.checkedProduct.selling_price - this.computeDiscount.value
                    return price
                }
            }else {
                return 0
            }
        }
    },
    methods: {
        removeSelectedProduct(id) {
            const obj = {id: id}
            this.$store.commit('removeCheckedProdFromArray', obj)
        }
    }
    
}
</script>
<style scoped lang="scss">

.button{
    display: flex;
    background-color: #fff;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 0;
    transition: 0.2s all;
    margin-right: 3px;
    &:hover{
        background-color: $primary-light;
        svg path{
            fill: $dark;
        }
    }
    &:active{
        box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
        border: 1px solid $dark;
        background-color: #fff;
    }
    svg path{
        fill: $gray-color;
    }
}


hr{
    border-color: $dark-light;
    margin: 0;
}
.active{
    border: 1px $primary-color solid !important;
    .button{
        background-color: $primary-color !important;
    }
}

</style>
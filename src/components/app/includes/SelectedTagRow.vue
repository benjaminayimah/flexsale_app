<template>
    <li>
        <hr>
         <div class="li-hold">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="checkedProduct.image ? { backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+checkedProduct.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
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
            <button v-if="editMode" class="button" @click.prevent="removeSelectedProduct(checkedProduct.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14"><path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"></path></svg>
            </button>
        </div> 
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SelectedTagRow',
    props: ['checkedProduct', 'editMode'],
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getDefaultImage', 'getDiscounts', 'getCurrency']),
        computeDiscount: function () {
            return this.getDiscounts.filter(discount => discount.id == this.checkedProduct.discount)
        },
        computePrice() {
            if(this.checkedProduct.discount !== null && this.computeDiscount.length > 0 && this.computeDiscount[0].active == 1 ) {
                if(this.computeDiscount[0].percentage == 1 && this.checkedProduct.selling_price > 0 ) {
                    let price = this.checkedProduct.selling_price - ((this.computeDiscount[0].value)/100) * this.checkedProduct.selling_price
                    return price
                }else{
                    let price = this.checkedProduct.selling_price - this.computeDiscount[0].value
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

.li-hold{
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    justify-content: space-between;
    padding: 15px 0;
    //border: 1px $dark-light solid;
    transition: 0.3s all;
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
}
.prod-captions{
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    color: $dark;
    font-size: 0.9rem;
    div{
        display: flex;
        align-items: center;
    }
    label{
        margin: 0 5px 0 0;
        color: $gray-color;
        font-weight: 600;
    }
}
.item-name{
    font-weight: 700;
}
.prd-img{
    height: 70px;
    width: 70px;
    border-radius: 10px;
    background-color: $dark-light;
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
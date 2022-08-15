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
            <router-link :to="{ name: 'ProductDetailsBasic', params: { id: checkedProduct.id, name: checkedProduct.name } }" class="flex justify-items-center align-content-center" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.6 15.6">
                    <path d="M1181.982-10350.9a2.357,2.357,0,0,1-2.354-2.354v-8.558a2.357,2.357,0,0,1,2.354-2.354h4.667a.8.8,0,0,1,.8.8.8.8,0,0,1-.8.8h-4.667a.755.755,0,0,0-.755.754v8.558a.755.755,0,0,0,.755.754h8.557a.755.755,0,0,0,.755-.754v-4.668a.8.8,0,0,1,.8-.8.8.8,0,0,1,.8.8v4.668a2.357,2.357,0,0,1-2.354,2.354Zm3.325-5.68a.8.8,0,0,1,0-1.129l7.189-7.191h-2.735a.8.8,0,0,1-.8-.8.8.8,0,0,1,.8-.8h4.665a.8.8,0,0,1,.567.234.8.8,0,0,1,.234.566h0v4.665a.8.8,0,0,1-.8.8.8.8,0,0,1-.8-.8v-2.734l-7.191,7.188a.793.793,0,0,1-.565.234A.793.793,0,0,1,1185.307-10356.58Z" transform="translate(-1179.628 10366.5)"></path>
                </svg>
            </router-link>
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
a{
    padding: 12px;
    path {
        fill: $gray-color;
    }
    &:hover {
        path {
            fill: $primary-color;
        }
    }
}

</style>
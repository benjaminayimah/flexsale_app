<template>
    <li>
        <a href="#" @click.prevent="toggleActive(product.id, product.name, product.image, product.stock, product.selling_price, product.discount)" :class="{ 'active' : active}">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="product.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+product.image+')' } : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                <div class="prod-captions">
                    <div class="item-name">{{ product.name }}</div>
                    <div class="flex">
                        <div :class="{ 'has-discount': product.discount !== null && product.selling_price != 0 && computePrice !== 0 }"><span>{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(product.selling_price) }}</div>
                        <div class="discount-price" v-if="product.discount !== null && product.selling_price != 0 && computePrice !== 0"><span>{{ getCurrency }}</span><span>{{ Intl.NumberFormat('en-US').format(computePrice) }}</span></div>
                    </div>
                    <div><label>Stock:</label>{{ product.stock }}</div>
                </div>
            </div>
            <button class="button" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 0 28.454 20.383">
                    <path d="M1126.264,386.512l-9.779-10.489,2.194-2.046,7.686,8.243,16.478-16.092,2.1,2.146Z" transform="translate(-1116.485 -366.129)" />
                </svg>
            </button>
        </a>
        <hr>
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AddTagRow',
    props: ['product'],
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getDefaultImage', 'getTempContainer', 'getDiscounts', 'getCurrency', 'getUserAdminID']),
        computeDiscount: function () {
            return this.getDiscounts.find(discount => discount.id == this.product.discount)
        },
        computePrice() {
            if(this.product.discount !== null && this.computeDiscount && this.computeDiscount.active == 1 ) {
                if(this.computeDiscount.percentage == 1 && this.product.selling_price > 0 ) {
                    let price = this.product.selling_price - ((this.computeDiscount.value)/100) * this.product.selling_price
                    return price.toFixed(2)
                }else{
                    let price = this.product.selling_price - this.computeDiscount.value
                    return price.toFixed(2)
                }
            }else {
                return 0
            }
        }
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        toggleActive(id, name, image, stock, price, discount) {
            const checkedArray = { id: id, name: name, image: image, stock: stock, selling_price: price, discount: discount}
            if(!this.active) {
                this.active = true
                this.$store.commit('addCheckedProdToArray', checkedArray)
            }else{
                this.active = false
                this.$store.commit('removeCheckedProdFromArray', checkedArray)
            }
            
        },
        checkSelected() {
            for (let i = 0; i < this.getTempContainer.array.length; i++) {
                if (this.getTempContainer.array[i] && (this.getTempContainer.array[i].id === this.product.id )) {
                    this.active = true
                } 
            }
        }
    },
    beforeMount() {
        this.checkSelected()
    }
}
</script>
<style scoped lang="scss">
li{
    &:last-child hr{
        visibility: hidden;
    }
    &:hover .button{
        background-color: $dark-light;
        //border: 1px solid $primary-light;
    }
    a{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        justify-content: space-between;
        padding: 15px;
        transition: 0.2s all;
        border: 1px transparent solid;
        transition: 0.3s all;
        &:hover{
            background-color: hsla(223, 19%, 93%, 0.4);
        }
        .button{
            display: flex;
            background-color: $primary-light;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            padding: 0;
        }
        svg path{
            fill: #ffffff;
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
        margin: 0 20px;
    }

}
.active{
    // border: 1px $primary-color solid !important;
    background-color: $primary-light !important;
    .button{
        background-color: $primary-color !important;
    }
}

</style>
<template>
    <li>
        <router-link :to="'/product/'+product.id+'/'+product.name" class="a-row" >
            <div class="table-row flex-row-js" >
                <div class="flex-row-st">
                    <div class="img-hold">
                        <div class="img bg-img" :style="product.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+product.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}">
                        </div>
                    </div>
                    <div class="prod-capt-hold">
                        <div class="itm-name">{{ product.name }}</div>
                        <div class="flex-row-st">
                            <label>Price:</label>
                            <div class="itm-price" :class="{ 'has-discount': product.discount !== null && product.selling_price != 0 && computePrice !== 0 }"><span>{{ getCurrency }}</span>{{ product.selling_price }}</div>
                            <div class="discount-price" v-if="product.discount !== null  && product.selling_price != 0 && computePrice !== 0"><span class="currency">{{ getCurrency }}</span><span>{{ Intl.NumberFormat('en-US').format(computePrice.toFixed(2)) }}</span></div>
                        </div>
                        <div class="flex-row-st">
                            <div class="flex-row-st">
                                <label>Stock:</label>
                                <div class="qty">{{ product.stock }}</div>
                            </div>
                            <!-- <div class="edit-action">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                                        <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                                    </svg>
                                    Update stock
                                </a>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="view-detail-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="20" viewBox="0 0 12.838 26.441">
                        <path d="M-8596,7455.879l10.11,12.158L-8596,7479.5" transform="translate(8597.412 -7454.471)" fill="none" stroke="#0E142C" stroke-linecap="round" stroke-width="2"/>
                    </svg>
                </div>  
            </div>
        </router-link>
    </li> 
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SupplierItemsRow',
    props: ['product'],
    computed: {
        ...mapGetters(['getUser', 'getUserAdminID', 'getHostname', 'getDefaultImage', 'getDiscounts', 'getCurrency']),
        computeDiscount: function () {
            if(this.getDiscounts.length > 0) {
                return this.getDiscounts.find(discount => discount.id == this.product.discount)
            }else{
                return false
            }
        },
        computePrice() {
            if(this.product.discount !== null && this.computeDiscount && this.computeDiscount.active == 1 ) {
                if(this.computeDiscount.percentage == 1 && this.product.selling_price > 0 ) {
                    let price = this.product.selling_price - ((this.computeDiscount.value)/100) * this.product.selling_price
                    return price
                }else{
                    let price = this.product.selling_price - this.computeDiscount.value
                    return price
                }
            }else {
                return 0
            }
        },
    }
}
</script>
<style scoped lang="scss">
.table-row{
    padding: 10px;
    width: 100%;
}
.img-hold{
    .img{
        height: 80px;
        width: 80px;
        border-radius: 16px;
    }
}
.prod-capt-hold{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .itm-name{
        font-weight: 700;
    }
    label{
        margin: 5px 5px 5px 0;
        color: $gray-color;
    }
}
.flex-row-st{
    align-items: center;
}
.a-row{
    display: flex;
    width: 100%;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $dark-light;
    transition: 0.2s all;
    &:hover {
        background-color: rgb(250, 250, 250);
        .view-detail-arrow{
            display: block;
        }
    }
}
.view-detail-arrow{
    display: none;
}

</style>
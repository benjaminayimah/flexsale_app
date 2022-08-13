<template>
<hr>
    <li>
        <div class="li-hold">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="product.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+product.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                <div class="prod-captions">
                    <div class="item-name">{{ product.name }}</div>
                    <div class="flex">
                        <label>Price:</label>
                        <div :class="{ 'has-discount': product.discount !== null && product.selling_price != 0 &&  computePrice !== 0  }"><span class="currency">{{ getCurrency }}</span>{{ product.selling_price }}</div>
                        <div class="discount-price" v-if="product.discount !== null && product.selling_price != 0 &&  computePrice !== 0"><span class="currency">{{ getCurrency }}</span><span>{{ Intl.NumberFormat('en-US').format(computePrice.toFixed(2)) }}</span></div>
                    </div>
                    <div><label>Stock:</label><span>{{ product.stock }}</span></div>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="flex align-items-center gap-4" v-if="!computeExpiry">
                    <label>Qty:</label>
                    <input type="number" v-model="quantity" class="form-control qty-input">
                </div>
                <button class="button uppercase gap-4" @click="fetchProduct">
                    <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11.41 11.41">
                        <path d="M-16851.348,10385.642h-2v-4.7h-4.707v-2h4.707v-4.707h2v4.707h4.7v2h-4.7Z" transform="translate(16858.055 -10374.231)" fill="#566ff4"/>
                    </svg>
                    <spinner v-else v-bind:size="18" v-bind:white="false"/>
                    <span>add</span>
                </button>
            </div>
            
        </div>
    </li>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import Spinner from './Spinner.vue';
export default {
    inheritAttrs: false,
    name: "SaleProdSearchOverlayRow",
    components: { Spinner },
    props: ["product"],
    data() {
        return {
            quantity: Number(1),
            submitting: false
        };
    },
    computed: {
        ...mapGetters(["getHostname", "getToken", "getUser", "getDefaultImage", "getDiscounts", "getCurrency", "getUserAdminID"]),
        computeDiscount: function () {
            return this.getDiscounts.find(discount => discount.id == this.product.discount);
        },
        computePrice() {
            if (this.product.discount !== null && this.computeDiscount && this.computeDiscount.active == 1) {
                if (this.computeDiscount.percentage == 1 && this.product.selling_price > 0) {
                    let price = this.product.selling_price - ((this.computeDiscount.value) / 100) * this.product.selling_price;
                    return price;
                }
                else {
                    let price = this.product.selling_price - this.computeDiscount.value;
                    return price;
                }
            }
            else {
                return 0;
            }
        },
        computeExpiry() {
            if (this.product.expires && this.product.active == 0) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        async fetchProduct() {
            this.submitting = true
            try {
                const res = await axios.post(this.getHostname + "/api/fetch-product-by-name?token=" + this.getToken, { id: this.product.id });
                this.submitting = false
                const newProduct = {
                    id: res.data.item.id,
                    product_id: res.data.item.product_id,
                    batch_no: res.data.item.batch_no,
                    active:res.data.item.active,
                    expires: res.data.item.expires,
                    name: this.product.name,
                    image: this.product.image,
                    selling_price: this.product.selling_price,
                    discount: this.product.discount,
                }
                this.emitAddProduct(newProduct)
            }
            catch (err) {
                this.submitting = false
                //
            }
        },
        emitAddProduct(payload) {
            const newPayload = { item: payload, quantity: this.quantity}
            this.$emit('addByName', newPayload)
        }
    }
}
</script>
<style scoped lang="scss">
li {
    padding: 0 10px;
    &:hover {
        background-color: rgb(250, 250, 250);
    }
}
hr{
    border-color: $dark-light;
    margin: 0 20px;
}
.button {
    padding: 10px;
    background-color: transparent;
    color: $primary-color;
}
.qty-input{
    width: 68px;
    height: 45px;
}

</style>
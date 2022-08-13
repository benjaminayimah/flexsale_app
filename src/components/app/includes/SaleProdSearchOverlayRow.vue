<template>
<hr>
    <li>
        <div class="li-hold">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="product.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+product.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                <div class="prod-captions">
                    <div class="item-name">{{ product.name }}</div>
                    <div><label>Stock:</label><span>{{ product.stock }}</span></div>
                    <div class="flex align-items-center gap-4" v-if="!computeExpiry">
                        <label>Qty:</label>
                    <input type="number" v-model="quantity" class="form-control qty-input">
                </div>
                </div>
            </div>
            <div class="flex-col flex-end gap-4" :class="{ 'flex-col' : getMobile }">
                <div v-if="status.active" :class="status.success ? 'success-status': 'error-status'" class="add-status">
                    <span>{{ status.msg }}</span>
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
            submitting: false,
            status: {
                active: false,
                success: false,
                msg: ''
            }
        }
    },
    computed: {
        ...mapGetters(["getHostname", "getToken", "getUser", "getDefaultImage", "getDiscounts", "getCurrency", "getUserAdminID", "getMobile"]),
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
                this.successStatus()
            }
            catch (err) {
                this.submitting = false
                this.errorStatus()
            }
        },
        emitAddProduct(payload) {
            const newPayload = { item: payload, quantity: this.quantity}
            this.$emit('addByName', newPayload)
        },
        successStatus() {
            this.status.active = true
            this.status.success = true
            this.status.msg = 'Added'
        },
        errorStatus() {
            this.status.active = true
            this.status.success = false
            this.status.msg = 'Error, try again'
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
        &:first-child{
        visibility: hidden;
    }
}
.button {
    padding: 10px;
    background-color: transparent;
    color: $primary-color;
}
.qty-input{
    width: 68px;
    height: 40px;
    border-radius: 10px;
}
.add-status{
    margin: 0 10px;
    font-size: 13px;
    text-align: center;
    border-radius: 20px;
    padding: 2px 6px;
}
.error-status{
    color: $danger;
    background-color: #ffeaea;
}
.success-status {
    background-color: #f0f7f1;
    color: $success;
}

</style>
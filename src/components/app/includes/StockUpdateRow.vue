<template>
    <div class="stk-row" :class="[{'edit-mode' : edit}, {'expired' : stock.expires && stock.active == 0}]">
        <div class="flex-row-js">
            <div class="flex">
                <div class="col batch-col">
                    <label>Batch no.:</label>
                    <div>{{ stock.batch_no }}</div>
                </div>
                <div class="col qty-col">
                    <label>Qty:</label>
                    <div class="qty">{{ stock.unit_stock }}</div>
                </div>
                <div v-if="expires == 1" class="col expiry-col">
                    <label>Expiry:</label>
                    <div>{{ stock.expiry_date }}</div>
                </div>
            </div>
            <div v-show="!edit" class="flex gap-4 actions-col">
                <button class="button icon-button" @click.prevent="toggleEdit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                        <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                    </svg>
                </button>
                <button class="button icon-button" @click.prevent="$store.commit('setDeleteModal', { id: stock.id, type: 'stock' })">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.655 19.001">
                        <path d="M-11968.821,10076.148a2.348,2.348,0,0,1-2.335-2.185l-.748-11.2,1.5-.1.748,11.193a.841.841,0,0,0,.838.787h7.366a.845.845,0,0,0,.838-.787l.745-11.193,1.5.1-.746,11.2a2.348,2.348,0,0,1-2.334,2.185Zm-5.024-14.539v-1.5h5.172v-2.96h7.068v2.96h5.415v1.5Zm10.74-1.5v-1.461h-4.068v1.461Z" transform="translate(11973.846 -10057.147)" fill="#e63232"/>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="edit">
            <form class="stock-form">
                <div class="flex gap-16">
                    <div class="mb-8" :class="{ 'input-has-error' : validation.error && validation.errors.batch_no}">
                        <label>Batch No.:</label>
                        <input v-model="form.batch_no" class="form-control" type="text" name="batchNumber">
                        <span class="span" v-if="validation.error && validation.errors.batch_no">
                            {{ validation.errors.batch_no[0] }}
                        </span>
                    </div>
                    <div v-if="expires == 1" :class="{ 'input-has-error' : validation.error && validation.errors.expiry}">
                        <label>Expiry date:</label>
                        <input v-model="form.expiry" class="form-control expiry" type="date" name="expiryDate">
                        <span class="span" v-if="validation.error && validation.errors.expiry">
                            {{ validation.errors.expiry[0] }}
                        </span>
                    </div>
                </div>
                <div class="mb-8 flex align-items-center gap-8">
                    <div class="button-switch" @click="toggleSwitch" :class="this.form.switch? 'switch-active': 'switch-inactive'">
                        <div class="br-50"></div>
                    </div>
                    <div class="flex align-items-center gap-4" :class="{'arrow-down' : !this.form.switch}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.164 10.6">
                            <path d="M18342.83-3197.193v-7.289l-2.049,2.049a.749.749,0,0,1-1.062,0,.752.752,0,0,1,0-1.059l3.332-3.333h0l0,0a.75.75,0,0,1,.488-.213h.076a.768.768,0,0,1,.213.042h0l.018.007a.789.789,0,0,1,.262.166l3.33,3.334a.748.748,0,0,1,0,1.059.748.748,0,0,1-.531.221.743.743,0,0,1-.529-.221l-2.053-2.05v7.291a.75.75,0,0,1-.75.75A.751.751,0,0,1,18342.83-3197.193Z" transform="translate(-18339.5 3207.042)" fill="#20c647"/>
                        </svg>
                        <div>{{ this.form.switch? 'Increase': 'Decrease' }} Stock Qty by:</div>
                    </div>
                    <div class="stk-input-wrap" :class="{ 'input-has-error' : validation.error && validation.errors.stock}">
                        <input v-model="initStock" class="form-control stk-val" type="number" name="stock">
                        <span class="span" v-if="validation.error && validation.errors.stock">
                            {{ validation.errors.stock[0] }}
                        </span>
                    </div>
                </div>
                <hr>
                <div class="flex gap-8 button-wrap">
                    <a class="button-primary gap-4" href="#" @click.prevent="submitBatch" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <span>{{ submiting ? 'Saving' : 'Save' }}</span>
                        <spinner v-if="submiting" v-bind:size="16" v-bind:white="true" /> 
                    </a>
                    <a class="cancel-edit button-secondary" href="#" @click.prevent="toggleEdit">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import validationMixin from '../../../mixins/validationMixin'
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'
export default {
    name: "StockUpdateRow",
    mixins: [validationMixin],
    props: ["stock", "id", "expires"],
    components: { Spinner },
    computed: {
        ...mapGetters(["getHostname", "getToken", "getCurrentStore"]),
        computeQty() {
            if (this.form.switch) {
                let newVal = Number(this.stock.unit_stock) + Number(this.initStock);
                if (newVal >= 0) {
                    return newVal;
                }
                else
                    return 0;
            }
            else {
                let newVal = Number(this.stock.unit_stock) - Number(this.initStock);
                if (newVal >= 0) {
                    return newVal;
                }
                else
                    return 0;
            }
        }
    },
    data() {
        return {
            edit: false,
            initStock: "",
            submiting: false,
            form: {
                batch_no: "",
                stock: "",
                expiry: new Date().toISOString().slice(0, 10),
                unitID: "",
                expires: this.expires,
                switch: true
            }
        };
    },
    methods: {
        toggleEdit() {
            if (!this.edit) {
                this.form.batch_no = this.stock.batch_no
                this.form.expiry = this.stock.expiry_date
                this.form.stock = "";
                this.form.unitID = this.stock.id
                this.edit = true
            }
            else {
                this.edit = false
                this.form.stock = ""
                this.initStock = ""
                this.validation.error ? this.clearErrs() : ""
                
            }
        },
        submitBatch: function () {
            this.submiting = true
            this.validation.error ? this.clearErrs() : ""
            this.form.stock = this.computeQty
            axios.put(this.getHostname + "/api/product-batch/" + this.id + "?token=" + this.getToken, this.form, {
                headers: {
                    "Content-Type": ["application/json"]
                },
            }).then((res) => {
                this.submiting = false
                if (res.data.unit || res.data.stock) {
                    this.$store.commit("updateStock", res.data.unit);
                    this.$store.commit("updateProduct", res.data.stock);
                    const successPayload = {
                        id: "success",
                        body: res.data.status
                    };
                    this.$store.commit("showAlert", successPayload);
                    this.toggleEdit()
                }
                else if (res.data.exists) {
                    this.validation.error = true;
                    const payload = { batch_no: [res.data.exists] };
                    this.validation.errors = payload;
                }
            }).catch((err) => {
                this.submiting = false
                if (err.response.status == 422) {
                    this.validation.error = true;
                    this.validation.errors = err.response.data.errors;
                }
            });
        },
        toggleSwitch() {
            this.form.switch = !this.form.switch;
        }
    }
}
</script>
<style lang="scss" scoped>
.stk-row{
    border-bottom: 1px solid $dark-light;
    padding: 20px 0;
    label {
        font-size: 12px;
        font-weight: 500;
        color: $gray-color;
        margin-top: 0;
    }
}
.edit-mode{
    padding: 20px;
    background-color: #f7f8f9;
}
.icon-button {
    padding: 0;
    background-color: transparent;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    &:hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
}
.qty{
    font-weight: 600;
}
.col div {
    font-weight: 500;
}
.batch-col{
    min-width: 160px;
}
.qty-col{
    min-width: 60px;
}
.expired {
    background-color: rgb(255, 246, 246) !important;
    color: $danger !important;
    label {
        color: $danger !important;
    }
    input {
        border-color: $danger;
    }
}
.button-switch{
    cursor: pointer;
    padding: 2px;
    height: 34px;
    border-radius: 25px;
    width: 60px;
    position: relative;
    div{
        height: 30px;
        width: 30px;
        box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
        background-color: #fff;
        transition: 0.2s all;
    }
}
.switch-active{
    background-color: $success;
    div {
        background-color: #fff;
    }
}
.switch-inactive{
    background-color: $danger;
    div {
        transform: translateX(26px);
    }
}
.arrow-down {
    svg{
        transform: rotate(180deg);
        path {
            fill: $danger;
        }
    }
}




</style>
<template>
    <form class="stock-form">
        <div class="flex gap-16">
            <div class="mb-8" :class="{ 'input-has-error' : validation.error && validation.errors.batch_no}">
                <label>Batch no.:</label>
                <input v-model="form.batch_no" class="form-control" type="text" name="batchNumber" placeholder="Batch number">
                <span class="span" v-if="validation.error && validation.errors.batch_no">
                    {{ validation.errors.batch_no[0] }}
                </span>
            </div>
            <div :class="{ 'input-has-error' : validation.error && validation.errors.expiry}">
                <div v-if="expires == 1">
                    <label>Expiry date:</label>
                    <input  v-model="form.expiry" class="form-control expiry" type="date" name="expiryDate">
                    <span class="span" v-if="validation.error && validation.errors.expiry">
                        {{ validation.errors.expiry[0] }}
                    </span>
                </div>
            </div>
        </div>
        <div class="mb-8" :class="{ 'input-has-error' : validation.error && validation.errors.stock}">
            <label>Qty:</label>
            <input v-model="form.stock" class="form-control stk-val" type="number" name="stock">
            <span class="span" v-if="validation.error && validation.errors.stock">
                {{ validation.errors.stock[0] }}
            </span>
        </div>
        <hr>
        <div class="flex gap-8 button-wrap">
            <a class="gap-4 button-primary" href="#" @click.prevent="submitNewBatch" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <span>{{ submiting ? 'Adding' : 'Add' }}</span>
                <spinner v-if="submiting" v-bind:size="16" v-bind:white="true" /> 
            </a>
            <a class="cancel-edit button-secondary" href="#" @click.prevent="removeRow(row.id)">Remove</a>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from './Spinner.vue'
export default {
    name: "NewStockRow",
    props: ["row", "id", "expires"],
    computed: mapGetters(["getHostname", "getToken", "getCurrentStore"]),
    mixins: [validationMixin],
    data() {
        return {
            edit: false,
            submiting: false,
            form: {
                batch_no: "",
                stock: "",
                expiry: new Date().toISOString().slice(0, 10),
                id: this.id,
                expires: this.expires
            }
        };
    },
    methods: {
        removeRow(id) {
            this.$emit("removeRow", id);
        },
        submitNewBatch: function () {
            this.submiting = true
            this.validation.error ? this.clearErrs() : "";
            axios.post(this.getHostname + "/api/product-batch?token=" + this.getToken, this.form, {
                headers: {
                    "Content-Type": ["application/json"]
                },
            }).then((res) => {
                    this.submiting = false
                if (res.data.unit || res.data.stock) {
                    this.$store.commit("updateProduct", res.data.stock);
                    this.$store.commit("addToStock", res.data.unit);
                    this.removeRow(this.row.id);
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
        }
    },
    components: { Spinner }
}
</script>
<style lang="scss" scoped>
form{
    padding: 20px;
    background-color: #f7f8f9;
    border-bottom: 1px solid $dark-light;
    margin-top: 0 !important;
}
</style>
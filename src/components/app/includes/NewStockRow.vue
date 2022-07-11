<template>
    <form class="stock-form">
        <div :class="{ 'input-has-error' : validation.error && validation.errors.batch_no}">
            <div class="flex gap-8">
                <input v-model="form.batch_no" class="form-control" type="text" name="batchNumber" placeholder="Batch number">
                <div class="flex align-items-center stk-input-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#7e8596"/>
                    </svg>
                    <input v-model="form.stock" class="form-control stk-val" type="number" name="stock">
                </div>
                <input v-model="form.expiry" class="form-control expiry" type="date" name="expiryDate">
            </div>
            <span class="span" v-if="validation.error && validation.errors.batch_no">
                {{ validation.errors.batch_no[0] }}
            </span>
        </div>
        <div class="flex gap-8 button-wrap">
            <a class="submit-edit" href="#" @click.prevent="submitNewBatch">Add</a>
            <a class="cancel-edit" href="#" @click.prevent="removeRow(row.id)">Cancel</a>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import validationMixin from '../../../mixins/validationMixin'
export default {
    name: 'NewStockRow',
    props: ['row', 'id'],
    computed: mapGetters(['getHostname','getToken']),
    mixins: [validationMixin],
    data() {
        return {
            edit: false,
            form: {
                batch_no: '',
                stock: '',
                expiry: new Date().toISOString().slice(0, 10),
                id: this.id
            }
        }
    },
    methods: {
        removeRow(id) {
            this.$emit('removeRow', id)
        },
        submitNewBatch: function () {
            this.validation.error ? this.clearErrs() : ''
            axios.post(this.getHostname+'/api/product-batch?token='+this.getToken,
                this.form, {
                    headers: {
                        'Content-Type': ['application/json']
                    },
                }
            ).then((res) => {
                console.log(res.data)
                if(res.data.unit || res.data.stock) {
                    this.$store.commit('updateProduct', res.data.stock)
                    this.$store.commit('addToStock', res.data.unit)
                    this.removeRow(this.row.id)
                }else if(res.data.exists) {
                    this.validation.error = true
                    const payload = { batch_no: [res.data.exists] }
                    this.validation.errors = payload
                }
            }).catch((err) => {
                console.log(err.response)
                if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                }
            })
        }
    }
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
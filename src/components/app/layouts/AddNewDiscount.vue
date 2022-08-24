<template>
    <teleport to="#add_title">
        <span>{{ getTempContainer.active ? 'Edit Discount' : 'Create New Discount'}}</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button v-if="!getTempContainer.active" class="button button-primary top-submit-btn" @click.prevent="submitDiscount" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false" >
            <span>{{ submiting ? 'Creating' : 'Create' }}</span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
        <button v-else class="button button-primary top-submit-btn" @click.prevent="submitEditDiscount" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <span>{{ submiting ? 'Saving' : 'Save' }}</span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form class="overlay-hero-form">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.name}">
                <label>Discount name:</label>
                <input type="text" v-model="form.name" name="DiscountName" class="form-control" placeholder="Eg. Workers day discount" required>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row">
                <label>Discount Type:</label>
                <div class="flex">
                    <div class="form-check flex-row-st">
                        <input v-model="form.type" id="percent" value="1" class="form-check-input" type="radio">
                        <label for="percent">
                            Percentage(%)
                        </label>
                    </div>
                    <div class="form-check flex-row-st">
                        <input v-model="form.type" id="amount" value="0" class="form-check-input" type="radio" >
                        <label for="amount">
                            Direct amount({{ getCurrency }})
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.amount}">
                <label>Amount:</label>
                <input type="number" v-model="form.amount" name="Amount" class="form-control" placeholder="Eg. 5" required>
                <span class="span" v-if="validation.error && validation.errors.amount">
                    {{ validation.errors.amount[0] }}
                </span>
            </div>
            <div class="form-row-col">
                <div class="col-2 pl-0">
                    <label>Start date:</label>
                    <input type="date" v-model="form.startDate" class="form-control">
                </div>
                <div class="col-2 pr-0">
                    <label>End date:</label>
                    <input type="date" v-model="form.endDate" class="form-control">
                </div>
            </div>
            <div class="form-row mb-0">
                <div v-if="this.getTempContainer.array.length > 0">
                    <div class="header-holder flex-row-js">
                        <div>
                            <span class="count">{{ getTempContainer.array.length }}</span><span>items in this discount</span>
                        </div>
                        <div>
                            <button class="flex-row button add-more" @click.prevent="$store.commit('setSelectionSheet', { type: 'product' })">
                                <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 16.721 16.72">
                                    <path d="M-23237.838-313.921v-6.359h-6.359a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6.359v-6.359a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6.359h6.359a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6.359v6.359a1,1,0,0,1-1,1A.994.994,0,0,1-23237.838-313.921Z" transform="translate(23245.201 329.643)" fill="#0e142c"/>
                                </svg>
                                <span>Add more...</span>
                            </button>
                        </div>
                    </div>
                    <div class="selected-products-hold">
                        <ul style="margin-top:20px">
                            <selected-tag-row v-for="checked in getTempContainer.array" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="getTempContainer.editMode" v-bind:addMode="true" />
                        </ul>
                    </div>
                </div>
                <div v-else style="margin-bottom: 30px">
                    <label>Products:</label>
                    <button id="discount_big_add" class="button-secondary" @click.prevent="$store.commit('setSelectionSheet', { type: 'product' })">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
                        </div>
                        <span>Add products to this discount</span>
                    </button>
                </div>
            </div>
        </form>
    </teleport>
    <select-products-overlay v-if="getSelectionSheet.selectProd"/>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SelectProductsOverlay from '../includes/SelectProductsOverlay.vue';
import SelectedTagRow from '../includes/SelectedTagRow.vue';
import validationMixin from '../../../mixins/validationMixin';
import Spinner from '../includes/Spinner.vue';
export default {
    name: 'AddNewDiscount',
    mixins: [ validationMixin ],
    components: { SelectProductsOverlay, SelectedTagRow, Spinner },
    computed: mapGetters(['getToken', 'getHostname', 'getSelectionSheet', 'getTempContainer', 'getCurrentStore', 'getCurrency']),
    data() {
        return {
            form: {
                name: '',
                type: '1',
                amount: '',
                startDate: new Date().toISOString().slice(0,10),
                endDate: new Date().toISOString().slice(0,10),
                products: [],
                id: ''
            },
            selectionSheet: false,
        }
    },
    methods: {
        async submitDiscount() {
            this.clearErrs()
            this.submiting = true
            this.form.products = this.getTempContainer.array
            axios.post( this.getHostname+'/api/discount?token='+this.getToken,
                    this.form, {store: this.getCurrentStore.id},
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                this.submiting = false
                if(res.data.status === 1) {
                    const addTo = {
                        discount: res.data.discount, products: res.data.products
                    }
                    this.$store.commit('addToDiscounts', addTo)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }
                if(res.data.status === 2) {
                    const payload = {
                        id: 'danger',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                }
                
            }).catch((err) => {
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })
        },
        async submitEditDiscount() {
            this.clearErrs()
            this.submiting = true
            this.form.products = this.getTempContainer.array
            axios.put( this.getHostname+'/api/discount/'+this.form.id+'?token='+this.getToken, this.form)
            .then((res) => {
                this.submiting = false
                if(res.data.status === 1) {
                    const newData = {
                        discount: res.data.discount, discounts: res.data.discounts, products: res.data.products
                    }
                    this.$store.commit('updateDiscounts', newData)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                    this.$router.push({ name: 'DetailedDiscount', params: { id: res.data.discount.id, name: res.data.discount.name }, replace: true })
                }
                if(res.data.status === 2) {
                    const payload = {
                        id: 'danger',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                }
            }).catch((err) => {
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })


        },
        doProductSelection() {
            this.selectionSheet = !this.selectionSheet
        },
        preloadForEdit() {
            if(this.getTempContainer.active){
                this.form.name = this.getTempContainer.data.name
                this.form.type = this.getTempContainer.data.percentage
                this.form.amount = this.getTempContainer.data.value
                this.form.startDate = this.getTempContainer.data.start
                this.form.endDate = this.getTempContainer.data.end
                this.form.id = this.getTempContainer.data.id
            }
        }
    },
    created() {
        this.preloadForEdit()
    }
}
</script>
<style scoped lang="scss">
#discount_big_add{
    width: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    flex-direction: column;
    height: 300px;
    background-color: $dark-light;
    border-style: dashed;
    border-width: 1px;
    div{
        height: 70px;
        width: 70px;
        border-radius: 50%;
        background-color: rgba(86, 110, 244, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s all;
        &:hover{
            background-color: rgba(86, 110, 244, 0.2);
        }
        &:active{
            box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            border: 1px solid $primary-color;
            background-color: $primary-light;
        }
    }
    span{
        font-size: 1rem;
        font-weight: 600;
        padding: 15px 0;
    }
}
.form-row-col{
    padding-bottom: 30px ;
    display: flex;
    flex-direction: row;
    .col-2{
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
    }
}
.count{
    color: $primary-color;
}
ul{
    list-style-type: none;
    margin: 0;
    padding-left: 0;
}
.form-check{
  width: 50%;
}
</style>
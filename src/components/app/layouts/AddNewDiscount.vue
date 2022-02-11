<template>
    <form>
        <div class="form-row">
            <label>Discount name:</label>
            <input type="text" v-model="form.name" name="DiscountName" class="form-control" placeholder="Eg. Workers day discount" required>
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
                        Direct amount(GH₵)
                    </label>
                </div>
            </div>
        </div>
        <div class="form-row">
            <label>Amount:</label>
            <input type="number" v-model="form.amount" name="Amount" class="form-control" placeholder="Eg. 5" required>
        </div>
        <div class="form-row-col">
            <div class="col-2 pl-0">
                <label>Start date:</label>
                <Datepicker v-model="form.startDate" :monthChangeOnScroll="false" />
            </div>
            <div class="col-2 pr-0">
                <label>End date:</label>
                <Datepicker v-model="form.endDate" :monthChangeOnScroll="false" />
            </div>
        </div>
        <div class="form-row mb-0">
            <div v-if="this.getCheckedProducts.length > 0">
                <div class="header-holder flex-row-js">
                    <div>
                        <span class="count">{{ getCheckedProducts.length }}</span><span>items in this group</span>
                    </div>
                    <div>
                        <button class="flex-row button add-more" @click.prevent="$store.commit('setSelectionSheet')">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 16.721 16.72">
                                <path d="M-23237.838-313.921v-6.359h-6.359a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6.359v-6.359a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6.359h6.359a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6.359v6.359a1,1,0,0,1-1,1A.994.994,0,0,1-23237.838-313.921Z" transform="translate(23245.201 329.643)" fill="#0e142c"/>
                            </svg>
                            <span>Add more</span>
                        </button>
                    </div>
                </div>
                <!-- :style="{maxHeight: (getWindowHeight-380)+'px'}" -->
                <div class="selected-products-hold">
                    <ul style="margin-top:20px">
                        <selected-tag-row v-for="checked in this.getCheckedProducts" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="getTempContainer.editMode" />
                    </ul>
                </div>
            </div>
            <div v-else style="margin-bottom: 30px">
                <label>Products:</label>
                <button id="discount_big_add" class="button-secondary" @click.prevent="$store.commit('setSelectionSheet')">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
                    </div>
                    <span>Add products to this discount</span>
                </button>
            </div>
        </div>
        <teleport to="#form_submit_btn_holder">
            <div class="btn-wrap2">
                <button v-if="!getTempContainer.active" class="button button-primary" @click.prevent="submitDiscount">Submit</button>
                <button v-else class="button button-primary" @click.prevent="submitEditDiscount">Save changes</button>
            </div>
        </teleport>
    </form>
     <select-products-overlay v-if="getSelectionSheet" v-bind:thisWidth="thisWidth" v-bind:windowHeight="getWindowHeight" />
</template>
<script>
import axios from 'axios'
import 'vue3-date-time-picker/dist/main.css'
import Datepicker from 'vue3-date-time-picker';
import { mapGetters } from 'vuex'
import SelectProductsOverlay from '../includes/SelectProductsOverlay.vue';
import SelectedTagRow from '../includes/SelectedTagRow.vue';
export default {
    name: 'AddNewDiscount',
     components: { Datepicker, SelectProductsOverlay, SelectedTagRow },
     computed: mapGetters(['getToken', 'getHostname', 'getCheckedProducts', 'getWindowHeight', 'getSelectionSheet', 'getTempContainer']),
     props: ['thisWidth'],
    data() {
        return {
            form: {
                name: '',
                type: '1',
                amount: '',
                startDate: new Date(),
                endDate: new Date(),
                products: [],
                id: ''
            },
            selectionSheet: false,
        }
    },
    methods: {
        async submitDiscount() {
            this.form.products = this.getCheckedProducts
            console.log(this.form.startDate.toJSON())
            axios.post( this.getHostname+'/api/discount?token='+this.getToken,
                    this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                if(res.data.status === 1) {
                    this.$store.commit('addToDiscounts', res.data.discount)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth')
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
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
                }
                console.log(err.response.data.errors)
            })
        },
        async submitEditDiscount() {
            this.form.products = this.getCheckedProducts
            axios.put( this.getHostname+'/api/discount/'+this.form.id+'?token='+this.getToken, this.form)
            .then((res) => {
                if(res.data.status === 1) {
                    const newData = {
                        discount: res.data.discount, discounts: res.data.discounts
                    }
                    this.$store.commit('updateDiscounts', newData)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth')
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
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
                }
                console.log(err.response.data.errors)
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
    beforeMount() {
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
</style>
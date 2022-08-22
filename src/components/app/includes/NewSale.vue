<template>
    <transition name="fade">
        <tertiary-backdrop v-if="(getSale.maximize && getSale.active || (!getSale.mobile && getMobile && getSale.active)) || sold.active" v-bind:zIndex="zIndex" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div v-if="getSale.active" class="sale-main-wrapper"  :class="[getSale.maximize ? 'sale-maximize' : 'normal-position', getSale.minimize ? 'minimized': '', getSale.mobile && getMobile ? 'mini-mob': '', getWindowWidth <= 528 ? 'full-width': '']">
            <div class="sale-holder">
                <div class="inner" :class="getMobile? 'mob-header' : 'dsk-header'">
                    <div class="header flex-row-js">
                        <div class="title flex-start w-100" @click.prevent="$store.commit('minimizeSale')">
                            <div class="flex-col">
                                <div class="title-name">New Sale</div>
                                <span v-if="getSale.mobile && getMobile ">{{ thisSale.length }} items in queue </span>
                            </div>
                        </div>
                        <div class="flex">
                            <button class="menu-toggle-btn minimize-btn" @click.prevent="$store.commit('minimizeSale')" :title="getSale.minimize ? 'Restore' : 'Minimize'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="8.714" viewBox="0 0 17.223 8.714">
                                    <path d="M19.095,25.109l-8.675-7.118A.9.9,0,0,1,11.561,16.6l7.478,6.136,6.77-6.108a.9.9,0,1,1,1.206,1.336Z" transform="translate(-10.09 -16.395)"/>
                                </svg>
                            </button>
                            <button v-if="!getMobile" class="menu-toggle-btn" @click.prevent="$store.commit('maximizeSale')"  :title="getSale.maximize ? 'Restore' : 'Maximize'">
                                <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 17.518 16.604">
                                    <path v-if="getSale.maximize" d="M16035.078-3360.094v-7.606h7.518a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-4.356l3.981,3.4-1.332,1.49-3.81-3.241v3.958a1,1,0,0,1-1,1A1,1,0,0,1,16035.078-3360.094Zm-9-8a1,1,0,0,1-1-1,1,1,0,0,1,1-1h4.356l-3.986-3.4,1.337-1.49,3.809,3.241v-3.958a1,1,0,0,1,1-1,1,1,0,0,1,1,1v7.606Z" transform="translate(-16025.076 3376.698)" fill="#fff"/>
                                    <path v-else  d="M16035.078-3360.094a1,1,0,0,1-1-1,1,1,0,0,1,1-1h4.355l-4.767-4.284,1.337-1.49,4.59,4.127v-3.958a1,1,0,0,1,1-1,1,1,0,0,1,1,1v7.605Zm-10-9v-7.6h7.521a1,1,0,0,1,.994,1,1,1,0,0,1-.994,1h-4.356l4.759,4.284-1.332,1.486-4.59-4.123v3.954a1,1,0,0,1-1,1A1,1,0,0,1,16025.077-3369.1Z" transform="translate(-16025.077 3376.697)" fill="#fff"/>
                                </svg>
                            </button>
                            <button class="menu-toggle-btn" @click.prevent="$store.commit('closeSale')" title="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 15.439 15.434">
                                    <path d="M17890.436-3025a1,1,0,0,1,.707.293,1,1,0,0,1,.293.707,1,1,0,0,1-.293.707l-6.012,6.01,6.012,6.01a1,1,0,0,1,.293.707,1,1,0,0,1-.293.707,1,1,0,0,1-1.414,0l-6.012-6.01-6.014,6.01a1,1,0,0,1-1.414,0,1,1,0,0,1-.293-.707,1,1,0,0,1,.293-.707l6.014-6.01-6.014-6.01a1,1,0,0,1-.293-.707,1,1,0,0,1,.293-.707,1,1,0,0,1,1.414,0l6.014,6.01,6.012-6.01A1,1,0,0,1,17890.436-3025Z" transform="translate(-17875.996 3024.998)" fill="#fff"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="body" :class="!getSale.minimize ? 'default-minimize-sale': ''" :style="{ height: computeHeight+'px' }">
                        <div v-if="!getSale.minimize" class="flex-col flex-space-between" :class="computeHeight == 0 ? 'display-none' : ''">
                            <div class="sale-main-body">
                                <div class="sales-top">
                                    <form @submit.prevent="doSearch">
                                        <div class="form-row product-search">
                                            <label class="input-label flex align-items-center">
                                                <svg class="search-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671" @mousedown.prevent="">
                                                    <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"></path>
                                                </svg>
                                                <input type="text" name="searchField" ref="searchField2" autocomplete="off" v-model="searchInput" @click="hideError" class="form-control" placeholder="Search product by Batch number..." required>
                                                <span v-if="searchInput != ''" class="clear-input-btn clear-2" @click="clearInput2" @mousedown.prevent="">
                                                    <svg  xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 20 20">
                                                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                                    </svg>
                                                </span>
                                                <button class="button button-primary submit-btn" :class="{ 'button-disabled' : doingSearch }">
                                                    <svg v-if="!doingSearch" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <path  d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" transform="translate(-4 -4)"/>
                                                    </svg>
                                                    <spinner v-else v-bind:size="20" v-bind:white="true"/>
                                                </button>
                                            </label>
                                        </div>
                                    </form>
                                    <div v-if="error.active" class="error-alert flex-row-js">
                                        <span>{{ error.msg }}</span>
                                        <button @click.prevent="hideError" class="alert-close flex justify-content-center align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14 14">
                                                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#C18383"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-if="searchResult != ''" class="preview-hold flex-row-js" :class="{ 'expired-product': computeExpiry }">
                                        <div class="flex align-items-center">
                                            <div class="prod-image bg-img" :style="searchResult.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+searchResult.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                                            <div class="flex-col sale-captions" style="max-width: 140px">
                                                <div class="item-value text-overflow-ellipsis">{{ searchResult.name }}</div>
                                                <div><span class="currency">{{ getCurrency }}</span><span class="value">{{ Intl.NumberFormat('en-US').format(computePrice(searchResult.selling_price, searchResult.discount).toFixed(2)) }}</span></div>
                                                <div class="flex align-items-center" v-if="!computeExpiry">
                                                    <label>Qty:</label>
                                                    <input type="number" v-model="quantity" class="form-control qty-input">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex align-items-center gap-8">
                                            <span class="expired text-overflow-ellipsis" v-if="computeExpiry">
                                                Expired product
                                            </span>
                                            <button v-else class="button add-btn" @click.prevent="addToSale(searchResult, quantity)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 12.429 14.5">
                                                    <path  d="M18.552,12.874l-5.179,5.179a1.036,1.036,0,0,1-1.465,0L6.73,12.874a1.036,1.036,0,0,1,1.465-1.465l3.411,3.411V4.892a1.036,1.036,0,0,1,2.071,0V14.82l3.411-3.411a1.036,1.036,0,0,1,1.465,1.465Z" transform="translate(-6.427 -3.856)" fill="#566ff4"/>
                                                </svg>
                                                ADD
                                            </button>
                                            <button class="button clear-btn" @click.prevent="clearSearch">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14 14">
                                                    <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#C18383"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="button add-more" @click="searchByName">Search by name...</button>
                                <div class="table-wrapper" :style="{ maxHeight: computeHeight-313+'px' }">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Items</th>
                                                <th>Qty</th>
                                                <th>Amount({{ getCurrency }})</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in thisSale" :key="item.id">
                                                <td>
                                                    <div class="flex">
                                                        <div class="text-overflow-ellipsis" style="max-width:50%">{{ item.name }}</div>
                                                        <div class="at-price">@{{ getCurrency }}{{ Intl.NumberFormat('en-US').format(item.unit_price.toFixed(2)) }}</div>
                                                    </div>
                                                </td>
                                                <td><span class="x">x</span>{{ item.qty }}</td>
                                                <td>
                                                    <div class="flex flex-end align-items-center">
                                                        <span>{{ Intl.NumberFormat('en-US').format(item.price.toFixed(2)) }}</span>
                                                        <button @click.prevent="removeItem(item.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14 14">
                                                                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>    
                                <button class="button clear-queue gap-4" v-if="this.thisSale != ''" @click="clearSaleQueue">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14 14">
                                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"></path>
                                    </svg>
                                    <span>Clear queue</span>
                                </button>
                            </div>
                            <div>
                                <div class="flex flex-end">
                                    <div class="flex total-hold">
                                        <span class="currency">{{ getCurrency }}</span>
                                        <span class="sale-total">{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</span>
                                    </div>
                                </div>
                                <div class="sale-footer mb-8 flex-space-between gap-8">
                                    <!-- <button class="menu-toggle-btn">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </button> -->
                                    <div class="flex align-items-center gap-8">
                                        <div class="form-row">
                                            <div class="input-wrapper is-iddle" id="received_wrapper">
                                                <label for="receivedInput" class="text-overflow-ellipsis">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 45 27">
                                                        <path d="M24.75,20.25H23.625V14.063a.562.562,0,0,0-.562-.562h-.955a1.685,1.685,0,0,0-.936.283l-1.078.719a.562.562,0,0,0-.156.78l.624.936a.562.562,0,0,0,.78.156l.033-.022v3.9H20.25a.562.562,0,0,0-.562.563v1.125a.562.562,0,0,0,.563.563h4.5a.562.562,0,0,0,.563-.562V20.813A.562.562,0,0,0,24.75,20.25Zm18-15.75H2.25A2.25,2.25,0,0,0,0,6.75v22.5A2.25,2.25,0,0,0,2.25,31.5h40.5A2.25,2.25,0,0,0,45,29.25V6.75A2.25,2.25,0,0,0,42.75,4.5ZM3.375,28.125v-4.5a4.5,4.5,0,0,1,4.5,4.5Zm0-15.75v-4.5h4.5A4.5,4.5,0,0,1,3.375,12.375ZM22.5,25.875c-3.728,0-6.75-3.526-6.75-7.875s3.022-7.875,6.75-7.875S29.25,13.65,29.25,18,26.227,25.875,22.5,25.875Zm19.125,2.25h-4.5a4.5,4.5,0,0,1,4.5-4.5Zm0-15.75a4.5,4.5,0,0,1-4.5-4.5h4.5Z" transform="translate(0 -4.5)"/>
                                                    </svg>
                                                    Cash received
                                                </label>
                                                <input id="receivedInput" v-model="received" class="form-control" type="text" placeholder="0.00">
                                            </div>
                                        </div>
                                        <div class="form-row" >
                                            <div class="input-wrapper is-iddle" id="change_wrapper">
                                                <label for="changeInput" class="text-overflow-ellipsis">Change</label>
                                                <input ref="change" id="changeInput" :value="computeChange" class="form-control" type="text" placeholder="0.00">
                                            </div>
                                        </div>
                                    </div>
                                    <button class="button gap-8 button-primary add-sale-btn" @click.prevent="doSubmitSale" :class="{ 'button-disabled' : thisSale.length < 1 || submiting }" :disabled="thisSale.length < 1 || submiting ? true : false">
                                        <span>{{ submiting ? 'Please wait' : 'Record Sale' }}</span>
                                        <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <div v-if="getSelectionSheet.search">
        <teleport to="#selection_title">
            <h3>Search by Product name</h3>
            <span class="text">Or Add from list</span>
        </teleport>
        <teleport to="#selection_sheet_searchInput">
            <div class="search-hold">
                <form @submit.prevent="" @focusin="focusIn" @focusout="focusOut">
                    <label  class="justify-content-center align-items-center" :class="{ 'is-focused' : isFocused }">
                        <div class="outer-icons flex-end" @mousedown.prevent="">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-search" width="20" height="20" viewBox="0 0 26.671 26.671">
                                <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                            </svg>
                        </div>
                        <div class="fgr-1">
                            <input v-model="form.input"  autocomplete="off"  ref="searchInput" type="text" name="searchField" class="form-control" placeholder="Search product by name...">
                        </div>
                        <div class="outer-icons flex-start" v-if="!form.input == '' && isFocused" @mousedown.prevent="">
                            <span class="clear-input-btn" @click="clearInput">
                                <svg  xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 20 20">
                                    <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                </svg>
                            </span>
                        </div>
                    </label>
                </form>
            </div>
        </teleport>
        <teleport to="#selection_sheet_body">
            <div v-if="computedProducts.length > 0">
                <sale-prod-search-overlay-row v-for="product in computedProducts" :key="product.id" v-bind:product="product" @addByName="doAddByName"/>
            </div>
            <h4 v-else style="padding: 0 10px">
                No product found
            </h4>
        </teleport>
    </div>
    <sale-completed v-bind:sold="sold" @closeCompleted="closeCompletedOverlay"/>
</template>
<script>
import axios from 'axios'
import searchFunctionsMixin from '../../../mixins/searchFunctions'
import TertiaryBackdrop from './TertiaryBackdrop.vue'
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'
import SaleCompleted from './SaleCompleted.vue'
import SaleProdSearchOverlayRow from './SaleProdSearchOverlayRow.vue'
export default {
    name: 'NewSale',
    mixins: [searchFunctionsMixin],
    components: { TertiaryBackdrop, Spinner, SaleProdSearchOverlayRow, SaleCompleted },
    computed: {
      ...mapGetters(['getCurrency', 'getCurrentStore', 'getHostname', 'getToken', 'getDiscounts', 'getUser', 'getDefaultImage', 'getUserAdminID', 'getWindowWidth', 'getWindowHeight', 'getMobile', 'getSale', 'getSelectionSheet', 'getProducts']),
      computeTotal() {
            return this.thisSale.reduce((acc, item) => acc + item.price, 0)
      },
      computedItems() {
          if(this.thisSale.length > 0) {
              const newSales = this.thisSale.slice();
              return newSales
          }else
            return []
        },
        computedProducts: function() {
            return this.getProducts.filter(product => {
                return product.name.toLowerCase().match(this.form.input.toLowerCase())
            })
        },
        computeHeight() {
            const val = this.getMobile ? 100 : 200
            if((!this.getSale.minimize && !this.getSale.mobile) || (!this.getSale.minimize && !this.getSale.mobile)) {
                return this.getWindowHeight - val
            }else {
                return 0
            }
        },
        computeExpiry() {
            if(this.searchResult.expires && this.searchResult.active == 0) {
                return true
            }else {
                return false
            }
        },
        computeChange() {
            if(this.received > 0) {
                const change = this.received - this.computeTotal
                return change.toFixed(2)
            }
            else
            return 0
        }
    },
    data() {
        return {
            searchResult: '',
            quantity: Number(1),
            thisSale: [],
            searchInput: '',
            error: { active: false, msg: ''},
            submiting: false,
            doingSearch: false,
            zIndex: 99,
            sold: {
                active: false,
                total: '',
                receipt: '',
                id: '',
                received: '',
                change: ''
            },
            received: '',
            change: ''
        }
    },
    methods: {
        removeItem(id) {
            this.thisSale = this.thisSale.filter(filter => filter.id != id)
        },
        async doSearch() {
            const item = this.searchInput
            if(item != '') {
                this.doingSearch = true
                try {
                    const res = await axios.post(this.getHostname+'/api/fetch-item?token='+this.getToken, { item: item })
                    if(res.data.item == null){
                        this.doingSearch = false
                        this.showError('Item not found')
                        this.clearSearch()
                    }
                    else
                    this.searchResult = res.data.item
                    this.doingSearch = false
                } catch (e) {
                    this.showError(e.response.data.error)
                    this.doingSearch = false
                }
            }
        },
        focusIn: function () {
            this.isFocused = true
        },
        focusOut: function () {
            this.isFocused = false;
        },
        clearSearch() {
            this.searchResult = ''
            return
        },
        showError(msg) {
            this.error.active = true
            this.error.msg = msg
            return
        },
        hideError() {
            this.error.active ? this.error.active = false : ''
            this.error.msg = ''
        },
        checkUnitQty(id) {
            if(this.thisSale.length > 0) {
                let i = this.thisSale.filter(item => item.prod_id == id)
                if(i.length > 0) {
                    this.thisSale = this.thisSale.filter(item => item.prod_id != id)
                    return i[0].qty
                }
                else
                return 0
            }else{
                return 0
            }
        },
        computePrice(price, discount) {
            if(discount !== null && this.getDiscounts.length > 0) {
                let discount_price = this.getDiscounts.filter(dis => dis.id == discount)
                if(discount_price[0].percentage == 1 && discount_price[0].active == 1) {
                    let newPrice = Number(price) - ((discount_price[0].value)/100) * price
                    return Number(newPrice)
                }else if(discount_price[0].percentage == 0 && discount_price[0].active == 1){
                    let newPrice = Number(price) - Number(discount_price[0].value)
                    return Number(newPrice)
                }else{
                    return Number(price)
                }
            }else{
                return Number(price)
            }
        },
        addToSale(searchResult, quantity) {
            let qty = this.checkUnitQty(searchResult.product_id) + quantity
            const price = this.computePrice(searchResult.selling_price, searchResult.discount)
            let unitTotal = price * qty
            const payload = {
                id: searchResult.id, image: searchResult.image, qty: qty, name: searchResult.name, unit_price: Number(price), price: Number(unitTotal), og_price: searchResult.selling_price, prod_id: searchResult.product_id, discount: searchResult.discount, batch_no: searchResult.batch_no
            }
            this.thisSale.push(payload)
            this.clearCurrentRes()
        },
        doSubmitSale() {
            if(this.thisSale.length > 0) {
                this.submiting = true
                let date = new Date()
                const receipt = '' + date.getFullYear() + parseInt(date.getMonth()+1) + date.getDate()  + date.getHours() + date.getMinutes() + date.getSeconds()
                axios.post(this.getHostname+'/api/perform-sale?token='+this.getToken,
                { items: this.thisSale, total: this.computeTotal, receipt: receipt, currency: this.getCurrency, change: this.$refs.change.value, received: this.received  })
                .then((res) => {
                    this.submiting = false
                    const payload = {
                        sale: res.data.sale, saleItems: res.data.sale_items, items: res.data.items, product: res.data.product
                    }
                    this.$store.commit('addToTodaysSale', payload)
                    this.saleCompletion(res.data.total, res.data.receipt, res.data.id, res.data.receive, res.data.change)
                    this.clearSaleQueue()
                    this.$store.commit('setBodyFixed')
                }).catch(() => {
                    this.submiting = false
                }) 
            }
        },
        saleCompletion(total, receipt, id, received, change) {
            this.zIndex = 150
            this.sold.total = total
            this.sold.receipt = receipt
            this.sold.id = id
            this.sold.received = received
            this.sold.change = change
            this.sold.active = true
            this.$store.commit('setBodyFixed')
        },
        closeCompletedOverlay() {
            this.sold.active = false
            this.zIndex = 99
            this.$store.commit('removeBodyFixed')
        },
        searchByName() {
            this.clearCurrentRes()
            this.hideError()
            this.$store.commit('setSelectionSheet', { type: 'search' })
        },
        doAddByName(payload) {
            this.addToSale(payload.item, payload.quantity)
        },
        clearInput2() {
            this.searchInput = ''
            this.$nextTick(function () {
                this.$refs.searchField2.focus();
            });
        },
        clearSaleQueue() {
            this.thisSale = []
            this.received = ''
            this.change = ''
        }
        ,
        clearCurrentRes() {
            this.searchResult = ''
            this.searchInput = ''
            this.quantity = Number(1)
        }
    }
}
</script>
<style scoped lang="scss">
h3{
    margin: 0;
}
.text{
    color: $gray-color;
    font-weight: 500;
}
.sale-main-wrapper{
    position: fixed;
    z-index: 100;
    background-color: transparent;
    bottom: 0;
    right: 0;
}
.search-hold {
    padding: 0 10px;
    margin: 5px 0;
}
.input-wrapper{
    max-width: 140px;
    height: 48px;
    .form-control{
        height: 52px;
        background-color: $dark-light;
        font-weight: 600;
        border: unset;
    }
    label {
        width: 80%;
        path {
            fill: $gray-color;
        }
    }
}
.sale-holder{
    box-shadow: 3px 10px 20px 7px rgb(7 10 46 / 11%);
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    width: 100%;
    background-color: $white-color;
    .header{
        button {
            transition: unset;
        }
        .title{
            .title-name{
                font-weight: 500;
            }
            span {
                font-size: 13px;
                color: $gray-color;
            }
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
    .dsk-header {
        .default-minimize-sale{
            padding: 20px;
        }
        .header{
            height: 46px;
            transition: 0.3s background-color;
            padding: 0 20px;
            border-top-right-radius: 18px;
            border-top-left-radius: 18px;
            background-color: #2e2f34;
            color: #ffffff;
            button{
                height: 35px;
                width: 35px;
                margin-left: 2px;
                &:hover{
                    background-color: #3c3d43;
                }
                &:active{
                    background-color: #0000002c;
                }
            }
            &:hover{
                background-color: #30333d;
            }
            svg path {
                fill: #fff;
            }
        }
    }
    .mob-header{
        .header{
            padding: 0 10px 0 15px;
            height: 48px;
            button:hover {
                background-color: transparent;
            }
            svg path {
                fill: $dark;
            }
        }
        .default-minimize-sale{
            padding: 0 15px 15px 15px;
        }
    }
    .body{
        transition: 0.3s all;
        .flex-col{
            height: 100%;
        }
        .add-sale-btn {
            padding: 8px 20px;
            path {
                fill: #fff;
            }
        }
        .menu-toggle-btn{
            transform: rotate(90deg);
            i{
                height: 3px;
                width: 3px;
            }
        }
        .sale-total{
            font-weight: 700;
            font-size: inherit;
        }
        .currency{
            color: $gray-color;
            font-size: inherit;
        }
        .total-hold{
            padding: 10px;
            font-size: 20px;
        }
    }
    
}
.mini-mob{
    padding: 0 20px;
    transform: translateY(-70px);
    transition: 0.8s all ease-in-out;
    .sale-holder{
        border-radius: 16px;
        background-color: hsl(0deg 0% 100% / 90%);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter: saturate(180%) blur(10px);
    }
    .header {
        height: 65px !important;
    }
}
.mob-position{
    bottom: 85px;
    right: 0;
}
.normal-position{
    bottom: 0;
    right: 0;
    width: 528px;
}
.sale-maximize{
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    .sale-holder{
        border-radius: 18px;
    }
    .body{
        height: 550px;
    }
    
}
.product-search{
    .form-control {
        border: 1px solid #ffffff;
        &:hover {
            border: 1px solid $primary-color;
        }
        &:focus {
            box-shadow: none;
            border: 1px solid $primary-color;
        }

    }
    .search-svg{
        position: absolute;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        left: 18px;
    }
    .submit-btn{
        height: 40px;
        position: absolute;
        right: 10px;
        width: 40px;
        padding: 0;
        border-radius: 20px;
        border: none;
        path{
            fill: $white-color;
        }
        &:active{
            border: 1px solid $primary-color;
        }
    }
    .input-label{
        .clear-input-btn{
            right: 60px;
            top: unset;
        }
        .clear-2{
            background-color: transparent;
            &:hover {
                background-color: $primary-light;
                path{
                    fill: $primary-color;
                }
            }
        }
        input{
            border-radius: 0.9rem;
            background-color: $dark-light;
            padding: 10px 20px 10px 50px;
            &:focus{
                background-color: $white-color;
                border-width: 2px;
                padding: 10px 19px 10px 49px;

            }
        }
        &:hover, &:focus-within {
            .search-svg {
                path{
                    fill: $primary-color;
                }
            }
        }
    }
    
}
.add-more{
    margin-bottom: 10px;
    color: inherit;
}
.clear-queue{
    height: 32px;
    padding: 0 10px;
    background-color: transparent;
    border: 1px solid $gray-light;
    font-size: 0.9rem;
    border-radius: 20px;
    margin-left: auto;
    margin-top: 10px;
    span, path{
        transition: 0.3s all;
        color: $dark;
    }
    &:hover{
        border-color: $danger;
        background-color: rgba(230, 50, 50, 0.1) !important;
        path{
            fill: $danger;
        }
        span{
            color: $danger;
        }
    }
}
.table-wrapper{
    overflow-y: auto;
}
table{
    width: 100%;
    border-collapse: collapse;
    padding: 0 20px;
    thead{
        th{
            border-bottom: 2px solid #D4D8DE ;
            height: 50px;
        }
    }
    tbody{
        td{
            border-bottom: 1px dashed #ddd;
            padding: 12px 0;
            button{
                margin-left: 15px;
                height: 32px;
                width: 32px;
                padding: 0 !important;
                background-color: $dark-light;
                transition: 0.3s all;
                border-radius: 16px;
                path{
                    fill: $dark;
                }
                &:hover{
                    path{
                        fill: $danger;
                    }
                    background-color: rgba(230, 50, 50, 0.1);
                }
            }
        }
    }
    th{
        padding-bottom: 8px;
    }
    th, td{
            text-align: left;
            &:first-child{
                width: 60%;
            }
            &:nth-child(2){
                text-align: center;
            }
            &:last-child{
                text-align: right;
            }
        }
}
.form-row{
    margin-bottom: 0;
}
.sales-top{
    position: relative;
    border-radius: 14px;
    margin-bottom: 10px;
    .preview-hold{
       background-color: $white-color; 
       padding: 10px;
       border-radius: 12px;
       position: absolute;
       width: 100%;
       box-shadow: 3px 10px 20px 7px rgb(7 10 46 / 11%);
       .qty-input{
           width: 70px;
           height: 45px;
           margin-left: 8px;
       }
       .prod-image{
            height: 55px;
            width: 55px;
            border-radius: 10px;
        }
        .add-btn{
            width: 100px;
            background-color: $primary-light;
            &:hover {
                svg{
                    margin-top: 5px;
                }
            }
            &:active{
                border: 1px solid $primary-color;
                box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            }
            svg{
                transition: 0.3s all;
                margin-right: 4px;
            }
        }
       button{
           color: $primary-color;
           font-weight: 700;
           height: 55px;   
           &:hover{
               background-color: $primary-light;
           }
       }
       .sale-captions{
           padding: 0 15px;
           .item-value{
               margin-bottom: 5px;
               font-weight: 500;
           }
       }
    }
}
.at-price{
    color: $gray-color;
    margin-left: 5px;
}
.x{
    color: $gray-color;
}
.error-alert{
    padding: 10px 20px;
    background-color: rgba(230, 50, 50, 0.1);
    border-radius: 8px;
    border: 1px solid $danger;
    margin-bottom: 10px;
    span{
        color: $danger;
        font-weight: 600;
        text-transform: capitalize;
    }
}
.alert-close{
    &:hover{
        background-color: rgba(230, 50, 50, 0.1);
        path {
            fill: #9A5D5D;
        }
    }
}

.clear-btn{
    height: 38px !important;
    width: 38px;
    padding: 0 !important;
    background-color: transparent;
    transition: 0.3s all;
    border-radius: 50%;
    path{
        fill: $primary-color;
    }
}
.expired-product{
    border-top: 2px $danger solid;
    .expired{
        background-color: rgba(230, 50, 50, 0.1);
        color: $danger;
        border-radius: 8px;
        padding: 12px;
        font-weight: 600;
    }
}
.minimized,.mini-mob{
    .minimize-btn{
        transform: scaleY(-1);
    }
    .body{
        padding-bottom: 0px !important;
    }
}

.full-width{
    width: 100%;
    .body{
        padding-bottom: 40px;
    }
}
.display-none{
    display: none;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(820px);  
}
</style>
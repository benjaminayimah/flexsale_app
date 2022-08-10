<template>
<transition name="fade">
    <tertiary-backdrop v-if="getSale.maximize && getSale.active || (!getSale.mobile && getMobile && getSale.active)" />
</transition>
<transition name="slide">
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
                                <form @submit.prevent="">
                                    <div class="form-row product-search">
                                        <label class="input-label flex align-items-center">
                                            <svg class="search-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                                                <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"></path>
                                            </svg>
                                            <input type="text" name="searchField" v-model="searchInput" @click="hideError" class="form-control" placeholder="Search product by Batch number...">
                                            <button class="button button-secondary submit-btn" @click.prevent="doSearch">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <path  d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" transform="translate(-4 -4)"/>
                                                </svg>
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
                                        </div>
                                    </div>
                                    <div class="flex align-items-center" v-if="!computeExpiry">
                                        <label>Qty:</label>
                                        <input type="number" v-model="quantity" class="form-control qty-input">
                                    </div>
                                    <div class="flex align-items-center gap-8">
                                        <span class="expired text-overflow-ellipsis" v-if="computeExpiry">
                                            Expired product
                                        </span>
                                        <button v-else class="button add-btn" @click.prevent="addToSale(searchResult)">
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
                        <div class="sale-footer flex-space-between align-items-center">
                            <div class="flex-space-between align-items-center w-100">
                                <button class="menu-toggle-btn">
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </button>
                                <div class="flex total-hold">
                                    <label>Total Amount:</label>
                                    <span class="currency">{{ getCurrency }}</span>
                                    <span class="sale-total">{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</span>
                                </div>
                            </div>
                            <button class="button button-primary add-sale-btn" @click.prevent="doSubmitSale" :class="{ 'button-disabled' : thisSale.length < 1 }" :disabled="thisSale.length < 1 ? true : false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 12.229 21.624">
                                    <path d="M12.9,12.49c-2.727-.709-3.6-1.442-3.6-2.583,0-1.309,1.213-2.222,3.244-2.222,2.138,0,2.931,1.021,3,2.523H18.2a4.789,4.789,0,0,0-3.856-4.577V3h-3.6V5.595c-2.331.5-4.2,2.018-4.2,4.337,0,2.775,2.295,4.157,5.646,4.961,3,.721,3.6,1.778,3.6,2.9,0,.829-.589,2.15-3.244,2.15-2.475,0-3.448-1.105-3.58-2.523H6.32c.144,2.631,2.114,4.109,4.421,4.6v2.607h3.6V22.041c2.343-.444,4.2-1.8,4.2-4.265C18.549,14.365,15.63,13.2,12.9,12.49Z" transform="translate(-6.32 -3)" fill="#fff"/>
                                </svg>
                                <span>Sell</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
import axios from 'axios'

import TertiaryBackdrop from './TertiaryBackdrop.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'NewSale',
    components: { TertiaryBackdrop },
    computed: {
      ...mapGetters(['getCurrency', 'getCurrentStore', 'getHostname', 'getToken', 'getDiscounts', 'getUser', 'getDefaultImage', 'getUserAdminID', 'getWindowWidth', 'getWindowHeight', 'getMobile', 'getSale']),
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
        // computeWidth() {
        //     if(this.getWindowWidth <= 528) {
        //         return true
        //     }
        // },
        computeHeight() {
            const val = this.getMobile ? 100 : 200
            if((!this.getSale.minimize && !this.getSale.mobile) || (!this.getSale.minimize && !this.getSale.mobile)) {
                return this.getWindowHeight - val
            }else {
                return 0
            }
        },
        // computeMobPosition() {
        //     if(!this.getSale.maximize && !this.getSale.minimize && !this.getSale.mobile && !this.getMobile ) {
        //        return false
        //     }else if(!this.getSale.maximize && !this.getSale.minimize && this.getSale.mobile && this.getMobile ) {
        //         return true
        //     }else {
        //         return false
        //     }
        // },
        computeExpiry() {
            if(this.searchResult.expires && this.searchResult.active == 0) {
                return true
            }else {
                return false
            }
        }
    },
    data() {
        return {
            searchResult: '',
            quantity: Number(1),
            thisSale: [],
            searchInput: '',
            error: { active: false, msg: ''},
            
        }
    },
    methods: {
        removeItem(id) {
            this.thisSale = this.thisSale.filter(filter => filter.id != id)
        },
        async doSearch() {
            const item = this.searchInput
            if(item != '') {
                try {
                    const res = await axios.post(this.getHostname+'/api/fetch-item?token='+this.getToken, { item: item })
                    if(res.data.item == null){
                        this.showError('Item not found')
                        this.clearSearch()
                    }
                    else
                    this.searchResult = res.data.item
                } catch (e) {
                    this.showError(e.response.data.error)
                }
            }
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
        addToSale(searchResult) {
            let qty = this.checkUnitQty(searchResult.product_id) + this.quantity
            const price = this.computePrice(searchResult.selling_price, searchResult.discount)
            let unitTotal = price * qty
            const payload = {
                id: searchResult.id, image: searchResult.image, qty: qty, name: searchResult.name, unit_price: Number(price), price: Number(unitTotal), og_price: searchResult.selling_price, prod_id: searchResult.product_id, discount: searchResult.discount, batch_no: searchResult.batch_no
            }
            this.thisSale.push(payload)
            this.searchResult = ''
            this.searchInput = ''
            this.quantity = Number(1)
        },
        doSubmitSale() {
            if(this.thisSale.length > 0) {
                let date = new Date()
                const receipt = '' + date.getFullYear() + parseInt(date.getMonth()+1) + date.getDate()  + date.getHours() + date.getMinutes() + date.getSeconds()
                axios.post(this.getHostname+'/api/perform-sale?token='+this.getToken,
                { items: this.thisSale, total: this.computeTotal, receipt: receipt, currency: this.getCurrency  })
                .then((res) => {
                    const payload = {
                        sale: res.data.sale, saleItems: res.data.sale_items, items: res.data.items, product: res.data.product
                    }
                    this.$store.commit('addToTodaysSale', payload)
                    this.thisSale = []
                }).catch((err) => {
                    console.log(err.response) 
                }) 
            }
        }

    }
}
</script>
<style scoped lang="scss">
.sale-main-wrapper{
    position: fixed;
    z-index: 999;
    background-color: transparent;
    bottom: 0;
    right: 0;
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
            height: 52px;
            padding: 8px 48px;
            svg{
                margin-right: 8px;
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
            padding: 0 32px;
            font-size: 18px;
            label{
                margin: 0 10px 0 0;
                font-size: inherit;
                font-weight: 500;
            }
        }
    }
    
}
.mini-mob{
    padding: 0 20px;
    bottom: 84px !important;
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
        background-color: transparent;
        path{
            fill: $primary-color;
        }
        &:hover{
            background-color: $primary-light;
        }
        &:active{
            border: 1px solid $primary-color;
            background-color: $white-color;
        }
    }
    .input-label{
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
            path{
                fill: $primary-color;
            }
        }
    }
    
}
table{
    width: 100%;
    padding: 0 20px;
    border-collapse: collapse;
    thead{
        th{
            border-bottom: 1px solid $gray-color ;
            height: 50px;
        }
    }
    tbody{
        td{
            border-bottom: 1px dashed #ddd;
            button{
                margin-left: 15px;
                height: 32px;
                width: 32px;
                padding: 0 !important;
                background-color: transparent;
                transition: 0.3s all;
                border-radius: 16px;
                path{
                    fill: $gray-color;
                }
                &:hover{
                    path{
                        fill: $dark;
                    }
                    background-color: $dark-light;
                }
            }
        }
    }
    th, td{
            text-align: left;
            padding: 12px 0;
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
    margin-bottom: 20px;
    .preview-hold{
       background-color: $white-color; 
       padding: 10px;
       border-radius: 12px;
       position: absolute;
       width: 100%;
       box-shadow: 3px 10px 20px 7px rgb(7 10 46 / 11%);
       .qty-input{
           width: 70px;
           height: 50px;
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
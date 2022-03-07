<template>
<tertiary-backdrop v-if="sale.maximize" />
    <div class="sale-holder" :class="sale.maximize ? 'sale-maximize' : 'sale-normal'">
        <div class="inner">
            <div class="header flex-row-js">
                <div class="title">New sale: 001</div>
                <div class="flex">
                    <button class="menu-toggle-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5" viewBox="0 0 17.998 1.636">
                            <path d="M18,.636H0V-1H18Z" transform="translate(0 1)" fill="#fff"/>
                        </svg>
                    </button>
                    <button class="menu-toggle-btn" @click.prevent="$store.commit('maximizeSale')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 18.837 20.331">
                            <path d="M8.647,16.988l.228-1.435,3.912.62-4.266-5.3,1.132-.911,4.42,5.492.71-4.484,1.435.228-1.08,6.819ZM2.146,2.563,1.435,7.047,0,6.819,1.08,0,7.571,1.028,7.344,2.463l-3.912-.62L7.7,7.144l-1.132.911Z" transform="translate(18.837 17.794) rotate(171)" fill="#fff"/>
                        </svg>
                    </button>
                    <button class="menu-toggle-btn" @click.prevent="$store.commit('closeSale')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 17.346 17.346">
                        <path d="M8.673,9.724,1.052,17.346,0,16.3,7.622,8.673,0,1.051,1.051,0,8.673,7.622,16.3,0l1.051,1.051L9.724,8.673,17.346,16.3,16.3,17.346Z" fill="#fff"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body">
                <div class="flex-col flex-space-between">
                    <div class="sale-main-body">
                        <div class="sales-top">
                            <form action="">
                                <div class="form-row product-search flex align-items-center">
                                    <svg class="search-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                                        <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"></path>
                                    </svg>
                                    <input type="text" name="searchField" v-model="searchInput" class="form-control" placeholder="Search for product...">
                                    <button class="button button-secondary submit-btn" @click.prevent="doSearch">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                            <path  d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" transform="translate(-4 -4)"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div v-show="preview" class="preview-hold flex-row-js">
                                <div class="flex align-items-center">
                                    <div class="prod-image bg-img"></div>
                                    <div class="flex-col align-items-center sale-captions">
                                        <div class="item-value">Product</div>
                                        <div><span class="currency">{{ getCurrency }}</span><span class="value">90</span></div>
                                    </div>
                                </div>
                                <button class="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 12.429 14.5">
                                        <path  d="M18.552,12.874l-5.179,5.179a1.036,1.036,0,0,1-1.465,0L6.73,12.874a1.036,1.036,0,0,1,1.465-1.465l3.411,3.411V4.892a1.036,1.036,0,0,1,2.071,0V14.82l3.411-3.411a1.036,1.036,0,0,1,1.465,1.465Z" transform="translate(-6.427 -3.856)" fill="#566ff4"/>
                                    </svg>
                                    ADD
                                </button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Items</th>
                                    <th>Qty</th>
                                    <th>Price({{ getCurrency }})</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in thisSale" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.qty }}</td>
                                    <td class="flex flex-end align-items-center">
                                        <span>{{ item.price }}</span>
                                        <button @click.prevent="removeItem(item.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14 14">
                                                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"></path>
                                            </svg>
                                        </button>
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
                                <span class="sale-total">{{ total }}</span>
                            </div>
                        </div>
                        <button class="button button-primary add-sale-btn" @click.prevent="$store.commit('addToSale')">
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
</template>
<script>
import TertiaryBackdrop from './TertiaryBackdrop.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'NewSale',
  components: { TertiaryBackdrop },
  computed: mapGetters(['getCurrency']),
  props: ['sale'],
    data() {
        return {
            preview: true,
            thisSale: [
                {id: 1, name: 'Milk', qty: 3, price: '20'},
                {id: 2, name: 'Oil', qty: 1, price: '30'},
                {id: 3, name: 'Vegetable', qty: 4, price: '50'}
            ],
            searchInput: '',
            total: '400'
        }
    },
    methods: {
        removeItem(id) {
            this.thisSale = this.thisSale.filter(filter => filter.id != id)
        },
        doSearch() {
            //const thisProduct = this.getProducts.filter(product ==)
        }
    }
}
</script>
<style scoped lang="scss">
.sale-holder{
    position: fixed;
    background-color: $white-color;
    box-shadow: 3px 10px 20px 7px rgb(7 10 46 / 11%);
    z-index: 999;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    //transition: 0.3s all;

    .header{
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;
        background-color: $dark;
        color: #ffffff;
        //height: 40px;
        padding: 10px 20px;
        button{
            height: 30px;
            width: 30px;
            margin-left: 2px;
            &:hover{
                background-color: #ffffff1f;
            }
        }
        .title{
            font-weight: 500;
        }
    }
    .body{
        padding: 20px;
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
        }
        label{
            margin: 0 10px 0 0;
            font-size: inherit;
            font-weight: 500;
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
        }
    }
}
.sale-normal{
    bottom: 0;
    right: 0;
    width: 600px;
    .body{
        height: 590px;
    }
}
.sale-maximize{
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 18px;
    top: 10%;
    .body{
        height: 550px;
    }
}
.product-search{
    input{
        border-radius: 0.9rem;
        background-color: $white-color;
        padding: 10px 20px 10px 50px;
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
            fill: $primary-color;
        }
        &:hover{
            background-color: $primary-light;
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
                width: 50%;
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
       .prod-image{
            height: 55px;
            width: 55px;
            background-color: $dark;
            border-radius: 10px;
        }
       button{
           color: $primary-color;
           background-color: transparent;
           font-weight: 700;
           height: 50px;
           svg{
               margin-right: 4px;
           }
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

</style>
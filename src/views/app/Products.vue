<template>
<h1 id="page_title">All Products</h1>
 <div id="all_products">
     <!--
    <div class="prod-header">
        <div class="form-row" id="prod_search" :class="{ 'w-100' : getMobile}">
            <svg id="scr_icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596">
                 </path>
            </svg>
            <input type="text" name="searchField" class="form-control" placeholder="Search product..." >
            <svg id="filter_icon" xmlns="http://www.w3.org/2000/svg" width="21.258" height="20.968" viewBox="0 0 21.258 20.968">
                <path d="M-10883.518-158.818h-.562a3.5,3.5,0,0,1-3.5-3.452h-4.376v-2h4.409a3.5,3.5,0,0,1,3.466-3.021h.563a3.5,3.5,0,0,1,3.466,3.021h9.354v2h-9.321A3.5,3.5,0,0,1-10883.518-158.818Zm-.562-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.563a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Zm6.968-6.022h-.561a3.506,3.506,0,0,1-3.5-3.452h-10.781v-2h10.813a3.506,3.506,0,0,1,3.469-3.021h.561a3.506,3.506,0,0,1,3.469,3.021h2.946v2h-2.914A3.506,3.506,0,0,1-10877.112-171.313Zm-.561-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.561a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Z" transform="translate(10891.955 179.786)" fill="#566ff4"/>
            </svg>
        </div>
         <button v-if="!getMobile" class="button button-alt add-new-btn">Add New</button>
    </div>
    -->
    
    <div class="prod-main">
        <div class="table">
            <div class="table-head">
                <div class="flex-row-js tbh-row">
                    <div class="prod-stat-hold">
                        <div class="prod-stat-item">
                            <a href="#">
                                <div class="stat-count">1,435</div>
                                <span class="label">Expired products</span>
                            </a>
                        </div>
                    </div>
                    <div class="prod-stat-hold">
                        <div class="prod-stat-item">
                            <a href="#">
                                <div class="stat-count">217</div>
                                <span class="label">Low stock</span>
                            </a>
                        </div>
                    </div>
                    <div class="prod-stat-hold">
                        <div class="add-new">
                            <a href="#" @click.prevent="$store.commit('getMainHomeWidth')">
                                <i class="flex-column">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582">
                                    <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff"/>
                                </svg>
                                </i>
                                <span>Add category</span>
                            </a>
                        </div>
                    </div>
                    <div class="prod-stat-hold">
                        <div class="add-new">
                            <a href="#" @click.prevent="$store.commit('getMainHomeWidth')">
                                <i class="flex-column">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582">
                                    <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff"/>
                                </svg>
                                </i>
                                <span>Add product</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-body">
                <!-- table row -->
                <div class="table-menu flex-row-js">
                    <div class="category-pill pill">
                        <div class="pill-wrap">
                            <ul class="flex-row-st">
                                <li><a href="#" class="active">All</a></li>
                                <li><a href="#">Expired</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-filters">
                        <ul>
                            <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22.73 22.73">
                                        <path d="M-9229.858-332.653l-4.5-4.5a10.129,10.129,0,0,1-6.584,2.408,10.141,10.141,0,0,1-7.212-2.986,10.138,10.138,0,0,1-2.985-7.211,10.138,10.138,0,0,1,2.985-7.211,10.141,10.141,0,0,1,7.212-2.986,10.136,10.136,0,0,1,7.211,2.986,10.138,10.138,0,0,1,2.985,7.211,10.127,10.127,0,0,1-2.408,6.584l4.5,4.5a.853.853,0,0,1,0,1.2.85.85,0,0,1-.6.248A.843.843,0,0,1-9229.858-332.653Zm-19.572-12.284a8.5,8.5,0,0,0,8.493,8.493,8.469,8.469,0,0,0,5.926-2.415.751.751,0,0,1,.071-.081.886.886,0,0,1,.079-.07,8.464,8.464,0,0,0,2.416-5.927,8.5,8.5,0,0,0-8.492-8.493A8.5,8.5,0,0,0-9249.431-344.937Z" transform="translate(9251.135 355.134)" fill="#0e142c"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 21.259 20.97">
                                        <path id="Union_8_-_Outline" data-name="Union 8 - Outline" d="M-9309.519-336.817h-.561a3.5,3.5,0,0,1-3.5-3.454h-4.376v-2h4.409a3.5,3.5,0,0,1,3.467-3.019h.561a3.5,3.5,0,0,1,3.467,3.019h9.355v2h-9.322A3.5,3.5,0,0,1-9309.519-336.817Zm-.561-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.561a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Zm6.969-6.024h-.563a3.5,3.5,0,0,1-3.5-3.452h-10.783v-2h10.815a3.5,3.5,0,0,1,3.466-3.021h.563a3.506,3.506,0,0,1,3.468,3.021h2.946v2h-2.914A3.5,3.5,0,0,1-9303.11-349.314Zm-.563-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.563a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Z" transform="translate(9317.955 357.787)" fill="#0e142c"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <product-row v-for="product in products" :key="product.id" v-bind:product="product" />
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProductRow from '../../components/app/includes/ProductRow.vue'

export default {
  components: { ProductRow },
    name: 'Products',
    computed: mapGetters(['getMobile', 'getTablet', 'getDesktop']),
    data() {
        return {
            products: [
                {id: 1, name: 'Ideal Milk', price: '24', currency: 'GH₵', quantity: '45', batchNo: '90012-38740-33'},
                {id: 2, name: 'Cocoa Drink', price: '393', currency: 'GH₵', quantity: '13', batchNo: '038334-93722-75'},
                {id: 3, name: 'Ketchup', price: '9', currency: 'GH₵', quantity: '80', batchNo: '98369-38740-34'},
                {id: 4, name: 'Suger', price: '93', currency: 'GH₵', quantity: '200', batchNo: '0863-98253-09'},
                {id: 5, name: 'Vegetable Oil', price: '43', currency: 'GH₵', quantity: '930', batchNo: '09762-862P9-93'},

            ]
        }
    },
    created() {
        this.setPage()
    },
    methods: {
        setPage() {
            this.$store.commit('setPagetitle', 'All Products')
        }
    }
}
</script>


<style scoped lang="scss">
#all_products{
    padding: 0 30px;
}
#page_title{
    display: none;
}
.prod-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 4px 0;
    align-items: center;
    overflow: hidden;
    height: 56px;
}
.add-new-btn{
    height: 100%;
    font-weight: 400;
    margin-left: 15px;
}
.form-row{
    height: 100%;
}
.form-control{
  border: 1px solid #ffffff;
}
#prod_search{
  margin-bottom: 0;
  input{
    border-radius: 0.9rem;
    background-color: $primary-light;
    padding: 10px 20px 10px 50px;
    height: 100%;
    & :focus{
      border: 1px solid $primary-color !important;
    }
  }
  input::placeholder{
      color: $gray-color;
  }
  svg{
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }
  #scr_icon{
    left: 18px;
  }
  #filter_icon{
      right: 18px;
  }
}
.table-head{
    border-bottom: 1px solid $dark-light;
}
.tbh-row{
    margin-bottom: 25px;
}
.mob-view .tbh-row{
    
    margin-bottom: 15px;
    flex-wrap: wrap;
    .prod-stat-hold{
        width: 50%;
        margin: 0;
        padding:5px;
        a{
            
            flex-wrap: nowrap;
            flex-direction: row;
            span{
                width: 100%;
                text-align: left;
                font-size: 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 0;
            }
            .label{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            i{
                height: 35px;
                width: 35px;
                padding: 10px 0
            }
        }
    }
    .prod-stat-item, .prod-stat-item-2, .add-new{
        height: 60px;
        border-radius: 18px;
        justify-content: flex-start;
        a{
            display: flex;
            justify-content: flex-start;
            .label{
                padding-left: 8px;
                text-align: left;
            }
        }
    }
}
.prod-stat-hold{
    width: 25%;
    padding: 0 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
}

.prod-stat-item-2{
    &:hover{
        background-color: #d7dcf7;
    }
    &:active{
        box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
        border: 1px solid $primary-color;
        background-color: $primary-light;
    }
}
.prod-stat-item, .prod-stat-item-2{
    background-color: #E5E9F7;
    border: $gray-light;
}
.add-new{
    background-color: $primary-color;
    span{
        color: $white-color;
        margin-top: 0 !important;
    }
    &:hover{
        background-color: $primary-hover;
    }
    &:active{
        box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
    }
}
.prod-stat-item, .prod-stat-item-2, .add-new{
    height: 110px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;
    //border: 1px solid $gray-light;
    .label{
        color: $gray-color;
        text-align: center;
    }
    .stat-count{
        font-size: 1.4rem;
        font-weight: 700;
    }
    &:last-child{
        margin-right: 0;
    }
    i{
        padding: 8px;
        padding: 10px;
        height: 40px;
        width: 40px;
    }
    span{
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 5px;
        text-align: center;
        
    }
    a{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: $primary-color;
        text-decoration: none;
        height: 100%;
        width: 100%;
        border-radius: inherit;
        padding: 20px;
    }
}
.table-menu{
    margin-top: 25px;
    height: 44px;
     ul{
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        height: 100%;
        align-items: center;
        li{
            display: flex;
            margin-right: 10px;
            align-items: center;
            height: 40px;
            
            &:hover a{
                background-color: $dark-light;
            }
            &:last-child{
                margin-right: 0 
            }
            a{
                transition: 0.3s all;
            }
            .active{
                background-color: $dark !important;
                color: #ffffff !important;
                border: none !important;
            }
        }
        
}
.category-pill{
    position: relative;
    align-items: center;
    display: flex;
    overflow: hidden;
    .pill-wrap{
        height: 100%;
        display: flex;
        overflow-x: auto;
        &::-webkit-scrollbar {
            display: none;
            -ms-overflow-style: none; 
            scrollbar-width: none; 
        }
        li a{
            padding: 10px 14px;
            border: 1px solid $gray-light;
            color: $dark;
            border-radius: 20px;
            text-decoration: none;
        }
    }
    }
    
}
.table-filters{
    li{
        width: 41px;
        justify-content: center;
        a{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 14px;
        }
    }
}

</style>
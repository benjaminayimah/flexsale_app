<template>
<h1 id="page_title">{{ title }}</h1>
 <div id="all_products" class="main-page-body">   
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
                            <a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'tag'})">
                                <i class="flex-column">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582">
                                    <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff"/>
                                </svg>
                                </i>
                                <span>Create Tags</span>
                            </a>
                        </div>
                    </div>
                    <div class="prod-stat-hold">
                        <div class="add-new">
                            <a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'product'})">
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
                    <div class="category-pill">
                        <div class="pill-wrap">
                            <ul class="flex-row-st">
                                <li><router-link replace :to="{ name: 'AllProducts'}">All</router-link></li>
                                <li v-for="tag in getTags" :key="tag.id"><router-link replace class="text-overflow-ellipsis" :to="'/products/filter/'+tag.id+'/'+tag.name">{{ tag.name }}</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-filters">
                        <ul>
                            <!-- <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22.73 22.73">
                                        <path d="M-9229.858-332.653l-4.5-4.5a10.129,10.129,0,0,1-6.584,2.408,10.141,10.141,0,0,1-7.212-2.986,10.138,10.138,0,0,1-2.985-7.211,10.138,10.138,0,0,1,2.985-7.211,10.141,10.141,0,0,1,7.212-2.986,10.136,10.136,0,0,1,7.211,2.986,10.138,10.138,0,0,1,2.985,7.211,10.127,10.127,0,0,1-2.408,6.584l4.5,4.5a.853.853,0,0,1,0,1.2.85.85,0,0,1-.6.248A.843.843,0,0,1-9229.858-332.653Zm-19.572-12.284a8.5,8.5,0,0,0,8.493,8.493,8.469,8.469,0,0,0,5.926-2.415.751.751,0,0,1,.071-.081.886.886,0,0,1,.079-.07,8.464,8.464,0,0,0,2.416-5.927,8.5,8.5,0,0,0-8.492-8.493A8.5,8.5,0,0,0-9249.431-344.937Z" transform="translate(9251.135 355.134)" fill="#0e142c"/>
                                    </svg>
                                </a>
                            </li> -->
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
                <router-view></router-view>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Products',
    computed: mapGetters(['getMobile', 'getProducts', 'getTags']),
    data() {
        return {
            title: 'All Products'
        }
    },
    created() {
        this.setPage()
        window.scrollTo(0,0)
        //this.loadProducts()
        //this.$store.dispatch('fetchTags', this.getToken)
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
            
        },
        // loadProducts() {
        //     this.$store.dispatch('fetchProducts', this.getToken)
        // }
    },
}
</script>


<style scoped lang="scss">

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
.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}
</style>
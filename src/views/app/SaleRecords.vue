<template>
<h1 id="page_title">{{ title }}</h1>
 <div id="all_products" class="main-page-body">   
    <div class="prod-main">
        <div class="table">
            <div class="table-body">
                <!-- table row -->
                <div class="table-menu flex-row-js">
                    <div class="category-pill">
                        <div class="pill-wrap">
                            <ul class="flex-row-st">
                                <li><router-link replace :to="'/sales-records/filter/todays-sales'">Today's Sales</router-link></li>
                                <li><router-link replace :to="'/sales-records/filter/yesterdays-sales'">Yesterday’s</router-link></li>
                                <li><router-link replace :to="'/sales-records/filter/one-week-ago'">Last 7 days</router-link></li>
                                <li id="record_filter_toggle">
                                    <a class="align-items-center flex h-100" href="#" @click.prevent="doMenu('record_filter_toggle')">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 20.509 4.059">
                                            <path d="M-7097.549-7163.327a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7097.549-7163.327Zm-8.236,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7105.786-7163.327Zm-8.214,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7114-7163.327Z" transform="translate(7114 7165.355)"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-filters">
                        <ul>
                            <li>
                                <a href="#" @click.prevent="">
                                Date range
                                <svg xmlns="http://www.w3.org/2000/svg" height="9" viewBox="0 0 10 9">
                                    <path d="M4.126,1.573a1,1,0,0,1,1.748,0l3.3,5.941A1,1,0,0,1,8.3,9H1.7A1,1,0,0,1,.825,7.514Z" transform="translate(10 9) rotate(180)" fill="#0e142c"/>
                                </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <sale-report-view v-bind:saleRecords="getSaleRecords" />
            </div>
        </div>
    </div>
 </div>
 <teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleMenu" @mousedown="doMenu('record_filter_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="menu" v-if="toggleMenu" :class="[{ 'show-menu' : toggleMenu && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-150+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
            <div class="title" v-show="getMobile">
                <div>Select filter</div>
                <button @click.prevent="doMenu('record_filter_toggle')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </button>
            </div>
            <ul>
                <li><router-link class="flex-row-js" to="last-months"><span>Last 30 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
                <li><router-link class="flex-row-js" to="last-two-months"><span>Last 60 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
                <li><router-link class="flex-row-js" to="last-three-months"><span>Last 90 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
            </ul>
        </div>
    </transition>
</teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from '../../components/app/includes/Backdrop.vue'
import SaleReportView from '../../components/app/layouts/SaleReportView.vue'

export default {
  components: { SaleReportView, Backdrop },
    name: 'SaleRecords',
    computed: mapGetters(['getMobile', 'getFloatingDiv', 'getSaleRecords']),
    data() {
        return {
            title: 'Sales Records',
            toggleMenu: false,
            classAbove: false,
            filters: {
                title: '',
                type: '',
                interval: Number,
                start: '',
                end: ''
            }
        }
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
        },
        doMenu(id) {            
            let elem = document.getElementById(id)
            if(this.toggleMenu === false) {
                this.toggleMenu = true
                this.$store.commit('setDynamicFloatingDiv', elem)
            }else{
                this.toggleMenu = false
                this.$store.commit('reSetDynamicFloatingDiv', elem)
            }
        },
        doFetech() {
            let filterName = this.$route.params.name
            if(filterName == 'yesterdays-sales') {
                this.filters.title = 'yesterdays sales'
                this.filters.type = 2
                this.filters.interval = 1
            }else if(filterName == 'one-week-ago'){
                this.filters.title = 'last 7 days'
                this.filters.type = 2
                this.filters.interval = 7
            }else if(filterName == 'last-months') {
                this.filters.title = 'last 30 days'
                this.filters.type = 2
                this.filters.interval = 30
            }else if(filterName == 'last-two-months') {
                this.filters.title = 'last 60 days'
                this.filters.type = 2
                this.filters.interval = 60
            }
            else if(filterName == 'last-three-months') {
                this.filters.title = 'last 90 days'
                this.filters.type = 2
                this.filters.interval = 90
            }
            else{
                this.filters.title = 'todays sales'
                this.filters.type = 0
            }
            this.$store.dispatch('fetchSaleRecords', this.filters)
        }
    },
    created() {
        this.setPage()
        window.scrollTo(0,0)
        this.doFetech()
    },
    beforeUpdate() {
        this.doFetech()
    }
}
</script>


<style scoped lang="scss">

.table-body .table-menu{
    margin: 0;
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
.h-100{
    width: 42px;
    border-radius: 50% !important;
    padding: 11px !important;
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
            i{
                height: 35px;
                width: 35px;
                padding: 10px 0
            }
        }
    }
}

.table-filters{
    li{
        justify-content: center;
        a{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 14px;
            border: 1px solid $gray-light;
            color: $dark;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 600;
            svg{
                margin-left: 4px;
            }
        }
    }
}
.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}






li{
    list-style-type: none;
}
.menu{
    position: absolute;
    background-color: #ffffff;
    z-index: 200;
    right: 0;
    padding: 20px 0;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    border-radius: 16px;
    width: 200px;
    ul{
        padding: 0;
        list-style-type: none;
        display: flex;
        margin: 0;
        flex-direction: column;
        li{
            display: flex;
            height: 50px;
            width: 100%;
            a{
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                color: $dark;
                text-decoration: none;
                transition: 0.3s all;
                padding: 0 20px;
                font-weight: 500;
            }
            &:hover a{
                background-color: $dark-light;
            }
            svg{
                display: none;
            }
        }
        .router-link-exact-active{
            background-color: transparent !important;
            color: $primary-color !important;
            border: none !important;
            svg{
                display: inline-block !important;
            }
        }
    }
    
}
.menu-card-mob{
    padding: 25px 0;
    position: fixed;
    bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 1.4rem;
        button{
            border-radius: 50%;
            padding: 10px;
            background-color: #f0f3ff;
        }
    }
   
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    .acct-label .user-details{
      max-width: 100%;
    }
  }
  .slide-enter-from,
.slide-leave-to {
  transform: translateY(250px);
  
}
</style>
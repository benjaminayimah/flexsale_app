<template>
<h1 id="page_title">{{ title }}</h1>
<div v-if="getStores.length > 0">
 <div class="main-page-body">   
    <div class="prod-main-custom-table">
        <div class="table">
            <div class="table-body">
                <!-- table row -->
                <div id="table_menu" class="table-menu flex-row-js mt-0" :class="{ 'search-in' : searchToggle }">
                    <div class="category-pill">
                        <div class="pill-wrap">
                            <ul class="flex-row-st">
                                <li>
                                    <a class="align-items-center justify-content-center flex h-100 no-border" title="Search by receipt number" href="#" @click.prevent="toggleSearch">
                                        <svg v-if="!searchToggle" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 26.671 26.671">
                                            <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"></path>
                                        </svg>
                                        <svg v-else class="minimized" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                            <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li class="hideable"><router-link to="todays-sales" @click.prevent="makeFilter('todays-sales', 'todays sales', 0, 0)">Today's Sales</router-link></li>
                                <li class="hideable"><router-link to="yesterdays-sales" @click.prevent="makeFilter('yesterdays-sales', 'yesterdays sales', 2, 1)">Yesterday’s</router-link></li>
                                <li class="hideable"><router-link to="one-week-ago" @click.prevent="makeFilter('one-week-ago', 'last 7 days', 2, 7)">Last 7 days</router-link></li>
                                <li class="hideable" id="record_filter_toggle">
                                    <a class="align-items-center flex h-100" :class="{ 'dropdown-out' : toggleFilter }" href="#" @click.prevent="doMenu('record_filter_toggle')">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 20.509 4.059">
                                            <path d="M-7097.549-7163.327a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7097.549-7163.327Zm-8.236,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7105.786-7163.327Zm-8.214,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7114-7163.327Z" transform="translate(7114 7165.355)"/>
                                        </svg>
                                    </a>
                                </li>
                                <i class="horizontal-separator hideable"></i>
                                <li class="hideable" id="custom_date_toggle">
                                    <a href="#" :class="{ 'dropdown-out' : toggleCustomDate }" @click.prevent="doDateToggle('custom_date_toggle')">
                                    Custom range
                                    <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 18.312 11.241">
                                        <path d="M766.473,22.642a.989.989,0,0,1-.643-.232.784.784,0,0,1-.034-1.19l8.374-7.937-8.357-7.518a.784.784,0,0,1,0-1.19,1.009,1.009,0,0,1,1.321,0l9.646,8.678-9.63,9.127A.984.984,0,0,1,766.473,22.642Z" transform="translate(22.642 -765.539) rotate(90)" fill="#0e142c"/>
                                    </svg>
                                    </a>
                                </li>
                                <div v-if="searchToggle">
                                    <div class="receipt-input-wrap">
                                        <form @submit.prevent="" class="flex">
                                            <div class="reciept-input-wrap">
                                                <input autofocus type="text" required @focus="receiptInputFocused" v-model="receiptSearch.input" class="form-control" ref="receipt" name="search" placeholder="Receipt number..." id="receiptInput">
                                                <span v-if="!receiptSearch.input == ''" class="clear-input-btn" @click="clearReceiptInput">
                                                    <svg  xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 20 20">
                                                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <button class="button button-primary" @click.prevent="submitReceiptQuery">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 26.671 26.671">
                                                    <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#ffffff"></path>
                                                </svg>
                                            </button>
                                        </form>
                                        <span v-if="error" class="danger flex">Enter Receipt number</span>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <sale-report-view v-bind:saleRecords="getSaleRecords" v-bind:receiptSearch="receiptSearch" />
            </div>
        </div>
    </div>
 </div>
</div>
<div v-else>
    <welcome-screen-top />
</div>
 <teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleFilter" @mousedown="closeJustMenu('record_filter_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="menu-dropdown dropdown" v-if="toggleFilter" :class="[{ 'show-menu' : toggleFilter && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-150+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
            <div class="title" v-show="getMobile">
                <div>Select filter</div>
                <button @click.prevent="closeJustMenu('record_filter_toggle')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </button>
            </div>
            <ul>
                <li><router-link to="last-months" class="flex-row-js" @click.prevent="makeFilter('last-months', 'last 30 days', 2, 30)"><span>Last 30 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
                <li><router-link to="last-two-months" class="flex-row-js" @click.prevent="makeFilter('last-two-months', 'last 60 days', 2, 60)"><span>Last 60 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
                <li><router-link to="last-three-months" class="flex-row-js" @click.prevent="makeFilter('last-three-months', 'last 90 days', 2, 90)"><span>Last 90 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></router-link></li>
            </ul>
        </div>
    </transition>
</teleport>
<teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleCustomDate" @mousedown="closeJustMenu('custom_date_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="date-dropdown dropdown" v-if="toggleCustomDate" :class="[{ 'show-menu' : toggleCustomDate && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-145+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
            <div class="title" v-show="getMobile">
                <div>Select date range</div>
                <button @click.prevent="closeJustMenu('custom_date_toggle')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </button>
            </div>
            <form id="custom_range_form" @submit.prevent="">
                <div class="form-row">
                    <label>Start date:</label>
                    <input type="date" v-model="form.startDate" class="form-control">
                </div>
                <div class="form-row">
                    <label>End date:</label>
                    <input type="date" v-model="form.endDate" class="form-control">
                </div>
                <button class="button button-primary send-query" @click.prevent="makeCustomDate('custom_date_toggle')">Send</button>
            </form>
        </div>
    </transition>
</teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import dropdownToggleMixin from '../../mixins/dropdownToggle'
import Backdrop from '../../components/app/includes/Backdrop.vue'
import SaleReportView from '../../components/app/layouts/SaleReportView.vue'
import WelcomeScreenTop from '../../components/app/includes/WelcomeScreenTop.vue'
export default {
  components: { SaleReportView, Backdrop, WelcomeScreenTop },
    name: 'SaleRecords',
    mixins: [dropdownToggleMixin],
    computed: {
        ...mapGetters(['getMobile', 'getFloatingDiv', 'getSaleRecords', 'getHostname', 'getToken', 'getStores', 'getCurrentStore'])
    } ,
    data() {
        return {
            title: 'Sale Records',
            toggleCustomDate: false,
            classAbove: false,
            filters: {
                title: '',
                type: '',
                interval: Number,
                start: '',
                end: ''
            },
            form: {
                startDate: new Date().toISOString().slice(0,10),
                endDate: new Date().toISOString().slice(0,10),
            },
            searchToggle: false,
            error: false,
            receiptSearch: {
                active: false,
                submited: false,
                input: '',
                result: []
            }
        }
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
        },
        makeCustomDate(id) {
            this.dispatchFetch('custom date range', 3, '', this.form.startDate, this.form.endDate)
            this.closeJustMenu(id)
        },
        makeFilter(routeName, title, type, interval) {
            this.dispatchFetch(title, type, interval)
            this.$router.push({ name: 'SaleRecords', params: { name: routeName }})
            this.closeJustMenu('record_filter_toggle')
        },
        dispatchFetch(title, type, interval, start, end) {
            this.filters.title = title
            this.filters.type = type
            this.filters.interval = interval
            this.filters.start = start
            this.filters.end = end
            this.$store.dispatch('fetchSaleRecords', this.filters)
        },
        makeReloadFetch() {
            let filterName = this.$route.params.name
            if(filterName == 'yesterdays-sales') {
                this.dispatchFetch('yesterdays sales', 2, 1)
            }else if(filterName == 'one-week-ago'){
                this.dispatchFetch('last 7 days', 2, 7)
            }else if(filterName == 'last-months') {
                this.dispatchFetch('last 30 days', 2, 30)
            }else if(filterName == 'last-two-months') {
                this.dispatchFetch('last 60 days', 2, 60)
            }else if(filterName == 'last-three-months') {
                this.dispatchFetch('last 90 days', 2, 90)
            }else if(filterName == 'custom-date-range' && this.filters.type === '') {
                this.dispatchFetch('todays sales', 0, 0)
                this.$router.push({ name: 'SaleRecords', params: { name: 'todays-sales' }})
            }else{
                this.dispatchFetch('todays sales', 0, 0)
            }
        },
        toggleSearch() {
            this.error ? this.clrError(): ''
            if(this.searchToggle) {
                this.receiptSearch.active = false
                this.searchToggle = false
            }else{
                this.searchToggle = true
                this.receiptSearch.active = true
                this.receiptSearch.submited = false
                this.$nextTick(function () {
                    if(this.receiptSearch.input == '') {
                    this.$refs.receipt.focus()
                    }
                })
            }
        },
        async submitReceiptQuery() {
            if (!this.receiptSearch.input == '') {
                this.clrError()
                axios.post(this.getHostname+'/api/receipt-detailed-record?token='+this.getToken, {receipt: this.receiptSearch.input})
                .then((res) => {
                    this.receiptSearch.submited = true
                    this.receiptSearch.result = res.data.result
                    this.receiptSearch.active = true
                })
                .catch((e) => {
                    console.log(e.response)
                })
            }else
            this.error = true
            
        },
        clearReceiptInput() {
            this.receiptSearch.input = ''
            this.receiptSearch.result = []
            this.receiptSearch.submited = false
            this.$nextTick(function () {
                this.$refs.receipt.focus()    
            })
        },
        receiptInputFocused() {
            this.receiptSearch.submited = false
        },
        clrError() {
            this.error = false
        }
    },
    created() {
        this.setPage()
        window.scrollTo(0,0)
        this.makeReloadFetch()
    }
}
</script>


<style scoped lang="scss">
.h-100{
    width: 42px;
    border-radius: 50% !important;
    padding: 11px !important;
}

.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
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

// .category-pill, #custom_date_toggle{
//     transition: 0.4s ease-out all;
// }
.search-in{
    .hideable{
        display: none !important;
    }
}
.receipt-input-wrap{
    .reciept-input-wrap{
        position: relative;
        margin-right: 8px;
    }
 
    top: 13px;

    #receiptInput{
        height: 44px;
        width: 250px;
    }
    button{
        border-radius: 12px;
    }
    .danger{
        color: $danger;
        font-size: 0.9rem;
        padding: 5px 0;
    }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(380px);
}
</style>
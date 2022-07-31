<template>
<div class="wrapper">
    <div class="flex-row-js">
        <h2>Product statistics</h2>
        <div class="table-filters">
            <ul>
                <li id="stats_filter_toggle" @click.prevent="doMenu('stats_filter_toggle')">
                    <a id="custom_date_toggle" href="#" :class="{ 'dropdown-out' : toggleFilter }" @click.prevent="doMenu('stats_filter_toggle')">
                    {{ filtered.name }}
                    <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 18.312 11.241">
                        <path d="M766.473,22.642a.989.989,0,0,1-.643-.232.784.784,0,0,1-.034-1.19l8.374-7.937-8.357-7.518a.784.784,0,0,1,0-1.19,1.009,1.009,0,0,1,1.321,0l9.646,8.678-9.63,9.127A.984.984,0,0,1,766.473,22.642Z" transform="translate(22.642 -765.539) rotate(90)" fill="#0e142c"/>
                    </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- <bar-chart /> -->
    <line-chart v-bind:results="stats" />
</div>
<teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleFilter" @mousedown="closeJustMenu('stats_filter_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="menu-dropdown dropdown" v-if="toggleFilter" :class="[{ 'show-menu' : toggleFilter && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-70+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
            <div class="title" v-show="getMobile">
                <div>Filter by</div>
                <button @click.prevent="closeJustMenu('stats_filter_toggle')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </button>
            </div>
            <ul>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : filtered.id == 7 }" @click.prevent="makeFilter(1, 7, 'Last 7 days')"><span>Last 7 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : filtered.id == 30 }" @click.prevent="makeFilter(1, 30, 'Last 30 days')"><span>Last 30 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : filtered.id == 60 }" @click.prevent="makeFilter(1, 60, 'Last 60 days')"><span>Last 60 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js" :class="{ 'is-sorted' : filtered.id == 90 }" @click.prevent="makeFilter(1, 90, 'Last 90 days')"><span>Last 90 days</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
                <li><a href="#" class="flex-row-js text-overflow-ellipsis" :class="{ 'is-sorted' : filtered.id == 2 }"  @click.prevent="doDateToggle('custom_date_toggle')"><span>Custom range...</span><svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg></a></li>
            </ul>
        </div>
    </transition>
</teleport>
<teleport to="body">
    <transition name="fade">
        <backdrop v-if="toggleCustomDate" @mousedown="closeJustMenu('custom_date_toggle')" />
    </transition>
    <transition :name="getMobile? 'slide' : ''">
        <div class="date-dropdown dropdown" v-if="toggleCustomDate" :class="[{ 'show-menu' : toggleCustomDate && !getMobile}, { 'menu-card-mob': getMobile}]" :style="{ left: !getMobile? getFloatingDiv.left-170+'px' : '', top: !getMobile? getFloatingDiv.top+45 + 'px' : ''}">
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
// import BarChart from '../includes/BarChart.vue'
import LineChart from '../includes/LineChart.vue'
import dropdownToggleMixin from '../../../mixins/dropdownToggle'
import Backdrop from '../includes/Backdrop.vue'
import { mapGetters } from 'vuex'
export default {
  components: { /*BarChart,*/ Backdrop, LineChart },
    name: 'ProductInfoStats',
    mixins: [dropdownToggleMixin],
    computed: mapGetters(['getMobile', 'getFloatingDiv', 'getToken', 'getHostname', 'getCurrentStore']),
    data() {
        return {
            toggleCustomDate: false,
            filtered: { id: 7, name: 'Last 7 days'},
            stats: [],
            filters: {
                type: 1,
                id: this.$route.params.id,
                interval: Number(7),
                start: '',
                end: ''
            },
            form: {
                startDate: new Date().toISOString().slice(0,10),
                endDate: new Date().toISOString().slice(0,10),
            }
        }
    },
    created() {
        this.getThisStats(this.filters)
    },
    methods: {
        makeCustomDate(id) {
            this.dispatchFetch(2, '', this.form.startDate, this.form.endDate)
            this.closeJustMenu(id)
        },
        makeFilter(type, interval, name) {
            this.dispatchFetch(type, interval, '', '')
            this.closeJustMenu('stats_filter_toggle')
            this.filtered.id = interval
            this.filtered.name = name
        },
        dispatchFetch(type, interval, start, end) {
            this.filters.type = type
            this.filters.interval = interval
            this.filters.start = start
            this.filters.end = end
            this.getThisStats(this.filters)
        },
        getThisStats(payload) { 
            axios.post(this.getHostname+'/api/product-stats?token='+this.getToken, payload)
            .then((res) => {
                this.stats = res.data.stats
                if(res.data.type == 2) {
                    this.filtered.id = 2
                    this.filtered.name = 'Custom range'
                }
            }).catch((e) => {
                console.log(e.data)
            })   
        }
    }
}
</script>
<style scoped lang="scss">
.is-sorted {
    color: $primary-color !important;
    svg {
        display: block !important;
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
.wrapper{
    margin-bottom: 120px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(250px);
}
</style>
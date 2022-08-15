<template>
    <div>
        <div class="flex-row-js" style="height: 40px">
             <div class="flex align-items-center">
                <h4 v-if="!receiptSearch.active">{{ saleRecords.title }}</h4>
                <div v-else>
                    <h4>{{ receiptSearch.submited ? 'Showing for receipt no.' : '' }}</h4>
                </div>
                <span class="separator-dot"></span>
                <div class="results-dates" v-if="!receiptSearch.active">
                    <span v-if="saleRecords.startDate">{{ dateTime(saleRecords.startDate) }} - </span>
                    <span>{{ dateTime(saleRecords.endDate) }}</span>
                </div>
                <div class="results-dates" v-else>
                    <span>{{ receiptSearch.submited ? receiptSearch.input : '' }}</span>
                </div>
            </div>
            <div v-if="!receiptSearch.active" class="flex align-items-center results-right-nav">
                <li>
                    <a :class="{ 'active-stats-btn' : !showStats }" href="#" @click.prevent="toggleStatsView">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 16.57 13.463">
                            <path d="M1.553,3.375A1.553,1.553,0,1,0,3.107,4.928,1.553,1.553,0,0,0,1.553,3.375Zm0,5.178a1.553,1.553,0,1,0,1.553,1.553A1.553,1.553,0,0,0,1.553,8.553Zm0,5.178a1.553,1.553,0,1,0,1.553,1.553,1.553,1.553,0,0,0-1.553-1.553Zm14.5.518H5.7a.518.518,0,0,0-.518.518V15.8a.518.518,0,0,0,.518.518H16.052a.518.518,0,0,0,.518-.518V14.767A.518.518,0,0,0,16.052,14.249Zm0-10.356H5.7a.518.518,0,0,0-.518.518V5.446a.518.518,0,0,0,.518.518H16.052a.518.518,0,0,0,.518-.518V4.411A.518.518,0,0,0,16.052,3.893Zm0,5.178H5.7a.518.518,0,0,0-.518.518v1.036a.518.518,0,0,0,.518.518H16.052a.518.518,0,0,0,.518-.518V9.589A.518.518,0,0,0,16.052,9.071Z" transform="translate(0 -3.375)" fill="#7e8596"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a :class="{ 'active-stats-btn' : showStats }" href="#" @click.prevent="toggleStatsView">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 30.824 14.013">
                            <path d="M-9368.936-7103.491a2.773,2.773,0,0,1,.4-1.411l-3.568-3.574a4.191,4.191,0,0,0,.989-.991l3.571,3.571a2.718,2.718,0,0,1,2.831,0l3.568-3.571a4.213,4.213,0,0,0,.99.991l-3.569,3.569a2.773,2.773,0,0,1,.4,1.416,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-9368.936-7103.491Zm-16.813,0a2.8,2.8,0,0,1,2.8-2.8,2.782,2.782,0,0,1,1.413.4l3.571-3.571a4.217,4.217,0,0,0,.991.991l-3.568,3.569a2.773,2.773,0,0,1,.4,1.416,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-9385.749-7103.491Zm25.221-8.407a2.8,2.8,0,0,1,2.8-2.8,2.8,2.8,0,0,1,2.8,2.8,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-9360.528-7111.9Zm-16.813,0a2.8,2.8,0,0,1,2.8-2.8,2.8,2.8,0,0,1,2.8,2.8,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-9377.342-7111.9Z" transform="translate(9385.749 7114.701)" fill="#7e8596"/>
                        </svg>
                    </a>
                </li>
            </div>
        </div>
        <div class="table-head b-b-0" v-if="!receiptSearch.active">
            <div class="flex tbh-row">
                <div class="prod-stat-hold">
                    <div class="prod-stat-item">
                        <a href="#" @click.prevent="">
                            <div class="stat-count flex align-items-center"><div class="currency">{{ getCurrency }}</div>{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</div>
                            <span class="label">Sale value</span>
                        </a>
                    </div>
                </div>
                <div class="prod-stat-hold">
                    <div class="prod-stat-item">
                        <a href="#" @click.prevent="">
                            <div class="stat-count">{{ saleRecords.array.length }}</div>
                            <span class="label">Number of sales</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="saleRecords.array.length > 0 && !receiptSearch.active && !showStats">
            <sales-record-list v-for="record in saleRecords.array" :key="record.id" v-bind:record="record" />
            <div v-if="saleRecords.array.length < 0">
                <h2>No Record Found</h2>
            </div>
        </div>
        <div v-else-if="receiptSearch.active">
            <div v-if="receiptSearch.result.length > 0 && !receiptSearch.input == ''">
                <sales-record-list v-for="record in receiptSearch.result" :key="record.id" v-bind:record="record" />
            </div>
            <div v-else-if="!receiptSearch.submited">
                <div class="empty-state flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 72.686 72.684">
                        <path d="M875.607-10393.867a3.488,3.488,0,0,1-2.475-1.025l-13.5-13.5a32.44,32.44,0,0,1-20.512,7.23,32.73,32.73,0,0,1-32.695-32.691,32.732,32.732,0,0,1,32.695-32.694,32.73,32.73,0,0,1,32.692,32.694,32.443,32.443,0,0,1-7.23,20.512l13.5,13.5a3.488,3.488,0,0,1,1.025,2.475,3.489,3.489,0,0,1-1.025,2.475A3.489,3.489,0,0,1,875.607-10393.867Zm-36.492-65.684a25.723,25.723,0,0,0-25.695,25.694,25.722,25.722,0,0,0,25.695,25.691,25.521,25.521,0,0,0,18.167-7.524,25.523,25.523,0,0,0,7.525-18.167A25.722,25.722,0,0,0,839.116-10459.551Z" transform="translate(-806.421 10466.551)" fill="#566ff4"/>
                    </svg>
                    <h1>Search by Receipt</h1>
                    <div class="sub-description">Enter the Receipt number and submit.</div>
                </div>
            </div>
            <div v-else>
                <h2>No Record Found</h2>
            </div>
        </div>
        <div v-if="showStats && !receiptSearch.active">
            <line-chart v-bind:results="saleRecords.array"/>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment'
import SalesRecordList from '../includes/SalesRecordList.vue';
import LineChart from '../includes/LineChart.vue';
export default {
  components: { SalesRecordList, LineChart },
    name: 'SaleReportView',
    props: ['saleRecords', 'receiptSearch'],
    computed: {
        ...mapGetters(['getCurrency']),
        computeTotal() {
          return this.saleRecords.array.reduce((acc, item) => acc + Number(item.total_paid), 0);
        }
    },
    data() {
        return {
            showStats: false
        }
    },
    methods: {
        dateTime(value) {
            return moment(value).format('MMM DD, YYYY')
        },
        toggleStatsView() {
            this.showStats = !this.showStats
        }
    }
}
</script>
<style lang="scss" scoped>
h4{
    margin: 0;
    text-transform: capitalize;
    color: $gray-color;
}
.results-dates{
    color: $dark;
}
.tbh-row{
    margin-top: 25px;
}
.currency{
    font-weight: 500;
}
.active-stats-btn{
    background-color: $primary-light;
    svg path {
        fill: $primary-color;
    }
}

.results-right-nav{
    gap: 10px;
    button{
        border: none;
        padding: 10px;
    }
    li{
        list-style-type: none;
        a{
            border-radius: 8px;
            padding: 8px 10px;
            &:hover{
                path {
                    fill: $primary-color;
                }
            }
        }
    }
}

</style>
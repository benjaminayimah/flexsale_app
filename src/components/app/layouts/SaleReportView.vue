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
                <!-- <button class="button button-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 26.671 26.671">
                        <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"></path>
                    </svg>
                </button> -->
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
                <!-- <div class="prod-stat-hold">
                    <div class="add-new">
                        <a href="#" @click.prevent="">
                            <i class="flex-column">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 42.079 19.125">
                                <path d="M-9087.357-7189.284a3.77,3.77,0,0,1,.539-1.927l-4.872-4.877a5.791,5.791,0,0,0,1.354-1.351l4.872,4.872a3.714,3.714,0,0,1,3.862,0l4.874-4.872a5.8,5.8,0,0,0,1.352,1.351l-4.872,4.873a3.81,3.81,0,0,1,.542,1.932,3.825,3.825,0,0,1-3.825,3.825A3.825,3.825,0,0,1-9087.357-7189.284Zm-22.953,0a3.826,3.826,0,0,1,3.825-3.825,3.8,3.8,0,0,1,1.928.542l4.876-4.872a5.8,5.8,0,0,0,1.352,1.351l-4.872,4.873a3.782,3.782,0,0,1,.542,1.932,3.825,3.825,0,0,1-3.825,3.825A3.825,3.825,0,0,1-9110.311-7189.284Zm34.429-11.475a3.825,3.825,0,0,1,3.825-3.825,3.825,3.825,0,0,1,3.825,3.825,3.826,3.826,0,0,1-3.825,3.825A3.825,3.825,0,0,1-9075.882-7200.759Zm-22.953,0a3.825,3.825,0,0,1,3.825-3.825,3.825,3.825,0,0,1,3.825,3.825,3.826,3.826,0,0,1-3.825,3.825A3.825,3.825,0,0,1-9098.835-7200.759Z" transform="translate(9110.311 7204.584)" fill="#fff"/>
                            </svg>
                            </i>
                            <span>Sales Statistics</span>
                        </a>
                    </div>
                </div>
                <div class="prod-stat-hold">
                    <div class="add-new">
                        <a href="#" @click.prevent="">
                            <i class="flex-column">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17.998" viewBox="0 0 18.001 17.998">
                                <path d="M-9310.1-7193.605a.5.5,0,0,1-.5-.5v-12a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v12a.5.5,0,0,1-.5.5Zm-8,0a.5.5,0,0,1-.5-.5v-17a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5v17a.5.5,0,0,1-.5.5Zm-7,0a.5.5,0,0,1-.5-.5v-6a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v6a.5.5,0,0,1-.5.5Z" transform="translate(9325.605 7211.604)" fill="#fff"/>
                            </svg>
                            </i>
                            <span>Product Performance</span>
                        </a>
                    </div>
                </div> -->
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
        <div v-if="showStats">
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
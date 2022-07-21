<template>
    <div class="record-list-main-wrap">
        <div class="controls">
            <button class="button cancel-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="3.5" viewBox="0 0 20.509 4.059">
                    <path d="M-7097.549-7163.327a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7097.549-7163.327Zm-8.236,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7105.786-7163.327Zm-8.214,0a2.029,2.029,0,0,1,2.03-2.028,2.028,2.028,0,0,1,2.028,2.028,2.029,2.029,0,0,1-2.028,2.03A2.029,2.029,0,0,1-7114-7163.327Z" transform="translate(7114 7165.355)"></path>
                </svg>
            </button>
            <button class="button cancel-btn" @click="doToggleList">
                <svg :class="{ 'toggle-in' : toggleList }" xmlns="http://www.w3.org/2000/svg"  height="9" viewBox="0 0 17.181 9.668">
                    <path d="M9245.622,7988.7l-.537-.526-8.233-8.071,1.051-1.071,7.7,7.545,7.361-7.534,1.072,1.048Z" transform="translate(-9236.852 -7979.032)" fill="#0e142c"/>
                </svg>
            </button>
        </div>
        <div class="record-top">
            <div v-for="list in topList" :key="list.id" class="flex align-items-center top-list-row">
                <label class="label">{{ list.label }}:</label><div class="flex"><span class="currency" v-if="list.currency">{{ getCurrency }}</span><span>{{ list.value }}</span></div>
            </div>
        </div>
        <div v-if="toggleList" class="record-bottom">
            <!-- <hr> -->
            <div v-if="saleItemList.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price ({{ getCurrency }})</th>
                            <th>Amount ({{ getCurrency }})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in saleItemList" :key="item.id">
                            <td>{{ item.product_name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.price_before }}</td>
                            <td>{{ item.total_paid }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="bottom-1 flex rec-btm-content">
                    <div v-for="item in saleItemList" :key="item.id" class="item-list">
                        <div>{{ item.item }}</div>
                        <div>{{ item.quantity }}</div>
                        <div>{{ item.price }}</div>
                        <div>{{ item.total }}</div>
                    </div>
                </div> -->
                <hr>
                <div class="flex-row-js s-total item-list">
                    <div>Sub total ({{ getCurrency }}):</div>
                    <div>{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</div>
                </div>
                <div class="bottom-2 flex rec-btm-content">
                    <div v-for="charge in otherCharges" :key="charge.id" class="flex-row-js bottom-2-content item-list charges-list">
                        <div>{{ charge.label }}</div>
                        <div>{{ charge.value }}</div>
                    </div>
                </div>
                <hr>
                <div class="flex-row-js g-total item-list">
                    <div>Total Amount ({{ getCurrency }}):</div>
                    <div>{{ Intl.NumberFormat('en-US').format(computeTotal.toFixed(2)) }}</div>
                </div>
            </div>
            <div v-else class="loading">
                <spinner v-bind:size="25" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from "vuex"
import Spinner from './Spinner.vue'
export default {
  components: { Spinner },
    name: 'SalesRecordList',
    props: ['record'],
    computed: {
        ...mapGetters(['getCurrency', 'getHostname', 'getToken', 'getCurrentStore']),
        computeTotal() {
            return this.saleItemList.reduce((acc, item) => acc + Number(item.total_paid), 0);
        },
    },
    data() {
        return {
            topList: [
                {id: 1, label: 'Receipt#', value: this.record.receipt},
                {id: 2, label: 'Date', value: this.dateTime(this.record.created_at)},
                {id: 3, label: 'Sold by', value: this.record.added_by},
                {id: 4, label: 'Total amount', value: this.record.total_paid, currency: true},
                {id: 5, label: 'Amount received', value: this.record.amount_recieved || 0, currency: true},
                {id: 6, label: 'Change', value: this.record.balance || 0, currency: true},
            ],
            saleItemList: [],
            otherCharges: [
                {id: 1, label: 'Discount', value: '0.00'},
                {id: 2, label: 'VAT(2%)', value: '2.00'},
                {id: 3, label: 'GETFUND(1.5%)', value: '1.90'}
            ],
            toggleList: false
        }
    },
    methods: {
        doToggleList: function () {
            this.toggleList ? this.toggleList = false : this.fetchDetailedRecordList()
        },
        async fetchDetailedRecordList() {
            this.toggleList = true
            const res = await axios.post(this.getHostname+'/api/fetch-detailed-record-list?token='+this.getToken, { id: this.record.id }, { store: this.getCurrentStore.id})
            if(res.data.result) {
                this.saleItemList = res.data.result
            }
        },
        dateTime(value) {
            return moment(value).format('MMM DD, YYYY hh:mm a')
        }
    }
}
</script>
<style lang="scss" scoped>
.record-list-main-wrap{
    border: 1px solid #e9ebf0;
    border-radius: 16px;
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    padding: 20px;
    // &:hover {
    //     background-color: rgb(250, 250, 250);
    // }
}
.controls{
    position: absolute;
    right: 15px;
    top: 15px;
    display: flex;
    gap: 3px;
    button {
        display: flex;
        margin: 0;
        height: 40px;
        width: 40px;
    }
}
.record-top{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.top-list-row{
    gap: 8px;
    label{
        margin: 0;
        color: #434752;
    }
    span{
        color: $gray-color
    }
}
.toggle-in{
    transform: rotateX(180deg);
}
hr{
    margin: 0;
    border-bottom-width: 2px
}
.record-bottom{
    hr:first-child{
        margin-top: 20px;
    }

    .rec-btm-content{
        flex-direction: column;
        div:last-child{
            border-bottom: none;
        }
    }
    .item-list{
        border-bottom: 1px dashed #dde0e6;
        padding: 12px 0;
    }
    .bottom-2{
        align-items: flex-end;
        .bottom-2-content{
            width: 50%;
        }
    }
    .g-total{
        font-weight: 700;
        font-size: 1.3rem;
        border-bottom: none;
    }
    .s-total{
        font-weight: 700;
    }
    .charges-list{
        color: $gray-color;
    }
    .loading{
        text-align: center;
        padding: 20px;
    }
}
table{
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    thead th, tbody td{
        padding: 12px 0;
        &:first-child{
            text-align: left;
        }
        &:nth-child(2){
            text-align: center;
        }
        &:nth-child(3){
            text-align: center;
        }
        &:nth-child(4){
            text-align: center;
        }
        &:last-child{
            text-align: right;
        }
    }
    thead{
        border-bottom: 2px solid #e9ebf0;
    }
    tbody{
        tr{
            td{
                border-bottom: 1px dashed #dde0e6;
            }
            &:last-child{
                td{
                    border-bottom: unset;
                }
            }
        }
        
    }
    
}

</style>
<template>
<div v-if="getAddingProduct.stock">
    <teleport to="#add_title">
        <span>Update stock</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button class="button button-secondary top-submit-btn" @click.prevent="$store.commit('unsetMainHomeWidth')">Close</button>
    </teleport>
    <teleport to="#add_master_body_container">
        <div class="page-info page-info-primary flex mt-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path id="Path_2104" data-name="Path 2104" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15H11V11h2Zm0-8H11V7h2Z" transform="translate(-2 -2)" fill="#212121"/>
            </svg>
            <span>For a product with multiple batch numbers, add them by clicking on the <strong>'add new batch'</strong> button below.</span>
        </div>
        <div class="stk-edit-wrap">
            <div class="flex-col gap-8">
                <h3>{{ getEditContainer.data.name }}</h3>
                <div class="flex gap-8"><span class="label">Total stock:</span><span class="ttl-stk">{{ computedStock }}</span></div>
            </div>
            <div class="flex-row-js row-head">
                <div>Available batches</div>
                <a href="" class="align-items-center" @click.prevent="makeNewRow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#566ff4"/>
                    </svg>
                    Add new batch
                </a>
            </div>
            <new-stock-row v-for="newRow in newRows" :key="newRow.id" v-bind:row="newRow" v-on:removeRow="rmRow" v-bind:id="getEditContainer.data.id" v-bind:expires="getEditContainer.data.expires" />
            <stock-update-row v-for="stock in getEditContainer.array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))" :key="stock.id" v-bind:stock="stock" v-bind:id="getEditContainer.data.id" v-bind:expires="getEditContainer.data.expires" />
        </div>
    </teleport>
</div>
</template>
<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'
import NewStockRow from '../includes/NewStockRow.vue'
import StockUpdateRow from '../includes/StockUpdateRow.vue'
export default {
  components: { StockUpdateRow, NewStockRow },
    name: 'UpdateStock',
    computed: {
        ...mapGetters(['getToken', 'getHostname', 'getEditContainer', 'getAddingProduct']),
        computedStock() {
            return this.getEditContainer.array.reduce((acc, item) => acc + Number(item.unit_stock), 0)
        }
    },
    data() {
        return {
            newRows: []
        }
    },
    methods: {
        makeNewRow: function() {
            const newRow = { id: new Date().getTime()}
            this.newRows.push(newRow)
        },
        rmRow(id) {
            this.newRows = this.newRows.filter(data => data.id !== id)
        }
    }
}
</script>
<style scoped lang="scss">
.stk-edit-wrap{
    padding-bottom: 40px;
    h3 {
        margin: 0;
    }
    .label{
        font-weight: 600;
    }
    .ttl-stk{
        font-weight: 700;
    }
    .row-head{
        margin-top: 15px;
        padding: 10px 0;
        border-bottom: 1px $dark-light solid;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 600;
        div {
            color: $gray-color;
        }
        a{
            padding: 0;
            border: unset;
            color: $primary-color;
            gap: 4px;
            background-color: transparent;
            display: flex;
            text-decoration: none;
            font-size: 15px;
            &:hover {
                text-decoration: underline;
            }
        }

    }
}
.top-submit-btn{
    &:hover {
        background-color: $gray-light;
    }
    &:focus {
        background-color: $dark-light;
    }
}
</style>
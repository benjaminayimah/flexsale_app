<template>
<h1 id="page_title">{{ title }}</h1>
<div v-if="getStores.length > 0">
    <div class="ovw-wrap">
        <div class="overview-row">
            <div class="flex-row-st">
                <span id="left_scroll_indicator"></span>
                <span id="right_scroll_indicator"></span>
                <button v-show="leftShow" class="scroll-button scrl-left" @click="scrollLeft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.033" height="17.033" viewBox="0 0 17.033 17.033">
                        <path  d="M15561.452,6480.315h-12.044v-12.044h1.5v10.544h10.544Z" transform="translate(-6412.817 -15568.85) rotate(45)" fill="#0e142c"/>
                    </svg>
                </button>
                <button v-show="rightShow" class="scroll-button scrl-right" @click="scrollRight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.033" height="17.033" viewBox="0 0 17.033 17.033">
                        <path  d="M12.044,0H0V12.045H1.5V1.5H12.044Z" transform="translate(17.033 8.517) rotate(135)" fill="#0e142c"/>
                    </svg>
                </button>
                <div class="ovw-hold" @scroll="ovwScroll">
                    <div class="ovw-content" id="ovw_content">
                        <ul>
                            <li :id="'ovw'+stat.index" v-for="stat in stats" :key="stat.id" :style="{ transform: 'translateX('+parseInt(stat.index * 170+(transitionVal))+'px )'}">
                                <div class="a-wrap">
                                    <router-link :to="stat.url" class="li-hold">
                                        <div class="overview-content">
                                            <div class="icon-wrap flex" :class="[{ 'danger-icon' : stat.alert.active && stat.alert.type == 'danger' && stat.count !== 0 }, {'warning-icon' : stat.alert.active && stat.alert.type == 'warning'  && stat.count !== 0}, {'default-icon' : !stat.alert.active}]">
                                                <svg v-if="stat.alert.active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.018 5.775">
                                                    <path d="M11186.313-4415.611a.817.817,0,0,1-.7-.391.822.822,0,0,1-.025-.8l2.2-4.148a.817.817,0,0,1,.72-.436.818.818,0,0,1,.722.436l2.2,4.148a.819.819,0,0,1-.025.8.816.816,0,0,1-.693.391Zm2.006-5.059-2.2,4.148a.211.211,0,0,0,.008.208.213.213,0,0,0,.181.1h4.393l0,.3v-.3a.212.212,0,0,0,.18-.1.211.211,0,0,0,.008-.208l-2.2-4.148a.214.214,0,0,0-.19-.115A.213.213,0,0,0,11188.318-4420.67Zm-.244,3.648a.369.369,0,0,1,.37-.368.369.369,0,0,1,.368.368.37.37,0,0,1-.368.371A.37.37,0,0,1,11188.074-4417.021Zm.07-.9v-1.812h.6v1.812Z" transform="translate(-11185.499 4421.386)"/>
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.02 6.021">
                                                    <path d="M11232.391-4418.323l-2.9-2.907v-2.876h2.877l2.9,2.9a.819.819,0,0,1,0,1.156l-1.724,1.723a.808.808,0,0,1-.575.237A.818.818,0,0,1,11232.391-4418.323Zm-2.306-3.155,2.729,2.729a.213.213,0,0,0,.154.065.212.212,0,0,0,.152-.065l1.724-1.723a.215.215,0,0,0,.062-.152.22.22,0,0,0-.062-.152l-2.732-2.729h-2.027Zm.428-.846a.8.8,0,0,1,.8-.8.8.8,0,0,1,.8.8.8.8,0,0,1-.8.795A.8.8,0,0,1,11230.513-4422.324Zm.4,0a.4.4,0,0,0,.4.395.4.4,0,0,0,.4-.395.4.4,0,0,0-.4-.4A.4.4,0,0,0,11230.913-4422.324Z" transform="translate(-11229.486 4424.106)"/>
                                                </svg>
                                            </div>
                                            <div class="stat-count text-overflow-ellipsis">{{ stat.count }}</div>
                                            <span>{{ stat.title }}</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="dash-section-holder">
        <div class="flex-row-js dashboard-title-wrap">
            <h1 class="dashboard-title">Suppliers</h1>
            <router-link to="/suppliers" class="see-all">{{ getSuppliers.length > 10 ? 'See all' + '('+ getSuppliers.length + ')' : 'Go to suppliers' }}</router-link>
        </div>
        <div class="h-list-wrap">
            <div class="overview">
                <div class="list-hold">
                    <div class="list-content">
                        <ul class="flex">
                            <li>
                                <a href="#" class="supplier-add-new flex justify-content-center align-items-center" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'supplier'})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27.002 27.002">
                                        <path d="M21590.5,8099v-11.5H21579a1,1,0,1,1,0-2h11.5V8074a1,1,0,1,1,2,0v11.5h11.5a1,1,0,1,1,0,2h-11.5V8099a1,1,0,1,1-2,0Z" transform="translate(-21577.998 -8073)" fill="#566ff4"/>
                                    </svg>
                                </a>
                            </li>
                                <supplier-horizontal-list v-for="supplier in getSuppliers.slice(0, 10)" :key="supplier.id" v-bind:supplier="supplier" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="dash-section-holder">
        <div class="flex-row-js dashboard-title-wrap">
            <h1 class="dashboard-title">Sale statistics</h1>
            <div class="flex align-items-center">
                <span>Last 7 days</span>
                <i class="separator-dot"></i>
                <router-link :to="'/sales-record/filter/todays-sales'"  class="see-all">See more</router-link>
            </div>
        </div>
        <div class="activity-wrap">
            <div class="">
                <line-chart v-bind:results="getSalesStats"/>
            </div>
        </div>
    </div>
    <div class="dash-section-holder">
        <div class="flex-row-js dashboard-title-wrap">
            <h1 class="dashboard-title">Activity log</h1>
            <!-- <a href="#" class="see-all">See all logs</a> -->
        </div>
        <div class="activity-wrap">
            <div class="act-hold">
                <div v-if="getActivities.length > 0">
                    <activity-list-row v-for="activity in getActivities" :key="activity.id" v-bind:activity="activity" />
                </div>
                <div v-else>
                    <span class="beta">Coming soon</span>
                    <h4 class="cwht">View all logs on your products at a glance.</h4>
                </div>
            </div>
        </div>
    </div>
</div>
<div v-else class="flex-col gap-32">
    <welcome-screen-top />
    <welcome-screen-bottom />
</div>

</template>
<script>
import CouterMixin from '../../mixins/counter'
import { mapGetters } from 'vuex'
import ActivityListRow from '../../components/app/includes/ActivityListRow.vue'
import SupplierHorizontalList from '../../components/app/includes/SupplierHorizontalList.vue'
import WelcomeScreenTop from '../../components/app/includes/WelcomeScreenTop.vue'
import WelcomeScreenBottom from '../../components/app/includes/WelcomeScreenBottom.vue'
import notificationsMixin from '../../mixins/notifications'
import LineChart from '../../components/app/includes/LineChart.vue'

export default {
  components: { SupplierHorizontalList, ActivityListRow, WelcomeScreenTop, WelcomeScreenBottom, LineChart },
    name: 'Dashboard',
    mixins: [CouterMixin, notificationsMixin],
    computed: {
        ...mapGetters(['getStores', 'getActivities', 'getProducts', 'getUser', 'getSuppliers', 'getSalesStats']),
        computedUser() {
            if(this.getUser.name) {
                return this.getUser.name.split(' ')[0]
            }else
            return ''
        },
        computeLowStk() {
            if(this.computedNotifications.length > 0) {
                let lowstk = this.computedNotifications.find(data => data.key == 'low-stocks')
                if(lowstk)
                return lowstk.count
            }
            return 0
        },
        computeExp() {
            if(this.computedNotifications.length > 0) {
                let exp = this.computedNotifications.find(data => data.key == 'expired')
                if(exp)
                return exp.count
            }
            return 0
        },
        computeExpSoon() {
            if(this.computedNotifications.length > 0) {
                let expsoon = this.computedNotifications.find(data => data.key == 'expiring-soon')
                if(expsoon)
                return expsoon.count
            }
            return 0
        },
        stats() {
            const mystats = [
                {id: 1, index: 0, count: this.getProducts.length, title: 'Products', url: { name: 'Products', params: { id: 'all' , name: 'products'}}, alert: {active: false}},
                {id: 2, index: 1, count: this.computeExp, title: 'Expired', url: { name: 'Notifications', params: { name: 'expired'} }, alert: {active: true, type: 'danger'}},
                {id: 3, index: 2, count: this.computeExpSoon, title: 'Expiring soon', url: { name: 'Notifications', params: { name: 'expiring-soon'} }, alert: {active: true, type: 'warning'}},
                {id: 4, index: 3, count: this.computeLowStk, title: 'Low stocks', url: { name: 'Notifications', params: { name: 'low-stocks'} }, alert: {active: true, type: 'warning'}}
            ]
            return mystats
        }
    },
    data() {
        return {
            title: 'Home',
            transitionVal: 0,
            leftShow: false,
            rightShow: false,
            firstVal: '',
            lastVal: '',
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
        },
        scrollLeft() {
            let no = this.stats.length -1
            let elem_1 = document.getElementById('ovw'+0).getBoundingClientRect().left + 170
            let lastElem = document.getElementById('ovw'+no).getBoundingClientRect().left + 170
            this.firstVal = elem_1
            this.lastVal = lastElem
            this.checkBtn()
            this.transitionVal += 170
        },
        scrollRight() {
            let no = this.stats.length -1
            let elem_1 = document.getElementById('ovw'+0).getBoundingClientRect().left - 170
            let lastElem = document.getElementById('ovw'+no).getBoundingClientRect().left - 170
            this.firstVal = elem_1
            this.lastVal = lastElem
            this.checkBtn()
            this.transitionVal -= 170
        },
        checkBtn() {
            let leftIndicator = document.getElementById('left_scroll_indicator').getBoundingClientRect().left
            let rightIndicator = document.getElementById('right_scroll_indicator').getBoundingClientRect().left
            if(this.firstVal < leftIndicator+10) {
                this.leftShow = true
            }else{
                this.leftShow = false
            }
            if(this.lastVal < (rightIndicator -170)) {
                this.rightShow = false
            }else{
                this.rightShow = true
            }
           
        }
    }
}
</script>

<style scoped lang="scss">

.h-list-wrap{
    display: block;
    overflow-y: hidden;
    align-items: stretch;
    position: relative;
    .overview{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 70px;
        outline: 0;
        align-items: stretch;
    }
}
.beta{
    border-color: #ffffff;
    color: #ffffff;
}
.list-hold{
    display: flex;
    position: relative;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: stretch;
    &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    } 
    
    .list-content{
        display: flex;
        height: 100%;
        align-items: stretch;
        ul{
            height: 100%;
            list-style-type: none;
            padding-left: 0;
            display: flex;
            flex-direction: row;
            margin: 0;
            position: absolute;
            gap: 10px;
            padding-right: 20px;
        }
    }
}




.ovw-wrap{
    display: block;
    overflow-y: hidden;
    position: relative;
}
.overview-row{
    display: flex;
    flex-direction: column;
    position: relative;
    height: 170px;
    outline: 0;
    align-items: stretch;
}
.flex-row-st{
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    position: relative;
    align-items: stretch;
}
.ovw-hold{
    display: flex;
    position: relative;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: stretch;
    &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    }
}
.ovw-content{
    display: flex;
    height: 100%;
    align-items: stretch;

}
.ovw-content ul{
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    margin: 0;
    li{
        list-style-type: none;
        height: 100%;
        position: absolute;
        transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        .li-hold{
            display: flex;
            height: 100%;
            background-color: $primary-light;
            border-radius: 18px;
            padding: 20px;
            color: $dark;
            text-decoration: none;
        }
        &:first-child{
            .li-hold{
                background-color: rgba(86, 110, 244, 0.9);
                color: $white-color;     
            }
            
        }
        
    }
}
.a-wrap{
    padding: 0 10px; 
    height: 100%
}
.overview-content{
    width: 110px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    .icon-wrap{
        background-color: rgba(255, 255, 255, 0.6);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        svg{
            height: 22px;
        }
    }
    span {
        font-weight: 600;
    }
}
#ovw_content{
    transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

.stat-count{
    font-size: 1.5rem;
    font-weight: 700;
}
.scroll-button{
    position: absolute;
    border-style: none;
    display: flex;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    z-index: 3;
    background-color: rgba(255, 255, 255, 0.664);
    backdrop-filter: saturate(180%) blur(20px);
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s background-color;
    &:hover{
        background-color: #ffffff;
        cursor: pointer;
        path{
            fill: $primary-color;
        }
    }
    &:active{
        transform: scale(0.98) translateY(-50%);
        
    }
}
#left_scroll_indicator{
    position: absolute;
    left: 0;
}
#right_scroll_indicator{
    position: absolute;
    right: 0;
}
.scrl-left{
    left: 10px;
    svg{
        transform: translateX(3px);
        transition: 0.2s transform;
    }
    &:hover svg{
        transform: translateX(0);
    }
}
.scrl-right{
    right: 10px;
    svg{
        transform: translateX(-3px);
        transition: 0.2s transform;
    }
    &:hover svg{
        transform: translateX(0);
    }

}
.dash-section-holder{
    margin: 40px 0;
}

.activity-wrap{
    padding: 0 20px;
    .act-hold{
        background-color: rgba(86, 110, 244, 0.80);
        min-height: 340px;
        border-radius: 20px;
        padding: 40px;
        flex-direction: column;
    }
    
}
h1{
    margin: 0;
}
.supplier-add-new{
    height: 70px;
    width: 70px;
    border: 1px dashed $primary-color;
    margin-left: 20px;
    border-radius: 50%;
    background-color: $primary-light;
    flex-shrink: 0;
    transition: 0.2s all;
    &:hover {
        background-color: rgba(86, 110, 244, 0.15);
    }
}
.danger-icon {
    background-color: rgba(255, 255, 255, 0.6);
    svg path {
        fill: $danger;
    }
}
.warning-icon {
    background-color: rgba(255, 255, 255, 0.6);
    svg path {
        fill: $warning;
    }
}
.default-icon {
    background-color: rgba(255, 255, 255, 0.16) !important;
    svg path {
        fill: #ffffff;
    }
}



</style>
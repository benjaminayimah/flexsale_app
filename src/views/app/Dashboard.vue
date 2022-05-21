<template>
<h1 id="page_title">{{ title }}</h1>

 <div class="ovw-wrap" v-if="getStores.length > 0">
     <div id="overview_row">
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
                         <li :id="'ovw'+stat.index" v-for="stat in getStats" :key="stat.id" :style="{ transform: 'translateX('+parseInt(stat.index * 170+(transitionVal))+'px )'}">
                             <div class="a-wrap">
                                 <a href="#" class="li-hold">
                                    <div class="overview-content">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 50.043 50.042">
                                                <path d="M-514.957-141.053-539-165.1V-189.14h24.044l24.043,24.044a6.63,6.63,0,0,1,1.955,4.718,6.63,6.63,0,0,1-1.955,4.719l-14.608,14.607a6.626,6.626,0,0,1-4.718,1.955A6.626,6.626,0,0,1-514.957-141.053Zm-20.707-25.425,23.066,23.066a3.318,3.318,0,0,0,2.36.977,3.315,3.315,0,0,0,2.359-.977l14.608-14.607a3.318,3.318,0,0,0,.977-2.36,3.315,3.315,0,0,0-.977-2.359L-516.338-185.8h-19.326Zm5-7.65a6.679,6.679,0,0,1,6.673-6.672,6.679,6.679,0,0,1,6.673,6.672,6.68,6.68,0,0,1-6.673,6.673A6.68,6.68,0,0,1-530.66-174.128Zm3.336,0a3.34,3.34,0,0,0,3.336,3.336,3.34,3.34,0,0,0,3.336-3.336,3.34,3.34,0,0,0-3.336-3.336A3.34,3.34,0,0,0-527.323-174.128Z" transform="translate(539 189.14)" fill="#fff"/>
                                            </svg>
                                        </div>
                                        <div class="stat-count">{{ stat.count }}</div>
                                        <div>{{ stat.title }}</div>
                                    </div>
                                </a>
                             </div>
                         </li>
                     </ul>
                 </div>
             </div>
             <!-- <button @click.prevent="counter">Click me {{ count }}</button> -->
             
             <!--
            <div class="ovw-colum" v-for="stat in stats" :key="stat.id">
                <div class="overview-content">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 50.043 50.042">
                        <path d="M-514.957-141.053-539-165.1V-189.14h24.044l24.043,24.044a6.63,6.63,0,0,1,1.955,4.718,6.63,6.63,0,0,1-1.955,4.719l-14.608,14.607a6.626,6.626,0,0,1-4.718,1.955A6.626,6.626,0,0,1-514.957-141.053Zm-20.707-25.425,23.066,23.066a3.318,3.318,0,0,0,2.36.977,3.315,3.315,0,0,0,2.359-.977l14.608-14.607a3.318,3.318,0,0,0,.977-2.36,3.315,3.315,0,0,0-.977-2.359L-516.338-185.8h-19.326Zm5-7.65a6.679,6.679,0,0,1,6.673-6.672,6.679,6.679,0,0,1,6.673,6.672,6.68,6.68,0,0,1-6.673,6.673A6.68,6.68,0,0,1-530.66-174.128Zm3.336,0a3.34,3.34,0,0,0,3.336,3.336,3.34,3.34,0,0,0,3.336-3.336,3.34,3.34,0,0,0-3.336-3.336A3.34,3.34,0,0,0-527.323-174.128Z" transform="translate(539 189.14)" fill="#fff"/>
                        </svg>
                    </div>
                    <div class="stat-count">{{ stat.count }}</div>
                    <div>{{ stat.title }}</div>
                </div>
            </div>
            -->
        </div>
     </div>
 </div>
 <!-- <input type="date" value="2022-09-01">
 <input type="time" value="00:00:00">
 <input type="color" title="Color" value="#00ff00"> -->
 <div class="dash-section-holder">
    <div class="flex-row-js dashboard-title-wrap">
        <h1 class="dashboard-title">Suppliers</h1>
        <a href="" class="see-all">See all (10)</a>
    </div>
    <div class="h-list-wrap">
        <div class="overview">
            <div class="list-hold">
                <div class="list-content">
                    <ul>
                        <supplier-horizontal-list v-for="supplier in getSuppliersALT" :key="supplier.id" v-bind:supplier="supplier" />
                    </ul>
                </div>
            </div>
        </div>
    </div>
 </div>
 <div class="dash-section-holder">
    <div class="flex-row-js dashboard-title-wrap">
        <h1 class="dashboard-title">Activity log</h1>
        <a href="" class="see-all">See all logs</a>
    </div>
    <div class="activity-wrap">
        <div class="act-hold flex">
            <activity-list-row v-for="activity in getActivities" :key="activity.id" v-bind:activity="activity" />
        </div>
    </div>
 </div>

</template>
<script>
import CouterMixin from '../../mixins/counter'
import { mapGetters } from 'vuex'
import ActivityListRow from '../../components/app/includes/ActivityListRow.vue'
import SupplierHorizontalList from '../../components/app/includes/SupplierHorizontalList.vue'
export default {
  components: { SupplierHorizontalList, ActivityListRow },
    name: 'Dashboard',
    mixins: [CouterMixin],
    computed: mapGetters(['getStores', 'getSuppliersALT', 'getStats', 'getActivities']),
    data() {
        return {
            title: 'Home',
            transitionVal: 0,
            leftShow: false,
            rightShow: true,
            firstVal: '',
            lastVal: ''
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
            let no = this.getStats.length -1
            let elem_1 = document.getElementById('ovw'+0).getBoundingClientRect().left + 170
            let lastElem = document.getElementById('ovw'+no).getBoundingClientRect().left + 170
            this.firstVal = elem_1
            this.lastVal = lastElem
            this.checkBtn()
            this.transitionVal += 170
        },
        scrollRight() {
            let no = this.getStats.length -1
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
            list-style-type: none;
            padding-left: 10px;
            display: flex;
            flex-direction: row;
            margin: 0;
        }
    }
}




.ovw-wrap{
    display: block;
    overflow-y: hidden;
    align-items: stretch;
    position: relative;
}
#overview_row{
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
            padding: 25px 20px;
            color: $dark;
            text-decoration: none;
        }
        svg path{
            fill: $dark;
        }
        &:first-child{
            .li-hold{
                background-color: rgba(86, 110, 244, 0.8);
                color: $white-color;
                svg path{
                    fill: $white-color;
                }       
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
    justify-content: space-between;
}
#ovw_content{
    transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

.stat-count{
    font-size: 1.3rem;
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



</style>
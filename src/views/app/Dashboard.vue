<template>
<h1 id="page_title">Home</h1>

 <div class="ovw-wrap">
     <div id="overview_row">
         <div class="flex-row-st">
             <div class="ovw-hold">
                 <div class="ovw-content">
                     <ul>
                         <li v-for="stat in stats" :key="stat.id">
                             <div style="padding: 0 20px; height: 100%">
                                 <div class="li-hold">
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
                             </div>
                         </li>
                     </ul>
                 </div>
             </div>
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
 <input type="text" class="form-control" placeholder="email">
</template>
<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            stats: [
                {id: 1, count: '1,200', title: 'Products'},
                {id: 2, count: '200', title: 'Low stocks'},
                {id: 3, count: '50', title: 'Expiry alert'},
                {id: 4, count: '15', title: 'Expiry alert'},
                {id: 5, count: '15', title: 'Expiry alert'},
            ]
        }
    },
    created() {
        this.setPage()
    },
    methods: {
        setPage() {
            this.$store.commit('setPagetitle', 'Home')
        }
    }
}
</script>

<style scoped lang="scss">
#page_title{
    display: none;
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
        .li-hold{
            display: flex;
            height: 100%;
            background-color: $primary-light;
            border-radius: 18px;
            padding: 25px 20px;
            color: $dark;
        }
        svg path{
            fill: $dark;
        }
        &:first-child{
            .li-hold{
                background-color: $primary-color;
                color: $white-color;
                svg path{
                    fill: $white-color;
                }       
            }
            
        }
        &:nth-child(2){
            transform: translateX(150px + 20px);
        }
        &:nth-child(3){
            transform: translateX(150px + 150px + 40px);
        }
        &:nth-child(4){
            transform: translateX(150px + 150px + 150px + 60px);
        }
        &:nth-child(5){
            transform: translateX(150px + 150px + 150px + 150px + 80px);
        }
        
    }
}
.overview-content{
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/*
#overview_row{
    overflow-y: hidden;
    outline: 0;
    white-space: nowrap;
    width: 100%;
    align-items: stretch;
    display: flex;
    &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    }
}
.overview-content{
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.ovw-colum{
    height: 170px;
    background-color: $primary-light;
    border-radius: 18px;
    padding: 25px 20px;
    margin-right: 15px;
    display: flex;
    color: $dark;
    svg path{
        fill: $dark;
    }
    &:last-child{
        margin-right: 0;
    }
    &:first-child{
        background-color: $primary-color;
        color: $white-color;
        svg path{
            fill: $white-color;
        }
    }
}
.flex-row-st{
    padding: 0 30px;
}
*/
.stat-count{
    font-size: 1.3rem;
    font-weight: 700;
}


</style>
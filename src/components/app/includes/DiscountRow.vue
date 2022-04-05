<template>
    <li>
        <router-link :to="{ name: 'DetailedDiscount', params: { id: item[0].id, name: item[0].name } }">
            <div class="a-wrap">
                <div class="a-first">
                    <div class="discount-name">
                        <span>{{ item[0].name }}</span>
                        <div class="flex-row-st vals-wrap">
                            <span class="discount-caption">Discount value:</span>
                            <div class="discount-val">
                                <span v-if="item[0].percentage === 1">{{ item[0].value }}%</span>
                                <span v-else><span>{{ item[1] }}</span><span>{{ item[0].value }}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="discount-period">
                    <div class="flex-row-st align-items-center" :class="[{'active' : item[0].active == 1 },{'ended' : item[0].active == 0 },{ 'inactive' : item[0].active == 2 }]">
                        <i></i>
                        <span v-if="item[0].active == '1'">Active</span>
                        <span v-else-if="item[0].active == '0'">Ended</span>
                        <span v-else>Inactive</span>
                    </div>
                    <div class="period">
                        <span>{{ dateTime(item[0].start) }}</span><span class="dash">-</span><span>{{ dateTime(item[0].end) }}</span>
                    </div>
                </div>
            
            </div>
        </router-link>
    </li>
</template>
<script>
import moment from 'moment'
export default {
    name: 'DiscountRow',
    props: ['item'],
    methods: {
        dateTime(value) {
            return moment(value).format('MMM DD')
        },
    }
}
</script>

<style scoped lang="scss">
a{
    display: flex;
    flex-direction: row;
    color: inherit;
    text-decoration: none;
    padding: 15px;
    border-bottom: 1px solid $dark-light;
    transition: 0.3s all;
    &:hover {
        background-color: $dark-light;
        svg path{
            fill: $primary-color;
        }
    }
}
.a-wrap{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
i{
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 10px;
}
.ended i{
    background-color: $danger;
}
.active i{
    background-color: $success;
}
.inactive i{
    background-color: $gray-color;
}
.a-first{
    display: flex;
    align-items: center;
    
}
.discount-name{
    display: flex;
    flex-direction: column;
    font-weight: 600;
    .vals-wrap{
        margin-top: 8px;
    }

}
.discount-caption{
    color: $gray-color;
    margin-right: 8px;
}
.discount-period div span{
    font-weight: 500;
}
.period{
    color: $gray-color;
    font-size: 0.9rem;
}

.dash{
    margin: 0 4px;
}
</style>
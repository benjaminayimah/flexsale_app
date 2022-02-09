<template>
    <li>
        <router-link :to="'/discounts/'+item.id+'/'+item.name">
            <div class="a-wrap">
                <div class="a-first">
                    <div class="discount-name">
                        <span>{{ item.name }}</span>
                        <div class="flex-row-st vals-wrap">
                            <span class="discount-caption">Discount value:</span>
                            <span class="discount-val">5%</span>
                        </div>
                    </div>
                </div>
                <div class="discount-period">
                    <span>19th Nov — 27th Nov</span>
                    <div class="flex-row-st align-items-center">
                        <i></i>
                        <span>Active</span>
                    </div>
                </div>
                <div class="items">
                    <span>10 items</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9.024 16.322">
                            <path d="M766.289,20.651a.75.75,0,0,1-.544-1.267l6.722-7.074-6.709-6.7a.75.75,0,0,1,1.06-1.061l7.744,7.734-7.73,8.135A.748.748,0,0,1,766.289,20.651Z" transform="translate(-765.539 -4.33)" fill="#0e142c"/>
                        </svg>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
export default {
    name: 'DiscountRow',
    props: ['item']
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
            
            .items{
                color: $primary-color;
            }
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
        background-color: $success;
        border-radius: 50%;
        margin-right: 10px;
    }
    .a-first{
        display: flex;
        align-items: center;
        
    }
    .discount-name{
        display: flex;
        flex-direction: column;
        font-weight: 500;
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
    .items{
        display: flex;
        align-items: center;
        svg {
            margin-left: 10px;
        }
    }
</style>
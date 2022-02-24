<template>
    <div class="card-outer">
        <router-link :to="'/tag/'+tag.id+'/'+tag.name">
            <div class="card-inner">
                <!-- <button class="menu-toggle-btn">
                    <i></i>
                    <i></i>
                    <i></i>
                </button> -->
                <div class="card-content text-overflow-ellipsis">{{ tag.name }}</div>
                <span class="text-overflow-ellipsis">{{ newFilter.length }} Items</span>
            </div>
        </router-link>
        <div class="card-bottom">
            <div class="bottom-top">
                <div class="img-col">
                    <div class="img-holder bg-img" v-for="img in newFilter.slice(0, 5)" :key="img.id" :style="img.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUser.current+'/'+img.image+')' } : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                    <div class="img-holder more" v-if="newFilter.length > 5">+{{ newFilter.length - 5}}</div>
                </div>
                <!-- <div class="add-col">
                    <button class="rounded-btn-light">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 9.83 9.83">
                            <path  d="M-5292.419-3474.585h1.5v4.164h4.164v1.5h-4.164v4.166h-1.5v-4.166h-4.166v-1.5h4.166Z" transform="translate(5296.585 3474.585)"/>
                        </svg>
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TagItem',
    computed: mapGetters(['getHostname', 'getUser', 'getDefaultImage']),
    props: ['filters', 'tag'],
    data() {
        return {
            newFilter: []
        }
    },
    methods: {
        filterThisItem() {
            this.newFilter = this.filters.filter(filter => filter.tag_id == this.tag.id);
        }
    },
    created() {
        this.filterThisItem()
    },
    beforeUpdate() {
        this.filterThisItem()
    }
}
</script>
<style scoped lang="scss">
.card-outer{
        width: 33.3%;
        padding: 10px;
        margin-bottom: 15px;
        .add-new{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            border-radius: 24px;
            height: 195px;
            background-color: $primary-color;
            color: #ffffff;
            i{
                padding: 10px;
                height: 40px;
                width: 40px;
            }
            span{
                font-size: 1rem;
                font-weight: 600;
            }
        }
        a{
            height: 195px;
            display: flex;
            text-decoration: none;
            color: $dark;
            width: 100%;
            position: relative;
            background-color: $dark-light;
            border-radius: 24px;
        }
  
    .card-inner{
            
            width: 100%;
            height: 100%;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            button{
                position: absolute;
                right: 5px;
                top: 10px;
                transform: rotate(90deg);
                i{
                    background-color: $gray-color;
                }
                &:hover i{
                        background-color: $dark;
                }
            }
            span{
                padding-top: 5px;
                color: $gray-color;
                width: 100%;
            }
        }
    }
    .card-content{
        font-size: 30px;
        font-weight: 600;
        width: 100%;
    }
    .card-bottom{
        display: flex;
        flex-direction: column;
        padding: 15px 0;
        height: 70px;
        .bottom-top{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            .img-col{
                position: relative;
                display: table;
                width: 100%;
                clear: both;
            }
            .img-holder{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                border: 2px #fff solid;
                position: absolute;
                &:nth-child(2) {
                    left: 15%;
                }
                &:nth-child(3) {
                    left: 30%;
                }
                &:nth-child(4) {
                    left: 45%;
                }
                &:nth-child(5) {
                    left: 60%;
                }
                &:nth-child(6) {
                    left: 75%;
                }
            }
            .more{
                background-color: #ffffff;
                border: 1px solid $dark-light;
                color: $gray-color;
            }
            .add-col button{
                height: 40px;
                width: 40px;
                border: 1px $primary-color dashed;
                border-radius: 50%;
                color: $primary-color;
                background-color: $primary-light;
                svg path{
                    fill: $primary-color;
                }
            }
            

        }
    }

</style>
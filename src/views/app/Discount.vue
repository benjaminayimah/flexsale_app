<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body">
        <div class="add-wrap">
            <button class="button button-primary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'discount'})">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 20.582 20.582">
                    <path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#fff">
                    </path>
                </svg>
                <span>Create new</span>
            </button>
        </div>
        <ul>
            <discount-row v-for="item in getDiscounts" :key="item.id" v-bind:item="item"/>
        </ul>
    </div>
</template>
<script>
import DiscountRow from '../../components/app/includes/DiscountRow.vue'
import { mapGetters } from 'vuex'
export default {
  components: { DiscountRow },
    name: 'Discount',
    computed: mapGetters(['getDiscounts']),
    data() {
        return {
            title: 'Discounts',
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
        }
    }
}
</script>
<style scoped lang="scss">
ul{
    padding: 0;
    margin: 0;
}
.add-wrap{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    button {
        height: 52px;
        svg{
            margin-right: 5px;
        }
    }
}
</style>
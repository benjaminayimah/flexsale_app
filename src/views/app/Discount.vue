<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body" v-if="getDiscounts.length > 0">
        <div class="add-wrap">
            <button class="button button-primary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'discount'})">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                    <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
                </svg>
                <span>Create new</span>
            </button>
        </div>
        <ul>
            <discount-row v-for="item in getDiscounts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))" :key="item.id" v-bind:item="[ item, getCurrency ]" />
        </ul>
    </div>
    <div v-else class="flex-col empty-state">
        <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 204 204">
            <g id="discount" transform="translate(60.818 60.818)">
                <path  d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                <path  d="M-7090.45-4532.955a13.4,13.4,0,0,1-9.541-3.952,13.4,13.4,0,0,1-3.953-9.542,13.4,13.4,0,0,1,3.953-9.542,13.4,13.4,0,0,1,9.541-3.952,13.407,13.407,0,0,1,9.543,3.952,13.4,13.4,0,0,1,3.953,9.542,13.4,13.4,0,0,1-3.953,9.542A13.407,13.407,0,0,1-7090.45-4532.955Zm0-21.988a8.5,8.5,0,0,0-8.494,8.494,8.5,8.5,0,0,0,8.494,8.494,8.5,8.5,0,0,0,8.5-8.494A8.5,8.5,0,0,0-7090.45-4554.943Zm-54.97,17.592a2.491,2.491,0,0,1-1.768-.732,2.491,2.491,0,0,1-.732-1.768,2.491,2.491,0,0,1,.732-1.768l61.568-61.568a2.5,2.5,0,0,1,3.535,0,2.491,2.491,0,0,1,.732,1.768,2.491,2.491,0,0,1-.732,1.768l-61.568,61.568A2.491,2.491,0,0,1-7145.42-4537.351Zm6.6-43.979a13.406,13.406,0,0,1-9.542-3.952,13.406,13.406,0,0,1-3.952-9.542,13.406,13.406,0,0,1,3.952-9.542,13.4,13.4,0,0,1,9.542-3.952,13.406,13.406,0,0,1,9.542,3.952,13.406,13.406,0,0,1,3.952,9.542,13.408,13.408,0,0,1-3.952,9.542A13.408,13.408,0,0,1-7138.825-4581.33Zm0-21.988a8.5,8.5,0,0,0-8.494,8.494,8.5,8.5,0,0,0,8.494,8.494,8.5,8.5,0,0,0,8.494-8.494A8.5,8.5,0,0,0-7138.825-4603.317Z" transform="translate(7155.818 4611.818)" fill="#566ff4"/>
            </g>
        </svg>
        <h1>Discount is Empty</h1>
        <div>To apply the discount value, add items</div>
        <button class="button button-primary" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'discount'}) : this.$store.commit('forceSetOnboard', 'intro')">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
            </svg>
            <span>Add discount</span>
        </button>
    </div>
</template>
<script>
import DiscountRow from '../../components/app/includes/DiscountRow.vue'
import { mapGetters } from 'vuex'
export default {
  components: { DiscountRow },
    name: 'Discount',
    computed: mapGetters(['getDiscounts', 'getCurrency', 'getStores']),
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
    margin-bottom: 20px;
    button {
        height: 52px;
        gap: 5px;
    }
}

</style>
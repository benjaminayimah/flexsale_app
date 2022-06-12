<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body" v-if="getCustomers.length > 0">
        <div class="main-page-header flex-row-js">
            <div class="form-row" id="search_hold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                    <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                </svg>
                <input id="search_field" type="text" name="searchField" class="form-control" placeholder="Search customers...">
            </div>
            <div class="add-wrap">
                <button class="button button-primary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'customer'})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                        <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
                    </svg>
                    <span class="hide-on-mob">Add Customer</span>
                </button>
            </div>
        </div>
        <div class="main-page-table">
            <ul>
                <customers-page-list v-for="customer in getCustomers" :key="customer.id" v-bind:customer="customer" />
            </ul>
        </div>
    </div>
    <div v-else class="flex-col empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 204 204">
            <g id="discount" transform="translate(60.818 60.818)">
                <path d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                <path d="M20412.469-3712.345c.014-13.573,11.9-31.047,25.475-31.062h15.531c13.572.015,24.824,17.489,24.84,31.062,0,.509-13.139,0-32.605,0S20412.469-3711.837,20412.469-3712.345Zm15.123-58.151a18.12,18.12,0,0,1,18.117-18.121,17.909,17.909,0,0,1,17.867,18.121c0,9.734-7.5,17.49-17.867,17.49S20427.592-3760.763,20427.592-3770.5Z" transform="translate(-20404.209 3791.551)" fill="#566ff4"/>
            </g>
        </svg>
        <h1>{{ title }} list is empty</h1>
        <div>Add your {{ title }}</div>
        <button class="button button-primary" @click.prevent="getStores.length > 0 ? $store.commit('getMainHomeWidth', payload = { mode: 'add', type: 'customer'}) : this.$store.commit('forceSetOnboard', 'intro')">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
            </svg>
            <span>Add {{ title }}</span>
        </button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CustomersPageList from '../../components/app/includes/CustomersPageList.vue'
export default {
  components: { CustomersPageList },
    name: 'Customers',
    computed: mapGetters(['getCustomers', 'getStores']),

    data() {
        return {
            title: 'Customers'
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
#search_hold{
  margin-bottom: 0;
  input{
    border-radius: 0.9rem;
    background-color: $primary-light;
    padding: 10px 20px 10px 50px;
    border: 1px solid #ffffff;
    height: 52px;
    &:focus{
      border: 1px solid $primary-color !important;
    }
  }
  input::placeholder{
      color: $gray-color;
  }
  svg{
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 18px;
  }
}
.add-wrap{
    display: flex;
    justify-content: flex-end;
    button {
        height: 52px;
        span{
            margin-left: 5px;
        }
    }
}
ul{
    margin: 20px 0 0 0;
    padding: 0;
}

</style>
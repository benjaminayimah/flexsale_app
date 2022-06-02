<template>
    <div class="main-page-body">
        <div class="prod-main-custom-table">
            <div class="table">
                <div class="table-body">
                    <!-- table row -->
                    <div v-if="computeComputedNotifications.length > 0" class="table-menu flex-row-js mt-0">
                        <div class="category-pill">
                            <div class="pill-wrap">
                                <ul class="flex-row-st">
                                    <li><router-link :to="{ name: 'Notifications', params: { name: 'all'} }" replace>All</router-link></li>
                                    <li v-for="link in computedNotifications" :key="link.id"><router-link :to="{ name: 'Notifications', params: { name: link.key} }" replace>{{ link.title }}</router-link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="main-body-conten">
                        <div v-if="computeComputedNotifications.length > 0">
                            <notification-main-row v-for="notification in computeComputedNotifications.sort((a, b) => new Date(b.time) - new Date(a.time))" :key="notification.id" v-bind:notification="notification" />
                        </div>
                        <div class="empty-state flex-col" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" height="150" viewBox="0 0 204 204">
                                <g id="thumb-up" transform="translate(60.818 60.818)">
                                    <path d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                                    <path d="M1022.029-10526.25v-34.861l10.242-34.377a1.692,1.692,0,0,1,1.6-1.136c3.507,0,10.144,2.476,10.144,11.84v16.909h28.751a8.466,8.466,0,0,1,8.454,8.456,8.332,8.332,0,0,1-1.014,3.971,8.334,8.334,0,0,1,2.7,6.177,8.437,8.437,0,0,1-3.937,7.12,8.415,8.415,0,0,1-3.5,10.219,6.666,6.666,0,0,1,.679,2.955,6.764,6.764,0,0,1-6.765,6.763h-27.059l-.473,0A50.722,50.722,0,0,1,1022.029-10526.25Zm-13.684,2.5a3.344,3.344,0,0,1-3.344-3.344v-34.556a3.344,3.344,0,0,1,3.344-3.344h6.688a3.344,3.344,0,0,1,3.344,3.344v34.556a3.344,3.344,0,0,1-3.344,3.344Z" transform="translate(-1002.643 10596.783)" fill="#566ff4"/>
                                </g>
                            </svg>
                            <h1>All looks Good!</h1>
                            <div>We will surely notify you whenever things are <br> getting a little bit out of control.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NotificationsMixin from '../../mixins/notifications'
import NotificationMainRow from '../../components/app/includes/NotificationMainRow.vue'
export default {
  components: { NotificationMainRow },
    name: 'Notifications',
    mixins: [NotificationsMixin],
    computed: {
        computeComputedNotifications() {
            if(this.$route.params.name !== 'all') {
                return this.computedNotifications.filter(items => items.key == this.$route.params.name)
            }else
            return this.computedNotifications
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: 'Notifications', back: true}
            this.$store.commit('setPagetitle', title)
        },
        

    }
}
</script>
<style scoped lang="scss">
.router-link-exact-active{
    background-color: $dark !important;
    color: #ffffff !important;
    border: 1px solid $dark !important;
}
</style>
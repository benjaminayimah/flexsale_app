<template>
<div class="status-alert">
        <div class="alert" v-bind:class="[(getAlert.status.success ? 'success-alert' : ''), (getAlert.status.danger ? 'danger-alert' : ''), (getAlert.status.warning ? 'warning-alert' : ''), (getAlert.status.info ? 'info-alert' : '')]" v-if="getAlert.status.show">
            <a href="#" class="alert-close" @click.prevent="closeAlert">
                <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                      <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                </svg>
            </a>
            <div class="flex">
                <h5 class="alert-title">{{ getAlert.title}}</h5>
            </div>
            <div class="alert-body">{{ getAlert.body }}</div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'Alerts',
    computed: mapGetters(['getAlert']),
    methods: {
        closeAlert() {
            this.$store.commit('dismisAlert')
            
        }
    }
}
</script>
<style scoped lang="scss">

</style>
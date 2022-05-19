<template>
    <div class="main-page-body"></div>
</template>
<script>
export default {
    name: 'Notifications',
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: 'Notifications', back: true}
            this.$store.commit('setPagetitle', title)
        }
    }
}
</script>
<style scoped lang="scss">

</style>
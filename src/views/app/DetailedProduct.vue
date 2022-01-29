<template>
    <div class="main-page-body">
    </div>
</template>
<script>
export default {
    name: 'DetailedProduct',
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
    },
    created() {
        this.setPage()
    },
}
</script>
<style scoped lang="scss">

</style>
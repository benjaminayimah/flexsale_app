<template>
    <div class="main-page-body">
        {{ $route.params.name }}
    </div>
</template>
<script>
export default {
    name: 'DetailedSupplier',
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    beforeUpdate() {
        this.setPage()
    },
}
</script>
<style scoped lang="scss">

</style>
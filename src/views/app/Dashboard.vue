<template>
<h1 id="page_title">Home</h1>
 <div>body</div>
</template>
<script>
export default {
    name: 'Dashboard',
    created() {
        this.setPage()
    },
    methods: {
        setPage() {
            this.$store.commit('setPagetitle', 'Home')
        }
    }
}
</script>

<style scoped lang="scss">


</style>
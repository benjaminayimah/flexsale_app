<template>
 <div>Products</div>
</template>
<script>
export default {
    name: 'Products',
    created() {
        this.setPage()
    },
    methods: {
        setPage() {
            this.$store.commit('setPagetitle', 'Products')
        }
    }
}
</script>


<style scoped lang="scss">

</style>
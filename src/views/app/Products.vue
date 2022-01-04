<template>
<h1 id="page_title">All Products</h1>
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
            this.$store.commit('setPagetitle', 'All Products')
        }
    }
}
</script>


<style scoped lang="scss">
#page_title{
    display: none;
}


</style>
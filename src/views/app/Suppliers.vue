<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body"></div>
</template>
<script>
export default {
    name: 'Suppliers',
    data() {
        return {
            title: 'Suppliers'
        }
    },
    created() {
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

</style>
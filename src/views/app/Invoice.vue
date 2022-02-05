<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body"></div>
</template>
<script>
export default {
    name: 'Invoice',
    data() {
        return {
            title: 'Invoice'
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

</style>
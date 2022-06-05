<template>
    <div class="main-page-body">
       <div>
           <div class="sticky-top flex align-items-center">
               <!-- <search-float /> -->
           </div>
           <div style="height:700px">
                <!-- body -->
                <div>dfdfddf</div>
                <div>dfdfd</div>
                <div>dfdfd</div>

            </div>
       </div>
    </div>
</template>
<script>
// import SearchFloat from '../../components/app/includes/SearchFloat.vue'
export default {
//   components: { SearchFloat },
    name: 'Search',
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: 'Search', back: true}
            this.$store.commit('setPagetitle', title)
        }
    }
}
</script>
<style scoped lang="scss">
.sticky-top{
    top: 80px;
    height: 100px;
    background-color: #ffffff;
}

</style>
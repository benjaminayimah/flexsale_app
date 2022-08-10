<template>
    <div v-if="getLoader" class="loader-backdrop">
        <spinner v-bind:size="size"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'
export default {
  components: { Spinner },
    name: 'Loader',
    props: ['size'],
    computed: mapGetters(['getLoader'])
}
</script>
<style scoped lang="scss">
.loader-backdrop{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    .loader{
        border-radius: 50%;
        position: fixed;
        background-color: #fff;
        padding: 4px;
        margin: 4px;
    }
}

</style>
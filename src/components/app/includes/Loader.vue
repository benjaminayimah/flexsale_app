<template>
    <div v-if="getLoader" class="loader-backdrop">
        <div class="loader-wrap">
            <i class="lazy-loader loader"></i>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Loader',
    computed: mapGetters(['getLoader'])
}
</script>
<style scoped lang="scss">
.loader-backdrop{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 9999999;
    display: flex;
    justify-content: center;
    .loader-wrap{
        display: flex;
        position: fixed;
        background-color: $white-color;
        padding: 4px;
        border-radius: 50%;
        margin: 4px;
        // box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
        .lazy-loader{
            height: 25px;
            width: 25px;
            border: 3px solid $primary-light;
            border-top: 3px $primary-color solid;
            border-radius: 50%;
        }
        .loader{
            -webkit-animation: load 2s linear infinite;
            animation: load 1s linear infinite;
        }
        @keyframes load{
            0%{transform: rotate(0deg)}
            100%{transform: rotate(360deg)}
        }
        
    }
    
}

</style>
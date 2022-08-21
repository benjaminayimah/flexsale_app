<template>
    <button v-if="!getSale.mobile" class="br-50 flex justify-content-center align-items-center" @click.prevent="refreshPage">
        <svg :class="{ 'loader' : getLoader}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.997 31.499">
            <path d="M30.445,20.306a1.049,1.049,0,0,0-1.048.956,11.415,11.415,0,1,1-11.672-12.3.275.275,0,0,1,.288.281v3.537a1.127,1.127,0,0,0,1.73.949L26.508,9a1.124,1.124,0,0,0,0-1.905L19.751,2.426a1.127,1.127,0,0,0-1.73.949V6.588a.276.276,0,0,1-.274.281A13.443,13.443,0,1,0,31.493,21.438a1.045,1.045,0,0,0-1.048-1.132Z" transform="translate(-4.5 -2.251)"/>
        </svg>
    </button>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'RefreshButton',
    computed: mapGetters(['getLoader', 'getSale']),
    methods: {
        refreshPage: function () {
            
            window.location = this.$router.currentRoute.value.path
        }
    }
}
</script>
<style lang="scss" scoped>
.loader{
    -webkit-animation: load 1s linear infinite;
    animation: load 1s linear infinite;
}
@keyframes load{
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
}
button{
    background-color: $accent-color;
    position: fixed;
    bottom: 70px;
    right: 15px;
    height: 45px;
    width: 45px;
}
path {
    fill: #fff;
}

</style>
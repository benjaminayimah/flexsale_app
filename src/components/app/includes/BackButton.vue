<template>
    <router-link to="" id="main_back_btn" @click.prevent="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 23.062 19.844">
            <path  d="M3769.432-2903.1l-10.236-9.362,10.214-9.937a1,1,0,0,1,1.414.02,1,1,0,0,1-.02,1.413l-7.665,7.457H3781.3a.981.981,0,0,1,.961,1,.981.981,0,0,1-.961,1h-18.1l7.58,6.932a1,1,0,0,1,.063,1.412,1,1,0,0,1-.739.326A1,1,0,0,1,3769.432-2903.1Z" transform="translate(-3759.195 2922.683)" fill="#0e142c"/>
        </svg>
    </router-link>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BackButton',
    computed: mapGetters(['getCurrentpage'])
}
</script>
<style scoped lang="scss">
#main_back_btn{
  background-color: #ffffff;
  margin-right: 20px;
  margin-left: -10px;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all;
  svg path {
    fill: #0e142c;
  }
  &:hover{
    background-color: $dark-light;
  }
  &:active{
        box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
    border: 1px solid #0e142c;
    background-color: #fff;
  }
}

</style>
<template>
    <button id="main_back_btn" @click.prevent="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 23.062 19.844">
            <path  d="M3769.432-2903.1l-10.236-9.362,10.214-9.937a1,1,0,0,1,1.414.02,1,1,0,0,1-.02,1.413l-7.665,7.457H3781.3a.981.981,0,0,1,.961,1,.981.981,0,0,1-.961,1h-18.1l7.58,6.932a1,1,0,0,1,.063,1.412,1,1,0,0,1-.739.326A1,1,0,0,1,3769.432-2903.1Z" transform="translate(-3759.195 2922.683)" fill="#090b10"/>
        </svg>
    </button>
</template>
<script>
export default {
    name: 'BackButton'
}
</script>
<style scoped lang="scss">
#main_back_btn{
  background-color: #ffffff;
  margin-right: 20px;
  margin-left: -15px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  //transition: 0.3s all;
  &:hover{
    background-color: $dark-light;
  }
  &:focus{
        box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
    border: 1px solid #0e142c;
    background-color: #fff;
  }
}

</style>
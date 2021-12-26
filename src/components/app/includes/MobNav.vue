<template>
    <div id="mob_nav" v-if="getMobile">
        <div class="mob-nav-content">
            <li>
            <router-link :to="{ name: 'Dashboard'}">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
                    <path  d="M17.5,19.5a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2H15.166a2,2,0,0,0-2,2v3.5a2,2,0,0,0,2,2H17.5m-11.667,0a2,2,0,0,0,2-2V16.334a2,2,0,0,0-2-2H3.5a2,2,0,0,0-2,2V17.5a2,2,0,0,0,2,2H5.834m0-10.5a2,2,0,0,0,2-2V3.5a2,2,0,0,0-2-2H3.5a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2H5.834M17.5,6.667a2,2,0,0,0,2-2V3.5a2,2,0,0,0-2-2H15.166a2,2,0,0,0-2,2V4.666a2,2,0,0,0,2,2H17.5M17.5,21H15.166a3.5,3.5,0,0,1-3.5-3.5V14a3.5,3.5,0,0,1,3.5-3.5H17.5A3.5,3.5,0,0,1,21,14v3.5A3.5,3.5,0,0,1,17.5,21ZM5.834,21H3.5A3.5,3.5,0,0,1,0,17.5V16.334a3.5,3.5,0,0,1,3.5-3.5H5.834a3.5,3.5,0,0,1,3.5,3.5V17.5A3.5,3.5,0,0,1,5.834,21Zm0-10.5H3.5A3.5,3.5,0,0,1,0,7V3.5A3.5,3.5,0,0,1,3.5,0H5.834a3.5,3.5,0,0,1,3.5,3.5V7A3.5,3.5,0,0,1,5.834,10.5ZM17.5,8.167H15.166a3.5,3.5,0,0,1-3.5-3.5V3.5a3.5,3.5,0,0,1,3.5-3.5H17.5A3.5,3.5,0,0,1,21,3.5V4.666A3.5,3.5,0,0,1,17.5,8.167Z"/>
                </svg>
                </i>
                <span>Home</span>
            </router-link>
            </li>
            <li>
            <router-link :to="{ name: 'Products'}">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21.001">
                    <path d="M-4164.91-223.32-4175-233.41V-243.5h10.09l10.09,10.09a2.786,2.786,0,0,1,.819,1.98,2.786,2.786,0,0,1-.819,1.98l-6.131,6.13a2.777,2.777,0,0,1-1.979.82A2.783,2.783,0,0,1-4164.91-223.32Zm-8.69-10.67,9.681,9.679a1.393,1.393,0,0,0,.99.411,1.4,1.4,0,0,0,.99-.411l6.129-6.13a1.393,1.393,0,0,0,.41-.99,1.391,1.391,0,0,0-.41-.99l-9.679-9.679h-8.111Zm2.1-3.21a2.8,2.8,0,0,1,2.8-2.8,2.8,2.8,0,0,1,2.8,2.8,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-4171.5-237.2Zm1.4,0a1.4,1.4,0,0,0,1.4,1.4,1.4,1.4,0,0,0,1.4-1.4,1.4,1.4,0,0,0-1.4-1.4A1.4,1.4,0,0,0-4170.1-237.2Z" transform="translate(4175 243.5)"/>
                </svg>
                </i>
                <span>Products</span>
            </router-link>
            </li>
            <li>
            <a id="add_button" href="#">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5">
                    <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(1.25 1.25)">
                    <path id="Path_1661" data-name="Path 1661" d="M18,28.75a1.25,1.25,0,0,1-1.25-1.25V7.5a1.25,1.25,0,0,1,2.5,0v20A1.25,1.25,0,0,1,18,28.75Z" transform="translate(-8 -7.5)" fill="#fff"/>
                    <path id="Path_1662" data-name="Path 1662" d="M27.5,19.25H7.5a1.25,1.25,0,0,1,0-2.5h20a1.25,1.25,0,0,1,0,2.5Z" transform="translate(-7.5 -8)" fill="#fff"/>
                    </g>
                </svg>
                </button>
            </a>
            </li>
            <li>
            <a href="#">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.638 22.638">
                    <path d="M-4170.306-473.723h0a2.767,2.767,0,0,1-2.763-2.764v-8.8h3.01v1.5h-1.51v7.3a1.266,1.266,0,0,0,1.264,1.264,1.265,1.265,0,0,0,1.262-1.264v-19.875h18.612v19.875a2.766,2.766,0,0,1-2.763,2.764Zm2.764-2.764a2.746,2.746,0,0,1-.307,1.264h14.655a1.265,1.265,0,0,0,1.263-1.264v-18.375h-15.611Zm2.474-2.236v-1.5h10.5v1.5Zm0-4v-1.5h10.5v1.5Zm0-4v-5.5h10.5v5.5Zm1.5-1.5h7.5v-2.5h-7.5Z" transform="translate(4173.069 496.362)"/>
                </svg>
                </i>
                <span>Reports</span>
            </a>
            </li>
            <li>
            <a href="#">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M-4181.094-559.625a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-12,12A12,12,0,0,1-4181.094-559.625Zm1.5,0a10.512,10.512,0,0,0,10.5,10.5,10.513,10.513,0,0,0,10.5-10.5,10.513,10.513,0,0,0-10.5-10.5A10.512,10.512,0,0,0-4179.593-559.625Zm15.059-.46a1.414,1.414,0,0,1,1.415-1.414,1.414,1.414,0,0,1,1.415,1.414,1.414,1.414,0,0,1-1.415,1.414A1.414,1.414,0,0,1-4164.535-560.085Zm-5.74,0a1.414,1.414,0,0,1,1.415-1.414,1.414,1.414,0,0,1,1.415,1.414,1.414,1.414,0,0,1-1.415,1.414A1.414,1.414,0,0,1-4170.274-560.085Zm-5.726,0a1.414,1.414,0,0,1,1.415-1.414,1.415,1.415,0,0,1,1.416,1.414,1.415,1.415,0,0,1-1.416,1.414A1.414,1.414,0,0,1-4176-560.085Z" transform="translate(4181.094 571.625)"/>
                </svg>
                </i>
                <span>More</span>
            </a>
            </li>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MobileNavigation',
    computed: mapGetters(['getMobile']),
}
</script>
<style scoped lang="scss">
#mob_nav{
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: rgb(86 111 244 / 33%) 0 5px 12px 0;
  background-color: $white-color;
}
.mob-nav-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
  height: 90px;
  padding: 0 15px 15px 15px;

  li{
    list-style-type: none;
    display: flex;
    justify-content: center;
    width: 20%;
    position: relative;
    a{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-decoration: none;
      padding: 12px;
      font-size: 0.75rem;
      i{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 20px;
        margin-bottom: 5px;
      }
      span{
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-weight: 500;
        color: $dark;
        
      }
      button{
        border-style: none;
        background-color: $primary-color;
        display: flex;
        height: 55px;
        width: 55px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: rgb(86 111 244 / 33%) 0 5px 15px 0;
        padding: 0;
      }
    }
  }
  #add_button{
    position: absolute;
    top: -20px;
  }
}

</style>
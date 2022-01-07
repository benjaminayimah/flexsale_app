<template>
<h1 id="page_title">All Products</h1>
 <div id="all_products">
    <div class="prod-header">
        <div class="form-row" id="prod_search" :class="{ 'w-100' : getMobile}">
            <svg id="scr_icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.671 26.671">
                <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596">
                 </path>
            </svg>
            <input type="text" name="searchField" class="form-control" placeholder="Search product..." >
            <svg id="filter_icon" xmlns="http://www.w3.org/2000/svg" width="21.258" height="20.968" viewBox="0 0 21.258 20.968">
                <path d="M-10883.518-158.818h-.562a3.5,3.5,0,0,1-3.5-3.452h-4.376v-2h4.409a3.5,3.5,0,0,1,3.466-3.021h.563a3.5,3.5,0,0,1,3.466,3.021h9.354v2h-9.321A3.5,3.5,0,0,1-10883.518-158.818Zm-.562-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.563a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Zm6.968-6.022h-.561a3.506,3.506,0,0,1-3.5-3.452h-10.781v-2h10.813a3.506,3.506,0,0,1,3.469-3.021h.561a3.506,3.506,0,0,1,3.469,3.021h2.946v2h-2.914A3.506,3.506,0,0,1-10877.112-171.313Zm-.561-6.473a1.5,1.5,0,0,0-1.5,1.5v1.473a1.5,1.5,0,0,0,1.5,1.5h.561a1.5,1.5,0,0,0,1.5-1.5v-1.473a1.5,1.5,0,0,0-1.5-1.5Z" transform="translate(10891.955 179.786)" fill="#0e142c"/>
            </svg>
        </div>
         <button v-if="!getMobile" class="button button-alt add-new-btn">Add New</button>
    </div>
    <div class="prod-main">
        <div class="table">
            <div class="table-head">
                Table header
            </div>
            <div class="table-body">
                Table body
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Products',
    computed: mapGetters(['getMobile', 'getTablet', 'getDesktop']),

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
#all_products{
    padding: 0 30px;
}
#page_title{
    display: none;
}
.prod-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 4px 0;
    align-items: center;
    overflow: hidden;
    height: 56px;
}
.add-new-btn{
    height: 100%;
    font-weight: 400;
    margin-left: 15px;
}
.form-row{
    height: 100%;
}
.form-control{
  border: 1px solid #ffffff;
}
#prod_search{
  margin-bottom: 0;
  input{
    border-radius: 0.9rem;
    background-color: $primary-light;
    padding: 10px 20px 10px 50px;
    height: 100%;
    & :focus{
      border: 1px solid $primary-color !important;
    }
  }
  input::placeholder{
      color: $gray-color;
  }
  svg{
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }
  #scr_icon{
    left: 18px;
  }
  #filter_icon{
      right: 18px;
  }
}

</style>
<template>
<li style="position: relative">
    <router-link :to="'/product/'+product.id+'/'+product.name" class="a-row" >
        <div class="table-row flex-row-js" >
            <div class="flex-row-st">
                <div class="img-hold">
                    <div class="img" :style="product.image? { backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+product.image+')'} : { backgroundImage: 'url('+require('@/assets/images/preview-img.png')+')'}">
                    </div>
                </div>
                <div class="prod-capt-hold">
                    <div class="itm-name">{{ product.name }}</div>
                    <div class="flex-row-st">
                        <label>Price:</label>
                        <div class="itm-price"><span>GH₵</span>500</div>
                    </div>
                    <div class="flex-row-st">
                        <div class="flex-row-st">
                            <label>Qty:</label>
                            <div class="qty">500</div>
                        </div>
                        
                        <div class="edit-action">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                                </svg>
                                Update stock
                            </a>
                        </div>
                    </div>
                </div>
                <div class="batch-no">{{ product.batch_no }} </div>
            </div>
            <div class="menu-toggle">
                <button class="menu-toggle-btn" :id="'prod_menu_'+product.id" @click.prevent="doMenu('prod_menu_'+product.id)">
                    <i></i>
                    <i></i>
                    <i></i>
                </button>
            </div>
    
            <teleport to="body">
                <transition name="fade">
                    <backdrop v-if="toggleMenu" @mousedown="doMenu('prod_menu_'+product.id)" />
                </transition>
            </teleport>
            <transition :name="getMobile? 'slide' : ''">
                <div class="menu" v-if="toggleMenu" :class="[{ 'class-above' : classAbove && !getMobile}, { 'class-below' : !classAbove && !getMobile}, { 'menu-card-mob': getMobile}]">
                    <div class="title" v-show="getMobile">
                        <div>Menu</div>
                        <button @click.prevent="doMenu('prod_menu_'+product.id)">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                            </svg>
                        </button>
                    </div>
                    <ul>
                        <li @click.prevent="doMenu('prod_menu_'+product.id)"><router-link :to="'/product/'+product.id+'/'+product.name">View details</router-link></li>
                        <li @click.prevent="doMenu('prod_menu_'+product.id)"><a href="javascript: void">Update stock</a></li>
                        <li @click.prevent="doMenu('prod_menu_'+product.id)"><a href="javascript: void" @click.prevent="$store.commit('setDeleteModal', { id: product.id, type: 'product' } )">Delete</a></li>
                    </ul>
                </div>
            </transition>
        </div>
    </router-link>
</li>



    
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
  components: { Backdrop },
    name: 'ProductRow',
    props: ['product'],
    computed: mapGetters(['getHostname', 'getUser', 'getWindowHeight', 'getMobile']),
    data() {
        return {
            toggleMenu: false,
            classAbove: false

        }
    },
    methods: {
        doMenu(id) {
            let elem = document.getElementById(id).getBoundingClientRect().top
            if(this.toggleMenu == false) {
                this.toggleMenu = true
                document.body.classList.add('fixed-body')
                if((this.getWindowHeight-elem) > 200)
                this.classAbove = true
                else
                this.classAbove = false
            }else{
                this.toggleMenu = false
                document.body.classList.remove('fixed-body')
            }
        },
    }
    
}
</script>

<style scoped lang="scss">
.table-row{
    padding: 15px 0;
    width: 100%;
}
.img-hold{
    .img{
        height: 90px;
        width: 90px;
        border-radius: 16px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
}.prod-capt-hold{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .itm-name{
        font-weight: 700;
    }
    label{
        margin: 5px 5px 5px 0;
        color: $gray-color;
    }
}
.flex-row-st{
    align-items: center;
}
.edit-action{
    margin-left: 10px;
    a{
        color: $primary-color;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
}
.batch-no{
    padding: 20px;
}

.menu-toggle{
    align-items: center;
    display: flex;
    
}
.class-above{
  top: 55%;
}
.class-below{
    top: -100%;
}
li{
    list-style-type: none;
}
.a-row{
    display: flex;
    width: 100%;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $dark-light;
    &:hover {
        background-color: rgb(250, 250, 250);
    }
}
.menu{
    position: absolute;
    background-color: #ffffff;
    z-index: 200;
    right: 0;
    padding: 20px 0;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    //0 1px 6px 0 rgb(14 20 44 / 18%);
    border-radius: 16px;
    width: 200px;
    ul{
        padding: 0;
        list-style-type: none;
        display: flex;
        margin: 0;
        flex-direction: column;
        li{
            display: flex;
            height: 50px;
            width: 100%;
            a{
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                color: $dark;
                text-decoration: none;
                transition: 0.3s all;
                padding: 0 20px;
                font-weight: 500;
            }
            &:hover a{
                background-color: $dark-light;
            }
        }
    }
}
.menu-card-mob{
    padding: 25px 0;
    position: fixed;
    bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 1.4rem;
        button{
            border-radius: 50%;
            padding: 10px;
            background-color: #f0f3ff;
        }
    }
   
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    .acct-label .user-details{
      max-width: 100%;
    }
  }
  .slide-enter-from,
.slide-leave-to {
  transform: translateY(250px);
  
}
  
</style>
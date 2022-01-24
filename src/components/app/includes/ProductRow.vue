<template>
    <div class="table-row flex-row-js" style="position: relative">
        <div class="flex-row-st">
            <div class="img-hold">
                <div class="img" :style="{ backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+product.image+')' }">
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
            <button :id="'prod_menu_'+product.id" @click.prevent="doMenu('prod_menu_'+product.id)">
                <i></i>
                <i></i>
                <i></i>
            </button>
        </div>
   
            <teleport to="body">
                <backdrop v-if="toggleMenu" @click.prevent="doMenu('prod_menu_'+product.id)" />
            </teleport>
            <div class="menu" v-if="toggleMenu" :class="[{ 'class-above' : classAbove}, { 'class-below' : !classAbove}]">
                <ul>
                    <li><a href="#">View product</a></li>
                    <li><a href="#">Edit details</a></li>
                    <li><a href="#">Update stock</a></li>
                    <li><a href="#">Delete</a></li>

                </ul>
            </div>
        <!-- </div> -->
        
    </div>
    <!-- <teleport to="#main_home" v-if="toggleMenu">
        <backdrop @click.prevent="doMenu('prod_menu_'+product.id)" />
        <div class="menu" :style="{ top: getFloatingDiv.top+30+'px'}">
            <ul>
                <li>
                    <a href="#">{{ product.name }}</a>
                </li>
            </ul>
        </div>
    </teleport> -->
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
  components: { Backdrop },
    name: 'ProductRow',
    props: ['product'],
    computed: mapGetters(['getHostname', 'getUser', 'getWindowHeight']),
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
                if((this.getWindowHeight-elem) > 250)
                this.classAbove = true
                else
                this.classAbove = false
            }else{
                this.toggleMenu = false
            }
        },
    }
    
}
</script>

<style scoped lang="scss">
.table-row{
    padding: 20px 0;
    border-bottom: 1px solid $dark-light;
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
    button{
        height: 40px;
        width: 40px;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        transition: 0.4s;
        padding: 0;
        &:hover{
            background-color: $primary-light;
            i{
                background-color: $primary-color;
            }
        }
        i{
            height: 4px;
            width: 4px;
            background-color: $dark;
            border-radius: 50%;
            margin-right: 4px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
}
.class-above{
  top: 53%;
}
.class-below{
    top: -130%;
}
.menu{
    position: absolute;
    background-color: #ffffff;
    z-index: 33301;
    right: 0;
    
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    //0 1px 6px 0 rgb(14 20 44 / 18%);
    border-radius: 16px;

    width: 200px;
    ul{
        list-style-type: none;
        display: flex;
        margin: 0;
        padding: 20px 0;
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
</style>
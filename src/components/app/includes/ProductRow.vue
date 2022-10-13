<template>
<li style="position: relative">
    <router-link :to="!getBulkSelection.active ? { name: 'ProductDetailsBasic', params: { id: product.id, name: product.name } } : ''" @click.prevent="getBulkSelection.active ? doSelect(product.id) : ''" class="a-row" :class="computeSelected ? 'isSelected' : 'notSelected'">
        <div class="table-row flex-row-js" >
            <div class="flex-row-st">
                <button v-if="product.deleted && getBulkSelection.active" class="check-btn">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="14" viewBox="0 0 28.454 20.383">
                        <path d="M1126.264,386.512l-9.779-10.489,2.194-2.046,7.686,8.243,16.478-16.092,2.1,2.146Z" transform="translate(-1116.485 -366.129)" />
                    </svg>
                </button>
                <div class="img-hold">
                    <div class="img bg-img" :style="product.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+product.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                </div>
                <div class="prod-capt-hold">
                    <div class="itm-name">{{ product.name }}</div>
                    <div class="flex-row-st">
                        <label>Price:</label>
                        <div class="itm-price" :class="{ 'has-discount': product.discount !== null && product.selling_price != 0 && computePrice !== 0 }"><span class="currency">{{ getCurrency }}</span>{{ Intl.NumberFormat('en-US').format(product.selling_price) }}</div>
                        <div class="discount-price" v-if="product.discount !== null  && product.selling_price != 0 && computePrice !== 0"><span class="currency">{{ getCurrency }}</span><span>{{ Intl.NumberFormat('en-US').format(computePrice.toFixed(2)) }}</span></div>
                    </div>
                    <div class="flex-row-st">
                        <div class="flex-row-st">
                            <label>Stock:</label>
                            <div class="qty">{{ product.stock }}</div>
                        </div>
                    </div>
                    <div class="time-remains flex">
                        <span>{{ computeDateRemain }}</span>
                    </div>
                </div>
            </div>
            <div class="menu-toggle" v-if="!getBulkSelection.active">
                <button class="menu-toggle-btn" :id="'prod_menu_'+product.id" @click.prevent="doMenu('prod_menu_'+product.id)">
                    <i></i>
                    <i></i>
                    <i></i>
                </button>
            </div>
            <teleport to="body">
                <transition name="fade">
                    <backdrop v-if="toggleMenu" @mousedown="dismissMenu" />
                </transition>
            </teleport>
            <transition :name="getMobile? 'slide' : ''">
                <div class="menu" v-if="toggleMenu" :class="[{ 'class-above' : classAbove && !getMobile}, { 'class-below' : !classAbove && !getMobile}, { 'menu-card-mob': getMobile}]">
                    <div class="title" v-show="getMobile">
                        <div>Menu</div>
                        <button @click.prevent="dismissMenu">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                            </svg>
                        </button>
                    </div>
                    <ul @mouseup="dismissMenu">
                        <li v-if="!product.deleted"><router-link :to="{ name: 'ProductDetailsBasic', params: { id: product.id, name: product.name }}">View details</router-link></li>
                        <li v-if="!product.deleted"><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'product', id: product.id })">Edit product</a></li>
                        <li v-if="!product.deleted"><a href="#" @click.prevent="$store.commit('setSelectionSheet', { type: 'tag', id: product.id })">Add to Tag</a></li>
                        <li v-if="!product.deleted"><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'stock', id: product.id })">Update stock</a></li>
                        <li v-if="product.deleted"><a href="#" @click.prevent="$store.dispatch('restoreThisProduct', product.id)">Restore</a></li>
                        <li><a :class="{ 'perm-delete' : product.deleted }" href="#" @click.prevent="$store.commit('setDeleteModal', { id: product.id, type: product.deleted ? 'product' : 'trash' })">{{ !product.deleted ? 'Move to Trash' : 'Delete' }}</a></li>
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
    data() {
        return {
            toggleMenu: false,
            classAbove: false
        }
    },
    computed: {
        ... mapGetters(['getHostname', 'getUser', 'getWindowHeight', 'getMobile', 'getDefaultImage', 'getCurrency', 'getDiscounts', 'getUserAdminID', 'getBulkSelection']),
        computeDiscount: function () {
            if(this.getDiscounts.length > 0) {
                return this.getDiscounts.find(discount => discount.id == this.product.discount)
            }else{
                return false
            }
        },
        computePrice() {
            if(this.product.discount !== null && this.computeDiscount && this.computeDiscount.active == 1 ) {
                if(this.computeDiscount.percentage == 1 && this.product.selling_price > 0 ) {
                    let price = this.product.selling_price - ((this.computeDiscount.value)/100) * this.product.selling_price
                    return price
                }else{
                    let price = this.product.selling_price - this.computeDiscount.value
                    return price
                }
            }else {
                return 0
            }
        },
        computeSelected() {
            const find = this.getBulkSelection.array.find(item => item === this.product.id)
            if(find)
            return true
            else
            return false
        },
        computeDateRemain() {
            if(this.product.deleted){
                const deletedDate = new Date(this.product.updated_at);
                const expiryDate = deletedDate.setDate(deletedDate.getDate() + 30);
                const diff = Math.abs(expiryDate - new Date());
                return Math.ceil(diff / (1000 * 60 * 60 * 24)) + ' days untill permanent deletion'; 
            }else
            return ''
        }
        
    },
    methods: {
        doMenu(id) {
            let elem = document.getElementById(id).getBoundingClientRect().top
            this.toggleMenu = true
            document.body.classList.add('fixed-body')
            if((this.getWindowHeight-elem) > 300)
            this.classAbove = true
            else
            this.classAbove = false
        },
        dismissMenu() {
            this.toggleMenu = false
            document.body.classList.remove('fixed-body')
        },
        doSelect(id){
            const find = this.getBulkSelection.array.find(item => item === id)
            find ? this.$store.commit('removeFromSelections', id) : this.$store.commit('addToSelections', id)
        }
    }
    
}
</script>

<style scoped lang="scss">
.a-row{
    display: flex;
    width: 100%;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $dark-light;
    &:hover {
        .check-btn{
            border: 1px solid $primary-color;
            background-color: #d7dcf8;
        }
    }
}
.notSelected{
    &:hover {
        background-color: rgb(250, 250, 250);
    }
}
.isSelected{
    background-color: $primary-light;
    .check-btn{
        background-color: $primary-color !important;
    }
}

.table-row{
    padding: 15px 0;
    width: 100%;
}
.img-hold{
    .img{
        height: 90px;
        width: 90px;
        border-radius: 16px;
    }
}
.prod-capt-hold{
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


.class-above{
  top: 55%;
}
.class-below{
    top: -120%;
}
li{
    list-style-type: none;
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


.check-btn{
    margin-right: 15px;
}


.slide-enter-from,
.slide-leave-to {
  transform: translateY(350px);
}
  
</style>
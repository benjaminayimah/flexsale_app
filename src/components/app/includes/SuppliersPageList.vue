<template>
    <li>
        <router-link :to="{ name: 'DetailedSupplier', params: { id: supplier.id, name: supplier.name} }">
            <div class="image-hold">
                <div class="bg-img" v-if="supplier.image" :style="{backgroundImage: 'url('+require('@/assets/images/profiles/'+supplier.image)+')'}"></div>
                <span v-else :style="{ backgroundColor: this.color}">{{ computeInitials }}</span>
            </div>
            <div class="flex-row-js info-section-hold">
                <div class="supplier-info">
                    <div class="flex align-items-center">
                        <span class="name">{{ supplier.name }}</span>
                    </div>
                    <div class="flex align-items-center mrg" v-if="supplier.phone">
                        <label>Phone:</label><span>{{ supplier.phone }}</span>
                    </div>
                    <div class="flex align-items-center" v-if="supplier.location">
                        <label>Location:</label><span>{{ supplier.location }}</span>
                    </div>
                </div>
                <div class="menu-toggle">
                    <button class="menu-toggle-btn" :id="'supplier_menu_'+supplier.id" @click.prevent="doMenu('supplier_menu_'+supplier.id)">
                        <i></i>
                        <i></i>
                        <i></i>
                    </button>
                </div>
            </div>
        </router-link>
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
                    <li><router-link :to="{ name: 'DetailedSupplier', params: { id: supplier.id, name: supplier.name} }">View details</router-link></li>
                    <li><a href="javascript: void" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'supplier', id: supplier.id})">Edit</a></li>
                    <li><a href="#" @click.prevent="$store.commit('setDeleteModal', { id: supplier.id, type: 'supplier' } )">Delete</a></li>
                </ul>
            </div>
        </transition>
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
  components: { Backdrop },
    name: 'SuppliersPageList',
    props: ['supplier'],
    data() {
        return {
            color: '',
            toggleMenu: false,
            classAbove: false
        }
    },
    computed: {
        ...mapGetters(['getWindowHeight', 'getMobile']),
        computeInitials() {
            if(this.supplier.image == '' || this.supplier.image == null) {
                let name = this.supplier.name.split(' ')
                let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
                return initial
            }else{
                return ''
            }
        }
    },
    methods: {
        doMenu(id) {
            let elem = document.getElementById(id).getBoundingClientRect().top
            this.toggleMenu = true
            document.body.classList.add('fixed-body')
            if((this.getWindowHeight-elem) > 200)
            this.classAbove = true
            else
            this.classAbove = false
        },
        dismissMenu() {
            this.toggleMenu = false
            document.body.classList.remove('fixed-body')
        }
    },
    created() {
        var colors = ['#5C74F7', '#3EC0D1', '#D94EE5', '#FAB23F', '#44C749', '#2B2A2A', '#FA4848', '#0076FF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
}
</script>
<style scoped lang="scss">
.mrg{
    margin: 4px 0;
}

li {
    position: relative;
    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        &:hover{
            background-color: rgb(250, 250, 250);
        }
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
  .class-above{
  top: 55%;
}
.class-below{
    top: -100%;
}
  .slide-enter-from,
    .slide-leave-to {
  transform: translateY(250px);
  
}
</style>
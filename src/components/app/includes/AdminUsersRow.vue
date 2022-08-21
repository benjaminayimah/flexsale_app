<template>
    <div class="row flex" :class="admin.role == '1' ? 'owner-row' : 'seller-row'">
        <div class="flex-col">
            <div class="flex align-items-center">
                <div class="admin-name">{{ admin.name }}</div>
                <span class="separator-dot"></span>
                <div class="pill">{{ admin.role == '1' ? 'Owner' : 'Seller' }}</div>
            </div>
            <div class="admin-email">{{ admin.email }}</div>
            <div class="access flex-col" v-if="admin.role != '1'">
                <h4 v-if="computeAccess1.length > 0 || computeAccess2.length > 0">Can access:</h4>
                <div v-for="access in computeAccess1" :key="access.id" class="flex accesses">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg>
                    <div class="flex-col">
                        <span class="name">{{ access.name }}</span>
                        <span class="address">{{ access.address }}</span>
                    </div>
                </div>
                <div v-for="access in computeAccess2" :key="access.id" class="flex align-items-center accesses">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg>
                    <div class="flex-col">
                        <span class="name">{{ access.name }}</span>
                        <span class="address">{{ access.address }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-toggle" v-if="admin.role != '1'" :id="'supplier_menu_'+admin.id" @click.prevent="doMenu('supplier_menu_'+admin.id)">
            <button class="menu-toggle-btn">
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
                    <li><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'admin', id: admin.id})">Edit user</a></li>
                    <li><a href="#" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'pass', type: 'admin', id: admin.id})">Reset password</a></li>
                    <li><a href="#" @click.prevent="$store.commit('setDeleteModal', { id: admin.id, type: 'user' } )">Delete</a></li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
export default {
  components: { Backdrop },
    name: 'AdminUsersRow',
    props: ['admin'],
    data() {
        return {
            toggleMenu: false,
            classAbove: false
        }
    },
    computed: {
        ...mapGetters(['getStores', 'getWindowHeight', 'getMobile']),
        computeAccess1() {
            return this.getStores.filter(store => store.id == this.admin.store_1)
        },
        computeAccess2() {
            return this.getStores.filter(store => store.id == this.admin.store_2)
        }
    },
    methods: {
        doMenu(id) {
            let elem = document.getElementById(id).getBoundingClientRect().top
            this.toggleMenu = true
            document.body.classList.add('fixed-body')
            if((this.getWindowHeight-elem) > 210)
            this.classAbove = true
            else
            this.classAbove = false
        },
        dismissMenu() {
            this.toggleMenu = false
            document.body.classList.remove('fixed-body')
        }
    }
}
</script>
<style scoped lang="scss">
.row{
    border-bottom: 1px solid $dark-light;
    justify-content: space-between;
    padding: 20px;
    border-radius: 2px;
    position: relative;
}
.flex-col{
    gap: 6px;
}
.access{
    gap: 10px;
    svg{
        margin-top: 4px;
        margin-right: 10px;
    }
}

h4{
    margin: 5px 0;
    text-decoration: underline;
    color: $gray-color;
}
.edit-btn{
    background-color: transparent;
    margin-right: -15px;
    span{
        margin-left: 8px;
    }
    path{
        transition: 0.3s all;
    }
    &:hover{
        color: $primary-color;
        path{
            fill: $primary-color;
        }
    }
}
 .admin-name{
        font-weight: 700;
        text-transform: capitalize;
}
.admin-email{
    color: $gray-color;
}
.pill{
    font-size: 13px;
    font-weight: 600;
    border-radius: 18px;
    padding: 6px 8px;
}
.seller-row{
    &:hover {
        background-color: rgb(250, 250, 250);
    }
    .pill{
        background-color: hsla(195, 91%, 54%, 0.165);
        color: #1DBEF4;
    }

}
.owner-row{
    background-color: #ebedf0;
    opacity: 0.6;
    color: $gray-color;

    .pill{
        background-color: #D4D8DE;
        color: #434752;
    }
}
.accesses{
    align-items: flex-start;
    .name{
        font-weight: 600;
    }
    .address{
        color: $gray-color;
        font-size: 14px;
    }
}
.class-above{
  top: 28%;
}
.class-below{
    top: -50%;
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
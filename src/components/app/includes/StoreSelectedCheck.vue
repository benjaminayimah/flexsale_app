<template>
    <li>
        <a href="#" :id="'store_'+store.id" @click.prevent="doCheck(store.id)" class="flex" :class="{ 'active' : active}">
            <button class="button check-btn" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg"  height="14" viewBox="0 0 28.454 20.383">
                    <path d="M1126.264,386.512l-9.779-10.489,2.194-2.046,7.686,8.243,16.478-16.092,2.1,2.146Z" transform="translate(-1116.485 -366.129)" />
                </svg>
            </button>
            <div class="flex-col store-info">
                <div>{{ store.name }}</div>
                <span>{{ store.address }}</span>
            </div>
        </a>
    </li>
</template>
<script>
export default {
    name: 'StoreSelectedCheck',
    props: ['store', 'checked'],
    data() {
        return {
            active: false
        }
    },
    methods: {
        doCheck(id) {
            const newObj = {
                id: id
            }
            this.$emit('check',newObj)
            this.active = !this.active
        }
    }

}
</script>
<style scoped lang="scss">
li{
    display: flex;
    &:hover{
        a{
            background-color: hsla(223, 19%, 93%, 0.4);
        }
        .check-btn{
            border: 1px solid $primary-color;
            background-color: #d7dcf8;
        }
    }
}
a{
    color: inherit;
    text-decoration: none;
    gap: 10px;
    padding: 12px 8px;
    border-radius: 12px;
    transition: 0.3s all;
    width: 100%;
}
.store-info{
    div{
        font-weight: 600;
    }
    span{
        color: $gray-color;
    }
}
.check-btn{
    display: flex;
    background-color: $dark-light;
    border-radius: 50%;
    height: 38px;
    width: 38px;
    padding: 0;
    border: 1px solid transparent;

    svg path{
        fill: #ffffff;
    }
}
.active{
    button{
        background-color: $primary-color !important;
    }
}
</style>
<template>
    <li>
        <a href="#" @click.prevent="toggleActive(product.id, product.name, product.batch_no, product.image)" :class="{ 'active' : active}">
            <div class="flex-row">
                <div class="prd-img bg-img" :style="product.image ? { backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+product.image+')' } : { backgroundImage: 'url('+require('@/assets/images/preview-img.png')+')'}"></div>
                <div class="prod-captions">
                    <div class="item-name">{{ product.name }}</div>
                    <div><label>Price:</label><span>GH₵500</span></div>
                    <div>{{ product.batch_no }}</div>
                </div>
            </div>
            <button class="button" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg"  height="18" viewBox="0 0 28.454 20.383">
                    <path d="M1126.264,386.512l-9.779-10.489,2.194-2.046,7.686,8.243,16.478-16.092,2.1,2.146Z" transform="translate(-1116.485 -366.129)" />
                </svg>
            </button>
        </a>
        <hr>
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AddTagRow',
    props: ['product'],
    computed: mapGetters(['getCheckedProducts', 'getHostname', 'getUser']),
    data() {
        return {
            active: false
        }
    },
    methods: {
        toggleActive(id, name, batch_no, image) {
            const checkedArray = { id: id, name: name, batch_no: batch_no, image: image }
            if(!this.active) {
                this.active = true
                this.$store.commit('addCheckedProdToArray', checkedArray)
            }else{
                this.active = false
                this.$store.commit('removeCheckedProdFromArray', checkedArray)
            }
            
        },
        checkSelected() {
            for (let i = 0; i < this.getCheckedProducts.length; i++) {
                if (this.getCheckedProducts[i] && (this.getCheckedProducts[i].id === this.product.id )) {
                    this.active = true
                } 
            }
        }
    },
    beforeMount() {
        this.checkSelected()
    }
}
</script>
<style scoped lang="scss">
li{
    &:last-child hr{
        margin-top: 40px;
        visibility: hidden;
    }
    &:hover .button{
        background-color: $dark-light;
        //border: 1px solid $primary-light;
    }
    a{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        justify-content: space-between;
        padding: 15px;
        border-radius: 12px;
        transition: 0.2s all;
        //border: 1px $dark-light solid;
        transition: 0.3s all;
        &:hover{
            background-color: hsla(223, 19%, 93%, 0.4);
        }
        .button{
            display: flex;
            background-color: $primary-light;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            padding: 0;
        }
        svg path{
            fill: #ffffff;
        }
    }
    .prod-captions{
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        color: $dark;
        font-size: 0.9rem;
        div{
            display: flex;
            align-items: center;
        }
        label{
            margin: 0 5px 0 0;
            color: $gray-color;
            font-weight: 600;
        }
    }
    .item-name{
        font-weight: 700;
    }
    .prd-img{
        height: 70px;
        width: 70px;
        border-radius: 10px;
        background-color: $dark-light;
    }
    hr{
        border-color: $dark-light;
        margin: 0 20px;
    }

}
.active{
    border: 1px $primary-color solid !important;
    .button{
        background-color: $primary-color !important;
    }
}

</style>
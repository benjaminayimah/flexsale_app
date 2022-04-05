<template>
    <li :style="{ transform: 'translateX('+parseInt(supplier.index * 82+(transitionVal))+'px )'}" :title="supplier.name">
        <div class="a-wrap">
            <a href="" class="bg-img" v-if="supplier.image" :style="{backgroundImage: 'url('+require('@/assets/images/profiles/'+supplier.image)+')'}"></a>
            <a href="" v-else><span :style="{ backgroundColor: this.color}">{{ computeInitials }}</span></a>
        </div>
    </li>
</template>
<script>
export default {
    name: 'SupplierListItems',
    props: ['supplier'],
     data() {
        return {
            transitionVal: 0,
            color: ''
        }
    },
    computed: {
        computeInitials() {
            if(this.supplier.image == '') {
                let name = this.supplier.name.split(' ')
                let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
                return initial
            }else{
                return false
            }
        }
    },
    created() {
        var colors = ['#5C74F7', '#3EC0D1', '#D94EE5', '#FAB23F', '#44C749', '#2B2A2A', '#FA4848', '#0076FF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
}
</script>
<style scoped lang="scss">
li{
    height: 100%;
    position: absolute;
    a{
        border: 1px solid $dark-light;
        border-radius: 50%;
        height: 100%;
        width: 70px;
        display: flex;
        text-decoration: none;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
            display: flex;
            height: 100%;
            width: 100%;
            border-radius: inherit;
            //background-color: $primary-color;
            color: #ffffff;
            font-size: 22px;
            font-weight: 600;
        }

    }
    
}
.a-wrap{
    padding: 0 10px;
    height: 100%;
}

</style>
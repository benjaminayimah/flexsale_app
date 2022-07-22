<template>
<div class="list" @click="doSelect(tag.id, prodID)">
     <div class="grid-item">
        <div v-for="product in computedFilters.slice(0, 9)" :key="product.id" class="grid-sub-items bg-img" :style="product.image ? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getUser.current+'/'+product.image+')' } : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
    </div>
    <div class="title-hold gap-4">
        <h3>{{ tag.name }}</h3>
        <div class="flex"><span>{{ computedFilters.length }}</span><div>items</div></div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'TagSelectionGridItem',
    props: ['tag', 'prodID'],
    computed: {
        ...mapGetters(['getAllFilters', 'getHostname', 'getUser', 'getDefaultImage', 'getUserAdminID', 'getToken', 'getCurrentStore']),
        computedFilters: function (){
            return this.getAllFilters.filter(item => item.tag_id == this.tag.id)
        }
    },
    methods: {
        doSelect(tag,prod) {
            const payload = { tagID: tag, productID: prod }
            axios.post(this.getHostname+'/api/addthis-to-tag?token='+this.getToken,
                payload, {
                    headers: {
                        'Content-Type': ['application/json']
                    },
                }
            ).then((res) => {
                if(res.data.tag) {
                    this.$store.commit('addToTagItems', res.data.tag)
                }
                const successPayload = {
                    id: 'success',
                    body: res.data.status
                }
                this.$store.commit('showAlert', successPayload)
                this.$store.commit('unSetSelectionSheet')
            }).catch((err) => {
                console.log(err.response)
                
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.grid-item{
    display: grid;
    border: 1px solid $dark-light;
    height: 200px;
    border-radius: $r-20;
    position: relative;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0;
    &:hover {
        border: none;
        cursor: pointer;
        box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    }
}
$r-20: 20px;

.grid-sub-items{
    background-color: $gray-light;
    &:first-child{
        border-top-left-radius: $r-20;
    }&:nth-child(3) {
        border-top-right-radius: $r-20;
    }
    &:nth-child(7) {
        border-bottom-left-radius: $r-20;
    }&:nth-child(9) {
        border-bottom-right-radius: $r-20;
    }
}
.title-hold{
    margin: 12px 0;
    h3{
        margin: 0 0 3px 0;
        font-weight: 600;
        font-size: 1rem;
    }
    span{
        margin-right: 4px;
    }
    div {
        color: $gray-color;
    }
}
</style>
<template>
    <form id="tag_form">
        <div class="form-row">
            <label>{{ getTempContainer.active? 'Tag name' : 'Give a title to your tag' }}:</label>
            <input v-model="form.tag" type="text" name="tagName" class="form-control" placeholder="Tag title eg. tooth paste or new arrivals" required>
            <span class="validation-err" v-if="validation.error && validation.errors.tag">
                {{ validation.errors.tag[0] }}
            </span>
        </div>
        <div class="form-row mb-0">
            <div v-if="this.getCheckedProducts.length > 0">
                <div class="header-holder flex-row-js">
                    <div>
                        <span class="count">{{ getCheckedProducts.length }}</span><span>items in this group</span>
                    </div>
                    <div>
                        <button class="flex-row button add-more" @click.prevent="$store.commit('setSelectionSheet')">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 16.721 16.72">
                                <path d="M-23237.838-313.921v-6.359h-6.359a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6.359v-6.359a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6.359h6.359a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6.359v6.359a1,1,0,0,1-1,1A.994.994,0,0,1-23237.838-313.921Z" transform="translate(23245.201 329.643)" fill="#0e142c"/>
                            </svg>
                            <span>Add more</span>
                        </button>
                    </div>
                </div>
                <!-- :style="{maxHeight: (getWindowHeight-380)+'px'}" -->
                <div class="selected-products-hold">
                    <ul style="margin-top:20px">
                        <selected-tag-row v-for="checked in this.getCheckedProducts" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="getTempContainer.editMode" />
                    </ul>
                </div>
            </div>
            <div v-else style="margin-bottom: 30px">
                <label>Products:</label>
                <button id="tag_big_add" class="button-secondary" @click.prevent="$store.commit('setSelectionSheet')">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
                    </div>
                    <span>Add products to this group</span>
                </button>
                <span class="validation-err" v-if="validation.error && validation.errors.products">
                    {{ validation.errors.products[0] }}
                </span>
            </div>
        </div>
        <teleport to="#form_submit_btn_holder">
            <div class="btn-wrap2">
                <button v-if="!getTempContainer.active" class="button button-primary" @click.prevent="submitTag">Submit</button>
                <button v-else class="button button-primary" @click.prevent="submitEditTag">Save changes</button>
            </div>
        </teleport>
    </form>
     <select-products-overlay v-if="getSelectionSheet" v-bind:thisWidth="thisWidth" v-bind:windowHeight="getWindowHeight" />
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SelectedTagRow from '../includes/SelectedTagRow.vue'
import SelectProductsOverlay from '../includes/SelectProductsOverlay.vue'
export default {
  components: { SelectedTagRow, SelectProductsOverlay },
    computed: mapGetters(['getCheckedProducts', 'getWindowHeight', 'getToken', 'getHostname', 'getSelectionSheet', 'getTempContainer']),
    name: 'AddNewTag',
    props: ['thisWidth'],
    data() {
        return {
            form: {
                tag: '',
                products: [],
                id: ''
            },
            validation: {
                error: false,
                errors: [],
                message: ''
            }
        }
    },
    methods: {
        async submitTag() {
            this.form.products = this.getCheckedProducts
            axios.post( this.getHostname+'/api/tag?token='+this.getToken, this.form
            ).then((res) => {
                //console.log(res)
                if(res.data.status === 1) {
                    this.$store.commit('addToTags', res.data.tag)
                    this.$store.commit('fetchFilters', res.data.filters)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth')
                }
                if(res.data.status === 2) {
                    const payload = {
                        id: 'danger',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    
                }
            }).catch((err) => {
                console.log(err.response)
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })
        },
        async submitEditTag() {
            this.form.products = this.getCheckedProducts
            axios.put( this.getHostname+'/api/tag/'+this.form.id+'?token='+this.getToken, this.form)
            .then((res) => {
                if(res.data.status === 1) {
                    const newData = {
                        tags: res.data.tags, data: { id: this.form.id, name: this.form.tag}
                    }
                    this.$store.commit('updateTags', newData)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth')
                    this.$router.push({ name: 'DetailedTag', params: { id: this.form.id, name: this.form.tag }, replace: true })
                }
                if(res.data.status === 2) {
                    const payload = {
                        id: 'danger',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    
                }
                //location.reload()

                // const id = res.data.id
                // const name = res.data.name
                // this.$router.push({ name: 'DetailedTag', params: { id,name } })
                // this.$route.params = name
                //this.$router.push({ path: `/tag/${id}/${name}` }) // -> /user/123
            }).catch((err) => {
                console.log(err.response)
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })


        },
        buttonHeight() {
            let elem = document.getElementById('tag_big_add')
            let elemWidth = elem.offsetWidth
            //let me = elem.offsetHeight = +'px'
            //elem.style.height = parseInt(elemWidth/2)+'px'
            console.log(elemWidth/2)
            
        },
        preloadForEdit() {
            if(this.getTempContainer.active){
                this.form.tag = this.getTempContainer.data.name
                this.form.id = this.getTempContainer.data.id
            }
        }
    },
    beforeMount() {
        this.preloadForEdit()
    }
    
}
</script>

<style scoped lang='scss'>

#tag_big_add{
    width: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    flex-direction: column;
    height: 300px;
    background-color: $dark-light;
    border-style: dashed;
    border-width: 1px;
    div{
        height: 70px;
        width: 70px;
        border-radius: 50%;
        background-color: rgba(86, 110, 244, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s all;
        &:hover{
            background-color: rgba(86, 110, 244, 0.2);
        }
        &:active{
            box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            border: 1px solid $primary-color;
            background-color: $primary-light;
        }
    }
    span{
        font-size: 1rem;
        font-weight: 600;
        padding: 15px 0;
    }
}


ul{
    list-style-type: none;
    margin: 0;
    padding-left: 0;
}
.count{
    color: $primary-color;
}
.validation-err{
    color: $danger;
}

</style>
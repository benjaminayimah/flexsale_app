<template>
    <teleport to="#add_title">
        <span>{{ getTempContainer.active ? 'Edit Tag' : 'Create New Tag'}}</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button v-if="!getTempContainer.active" class="button button-primary top-submit-btn" @click.prevent="submitTag" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <span>{{ submiting ? 'Creating' : 'Create' }}</span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
        <button v-else class="button button-primary top-submit-btn" @click.prevent="submitEditTag" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <span>{{ submiting ? 'Saving' : 'Save' }}</span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="tag_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.tag}">
                <label>{{ getTempContainer.active? 'Tag name' : 'Give a title to your tag' }}:</label>
                <input v-model="form.tag" type="text" name="tagName" class="form-control" placeholder="Tag title eg. tooth paste or new arrivals" required>
                <span class="span" v-if="validation.error && validation.errors.tag">
                    {{ validation.errors.tag[0] }}
                </span>
            </div>
            <div class="form-row mb-0">
                <div v-if="this.getTempContainer.array.length > 0">
                    <div class="header-holder flex-row-js">
                        <div>
                            <span class="count">{{ getTempContainer.array.length }}</span><span>items in this tag</span>
                        </div>
                        <div>
                            <button class="flex-row button add-more" @click.prevent="$store.commit('setSelectionSheet', { type: 'product' })">
                                <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 16.721 16.72">
                                    <path d="M-23237.838-313.921v-6.359h-6.359a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6.359v-6.359a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6.359h6.359a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6.359v6.359a1,1,0,0,1-1,1A.994.994,0,0,1-23237.838-313.921Z" transform="translate(23245.201 329.643)" fill="#0e142c"/>
                                </svg>
                                <span>Add more...</span>
                            </button>
                        </div>
                    </div>
                    <div class="selected-products-hold">
                        <ul style="margin-top:20px">
                            <selected-tag-row v-for="checked in this.getTempContainer.array" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="getTempContainer.editMode" v-bind:addMode="true" />
                        </ul>
                    </div>
                </div>
                <div v-else style="margin-bottom: 30px" :class="{ 'input-has-error' : validation.error && validation.errors.products}">
                    <label>Products:</label>
                    <button id="tag_big_add" class="button-secondary" @click.prevent="$store.commit('setSelectionSheet', { type: 'product' })">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
                        </div>
                        <span>Add products to this tag</span>
                    </button>
                    <span class="span" v-if="validation.error && validation.errors.products">
                        {{ validation.errors.products[0] }}
                    </span>
                </div>
            </div>
        </form>
    </teleport>
    <select-products-overlay v-if="getSelectionSheet.selectProd"/>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SelectedTagRow from '../includes/SelectedTagRow.vue'
import SelectProductsOverlay from '../includes/SelectProductsOverlay.vue'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from '../includes/Spinner.vue'
export default {
  components: { SelectedTagRow, SelectProductsOverlay, Spinner },
    computed: mapGetters(['getToken', 'getHostname', 'getSelectionSheet', 'getTempContainer', 'getCurrentStore']),
    name: 'AddNewTag',
    mixins: [ validationMixin ],
    data() {
        return {
            form: {
                tag: '',
                products: [],
                id: ''
            }
        }
    },
    methods: {
        submitTag() {
            this.submiting = true
            this.form.products = this.getTempContainer.array
            axios.post( this.getHostname+'/api/tag?token='+this.getToken, this.form,
            ).then((res) => {
                this.submiting = false
                if(res.data.status === 1) {
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('addToTags', res.data.tag)
                    this.$store.commit('fetchFilters', res.data.filters)
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
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
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })
        },
        submitEditTag() {
            this.submiting = true
            this.form.products = this.getTempContainer.array
            axios.put( this.getHostname+'/api/tag/'+this.form.id+'?token='+this.getToken, this.form)
            .then((res) => {
                this.submiting = false
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
                    this.$store.commit('unsetMainHomeWidth', true)
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
            }).catch((err) => {
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })


        },
        buttonHeight() {
            let elem = document.getElementById('tag_big_add')
            let elemWidth = elem.offsetWidth
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
<template>
    <form id="tag_form">
        <div class="form-row">
            <label>Give a title to your tag:</label>
            <input v-model="form.tag" type="text" name="tagName" class="form-control" placeholder="Tag title eg. tooth paste or new arrivals" required>
            <span class="validation-err" v-if="validation.error && validation.errors.tag">
                {{ validation.errors.tag[0] }}
            </span>
        </div>
        <div class="form-row mb-0">
            <div v-if="this.getCheckedProducts.length > 0">
                <div class="header-holder flex-row-js">
                    <div>
                        <span class="count">{{ getCheckedProducts.length }}</span><span>items are added to your group</span>
                    </div>
                    <div>
                        <button class="flex-row button add-more" @click.prevent="doProductSelection">
                            <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 16.721 16.72">
                                <path d="M-23237.838-313.921v-6.359h-6.359a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6.359v-6.359a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6.359h6.359a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6.359v6.359a1,1,0,0,1-1,1A.994.994,0,0,1-23237.838-313.921Z" transform="translate(23245.201 329.643)" fill="#0e142c"/>
                            </svg>

                            <span>Add more</span>
                        </button>
                    </div>
                </div>
                <div class="selected-products-hold" :style="{maxHeight: (getWindowHeight-380)+'px'}">
                    <ul style="margin-top:20px">
                        <selected-tag-row v-for="checked in this.getCheckedProducts" :key="checked.id" v-bind:checkedProduct="checked" />
                    </ul>
                </div>
            </div>
            <div v-else>
                <label>Products:</label>
                <button id="tag_big_add" class="button-secondary" @click.prevent="doProductSelection">
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
        <div class="btn-wrap2 flex-row">
            <button class="button button-primary" @click.prevent="submitTag">Submit</button>
        </div>
    </form>
     <teleport to="#main_home" v-if="selectionSheet">
        <tertiary-backdrop />
        <div class="product-selection-sheet" :style="{width: thisWidth+'px'}">
            <div style="width:75%">
                 <div class="selection-main">
                    <button @click.prevent="doProductSelection" class="dismiss">
                        <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                            <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#ffffff"/>
                        </svg>
                    </button>
                    <div class="selection-header">
                        <div class="header-holder">
                            <div>
                                <span class="count">{{ getCheckedProducts.length }}</span><span>items are added to your group</span>
                            </div>
                        </div>
                    </div>
                    <div class="selection-body" :style="{height: (getWindowHeight-280)+'px'}">
                        <ul>
                            <add-tag-row v-for="product in getProducts" :key="product.id" v-bind:product="product" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
    
    
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import TertiaryBackdrop from '../includes/TertiaryBackdrop.vue'
import AddTagRow from '../includes/AddTagRow.vue'
import SelectedTagRow from '../includes/SelectedTagRow.vue'
export default {
  components: { TertiaryBackdrop, AddTagRow, SelectedTagRow },
    computed: mapGetters(['getProducts', 'getCheckedProducts', 'getWindowHeight', 'getToken', 'getHostname']),
    name: 'AddNewTag',
    props: ['thisWidth'],
    data() {
        return {
            form: {
                tag: '',
                products: []
            },
            selectionSheet: false,
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
                console.log(res)
                if(res.data.status === 1) {
                    this.$store.commit('addToTags', res.data.tags)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
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
        buttonHeight() {
            let elem = document.getElementById('tag_big_add')
            let elemWidth = elem.offsetWidth
            //let me = elem.offsetHeight = +'px'
            //elem.style.height = parseInt(elemWidth/2)+'px'
            console.log(elemWidth/2)
            
        },
        doProductSelection() {
            this.selectionSheet = !this.selectionSheet
        }
    }
    
}
</script>

<style scoped lang='scss'>
.btn-wrap2{
    height: 80px;
    button{
        height: 48px;
        border-radius: 12px;
        width: 100%;
    }
}
.selected-products-hold{
    overflow-y: auto;
    min-height: 200px;
}

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
.header-holder{
        font-weight: 600;
        padding-top: 10px;
        span{
            padding-right: 5px;
            &:last-child{
                padding-right: 0;
            }
        }
    }
.product-selection-sheet{
    
    position: fixed;
    z-index: 301;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .selection-main{
        width: 100%;
        border-radius: 20px;
        background-color: #ffffff;
        position: relative;
        .selection-body{
            overflow-y: auto;
            padding: 0 40px;
            min-height: 300px;
            
        }
    }
    .dismiss{
        background-color: $dark;
        position: absolute;
        right: -15px;
        top: -15px;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        
    }
    .selection-header{
        padding: 20px 40px;
    }
    ul{
        height: 100px;
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
button.add-more{
    border: 2px solid $dark;
    background-color: #ffffff;
    font-size: 0.95rem;
    height: 44px;
    border-radius: 25px;
    padding: 8px 12px;
    &:hover{
        background-color: $dark-light;
    }
    &:active{
        box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
    }
    span{
        padding-left: 4px;
    }
}
</style>
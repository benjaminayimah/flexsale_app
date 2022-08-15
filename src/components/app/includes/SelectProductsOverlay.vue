<template>
    <teleport to="#selection_title">
        <h3>Select Products</h3>
        <div class="flex">
            <span class="count">{{ getTempContainer.array.length }}</span><span class="text">items selected</span>
        </div>
    </teleport>
    <teleport to="#selection_sheet_searchInput">
        <div class="search-hold">
            <form @submit.prevent="" @focusin="focusIn" @focusout="focusOut">
                <label  class="justify-content-center align-items-center" :class="{ 'is-focused' : isFocused }">
                    <div class="outer-icons flex-end" @mousedown.prevent="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-search" width="20" height="20" viewBox="0 0 26.671 26.671">
                            <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                        </svg>
                    </div>
                    <div class="fgr-1">
                        <input v-model="form.search"  autocomplete="off"  ref="searchInput" type="text" name="searchField" class="form-control" placeholder="Search product by name...">
                    </div>
                    <div class="outer-icons flex-start" v-if="!form.input == '' && isFocused" @mousedown.prevent="">
                        <!-- <spinner v-if="submitting" v-bind:size="21" /> -->
                        <!-- <span v-if="!submitting" class="clear-input-btn" @click="clearInput">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 20 20">
                                <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                            </svg>
                        </span> -->
                    </div>
                </label>
            </form>
        </div>
    </teleport>
    <teleport to="#selection_sheet_body">
        <ul>
            <add-tag-row v-for="product in computedProducts.sort((a, b) => a.name.localeCompare(b.name))" :key="product.id" v-bind:product="product" />
        </ul>
    </teleport>
</template>
<script>
import AddTagRow from './AddTagRow.vue'
import { mapGetters } from 'vuex'
import searchFunctionsMixin from '../../../mixins/searchFunctions'
export default {
  components: { AddTagRow },
  mixins: [searchFunctionsMixin],
    name: 'SelectProductOverlay',
    data() {
        return {
            form: {
                search: ''
            }
        }
    },
    computed: {
        ...mapGetters(['getProducts', 'getTempContainer']),
        computedProducts: function() {
            return this.getProducts.filter(product => {
                return product.name.toLowerCase().match(this.form.search.toLowerCase())
            })
        }
    },
    methods: {
        focusIn: function () {
            this.isFocused = true
        },
        focusOut: function () {
            this.isFocused = false;
        },
    }
}
</script>
<style scoped lang="scss">

h3{
    margin: 0;
}
.count{
    color: $primary-color;
}
.text{
    color: $gray-color;
    font-weight: 500;
}
ul{
    padding-left: 0;
}
.search-hold {
    padding: 0 15px;
}

</style>
                                
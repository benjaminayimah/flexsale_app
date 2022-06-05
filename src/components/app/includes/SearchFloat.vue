<template>
<div class="search-hold">
    <form  @click="showResultsFloat" @mousedown="showResultsFloat">
        <label for="search_field" :class="{ 'is-focused' : isFocused }" class="justify-content-center align-items-center">
            <div class="outer-icons flex-end" @mousedown.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-search" width="20" height="20" viewBox="0 0 26.671 26.671">
                    <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                </svg>
            </div>
            <div class="fgr-1">
                <input id="search_field" v-model="form.input"  autocomplete="off" @input="doSearch" @focusin="showResultsFloat" @focusout="hideResultsFloat" ref="searchInput" type="text" name="searchField" class="form-control" placeholder="Search application...">
            </div>
            <div class="outer-icons flex-start" v-if="!form.input == '' && isFocused" @mousedown.prevent="">
                <spinner v-if="submitting" v-bind:size="21" />
                <span v-if="!submitting" class="clear-input-btn" @click="clearInput">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 20 20">
                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"></path>
                    </svg>
                </span>
            </div>
        </label>
    </form>
    <div v-if="isFocused" class="search-results-float" @mousedown.prevent="" :style="{ maxHeight: getWindowHeight-300+'px'}">
        <div v-if="computedResults.length > 0" class="search-result-hold">
            <div class="flex-row-js history" v-if="historyResults.length > 0 && !searchResults.length > 0">
                <h3 class="mg-0">Recent</h3>
                <button @click.prevent="clearHistory" class="button rounded-button">Clear all</button>
            </div>
            <div>
                <li @click="setHistory(list.id, list.name, list.stock, list.image, list.prod_type)" class="search-list" v-for="list in computedResults" :key="list.id">
                    <router-link :to="{ name: 'ProductDetailsBasic', params: { id: list.id, name: list.name } }" class="flex-row-js">
                        <div class="flex gap-8">
                            <div class="bg-img" :style="list.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+list.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                            <div>
                                <div class="name text-overflow-ellipsis">{{ list.name }}</div>
                                <div class="flex gap-8" v-if="list.stock"><span class="label">Stock:</span><span>{{ list.stock }}</span></div>
                                <div class="flex gap-8"><span class="type">{{ (list.prod_type == 0 || list.prod_type == 1) ? 'Product' : 'Tag' }}</span></div>
                            </div>
                        </div>
                        <button v-if="historyResults.length > 0 && !searchResults.length > 0" class="button button-secondary cancel-btn" @click.prevent="delThisHistory(list.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 20 20">
                                <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#566ff4"></path>
                            </svg>
                        </button>
                    </router-link>
                </li>
            </div>
        </div>
        <div v-else class="search-empty">
            <span>Try searching for products, tags, supplier or customer.</span>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue';
export default {
    name: "SearchFloat",
    components: { Spinner },
    computed: {
        ...mapGetters(["getWindowHeight", "getToken", "getHostname", "getUserAdminID", "getUser", "getDefaultImage"]),
        computedResults() {
            if (this.searchResults.length > 0) {
                return this.searchResults
            }
            else if (this.historyResults.length > 0) {
                return this.historyResults
            }
            else
            return []
        }
    },
    data() {
        return {
            form: {
                input: ''
            },
            submitting: false,
            searchResults: [],
            historyResults: JSON.parse(localStorage.getItem('searchHistory')) ||  [],
            isFocused: false,
            dropdownIn: false
        };
    },
    methods: {
        clearInput() {
            this.form.input = ''
            this.searchResults = ''
            this.$nextTick(function () {
                this.$refs.searchInput.focus();
            });
        },
        showResultsFloat: function () {
            this.isFocused = true;
            this.dropdownIn = true;
        },
        hideResultsFloat: function () {
            // if (this.form.input == '')
                this.isFocused = false;
        },
        chechInput() {
            let inputlength = this.form.input.length
            let str = document.getElementById("search_field").value;
            if(inputlength > 1 && !str.match(/^\s*$/)) {
                return true
            }
            else
            return false
        },
        async doSearch() {
            if(this.chechInput()) {
                this.submitting = true
                axios.post(this.getHostname + "/api/search?token=" + this.getToken, { query: this.form.input })
                .then((res) => {
                    this.submitting = false
                    this.searchResults = res.data.results;
                });
            }
            
        },
        setHistory(id, name, stock, image, type) {
            const array = []
            const newHistory = { id: id, name: name, stock: stock, image: image, type: type }
            const oldHistory = JSON.parse(localStorage.getItem('searchHistory'))
            if(oldHistory) {
                oldHistory.push(newHistory)
                localStorage.setItem('searchHistory', JSON.stringify(oldHistory))
            }else{
                array.push(newHistory)
                localStorage.setItem('searchHistory', JSON.stringify(array))
            }
        },
        delThisHistory(id) {
            let oldHistory = JSON.parse(localStorage.getItem('searchHistory')).find(data => data.id !== id)
            console.log(oldHistory)
            // localStorage.removeItem('searchHistory')
        },
        clearHistory() {
            localStorage.removeItem('searchHistory')
        }
    },
}
</script>
<style lang="scss" scoped>
.search-hold{
    height: 52px;
    position: relative;
    form{
        display: flex;
        height: inherit;
    }
    label{
        height: inherit;
        display: flex;
        width: 100%;
        margin: 0;
        background-color: $primary-light;
        border-radius: 14px;
        border: 1px solid transparent;
        div {
            display: flex;
            height: 100%;
            align-items: center;
        }
        .outer-icons{
            width: 38px;
        }
    }
    .is-focused{
        border-color: $primary-color;
        background-color: $white-color;
        .icon-search path {
            fill: $primary-color;
        }
    }
    width: 100%;
    input{
        border-radius: unset;
        padding: 10px;
        background-color: inherit;
        border: unset;
        height: unset;
    }
    input::placeholder{
        color: $gray-color;
    }
    .clear-input-btn{
        position: unset;
        top: unset;
        right: unset;
    }
}
.search-results-float{
    background-color: $white-color;
    border-radius: 8px;
    position: fixed;
    width: 320px;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    min-height: 100px;
    overflow-y: auto;

}
.search-empty{
    padding: 20px;
    text-align: center;
}
.search-result-hold{
    padding: 8px 0;
}

.history{
    padding: 4px 20px;
    button{
        background-color: transparent;
        font-size: 14px;
        padding: 8px 10px;
        border-radius: 10px;
        margin-right: -4px;
    }
}
.bg-img{
    height: 60px;
    width: 60px;
    background-color: #E5E9F7;
}
.cancel-btn{
    height: 38px;
    width: 38px;
    margin-right: -8px;
    margin-left: unset;
    &:hover{
        background-color: $primary-light;
    }
    &:active {
        box-shadow: 0 0 0 0.2rem rgba(107, 95, 215, 0.132);
        border: 1px solid $primary-color;
    }
}
.search-list{
    display: flex;
    width: inherit;
    a {
        text-decoration: unset;
        color: unset;
        width: 100%;
        padding: 15px 20px;
        &:hover {
            background-color: rgb(250, 250, 250);
        }
        .name{
            font-weight: 600;
            width: 170px;
        }
        .label{
            color: $gray-color;
            font-weight: 600;
            font-size: 14px;
        }
        .type{
            font-size: 12px;
            color: $accent-color;
        }
    }
}
</style>
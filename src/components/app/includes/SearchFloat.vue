<template>
<div class="search-hold">
    <form @submit.prevent="" @click="showResultsFloat" @mousedown="showResultsFloat">
        <label :for="inputID" :class="{ 'is-focused' : isFocused }" class="justify-content-center align-items-center">
            <div class="outer-icons flex-end" @mousedown.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-search" width="20" height="20" viewBox="0 0 26.671 26.671">
                    <path d="M-1381.036-29.043l-5.275-5.275a11.876,11.876,0,0,1-7.725,2.827,11.886,11.886,0,0,1-8.46-3.5,11.888,11.888,0,0,1-3.5-8.461,11.886,11.886,0,0,1,3.5-8.46,11.886,11.886,0,0,1,8.46-3.5,11.888,11.888,0,0,1,8.461,3.5,11.886,11.886,0,0,1,3.5,8.46,11.876,11.876,0,0,1-2.827,7.725l5.275,5.275a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-1381.036-29.043ZM-1404-43.457a9.976,9.976,0,0,0,9.965,9.966,9.93,9.93,0,0,0,6.953-2.833,1.031,1.031,0,0,1,.085-.1,1.017,1.017,0,0,1,.1-.085,9.934,9.934,0,0,0,2.832-6.953,9.976,9.976,0,0,0-9.965-9.965A9.976,9.976,0,0,0-1404-43.457Z" transform="translate(1406 55.421)" fill="#7e8596"/>
                </svg>
            </div>
            <div class="fgr-1">
                <input :id="inputID" v-model="form.input"  autocomplete="off" @input="doSearch(inputID)" @focusin="showResultsFloat" @focusout="hideResultsFloat" ref="searchInput" type="text" name="searchField" class="form-control" placeholder="Search application...">
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
    <!-- && $router.currentRoute.value.name !== 'Search' -->
    <div v-if="isFocused" class="search-results-float" @mousedown.prevent="" :style="{ maxHeight: getWindowHeight-300+'px'}">
        <div v-if="computedResults.array.length > 0" class="search-result-hold">
            <div class="flex-row-js history" v-if="computedResults.type == 'history'">
                <h3 class="mg-0">Recent</h3>
                <button @click.prevent="clearHistory" class="button rounded-button">Clear all</button>
            </div>
            <div>
                <li @mouseup="setHistory(list.id, list.name, list.stock, list.image, list.prod_type)" class="search-list" v-for="list in computedResults.array" :key="list.id">
                    <a href="#" @click.prevent="" class="flex-row-js">
                        <div class="flex gap-8 a-inner" @click="goTo(list.id, list.name)" :class="{'w-100' : computedResults.type == 'search'}">
                            <div class="bg-img" :style="list.image? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+ getUser.current+'/'+list.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}"></div>
                            <div>
                                <div class="name text-overflow-ellipsis">{{ list.name }}</div>
                                <div class="flex gap-8" v-if="list.stock"><span class="label">Stock:</span><span>{{ list.stock }}</span></div>
                                <div class="flex gap-8"><span class="type">{{ (list.prod_type == '0' || list.prod_type == '1') ? 'Product' : 'Tag' }}</span></div>
                            </div>
                        </div>
                        <button v-if="computedResults.type == 'history'" class="button button-secondary cancel-btn" @click.prevent="delThisHistory(list.time)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 20 20">
                                <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#566ff4"></path>
                            </svg>
                        </button>
                    </a>
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
import searchFunctionsMixin from '../../../mixins/searchFunctions';
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'
export default {
    name: "SearchFloat",
    props: ['inputID'],
    mixins: [searchFunctionsMixin],
    components: { Spinner },
    computed: {
        ...mapGetters(["getUserAdminID", "getUser", "getDefaultImage"])
    }
}
</script>
<style lang="scss" scoped>
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
.search-results-float{
    background-color: $white-color;
    border-radius: 8px;
    position: fixed;
    width: 320px;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    min-height: 100px;
    overflow-y: auto;
    top: 70px

}
</style>
<template>
    <div class="main-page-body">
        <div class="mini-body">
            <div class="mini-body-hold">
                <div class="mini-header-hold flex-row-js">
                    <div class="flex align-items-center">
                        <!-- <h1 class="text-overflow-ellipsis">{{ getTempContainer.array.length }} items</h1>
                        <span class="vt-separator"></span> -->
                        <div class="flex-col">
                            <div class="flex align-items-center head-col-row">
                                <label>Name:</label><span class="-text">{{ capitalize(getTempContainer.data.name) }}</span>
                            </div>
                            <div class="flex align-items-center head-col-row">
                                <label>Duration:</label><div class="flex -text"><span>{{ dateTime(getTempContainer.data.start) }}</span><span class="dash">-</span><span>{{ dateTime(getTempContainer.data.end) }}</span></div>
                            </div>
                        </div>
                        <div class="flex-col">
                            <div class="flex align-items-center head-col-row">
                                <label>Value:</label>
                                <span class="-text">
                                    <span v-if="getTempContainer.data.percentage === 1">
                                        {{ getTempContainer.data.value }}%
                                    </span>
                                    <span v-else>
                                        <span>{{ getCurrency }}</span>
                                        {{ getTempContainer.data.value }}
                                    </span>
                                </span>
                            </div>
                            <div class="flex align-items-center head-col-row">
                                <label>Status:</label>
                                <span class="-text">
                                    <span v-if="getTempContainer.data.active == '1'">
                                        Active
                                    </span>
                                    <span v-else-if="getTempContainer.data.active == '0'">
                                        Expired
                                    </span>
                                    <span v-else>
                                        Inactive
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <button class="icon-label-btn flex-row" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'discount'})">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711"><path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"></path></svg>
                            <span class="hide-mob">Edit</span>
                        </button>
                        <button class="icon-label-btn flex-row delete" @click.prevent="$store.commit('setDeleteModal', { id: $route.params.id, type: 'discount' } )">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 21.5 23.166"><path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)"></path></svg>
                            <span class="text-overflow-ellipsis hide-mob">Delete</span>
                        </button>
                    </div>
                </div>
                <div class="mini-body-content">
                    <ul v-if="getTempContainer.array.length > 0">
                        <selected-tag-row v-for="checked in getTempContainer.array" :key="checked.id" v-bind:checkedProduct="checked" v-bind:editMode="false" />
                    </ul>
                     <div v-else-if="getSubmitting === false && getTempContainer.array.length < 1" class="flex-col empty-state">
                         <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 204 204">
                            <g transform="translate(60.818 60.818)">
                                <path  d="M102,0A102,102,0,1,1,0,102,102,102,0,0,1,102,0Z" transform="translate(-60.818 -60.818)" fill="#d7dcfa"/>
                                <path  d="M87.6,45.051H75.085V60.068l-5.006-3.332-5.006,3.332V45.051H52.559a2.51,2.51,0,0,0-2.5,2.5V77.588a2.51,2.51,0,0,0,2.5,2.5H87.6a2.51,2.51,0,0,0,2.5-2.5V47.554A2.51,2.51,0,0,0,87.6,45.051ZM27.531,35.04h35.04a2.51,2.51,0,0,0,2.5-2.5V2.5a2.51,2.51,0,0,0-2.5-2.5H50.057V15.017l-5.006-3.332-5.006,3.332V0H27.531a2.51,2.51,0,0,0-2.5,2.5V32.537A2.51,2.51,0,0,0,27.531,35.04ZM37.542,45.051H25.028V60.068l-5.006-3.332-5.006,3.332V45.051H2.5a2.51,2.51,0,0,0-2.5,2.5V77.588a2.51,2.51,0,0,0,2.5,2.5h35.04a2.51,2.51,0,0,0,2.5-2.5V47.554A2.51,2.51,0,0,0,37.542,45.051Z" transform="translate(-3.869 -5.566)" fill="#566ff4"/>
                            </g>
                        </svg>
                         <h1>
                            Discount is Empty
                         </h1>
                         <div>To apply the discount value, add items<br>to this discount.</div>
                         <button class="button button-primary" @click.prevent="$store.commit('getMainHomeWidth', payload = { mode: 'edit', type: 'discount'})">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.882 15.882">
                                <path d="M-7843.453-4503.179v-5.94h-5.94a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.94v-5.94a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.94h5.94a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.94v5.94a1,1,0,0,1-1,1A1,1,0,0,1-7843.453-4503.179Z" transform="translate(7850.395 4518.06)" fill="#fff"/>
                            </svg>
                            <span>Add items</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import SelectedTagRow from '../../components/app/includes/SelectedTagRow.vue'
export default {
  components: { SelectedTagRow },
    name: 'DetailedDiscount',
    computed: mapGetters(['getToken', 'getHostname', 'getTempContainer', 'getCurrency', 'getSubmitting']),
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
        dateTime(value) {
            return moment(value).format('MMM DD')
        },
        capitalize(value) {
            if(!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    created() {
        window.scrollTo(0,0)
        this.$store.dispatch('fetchThisDiscount', this.$route.params.id)
    },
    beforeUpdate() {
        this.setPage()
    },
    unmounted() {
         this.$store.commit('clearTempDataContainer')
    },
    // watch: {
    //     $route(to) {
    //         this.routerName = to.params.name
    //         console.log(to.params.name)
    //     }
    // }
}
</script>
<style scoped lang="scss">
h1{
    margin: 0;
}
ul{
    margin: 20px 0;
    padding-left: 0;
}
.mini-header-hold{
    display: flex;
}
.delete{
    span{
        color: $danger;
    }
    svg path{
        fill: $danger;
    }
}
label{
    margin: 0 5px 0 0;
    color: $gray-color;
}
.vt-separator{
    margin: 0 10px;
    background-color: $gray-color;
    width: 1px;
    height: 35px;
}
.head-col-row{
    &:first-child{
        margin-bottom: 5px;
    }
    .-text{
        font-weight: 600;
    }
}
.dash{
    margin: 0 4px;
}
.flex-col{
    margin-right: 20px;
}
.empty-state{
    margin: 0;
    padding-top: 120px;
    text-align: center;
    align-items: center;
    .icon-svg{
        margin-bottom: 20px;
    }
    h1{
        margin: 8px 0;
    }
    div{
        color: $gray-color;
        font-size: 1.1rem;
        margin-bottom: 15px;
    }
    button {
        height: 52px;
        width: 150px;
        svg{
            margin-right: 5px;
        }
    }
}

</style>
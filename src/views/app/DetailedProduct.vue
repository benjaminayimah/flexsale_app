<template>
    <div class="main-page-body">
        <div class="header">
            <div class="cover-image bg-img" :style="{ backgroundImage: 'url('+getHostname+'/storage/'+ getUser.current+'/'+getThisProduct.image+')' }">
                <div class="cover-image-backdrop"></div>
                <div class="flex-row action-btn-hold">
                    <button class="icon-label-btn flex-row" @click.prevent="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711"><path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path></svg>
                        <span>Edit</span>
                    </button>
                    <button class="icon-label-btn flex-row" @click.prevent="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 21.5 23.166"><path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)" fill="#0e142c"></path></svg>
                        <span class="text-overflow-ellipsis">Delete</span>
                    </button>
                </div>
                <div class="cover-caption">
                    <div><h1>{{ getThisProduct.name }}</h1></div>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
                    </p>
                    <div class="flex-row caption-row"><label>Created:</label><span>{{ dateTime(getThisProduct.created_at) }}</span></div>
                    <div class="flex-row caption-row"><label>By:</label><span>{{ getThisProduct.added_by }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'DetailedProduct',
    computed: mapGetters(['getProducts', 'getHostname', 'getUser', 'getThisProduct']),
    data() {
        return {
            product: {}
        }
    },
    methods: {
        setPage() {
            const title = { title: this.$route.params.name, back: true}
            this.$store.commit('setPagetitle', title)
        },
        fetchThisProduct() {
            this.$store.dispatch('fetchThisProduct', this.$route.params.id)
        },
        dateTime(value) {
        return moment(String(value)).format('MMM DD, YYYY hh:mm a')
        },
    },
    created() {
        this.setPage()
        this.fetchThisProduct()
    },
    unmounted() {
        this.$store.commit('clrThisProduct')
    }
}
</script>
<style scoped lang="scss">
.cover-image{
    height: 350px;
    border-radius: 20px;
    position: relative;
    .action-btn-hold{
        position: absolute;
        top: 20px;
        right: 20px;
        border-radius: 16px;

    }
    .cover-image-backdrop{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 70%;
        width: 100%;
        //background-color: rgba($color: #000000, $alpha: 0.2);
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
        border-radius: inherit;
    }
}
.cover-caption{
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
    width: 70%;
    flex-direction: column;
    padding: 40px 32px;
    color: #fff;
    position: absolute;
    h1{
        margin: 0;
        font-size: 2.2rem;
        font-weight: 800;
    }
    p{
        margin: 8px 0;
        font-size: 1.1rem;
    }
}
.icon-label-btn{
    padding: 12px 10px;
    border-radius: 11px;
    background-color: #fff;
    transition: 0.2s linear all;
    margin-left: 5px;
    font-weight: 500;
    span{
        margin-left: 8px;
        color: $dark;
   
    }
    &:hover {
        background-color: $dark-light;
        
    }
}
.caption-row{
    font-size: 0.98rem;
    label{
        margin: 0 6px 0 0;
    }
    span{
        color: $dark-light;
    }
}
</style>